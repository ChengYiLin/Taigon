from django.contrib.auth import get_user_model
from account.models import Profile
from .models import ChatRooom, Message, RoomMember, RooomCategory
from .serializers import RooomCategorySerializer, ChatRooomSerializer, RoomMemberSerializer, MessageSerializer
from rest_framework.response import Response
from rest_framework import generics


def resMsgTime(Query, Type):
    res_dict = {
        'TXT': Query.textmessage,
        'IMG': str(Query.imgmessage)
    }
    return res_dict[Type]


def roomsResData(roomsList):
    return [{'id': room.id,
             'owner': room.owner.username,
             'roomname': room.roomname,
             'icon': room.icon.name,
             'background': room.background.name,
             'introduction': room.introduction,
             'category': room.category.category}
            for room in roomsList]


def membersResData(memberlist):
    res = []
    for member in memberlist:
        userProfile = Profile.objects.get(user=member.user.id)
        user_obj = {
            "id": member.user.id,
            "username": member.user.username,
            "email": member.user.email,
            "nickname": userProfile.nickname,
            "male": userProfile.male,
            "introduction": userProfile.introduction,
            "image": userProfile.profileimg.name,
        }
        res.append(user_obj)
    return res


def messageResData(messageList):
    res = []
    for message in messageList:
        msg_obj = {
            'id': message.id,
            'author': message.author.username,
            'author_Image': Profile.objects.get(user=message.author.id).profileimg.name,
            'chatroom': message.chatroom.roomname,
            'time': {
                'day': message.timestamp.strftime('%Y:%m:%d'),
                'time': message.timestamp.strftime('%H:%M:%S')
            },
            'type': message.msgtype,
            'text': resMsgTime(message, message.msgtype)}
        res.append(msg_obj)
    return res


User = get_user_model()


class RoomCategoryAPI(generics.GenericAPIView):
    queryset = RooomCategory.objects.all()
    serializer_class = RooomCategorySerializer

    def get(self, request):
        categories = RooomCategory.objects.all()
        res_data = [{'id': category.id,
                     'value': category.category}
                    for category in categories]

        return Response(res_data)


class ChatroomAPI(generics.GenericAPIView):
    queryset = ChatRooom.objects.all()
    serializer_class = ChatRooomSerializer

    def get(self, request):
        search_id = int(dict(request.query_params)['room'][0]) if (
            'room' in dict(request.query_params)) else False

        search_category = int(dict(request.query_params)['category'][0]) if ('category' in dict(request.query_params)) else False

        # if have room id, return 1 room
        if(search_id):
            room = ChatRooom.objects.get(id=search_id)
            return Response(roomsResData([room]))

         # else return specific category or all
        rooms = ChatRooom.objects.filter(category=search_category) if (
            search_category) else ChatRooom.objects.all()
        return Response(roomsResData(rooms))

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
        return Response(roomsResData(rooms))

    def delete(self, request, *args, **kwargs):
        delete_id = int(dict(request.query_params)['id'][0])

        room = ChatRooom.objects.filter(id=delete_id)
        room.delete()

        return Response('Delete Success')


class RoomMemberAPI(generics.GenericAPIView):
    queryset = RoomMember.objects.all()
    serializer_class = RoomMemberSerializer

    def get(self, request):
        # Get Mine All Rooms
        if('user' in dict(request.query_params)):
            userId = int(dict(request.query_params)['user'][0])
            userRoomData = RoomMember.objects.get(user=userId)
            rooms = list(userRoomData.roomname.all())
            return Response(roomsResData(rooms))

        # Get Room Members
        elif('room' in dict(request.query_params)):
            roomId = int(dict(request.query_params)['room'][0])
            roomMemberData = RoomMember.objects.filter(roomname__id=roomId)
            members = list(roomMemberData.all())
            return Response(membersResData(members))

    def post(self, request):
        user = int(dict(self.request.data)['user'][0])
        roomname = int(dict(self.request.data)['roomname'][0])

        # Check User in RoomMember Table or not
        # True : update
        if(RoomMember.objects.filter(user=user)):
            get_user_data = RoomMember.objects.get(user=user)
            # if room have been there, return old data
            if(roomname in [user_room.id for user_room in list(get_user_data.roomname.all())]):
                rooms = get_user_data.roomname.all()
                return Response(roomsResData(rooms))

            # else, add new data
            else:
                get_user_data.roomname.add(roomname)
                get_user_data.save()

                rooms = list(get_user_data.roomname.all())
                return Response(roomsResData(rooms))

        # False: create
        else:
            user_set = User.objects.get(id=user)
            roomOwner = RoomMember(user=user_set)
            roomOwner.save()
            roomOwner.roomname.add(roomname)
            rooms = list(roomOwner.roomname.all())

            return Response(roomsResData(rooms))

    def delete(self, request):
        if('room' in dict(request.query_params) and 'user' in dict(request.query_params)):
            delete_user_id = int(dict(request.query_params)['user'][0])
            delete_room_id = int(dict(request.query_params)['room'][0])

            get_user_data = RoomMember.objects.get(user=delete_user_id)
            get_user_data.roomname.remove(delete_room_id)

            userRoomData = RoomMember.objects.get(user=delete_user_id)
            rooms = list(userRoomData.roomname.all())
            return Response(roomsResData(rooms))
        else:
            return Response("No room")


class MessageAPI(generics.GenericAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    def get(self, request):
        roomId = request.query_params['room'] if request.query_params else False
        messages = Message.objects.filter(
            chatroom=roomId) if roomId else Message.objects.all()
        messages = messages.order_by('timestamp')

        return Response(messageResData(messages))

    def post(self, request):
        print(request.data)
        message = self.get_serializer(data=request.data)
        message.is_valid(raise_exception=True)
        message.save()

        messages = Message.objects.filter(
            chatroom=int(dict(request.data)['chatroom'][0]))
        messages = messages.order_by('timestamp')

        return Response(messageResData(messages))

    def delete(self, request, *args, **kwargs):
        delete_id = int(dict(request.query_params)['id'][0])

        message = Message.objects.filter(id=delete_id)
        message.delete()

        return Response('Delete')
