import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import jwt_decode from "jwt-decode";

const baseAPIUrl = "/api/v1";
const token = localStorage.getItem("token");

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
export const getAllChats = createAsyncThunk("chat/getAllChats", async () => {
  const response = await axios.get(`${baseAPIUrl}/chats`, config);
  return response.data.data;
});

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    isFetchingChatsLoading: false,
    isFetchingChatsSuccess: false,
    isFetchingChatsFailed: false,
    fetchingChatsError: null,
    chats: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllChats.pending, (state) => {
        state.isFetchingChatsLoading = true;
        state.isFetchingChatsSuccess = false;
        state.isFetchingChatsFailed = false;
        state.error = null;
        state.chats = [];
      })
      .addCase(getAllChats.fulfilled, (state, action) => {
        state.isFetchingChatsLoading = false;
        state.isFetchingChatsSuccess = true;
        state.isFetchingChatsFailed = false;
        state.error = null;
        state.chats = action.payload;
      })
      .addCase(getAllChats.rejected, (state, action) => {
        state.isFetchingChatsLoading = false;
        state.isFetchingChatsSuccess = false;
        state.isFetchingChatsFailed = true;
        state.error = action.error.message;
        state.chats = [];
      });
  },
});

export default chatSlice.reducer;
