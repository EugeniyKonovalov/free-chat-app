import React from "react";
import { useSelector } from "react-redux";
import MessageItem from "./MessageItem";
import classes from "./Messages.module.css";

const Messages = () => {
  const messages = useSelector((state) => state.app.messages);
  const selectedUserName = useSelector((state) => state.app.selectedUserName);
  const userMessages = messages.filter(
    (item) => item.chatWith === selectedUserName
  );
  userMessages.sort((a, b) => a - b);

  return (
    <>
      {userMessages.length === 0 && (
        <div className={classes.empty}>
          <img src={require("../../assets/icon/chat.png")} alt="Chat icon" />
          <p>Conversation is empty!</p>
        </div>
      )}
      {userMessages.map((item) => (
        <MessageItem key={item.id} item={item} />
      ))}
    </>
  );
};

export default Messages;
