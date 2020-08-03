from django.contrib import admin
from .models import ChatRooom, RoomMember, Message, RooomCategory

# Register your models here.
admin.site.register(ChatRooom)
admin.site.register(RoomMember)
admin.site.register(Message)
admin.site.register(RooomCategory)