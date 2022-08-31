import { useCallback, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { appAction } from "./store/appSlice";
import AppRouter from "./Components/Router/AppRouter";
import Layout from "./Components/Layout/Layout";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Loader from "./Components/UI/Loader";
import ErrorNotification from "./Components/UI/ErrorNotification";
import Modal from "./Components/UI/Modal";
import { uiAction } from "./store/uiSlice";
export const apiUrl = "https://chat-app-f4379-default-rtdb.firebaseio.com/";
function App() {
  const [, loading] = useAuthState(auth);
  const dispatch = useDispatch();
  const errorNotification = useSelector((state) => state.ui.notification);

  const fetchUsers = useCallback(async () => {
    await axios
      .get(`${apiUrl}users.json`)
      .then(({ data }) => {
        let usersData = [];
        for (const key in data) {
          usersData.push({
            uid: data[key].uid,
            displayName: data[key].displayName,
            photoURL: data[key].photoURL,
            providerId: data[key].providerId,
            isOnline: data[key].isOnline,
          });
        }
        dispatch(appAction.setUsers(usersData));
      })
      .catch((err) =>
        dispatch(
          uiAction.showErrors({
            status: "error",
            title: "Error",
            message: err.message,
          })
        )
      );
  }, [dispatch]);

  const fetchMessages = useCallback(async () => {
    await axios
      .get(`${apiUrl}messages.json`)
      .then(({ data }) => {
        let messagesData = [];
        for (const key in data) {
          messagesData.push({
            id: data[key].id,
            uid: data[key].uid,
            providerId: data[key].providerId,
            displayName: data[key].displayName,
            photoURL: data[key].photoURL,
            text: data[key].text,
            chatWith: data[key].chatWith,
            createdAt: data[key].createdAt,
          });
        }
        console.log(messagesData);
        dispatch(appAction.setMessages(messagesData));
      })
      .catch((err) =>
        dispatch(
          uiAction.showErrors({
            status: "error",
            title: "Error",
            message: err.message,
          })
        )
      );
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers();
      fetchMessages();
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [fetchUsers, fetchMessages]);

  return (
    <Layout>
      {loading && <Loader />}
      {errorNotification && (
        <Modal>
          <ErrorNotification
            status={errorNotification.status}
            title={errorNotification.title}
            message={errorNotification.message}
          />
        </Modal>
      )}
      {!loading && <AppRouter />}
    </Layout>
  );
}

export default App;
