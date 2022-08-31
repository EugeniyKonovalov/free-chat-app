import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CHAT_ROUTE } from "../../utils/router-constants";
import { useParams } from "react-router-dom";
import { appAction } from "../../store/appSlice";
import { uiAction } from "../../store/uiSlice";
import classes from "./UserItem.module.css";

const UserItem = ({ item }) => {
  const { photoURL, displayName, uid, isOnline } = item;
  const params = useParams();
  const { userName } = params;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const messages = useSelector((state) => state.app.messages);
  const userMessage = messages.filter((item) => item.uid === uid);
  const lastMessage = userMessage[userMessage.length - 1];
  const message = lastMessage !== undefined && lastMessage;
  const date = new Date(message.createdAt).toLocaleDateString("en-us", {
    year: "numeric",
    day: "numeric",
    month: "short",
  });

  const userChatHandler = () => {
    dispatch(uiAction.onToggleChat(false));
    navigate(CHAT_ROUTE + displayName, { replace: true });
    dispatch(uiAction.setIsSearch(false));
  };

  useEffect(() => {
    dispatch(appAction.setSelectedUserName(userName));
  }, [dispatch, userName]);

  return (
    <li className={classes.user} onClick={userChatHandler}>
      <div className="hero">
        <img className={classes.avatar} src={photoURL} alt="Avatar" />
        {isOnline && <span className="online" />}
      </div>
      <div>
        <h3 className={classes.name}>{displayName}</h3>
        <span className={classes.text}>{message.text}</span>
      </div>
      <span className={classes.time}>
        {message.createdAt !== undefined && date}
      </span>
    </li>
  );
};

export default UserItem;
