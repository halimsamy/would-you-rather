import { configureStore } from "@reduxjs/toolkit";
import {
  loadingBarReducer,
  loadingBarMiddleware,
} from "react-redux-loading-bar";
import authReducer from "./auth";
import usersReducer from "./users";
import questionsReducer from "./questions";
import uiReducer from "./ui";

export default configureStore({
  reducer: {
    loadingBar: loadingBarReducer,
    users: usersReducer,
    auth: authReducer,
    questions: questionsReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    loadingBarMiddleware({
      promiseTypeSuffixes: ["pending", "fulfilled", "rejected"],
    }),
  ],
});
