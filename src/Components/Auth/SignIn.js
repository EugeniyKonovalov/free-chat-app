import React from "react";
import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import classes from "./SignIn.module.css";

const SignIn = () => {
  const provider = new GoogleAuthProvider();
  const loginHandler = async () => {
    await signInWithPopup(auth, provider);
  };

  return (
    <section className={classes["section-auth"]}>
      <button className={classes.auth} onClick={loginHandler}>
        Sign in with Google
      </button>
    </section>
  );
};

export default SignIn;
