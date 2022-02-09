import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  convoReadByRecipient,
} from "./store/conversations";

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
    const activeConvo = store.getState().activeConversation;
    store.dispatch(setNewMessage(data.message, data.sender, activeConvo));
  });

  //When recipient is in the same convo as sender
  socket.on("read-message", (data) => {
    //const readMessage = data.message;
    
  })

  //When convo read by recipient, all messages' readStatus
  //is already updated 
  socket.on("read-convo", (data) => {
    store.dispatch(convoReadByRecipient(data.message))
  })
});

export default socket;
