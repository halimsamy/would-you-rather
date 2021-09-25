import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { getUsers } from "../api";
import { addQuestion, answerQuestion } from "./questions";

const initialState = {};

export const fetchUsers = createAsyncThunk(
  "users/fetchAll",
  async (payload, thunkAPI) => {
    return await getUsers();
  }
);

const users = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (users, action) => {
      Object.assign(users, action.payload);
    });

    builder.addCase(addQuestion.fulfilled, (users, action) => {
      const { author, id } = action.payload;
      users[author].questions.push(id);
    });

    builder.addCase(answerQuestion.fulfilled, (users, action) => {
      const { authedUser, id, answer } = action.payload;
      users[authedUser].answers[id] = answer;
    });
  },
});

export const selectUsers = (state) => state.users;

export const selectUserById = (id) => (state) => state.users[id];

export const {} = users.actions;
export default users.reducer;
