import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_BASE}/todo`;

// ========================================
// Thunks
// ========================================
export const fetchTodos = createAsyncThunk("fetchTodos", async () => {
  const response = await axios.get(`${BASE_URL}/getall`);
  return response.data;
});

export const createTodo = createAsyncThunk("createTask", async (task) => {
  const response = await axios.post(`${BASE_URL}/create`, { task });
  return response.data;
});

export const deleteTodo = createAsyncThunk("deleteTodo", async (id) => {
  const response = await axios.delete(`${BASE_URL}/delete`, { data: { id } });
  return response.data;
});

export const completeTodo = createAsyncThunk("completeTodo", async (id) => {
  const response = await axios.post(`${BASE_URL}/complete`, { id });
  return response.data;
});

export const editTodo = createAsyncThunk("editTodo", async (data) => {
  const response = await axios.post(`${BASE_URL}/edit`, data);
  return response.data;
});

// ========================================
// Slice
// ========================================
const initialState = {
  isLoading: false,
  task: [],      // ✅ always an array
  isError: false,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch todos
      .addCase(fetchTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.task = action.payload.data || []; // ✅ extract array
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // Create todo
      .addCase(createTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTodo.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createTodo.rejected, (state) => {
        state.isError = true;
      })

      // Delete todo
      .addCase(deleteTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTodo.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteTodo.rejected, (state) => {
        state.isError = true;
      })

      // Complete todo
      .addCase(completeTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(completeTodo.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(completeTodo.rejected, (state) => {
        state.isError = true;
      })

      // Edit todo
      .addCase(editTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editTodo.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(editTodo.rejected, (state) => {
        state.isError = true;
      });
  },
});

export const taskReducer = taskSlice.reducer;
