import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSearch: false,
  showModal: false,
  notification: null,
  showNotification: false,
  isMobile: false,
};

const uiSllice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setIsSearch: (state, action) => {
      state.isSearch = action.payload;
    },
    onToggleModal: (state) => {
      state.showModal = !state.showModal;
    },
    onToggleNotification: (state, action) => {
      state.showNotification = action.payload;
    },
    onToggleChat: (state, action) => {
      state.isMobile = action.payload;
    },
    showErrors: (state, action) => {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
    closeErrors: (state) => {
      state.notification = null;
    },
  },
});

export const uiAction = uiSllice.actions;

export default uiSllice.reducer;
