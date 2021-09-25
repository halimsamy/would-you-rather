import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getQuestions, saveQuestion, saveQuestionAnswer } from "../api";

const initialState = {};

export const fetchQuestions = createAsyncThunk(
  "questions/fetchAll",
  async (payload, thunkAPI) => {
    return await getQuestions();
  }
);

export const addQuestion = createAsyncThunk(
  "questions/add",
  async (payload, thunkAPI) => {
    return await saveQuestion({
      ...payload,
      author: thunkAPI.getState().auth.userId,
    });
  }
);

export const answerQuestion = createAsyncThunk(
  "questions/answer",
  async (payload, thunkAPI) => {
    const payloadWithUser = {
      ...payload,
      authedUser: thunkAPI.getState().auth.userId,
    };

    await saveQuestionAnswer(payloadWithUser);

    return payloadWithUser;
  }
);

const questions = createSlice({
  name: "questions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchQuestions.fulfilled, (questions, action) => {
      Object.assign(questions, action.payload);
    });

    builder.addCase(addQuestion.fulfilled, (questions, action) => {
      questions[action.payload.id] = action.payload;
    });

    builder.addCase(answerQuestion.fulfilled, (questions, action) => {
      const { authedUser, id, answer } = action.payload;
      questions[id][answer].votes.push(authedUser);
    });
  },
});

export const selectQuestions = (state) => state.questions;

export const selectQuestionById = (id) => (state) => state.questions[id];

export const answeredBy = (question, userId) =>
  question.optionOne.votes.includes(userId) ||
  question.optionTwo.votes.includes(userId);

export const {} = questions.actions;
export default questions.reducer;
