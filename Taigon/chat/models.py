from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.
# --- Record Room Name and owner
class ChatRooom(models.Model):
    CATEGORY = [
        ('INTEREST','interest'),
        ('FOOD', 'food'),
        ('TECH', 'tech'),
        ('TRAVEL','travel'),
    ]

    roomname = models.CharField(max_length=100)
    bgimage = models.URLField(blank=True)
    category = models.CharField(max_length=20, choices=CATEGORY, default='INTEREST')
    owner = models.ForeignKey(User, related_name='roomOwner',on_delete=models.CASCADE)

    def __str__(self):
        return self.roomname

# --- Record Chatroom Member
class RoomMember(models.Model):
    user = models.ForeignKey(User, related_name='roomMember',on_delete=models.CASCADE)
    roomname = models.ManyToManyField(ChatRooom)

    def __str__(self):
        return self.user.username

# --- Record Message in each Chatroom
class Message(models.Model):
    author = models.ForeignKey(User, related_name='messageAuthor',on_delete=models.CASCADE)
    chatroom = models.ForeignKey(ChatRooom, related_name='messageRoom',on_delete=models.CASCADE)
    textmessage = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.author.username