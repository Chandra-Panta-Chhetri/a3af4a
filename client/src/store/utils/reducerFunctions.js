export const addMessageToStore = (state, payload) => {
  const { message, sender, activeConvo } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
      numUnread: 1
    };
    newConvo.latestMessageText = message.text;
    return [newConvo, ...state];
  }

  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      const convoCopy = { ...convo };
      const sentToActiveChat = convo.otherUser.username === activeConvo;
      convoCopy.messages = [...convo.messages, message];
      convoCopy.latestMessageText = message.text;
      convoCopy.numUnread = sentToActiveChat ? 0 : convo.numUnread + 1;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser = { ...convoCopy.otherUser, online: true };
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser = { ...convoCopy.otherUser, online: false };
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [], numUnread: 0 };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      const convoCopy = {...convo, id: message.conversationId, messages: [...convo.messages, message], latestMessageText: message.text};
      return convoCopy;
    } else {
      return convo;
    }
  });
};

//Marking current user's convo with id conversationId as read
export const markConversationAsReadInStore = (state, conversationId) => state.map((convo) => convo.id === conversationId ? {...convo, numUnread: 0} : convo)

//Marking sender's message as being read by recipient
export const markMessageAsReadByRecipientInStore = (state, readMsg) => {
  return state.map((convo) => {
    if(convo.id === readMsg.conversationId){
      const messagesCopy = [...convo.messages];

      //Messages are sorted from oldest -> newest, so loop from end -> beginning
      for(let i = messagesCopy.length - 1; i >= 0; i--){
        let msg = messagesCopy[i];
        if(readMsg.id === msg.id){
          messagesCopy[i] = {...messagesCopy[i], readStatus: true};
          break;
        }
      }
      
      const convoCopy = {...convo, messages: messagesCopy};
      return convoCopy;
    } else {
      return convo;
    }
  })
}