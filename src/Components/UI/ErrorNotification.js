import React from "react";
import { useDispatch } from "react-redux";
import { uiAction } from "../../store/uiSlice";
import classes from "./ErrorNotification.module.css";
const ErrorNotification = (props) => {
  const dispatch = useDispatch();

  const onCloseErrorNotification = () => dispatch(uiAction.closeErrors());

  return (
    <>
      <div className={classes.error}>
        <img
          src={require("../../assets/icon/close.png")}
          alt="Close icon"
          onClick={onCloseErrorNotification}
        />
      </div>
      <h2 className={classes.title}>{props.title}</h2>
      <p className={classes.message}>{props.message}</p>
    </>
  );
};

export default ErrorNotification;
