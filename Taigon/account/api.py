from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerialzer, LoginSerializer, RegisterSerializer
from django.contrib.auth import get_user_model
from .models import Profile

User = get_user_model()


class getUserData(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = UserSerialzer

    def get(self, request):
        userId = self.request.user.id
        userProfile = Profile.objects.get(user=userId)

        return Response({
            "user": {
                "id": userId,
                "username": self.request.user.username,
                "email": self.request.user.email,
                "nickname": userProfile.nickname,
                "male": userProfile.male,
                "introduction": userProfile.introduction,
                "image": userProfile.profileimg.name,
            }
        })


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data

        userProfile = Profile.objects.get(user=user.id)

        return Response({
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "nickname": userProfile.nickname,
                "male": userProfile.male,
                "introduction": userProfile.introduction,
                "image": userProfile.profileimg.name,
            },
            "token": AuthToken.objects.create(user)[1]
        })


class RegisteAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        register_user = User.objects.get(id=user.id)
        userProfile = Profile.objects.create(
            user=register_user,
            nickname=register_user.username,
        )

        return Response({
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "nickname": userProfile.nickname,
                "male": userProfile.male,
                "introduction": userProfile.introduction,
                "image": userProfile.profileimg.name,
            },
            "token": AuthToken.objects.create(user)[1]
        })
