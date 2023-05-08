import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  todos: [],
  isLoading: false,
};

export const getTodos = createAsyncThunk("todo/getTodos", async () => {
  const res = await axios.get("http://localhost:8080/api/todos");
  const data = await res.data;

  return data;
});

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = action.payload;
      })
      .addCase(getTodos.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default todoSlice.reducer;
