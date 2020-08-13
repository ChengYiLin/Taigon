from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class RooomCategory(models.Model):
    category = models.CharField(max_length=10, unique=True)

    def __str__(self):
        return self.category


class ChatRooom(models.Model):
    roomname = models.CharField(max_length=30, unique=True)
    icon = models.ImageField(upload_to='room/icon')
    background = models.ImageField(upload_to='room/background')
    introduction = models.CharField(max_length=100)
    category = models.ForeignKey(
        RooomCategory, related_name='roomCategory', on_delete=models.CASCADE)
    owner = models.ForeignKey(
        User, related_name='roomOwner', on_delete=models.CASCADE)

    def __str__(self):
        return self.roomname


class RoomMember(models.Model):
    user = models.ForeignKey(
        User, related_name='roomMember', on_delete=models.CASCADE)
    roomname = models.ManyToManyField(ChatRooom)

    def __str__(self):
        return self.user.username


class Message(models.Model):
    MSG_TYPE = [
        ('TXT', 'TXT'),
        ('IMG', 'IMG')
    ]

    author = models.ForeignKey(
        User, related_name='messageAuthor', on_delete=models.CASCADE)
    chatroom = models.ForeignKey(
        ChatRooom, related_name='messageRoom', on_delete=models.CASCADE)
    msgtype = models.CharField(max_length=3, choices=MSG_TYPE, default='TXT')
    textmessage = models.TextField(blank=True)
    imgmessage = models.ImageField(upload_to='msg', blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.author.username
