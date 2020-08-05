from django.db import models
from django.contrib.auth import get_user_model
import uuid

User = get_user_model()

def generateUID():
    return uuid.uuid4().hex[:10].upper()

newID = generateUID()

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nickname = models.CharField(max_length=15)
    male = models.BooleanField(default=True)
    introduction = models.CharField(max_length=30, blank=True)
    profileimg = models.ImageField(
        upload_to='profile', default='profile/noname.jpg')
    publicId = models.CharField(max_length=10, default=newID, unique=True)

    def __str__(self):
        return self.user.username