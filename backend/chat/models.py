from django.db import models
from django.conf import settings

class ChatRoom(models.Model):
    job = models.ForeignKey('jobs.Job', on_delete=models.CASCADE, related_name='chat_rooms')
    seeker = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        limit_choices_to={'role': 'seeker'},
        related_name='seeker_chat_rooms'
    )
    employer = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        limit_choices_to={'role': 'employer'},
        related_name='employer_chat_rooms'
    )
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['job', 'seeker', 'employer']

    def __str__(self):
        return f"Chat: {self.seeker.username} - {self.employer.username} ({self.job.title})"

class Message(models.Model):
    room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    content = models.TextField()
    is_read = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['timestamp']

    def __str__(self):
        return f"{self.sender.username}: {self.content[:30]}"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        # Update chat room timestamp
        self.room.updated_at = self.timestamp
        self.room.save()