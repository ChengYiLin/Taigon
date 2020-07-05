from django.db import models

# Create your models here.
class account(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    message = models.CharField(max_length=500, blank=True)
    create_at = models.DateField(auto_now_add=True)