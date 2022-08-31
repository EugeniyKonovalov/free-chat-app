import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import appSlice from "./appSlice";
import appSaga from "../sagas/appSaga";
import uiSlice from "./uiSlice";

const sagaMidlleware = createSagaMiddleware();

const store = configureStore({
  reducer: { app: appSlice, ui: uiSlice },
  middleware: [sagaMidlleware],
});

sagaMidlleware.run(appSaga);

export default store;
