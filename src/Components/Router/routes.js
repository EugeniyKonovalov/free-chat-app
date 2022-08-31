import {
  CHAT_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
} from "../../utils/router-constants";
import Login from "../../Pages/Login";
import Home from "../../Pages/Home";
import Chat from "../Chat/Chat";

export const publicRoute = [
  {
    path: LOGIN_ROUTE,
    element: <Login />,
  },
];

export const privateRoute = [
  {
    path: HOME_ROUTE,
    element: <Home />,
  },
  {
    path: CHAT_ROUTE + ":userName",
    element: <Chat />,
  },
];
