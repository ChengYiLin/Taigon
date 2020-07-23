from rest_framework import generics
from rest_framework import mixins
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.serializers import ModelSerializer
from .serializers import ChatRooomSerializer, MessageSerializer, RoomMemberSerializer
from .models import ChatRooom, Message, RoomMember
from accounts.models import UserProfile
from django.contrib.auth import get_user_model
# knox
from knox.auth import TokenAuthentication

User = get_user_model()

# Chatroom API


class ChatroomAPI(mixins.ListModelMixin,
                  generics.GenericAPIView):
    queryset = ChatRooom.objects.all()
    serializer_class = ChatRooomSerializer

    def get(self, request):
        rooms = ChatRooom.objects.all()

        # Response
        res_data = [{'id': room.id,
                     'owner': room.owner.username,
                     'roomname': room.roomname,
                     'bgimage': room.bgimage,
                     'category': room.category.category}
                    for room in rooms]

        return Response(res_data)

    def post(self, request):
        pass
        # Save data in Chatroom table
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        room = serializer.save()
        # Sava data in RoomMember
        user_set = User.objects.get(id=serializer.data['owner'])
        roomOwner = RoomMember(user=user_set)
        roomOwner.save()
        roomOwner.roomname.add(room)
        # Response
        res_data = {'id': room.id,
                    'owner': room.owner.username,
                    'roomname': room.roomname,
                    'bgimage': room.bgimage,
                    'category': room.category}

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

        res_data = [{'id': message.id,
                     'author': message.author.username,
                     'author_Image': str(UserProfile.objects.get(user=message.author.id).profileimg),
                     'chatroom': message.chatroom.roomname,
                     'time': message.timestamp.strftime('%Y-%m-%d-%H-%M-%S'),
                     'text': message.textmessage}
                    for message in messages]

        return Response({
            'data': res_data
        })

    def post(self, request):
        roomId = request.query_params['room']

        message = self.get_serializer(data=request.data)
        message.is_valid(raise_exception=True)
        message.save()

        messages = Message.objects.filter(chatroom=roomId)
        res_data = [{'id': message.id,
                     'author': message.author.username,
                     'chatroom': message.chatroom.roomname,
                     'time': message.timestamp.strftime('%Y-%m-%d-%H-%M-%S'),
                     'text': message.textmessage}
                    for message in messages]

        return Response({
            'data': res_data
        })

    def delete(self, request, *args, **kwargs):
        delete_id = int(dict(request.query_params)['id'][0])

        message = Message.objects.filter(id=delete_id)
        message.delete()

        return Response({
            'data': 'success'
        })


# RoomMember API
class RoomMemberAPI(mixins.ListModelMixin,
                    generics.GenericAPIView):
    queryset = RoomMember.objects.all()
    serializer_class = RoomMemberSerializer

    def get(self, request):
        return self.list(request)

    def post(self, request):
        user = int(dict(self.request.data)['user'][0])
        roomname = dict(self.request.data)['roomname']

        # Check User in Room Member or not
        # True : update
        if(RoomMember.objects.filter(user=user)):
            get_user_data = RoomMember.objects.get(user=user)
            get_user_data.roomname.set(roomname)

            return Response({
                'user': User.objects.get(id=user).username,
                'roomname': roomname
            })

        # False: create
        else:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            roommember = serializer.save()

            return Response({
                'data': RoomMemberSerializer(roommember).data
            })

    def delete(self, request, *args, **kwargs):
        delete_id = int(dict(request.query_params)['id'][0])

        roomMember = RoomMember.objects.filter(id=delete_id)
        roomMember.delete()

        return Response({
            'data': 'success'
        })
