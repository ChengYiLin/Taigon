from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    nickname = models.CharField(max_length=15)
    male = models.BooleanField(default=True)
    introduction = models.CharField(max_length=30, blank=True)
    profileimg = models.ImageField(upload_to='profile', default='profile/noname.jpg')

    def __str__(self):
        return self.user.username