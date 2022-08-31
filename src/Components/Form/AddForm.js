import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { appAction } from "../../store/appSlice";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import classes from "./AddForm.module.css";
import { uiAction } from "../../store/uiSlice";

const AddForm = () => {
  const [message, setMessage] = useState("");
  const [messageChuck, setMessageChuck] = useState("");
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);
  const selectedUserName = useSelector((state) => state.app.selectedUserName);
  const selectedUserUid = useSelector((state) => state.app.selectedUserUid);
  const selectedProviderId = useSelector(
    (state) => state.app.selectedProviderId
  );
  const selectedUserPhotoURL = useSelector(
    (state) => state.app.selectedUserPhotoURL
  );
  const messages = useSelector((state) => state.app.messages);
  const chuckSendMessage = {
    id: uuidv4(),
    uid: selectedUserUid,
    providerId: selectedProviderId,
    displayName: selectedUserName,
    photoURL: selectedUserPhotoURL,
    text: messageChuck,
    chatWith: selectedUserName,
    createdAt: Date.now(),
  };

  const responseFromChuckNorris = useCallback(async () => {
    await axios(`https://api.chucknorris.io/jokes/random`)
      .then(({ data }) => {
        setMessageChuck(data.value);
      })
      .catch((err) =>
        dispatch(
          uiAction.showErrors({
            status: "error",
            title: "Error",
            message: `Something went wrong with Chuck! ${err.message}`,
          })
        )
      );
  }, [dispatch]);

  const messageSubmitHandler = (event) => {
    event.preventDefault();
    if (message === "") {
      return;
    }

    dispatch(
      appAction.addMessagesAsync({
        id: uuidv4(),
        uid: user.uid,
        providerId: user.providerId,
        photoURL: user.photoURL,
        text: message,
        chatWith: selectedUserName,
        createdAt: Date.now(),
      })
    );

    setTimeout(() => {
      dispatch(appAction.addMessagesAsync(chuckSendMessage));
      dispatch(uiAction.onToggleNotification(true));
      dispatch(appAction.setNotificationMessage(chuckSendMessage));
    }, 10000);
    setMessage("");
  };

  const closeNotificationHandler = () =>
    dispatch(uiAction.onToggleNotification(false));

  useEffect(() => {
    responseFromChuckNorris();
  }, [messages, responseFromChuckNorris]);

  return (
    <form onSubmit={messageSubmitHandler} className={classes.form}>
      <div className={classes.input} onClick={closeNotificationHandler}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className={classes.send}>
          <img src={require("../../assets/icon/send.png")} alt="Send icon" />
        </button>
      </div>
    </form>
  );
};

export default AddForm;
