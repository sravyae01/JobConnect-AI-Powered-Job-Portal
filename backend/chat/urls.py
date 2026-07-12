from django.urls import path
from .views import ChatRoomListView, ChatRoomCreateView, ChatRoomDetailView, MessageListView

urlpatterns = [
    path('rooms/', ChatRoomListView.as_view(), name='chat-rooms'),
    path('rooms/create/', ChatRoomCreateView.as_view(), name='create-chat-room'),
    path('rooms/<int:pk>/', ChatRoomDetailView.as_view(), name='chat-room-detail'),
    path('rooms/<int:room_id>/messages/', MessageListView.as_view(), name='chat-messages'),
]