from django.shortcuts import render

# Create your views here.
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import ChatRoom, Message
from .serializers import ChatRoomSerializer, ChatRoomCreateSerializer, MessageSerializer
from jobs.models import Job

class ChatRoomListView(generics.ListAPIView):
    serializer_class = ChatRoomSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_employer:
            return ChatRoom.objects.filter(employer=user, is_active=True)
        return ChatRoom.objects.filter(seeker=user, is_active=True)

class ChatRoomCreateView(generics.CreateAPIView):
    serializer_class = ChatRoomCreateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        job_id = serializer.validated_data['job_id']
        job = get_object_or_404(Job, id=job_id)
        seeker_id = serializer.validated_data.get('seeker_id')
        
        if request.user.is_employer:
            employer = request.user
            seeker = get_object_or_404(User, id=seeker_id)
        else:
            seeker = request.user
            employer = job.employer
        
        # Check if chat room already exists
        room, created = ChatRoom.objects.get_or_create(
            job=job,
            seeker=seeker,
            employer=employer,
            defaults={'is_active': True}
        )
        
        room_serializer = ChatRoomSerializer(room, context={'request': request})
        return Response(room_serializer.data, status=status.HTTP_201_CREATED)

class ChatRoomDetailView(generics.RetrieveAPIView):
    serializer_class = ChatRoomSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = ChatRoom.objects.all()

    def get_queryset(self):
        user = self.request.user
        if user.is_employer:
            return ChatRoom.objects.filter(employer=user)
        return ChatRoom.objects.filter(seeker=user)

class MessageListView(generics.ListAPIView):
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        room_id = self.kwargs['room_id']
        room = get_object_or_404(ChatRoom, id=room_id)
        
        # Check if user is part of the chat
        if room.employer != self.request.user and room.seeker != self.request.user:
            return Message.objects.none()
        
        return Message.objects.filter(room=room)