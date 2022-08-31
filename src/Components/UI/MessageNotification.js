import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiAction } from "../../store/uiSlice";
import classes from "./MessageNotification.module.css";

const MessageNotification = () => {
  const dispatch = useDispatch();
  const messageNotification = useSelector(
    (state) => state.app.notificationMessage
  );
  const message = messageNotification !== undefined && messageNotification;
  const time = new Date(message.createdAt).toLocaleTimeString("en-us");

  const closeNotificationHandler = () =>
    dispatch(uiAction.onToggleNotification(false));

  return (
    <div className={classes.notification}>
      <div className={classes.message} onClick={closeNotificationHandler}>
        <img className={classes.avatar} src={message.photoURL} alt="avatar" />
        <div className={classes["message-text"]}>
          <h3 className={classes.name}>{message.displayName}</h3>
          <p className={classes.text}>{message.text}</p>
        </div>
        <span className={classes.time}>{time}</span>
      </div>
      <img
        onClick={closeNotificationHandler}
        className={classes.close}
        src={require("../../assets/icon/close.png")}
        alt="Close icon"
      />
    </div>
  );
};

export default MessageNotification;
