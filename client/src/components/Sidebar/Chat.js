import React from "react";
import { Box, Chip } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { connect } from "react-redux";
import { saveConversationReadStatus } from "../../store/utils/thunkCreators";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab"
    }
  },
  unreadCount: {
    marginRight: "15px"
  }
}));

const Chat = (props) => {
  const classes = useStyles();
  const { conversation } = props;
  const { otherUser, numUnread } = conversation;

  const handleClick = async (conversation) => {
    await props.setActiveChat(conversation.otherUser.username);
    if(conversation.numUnread > 0) {
      await props.setConversationAsRead(conversation);
    }
  };

  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent conversation={conversation} />
      {numUnread > 0 && <Chip className={classes.unreadCount} label={numUnread} size="small" color="primary" />}
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    },
    setConversationAsRead: (conversation) => dispatch(saveConversationReadStatus(conversation))
  };
};

export default connect(null, mapDispatchToProps)(Chat);
