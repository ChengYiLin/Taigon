from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()

# --- Record User Profile


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profileimg = models.URLField(blank=True)

    def __str__(self):
        return self.user.username
