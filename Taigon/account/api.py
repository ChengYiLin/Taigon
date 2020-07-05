from rest_framework import serializers
from account.models import account
from rest_framework import viewsets, permissions
from .serializes import AccountSerializer

# Account Viewset
class AccountViewset(viewsets.ModelViewSet):
    queryset = account.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = AccountSerializer