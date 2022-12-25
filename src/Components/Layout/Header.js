import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import classes from "./Header.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { HOME_ROUTE } from "../../utils/router-constants";
import { useDispatch, useSelector } from "react-redux";
import { uiAction } from "../../store/uiSlice";

const Header = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const isMobile = useSelector((state) => state.ui.isMobile);
  const isHome = location.pathname === "/home" && isMobile;
  const isUser = location.pathname.includes("chat");

  const logoutHandler = () => signOut(auth);

  const homeRouteHandler = () => {
    dispatch(uiAction.onToggleChat(false));
    navigate(HOME_ROUTE, { replace: true });
  };
  const showUsersHandler = () => dispatch(uiAction.onToggleChat(true));

  return (
    <header className={classes["header-section"]}>
      <nav className={classes.header}>
        <h2 className={classes.logo} onClick={homeRouteHandler}>
          Free Chat
        </h2>

        {user && (
          <>
            {!isUser && (
              <button
                className={`${classes["users-btn"]} ${isHome && classes.hide}`}
                onClick={showUsersHandler}
              >
                Users
              </button>
            )}

            <button className={classes["auth-btn"]} onClick={logoutHandler}>
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
