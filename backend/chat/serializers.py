from rest_framework import serializers
from .models import ChatRoom, Message
from users.serializers import UserSerializer
from jobs.serializers import JobListSerializer

class MessageSerializer(serializers.ModelSerializer):
    sender_detail = UserSerializer(source='sender', read_only=True)
    
    class Meta:
        model = Message
        fields = ['id', 'sender', 'sender_detail', 'content', 'is_read', 'timestamp']
        read_only_fields = ['id', 'sender', 'timestamp']

class ChatRoomSerializer(serializers.ModelSerializer):
    seeker_detail = UserSerializer(source='seeker', read_only=True)
    employer_detail = UserSerializer(source='employer', read_only=True)
    job_detail = JobListSerializer(source='job', read_only=True)
    last_message = serializers.SerializerMethodField()
    unread_count = serializers.SerializerMethodField()
    
    class Meta:
        model = ChatRoom
        fields = [
            'id', 'job', 'job_detail', 'seeker', 'seeker_detail', 
            'employer', 'employer_detail', 'is_active', 'created_at', 
            'updated_at', 'last_message', 'unread_count'
        ]

    def get_last_message(self, obj):
        last_msg = obj.messages.last()
        if last_msg:
            return MessageSerializer(last_msg).data
        return None

    def get_unread_count(self, obj):
        if self.context.get('request'):
            user = self.context['request'].user
            return obj.messages.filter(is_read=False).exclude(sender=user).count()
        return 0

class ChatRoomCreateSerializer(serializers.Serializer):
    job_id = serializers.IntegerField()
    seeker_id = serializers.IntegerField(required=False)