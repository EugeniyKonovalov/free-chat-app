import { Navigate, Route, Routes } from "react-router-dom";
import {
  CHAT_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  NOT_ROUTE,
} from "../../utils/router-constants";
import { privateRoute, publicRoute } from "./routes";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

const AppRouter = () => {
  const [user] = useAuthState(auth);
  const redirect = {
    path: NOT_ROUTE,
    element: <Navigate replace to={(user && HOME_ROUTE) || LOGIN_ROUTE} />,
  };

  return (
    <>
      {user && (
        <Routes>
          {privateRoute.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
          <Route {...redirect} />
        </Routes>
      )}
      {!user && (
        <Routes>
          {publicRoute.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
          <Route {...redirect} />
        </Routes>
      )}
    </>
  );
};

export default AppRouter;
