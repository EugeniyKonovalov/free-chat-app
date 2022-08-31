import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import classes from "./MessageItem.module.css";

const MessageItem = ({ item }) => {
  const { providerId, photoURL, text, createdAt } = item;
  const [user] = useAuthState(auth);
  const isUser = user.providerId === providerId;
  const date = new Date(createdAt).toLocaleDateString("en");
  const time = new Date(createdAt).toLocaleTimeString("en-us");
  const fullDate = `${date} ${time}`;

  return (
    <li
      className={
        isUser ? `${classes.message} ${classes["flex-end"]}` : classes.message
      }
    >
      {!isUser && (
        <img className={classes.avatar} src={photoURL} alt="user avatar" />
      )}
      <div
        className={`${classes["message-text"]} ${
          isUser && classes["message-end"]
        }`}
      >
        <p
          className={
            isUser
              ? `${classes.text} ${classes["you-text"]}`
              : `${classes.text} ${classes["user-text"]}`
          }
        >
          {text}
        </p>
        <span className={classes.time}>{fullDate}</span>
      </div>
    </li>
  );
};

export default MessageItem;
