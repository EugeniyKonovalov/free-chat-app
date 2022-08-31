import React from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";
import { useDispatch } from "react-redux";
import { uiAction } from "../../store/uiSlice";

const Backdrop = () => {
  const dispatch = useDispatch();
  const onCloseModalHandler = () => {
    dispatch(uiAction.onToggleModal());
  };
  return <div className={classes.backdrop} onClick={onCloseModalHandler} />;
};

const ModalOverlay = ({ children }) => {
  return <div className={classes["modal-overlay"]}>{children}</div>;
};

const portalElement = document.getElementById("overlay");

const Modal = ({ children }) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
