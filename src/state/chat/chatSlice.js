import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
export const createChat = createAsyncThunk(
  "chat/createChat",
  async (chatData) => {
    const response = await axios.post(`${baseAPIUrl}/chats`, chatData, config);
    return response.data.data;
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    isFetchingChatsLoading: false,
    isFetchingChatsSuccess: false,
    isFetchingChatsFailed: false,
    fetchingChatsError: null,
    isCreateChatLoading: false,
    isCreateChatSuccess: false,
    isCreateChatFailed: false,
    createChatsError: null,
    chats: [],
    selectedChat: null,
    notifications: [],
  },
  reducers: {
    resetSelectedChat: (state) => {
      state.selectedChat = null;
    },
    setAllChats: (state, action) => {
      state.chats = [...state.action, action.period];
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    resetIsCreateChatSuccess: (state) => {
      state.isCreateChatSuccess = false;
    },
  },
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
      })
      .addCase(createChat.pending, (state) => {
        state.isCreateChatLoading = true;
        state.isCreateChatSuccess = false;
        state.isCreateChatFailed = false;
        state.error = null;
        state.selectedChat = null;
      })
      .addCase(createChat.fulfilled, (state, action) => {
        state.isCreateChatLoading = false;
        state.isCreateChatSuccess = true;
        state.isCreateChatFailed = false;
        state.error = null;
        state.selectedChat = action.payload;
      })
      .addCase(createChat.rejected, (state, action) => {
        state.isCreateChatLoading = false;
        state.isCreateChatSuccess = false;
        state.isCreateChatFailed = true;
        state.error = action.error.message;
        state.selectedChat = null;
      });
  },
});

export const {
  setAllChats,
  resetSelectedChat,
  setNotifications,
  resetIsCreateChatSuccess,
} = chatSlice.actions;
export default chatSlice.reducer;
