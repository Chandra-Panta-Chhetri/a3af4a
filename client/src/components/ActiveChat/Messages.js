import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const findReadMessage = (messages, senderId) => {
  //Messages are ordered from oldest -> newest, so loop from end -> beginning
  for(let i = messages.length - 1; i >= 0; i--){
    let msg = messages[i];
    if(msg.senderId === senderId && msg.readStatus){
      return msg;
    }
  }
  return {};
}

const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  const readMessage = findReadMessage(messages, userId); 

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} showRead={message.id === readMessage.id} otherUser={otherUser} />
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
        );
      })}
    </Box>
  );
};

export default Messages;
