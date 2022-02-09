import React from "react";
import { Avatar, Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const findLatestReadMsgFromSender = (messages, senderId) => {
  //Messages are ordered from oldest -> newest, so loop from end -> beginning
  for(let i = messages.length - 1; i >= 0; i--){
    let m = messages[i]
    if(m.senderId === senderId && m.readStatus){
      return m
    }
  }
  return null
}

const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  const lastReadMsg = findLatestReadMsgFromSender(messages, userId); 

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} showRead={message.id === (lastReadMsg || {}).id} otherUser={otherUser} />
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
        );
      })}
    </Box>
  );
};

export default Messages;
