from django.db import models

from . import utils
from .conversation import Conversation


class Message(utils.CustomModel):
    text = models.TextField(null=False)
    senderId = models.IntegerField(null=False)
    conversation = models.ForeignKey(
        Conversation,
        on_delete=models.CASCADE,
        db_column="conversationId",
        related_name="messages",
        related_query_name="message"
    )
    createdAt = models.DateTimeField(auto_now_add=True, db_index=True)
    updatedAt = models.DateTimeField(auto_now=True)
    readStatus = models.BooleanField(null=False, default=False)

    def mark_conversation_as_read(conversation, sender_id):
        messagesQuerySet = Message.objects.filter(senderId=sender_id, conversation=conversation, readStatus=False)
        messagesQuerySet.update(readStatus=True)