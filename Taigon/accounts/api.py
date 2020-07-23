from os import confstr
from re import purge
import re
from rest_framework import generics, permissions
from rest_framework import serializers
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerialzer, RegisterSerializer, LoginSerializer
from .models import UserProfile
from django.contrib.auth import get_user_model


User = get_user_model()
# Register API


class RegisteAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # Create User Profile row
        user_set = User.objects.get(id=user.id)
        userimg = UserProfile(user=user_set)
        userimg.profileimg = 'user.png'
        userimg.save()

        return Response({
            "user": {"id": user.id,
                     "username": user.username,
                     "email": user.email,
                     "image": 'user.png'
                     },
            "token": AuthToken.objects.create(user)[1]
        })

# Login API


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data

        userImg = UserProfile.objects.get(user=user.id)

        return Response({
            "user": {"id": user.id,
                     "username": user.username,
                     "email": user.email,
                     "image": str(userImg.profileimg)
                     },
            "token": AuthToken.objects.create(user)[1]
        })

# GET User API


class UserAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = UserSerialzer

    def get(self, request):
        userId = self.request.user.id
        userName = self.request.user.username
        userEmail = self.request.user.email
        userImage = str(UserProfile.objects.get(user=userId).profileimg)

        return Response({
            "id": userId,
            "username": userName,
            "email": userEmail,
            "image": userImage
        })
