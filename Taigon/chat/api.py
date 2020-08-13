from channels import consumer
from rest_framework import generics
from rest_framework import mixins
from rest_framework import generics
from rest_framework.response import Response
from .serializers import ChatRooomSerializer, MessageSerializer, RoomMemberSerializer, RooomCategorySerializer
from .models import ChatRooom, Message, RoomMember, RooomCategory
from accounts.models import UserProfile
from django.contrib.auth import get_user_model

User = get_user_model()

# Chatroom API


class ChatroomAPI(mixins.ListModelMixin,
                  generics.GenericAPIView):
    queryset = ChatRooom.objects.all()
    serializer_class = ChatRooomSerializer

    def get(self, request):
        search_id = int(dict(request.query_params)['room'][0]) if (
            'room' in dict(request.query_params)) else False

        search_category = int(dict(request.query_params)['category'][0]) if (
            'category' in dict(request.query_params)) else False

        rooms = ""

        if(search_id):
            rooms = ChatRooom.objects.get(id=search_id)
        elif(search_category):
            rooms = ChatRooom.objects.filter(category=search_category)
        else:
            rooms = ChatRooom.objects.all()

        # Response
        if(search_id):
            res_data = {'id': rooms.id,
                        'owner': rooms.owner.username,
                        'roomname': rooms.roomname,
                        'bgimage': str(rooms.bgimage),
                        'category': rooms.category.category}
        elif(search_category):
            res_data = [{'id': room.id,
                         'owner': room.owner.username,
                         'roomname': room.roomname,
                         'bgimage': str(room.bgimage),
                         'category': room.category.category}
                        for room in rooms]
        else:
            res_data = [{'id': room.id,
                         'owner': room.owner.username,
                         'roomname': room.roomname,
                         'bgimage': str(room.bgimage),
                         'category': room.category.category}
                        for room in rooms]

        return Response(res_data)

    def post(self, request):
        # Save data in Chatroom table
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        room = serializer.save()
        # Sava data in RoomMember
        # --- if I have created room
        if(RoomMember.objects.filter(user=serializer.data['owner'])):
            user_set = User.objects.get(id=serializer.data['owner'])
            roomOwner = RoomMember.objects.get(user=user_set)
            roomOwner.roomname.add(room)
        # --- if never create room before
        else:
            user_set = User.objects.get(id=serializer.data['owner'])
            roomOwner = RoomMember(user=user_set)
            roomOwner.save()
            roomOwner.roomname.add(room)

        # Response
        rooms = ChatRooom.objects.all()

        res_data = [{'id': room.id,
                     'owner': room.owner.username,
                     'roomname': room.roomname,
                     'bgimage': str(room.bgimage),
                     'category': room.category.category}
                    for room in rooms]

        return Response(res_data)

    def delete(self, request, *args, **kwargs):
        delete_id = int(dict(request.query_params)['id'][0])

        room = ChatRooom.objects.filter(id=delete_id)
        room.delete()

        return Response({
            'data': 'Good'
        })

# Message API


class MessageAPI(mixins.ListModelMixin,
                 generics.GenericAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    def get(self, request):
        roomId = request.query_params['room'] if request.query_params else False
        messages = Message.objects.filter(
            chatroom=roomId) if roomId else Message.objects.all()
        messages = messages.order_by('timestamp')

        res_data = [{'id': message.id,
                     'author': message.author.username,
                     'author_Image': str(UserProfile.objects.get(user=message.author.id).profileimg),
                     'chatroom': message.chatroom.roomname,
                     'time': {
                         'day': message.timestamp.strftime('%Y:%m:%d'),
                         'time': message.timestamp.strftime('%H:%M:%S')
                     },
                     'type': message.msgtype,
                     'text': self.resMsgType(message, message.msgtype)}
                    for message in messages]

        return Response({
            'data': res_data
        })

    def post(self, request):
        print(request.data)
        message = self.get_serializer(data=request.data)
        message.is_valid(raise_exception=True)
        message.save()

        messages = Message.objects.filter(
            chatroom=dict(request.data)['chatroom'][0])
        res_data = [{'id': message.id,
                     'author': message.author.username,
                     'author_Image': str(UserProfile.objects.get(user=message.author.id).profileimg),
                     'chatroom': message.chatroom.roomname,
                     'time': {
                         'day': message.timestamp.strftime('%Y:%m:%d'),
                         'time': message.timestamp.strftime('%H:%M:%S')
                     },
                     'type': message.msgtype,
                     'text': self.resMsgType(message, message.msgtype)}
                    for message in messages]

        return Response({
            'data': res_data[::-1]
        })

    def delete(self, request, *args, **kwargs):
        delete_id = int(dict(request.query_params)['id'][0])

        message = Message.objects.filter(id=delete_id)
        message.delete()

        return Response({
            'data': 'success'
        })

    def resMsgType(self, Query, Type):
        res_dict = {
            'TXT': Query.textmessage,
            'IMG': str(Query.imgmessage)
        }
        return res_dict[Type]

# RoomMember API


class RoomMemberAPI(mixins.ListModelMixin,
                    generics.GenericAPIView):
    queryset = RoomMember.objects.all()
    serializer_class = RoomMemberSerializer

    def get(self, request):
        if(len(dict(request.query_params)) == 0):
            return self.list(request)

        # Get Mine All Rooms
        elif('user' in dict(request.query_params)):
            userId = int(dict(request.query_params)['user'][0])
            userRoomData = RoomMember.objects.get(user=userId)
            res_data = [{'id': room.id,
                         'owner': room.owner.username,
                         'roomname': room.roomname,
                         'bgimage': str(room.bgimage),
                         'category': room.category.category}
                        for room in list(userRoomData.roomname.all())]
            return Response(res_data)

        # Get Room Members
        elif('room' in dict(request.query_params)):
            roomId = int(dict(request.query_params)['room'][0])
            roomMemberData = RoomMember.objects.filter(roomname__id=roomId)

            res_data = [{'id': user.user.id,
                         'username': user.user.username,
                         'email': user.user.email,
                         'image': str(UserProfile.objects.get(user=user.user.id).profileimg)}
                        for user in list(roomMemberData.all())]
            return Response(res_data)

    def post(self, request):
        user = dict(self.request.data)['user']
        roomname = dict(self.request.data)['roomname']

        # Check User in RoomMember Table or not
        # True : update
        if(RoomMember.objects.filter(user=user)):
            get_user_data = RoomMember.objects.get(user=user)
            if(roomname in [user_room.id for user_room in list(get_user_data.roomname.all())]):
                res_data = [{'id': room.id,
                             'owner': room.owner.username,
                             'roomname': room.roomname,
                             'bgimage': str(room.bgimage),
                             'category': room.category.category}
                            for room in list(get_user_data.roomname.all())]

                return Response(res_data)
            else:
                get_user_data.roomname.add(roomname)
                get_user_data.save()

                res_data = [{'id': room.id,
                             'owner': room.owner.username,
                             'roomname': room.roomname,
                             'bgimage': str(room.bgimage),
                             'category': room.category.category}
                            for room in list(get_user_data.roomname.all())]

                return Response(res_data)

        # False: create
        else:
            user_set = User.objects.get(id=user)
            roomOwner = RoomMember(user=user_set)
            roomOwner.save()
            roomOwner.roomname.add(roomname)

            res_data = [{'id': room.id,
                         'owner': room.owner.username,
                         'roomname': room.roomname,
                         'bgimage': str(room.bgimage),
                         'category': room.category.category}
                        for room in list(roomOwner.roomname.all())]

            return Response(res_data)

    def delete(self, request, *args, **kwargs):
        if('room' in dict(request.query_params) and 'user' in dict(request.query_params)):
            delete_user_id = int(dict(request.query_params)['user'][0])
            delete_room_id = int(dict(request.query_params)['room'][0])

            get_user_data = RoomMember.objects.get(user=delete_user_id)
            get_user_data.roomname.remove(delete_room_id)

            userRoomData = RoomMember.objects.get(user=delete_user_id)
            res_data = [{'id': room.id,
                         'owner': room.owner.username,
                         'roomname': room.roomname,
                         'bgimage': str(room.bgimage),
                         'category': room.category.category}
                        for room in list(userRoomData.roomname.all())]
            return Response(res_data)
        else:
            return Response("No room")


# RoomCategory API


class RoomCategoryAPI(mixins.ListModelMixin,
                      generics.GenericAPIView):
    queryset = RooomCategory.objects.all()
    serializer_class = RooomCategorySerializer

    def get(self, request):
        categories = RooomCategory.objects.all()
        res_data = [{'id': category.id,
                     'value': category.category}
                    for category in categories]

        return Response(res_data)
