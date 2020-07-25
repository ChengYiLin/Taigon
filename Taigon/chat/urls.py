from django.urls import path
from .api import ChatroomAPI, MessageAPI, RoomMemberAPI, RoomCategoryAPI

urlpatterns = [
    path('api/chatroom', ChatroomAPI.as_view()),
    path('api/message', MessageAPI.as_view()),
    path('api/roommember', RoomMemberAPI.as_view()),
    path('api/roomcategory',RoomCategoryAPI.as_view())
]
