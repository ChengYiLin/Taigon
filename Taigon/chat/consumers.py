import json
from channels import consumer
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from .models import Message, ChatRooom
from django.contrib.auth import get_user_model

User = get_user_model()


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_id = list(self.scope['url_route']['kwargs']['room_id'])[0]
        self.group_name = f'chat_{self.room_id}'

        async_to_sync(self.channel_layer.group_add)(
            self.group_name, self.channel_name)
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.group_name, self.channel_name)

    def receive(self, text_data):
        # Save request data in DB
        req = json.loads(text_data)
        author = User.objects.get(id=req['author'])
        chatroom = ChatRooom.objects.get(id=req['chatroom'])
        msgs = Message.objects.create(
            author=author, chatroom=chatroom, textmessage=req['textmessage'])

        # Prepare the response data
        res = json.dumps({'author_name': msgs.author.username,
                          'timestamp': 'msgs.timestamp',
                          'textcontent': msgs.textmessage})

        # Web socket send message to all
        async_to_sync(self.channel_layer.group_send)(
            self.group_name,
            {
                "type": "chat.message",
                "text": res,
            },
        )

    def chat_message(self, event):
        self.send(text_data=event["text"])
