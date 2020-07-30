from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()

# --- Record User Profile


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profileimg = models.ImageField(null=True, upload_to='profile')

    def __str__(self):
        return self.user.username