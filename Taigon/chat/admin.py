from django.contrib import admin
from .models import ChatRooom, RoomMember, Message

# Register your models here.
admin.site.register(ChatRooom)
admin.site.register(RoomMember)
admin.site.register(Message)