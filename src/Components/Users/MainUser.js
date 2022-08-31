import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import SearchForm from "../Form/SearchForm";
import classes from "./MainUser.module.css";

const MainUser = () => {
  const [user] = useAuthState(auth);

  return (
    <div className={classes.head}>
      <div className={classes["main-user"]}>
        <img className={classes.avatar} src={user.photoURL} alt="User avatar" />
        <h2 className={classes.name}>{user.displayName}</h2>
      </div>
      <SearchForm />
    </div>
  );
};

export default MainUser;
