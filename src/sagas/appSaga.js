import { call, put, takeEvery } from "redux-saga/effects";
import { appAction } from "../store/appSlice";
import axios from "axios";
import { apiUrl } from "../App";

function* addMessagesAsync(action) {
  try {
    const addMessage = async () =>
      await axios({
        method: "post",
        url: `${apiUrl}messages.json`,
        data: action.payload,
        headers: {
          "Content-Type": "aplication/json",
        },
      });
    yield call(addMessage);
    yield put(appAction.addMessages(action.payload));
  } catch (err) {
    throw Error(err);
  }
}

function* appSaga() {
  yield takeEvery(appAction.addMessagesAsync, addMessagesAsync);
}
export default appSaga;
