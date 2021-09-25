import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userId = action.payload;
    },

    logout: (state) => {
      state.userId = null;
    },
  },
});

export const selectAuthUserId = (state) => state.auth.userId;

export const selectIsAuth = (state) => selectAuthUserId(state) !== null;

export const selectAuthUser = (state) => state.users[selectAuthUserId(state)];

export const { login, logout } = auth.actions;
export default auth.reducer;
