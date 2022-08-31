import React from "react";
import { useSelector } from "react-redux";
import UserItem from "./UserItem";
import classes from "./Users.module.css";
import MainUser from "./MainUser";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
const Users = () => {
  const [user] = useAuthState(auth);
  const users = useSelector((state) => state.app.users);
  const filteredUsers = useSelector((state) => state.app.filteredUsers);
  const isSearch = useSelector((state) => state.ui.isSearch);
  const messages = useSelector((state) => state.app.messages);
  const sortMessages = [...messages]
    .sort((a, b) => a.createdAt - b.createdAt)
    .reverse()
    .map((item) => item)
    .filter((item) => item.providerId !== user.providerId);
  const sortLastMessageUsers = [
    ...new Set(
      sortMessages.map(({ uid }) => users.find((item) => item.uid === uid))
    ),
  ];
  const sortUsers = [...users].sort((a, b) =>
    a.displayName > b.displayName ? 1 : -1
  );
  const lastMessageUsers = [
    ...new Set([...sortLastMessageUsers, ...sortUsers]),
  ];

  return (
    <section className={classes["users-block"]}>
      <MainUser />
      <div className={classes["users-box"]}>
        <h4 className={classes.heading}>Chats</h4>
        <ul className={classes.users}>
          {(!isSearch ? lastMessageUsers : filteredUsers).map((item) => (
            <UserItem key={item.uid} item={item} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Users;
