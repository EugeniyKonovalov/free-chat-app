import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  filteredUsers: [],
  messages: [],
  selectedUserName: null,
  selectedUserUid: null,
  selectedUserPhotoURL: null,
  selectedProviderId: null,
  notificationMessage: {},
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setFilteredUsers: (state, action) => {
      state.filteredUsers = action.payload;
    },
    addMessagesAsync: (state, action) => {},
    addMessages: (state, action) => {
      state.messages.push(action.payload);
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setSelectedUserName: (state, action) => {
      state.selectedUserName = action.payload;
    },
    setSelectedUserUid: (state, action) => {
      state.selectedUserUid = action.payload;
    },
    setSelectedUserPhotoURL: (state, action) => {
      state.selectedUserPhotoURL = action.payload;
    },
    setSelectedProviderId: (state, action) => {
      state.selectedProviderId = action.payload;
    },
    setNotificationMessage: (state, action) => {
      state.notificationMessage = action.payload;
    },
  },
});

export const appAction = appSlice.actions;

export default appSlice.reducer;
