from rest_framework import serializers
from .models import account
from rest_framework import viewsets, permissions
from .serializes import AccountSerializer

# Account Viewset
class AccountViewset(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = AccountSerializer

    def get_queryset(self):
        return self.request.user.users.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)