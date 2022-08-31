import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { appAction } from "../../store/appSlice";
import { uiAction } from "../../store/uiSlice";
import AddForm from "../Form/AddForm";
import Messages from "../Messages/Messages";
import Users from "../Users/Users";
import MessageNotification from "../UI/MessageNotification";
import classes from "./Chat.module.css";

const Chat = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isHome = location.pathname === "/home";
  const messageRef = useRef(null);
  const selectedUserName = useSelector((state) => state.app.selectedUserName);
  const messages = useSelector((state) => state.app.messages);
  const users = useSelector((state) => state.app.users);
  const selectedUser = users.filter(
    (item) => item.displayName === selectedUserName
  );
  const selectedUserPhotoURL = selectedUser
    .map((item) => item.photoURL)
    .toString();
  const isOnline = selectedUser.find((item) => item.isOnline);
  const selectedUserUid = selectedUser.map((item) => item.uid).toString();
  const selectedProviderId = selectedUser
    .map((item) => item.providerId)
    .toString();
  const isMessage = useSelector((state) => state.ui.showNotification);
  const isMobile = useSelector((state) => state.ui.isMobile);
  const backToUsersHandler = () => dispatch(uiAction.onToggleChat(true));

  useEffect(() => {
    !isHome && messageRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages, isHome, selectedUser]);

  useEffect(() => {
    dispatch(appAction.setSelectedUserUid(selectedUserUid));
    dispatch(appAction.setSelectedUserPhotoURL(selectedUserPhotoURL));
    dispatch(appAction.setSelectedProviderId(selectedProviderId));
  }, [
    selectedUser,
    selectedUserUid,
    dispatch,
    selectedUserPhotoURL,
    selectedProviderId,
  ]);

  return (
    <section className={classes.chat}>
      <div className={`${!isMobile && classes.hide}`}>
        <Users />
      </div>
      {isHome && (
        <div className={`${classes["home-page"]} ${isMobile && classes.hide}`}>
          <img src={require("../../assets/icon/chat.png")} alt="Chat icon" />
          <p>Select user to open conversation!</p>
        </div>
      )}
      {!isHome && (
        <div className={`${classes["chat-box"]} ${isMobile && classes.hide}`}>
          <div className={classes.head}>
            <div className={classes["user-block"]}>
              <div className="hero">
                <img
                  className={classes.avatar}
                  src={selectedUserPhotoURL}
                  alt="Avatar"
                />
                {isOnline && <span className="online" />}
              </div>
              <h2 className={classes.name}>{selectedUserName}</h2>
            </div>
            <img
              className={classes.arrow}
              src={require("../../assets/icon/back-arrow.png")}
              alt="Back arrow"
              onClick={backToUsersHandler}
            />
          </div>
          <div className={classes["messages-block"]}>
            <Messages />
            <div ref={messageRef} />
          </div>
          <div>
            <AddForm />
          </div>
        </div>
      )}
      {isMessage && <MessageNotification />}
    </section>
  );
};

export default Chat;
