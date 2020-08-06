from rest_framework import serializers
from rest_framework import fields
from .models import ChatRooom, RoomMember, Message, RooomCategory


class ChatRooomSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatRooom
        fields = '__all__'


class RoomMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomMember
        fields = '__all__'

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'

class RooomCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = RooomCategory
        fields = '__all__'