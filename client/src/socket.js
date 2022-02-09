import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  messageReadByRecipient,
} from "./store/conversations";
import { saveMessageReadStatus } from "./store/utils/thunkCreators";

const socket = io("http://localhost:8000");

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });

  socket.on("new-message", (data) => {
    const message = data.message;
    const sender = data.sender;
    const activeConvo = store.getState().activeConversation;
    const convos = store.getState().conversations;
    const convoMsgBelongsTo = convos.find((c) => c.id === message.conversationId)

    store.dispatch(setNewMessage(message, sender, activeConvo));
    if(convoMsgBelongsTo && convoMsgBelongsTo.otherUser.username === activeConvo) {
     saveMessageReadStatus(message);
    }
  });

  socket.on("read-message", (data) => {
    store.dispatch(messageReadByRecipient(data.message));
  })
});

export default socket;
