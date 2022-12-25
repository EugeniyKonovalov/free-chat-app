import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBOI1iWH47W0T3D8qhINsAlDpJjXoVoHic",
  authDomain: "chat-new-3f4a0.firebaseapp.com",
  databaseURL: "https://chat-new-3f4a0-default-rtdb.firebaseio.com",
  projectId: "chat-new-3f4a0",
  storageBucket: "chat-new-3f4a0.appspot.com",
  messagingSenderId: "616089502927",
  appId: "1:616089502927:web:f82a94e2f16bc78b6823ba",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
