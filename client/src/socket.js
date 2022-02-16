import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  setMessageAsRead,
} from "./store/conversations";
import { saveConversationReadStatus } from "./store/utils/thunkCreators";

const findActiveConvoWhereMsgSent = (message, activeConversation, conversations) => {
  return conversations?.find((c) => c.id === message.conversationId && c.otherUser.username === activeConversation);
}

const socket = io("http://localhost:8000");

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });

  socket.on("new-message", async (data) => {
    const message = data.message;
    const {activeConversation, conversations} = store.getState();
    
    store.dispatch(setNewMessage(message, data.sender, activeConversation));
    
    //check if message read
    const convoWhereMsgSent = findActiveConvoWhereMsgSent(message, activeConversation, conversations);
    if(convoWhereMsgSent !== undefined) {
      await store.dispatch(saveConversationReadStatus(convoWhereMsgSent))
    }
  });

  socket.on("read-message", (data) => {
    store.dispatch(setMessageAsRead(data.message));
  })
});

export default socket;
