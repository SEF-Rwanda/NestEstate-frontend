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
export const getAllMessage = createAsyncThunk(
  "chat/getAllMessage",
  async (id) => {
    const response = await axios.get(`${baseAPIUrl}/messages/${id}`, config);
    return response.data.data;
  }
);

export const messageSlice = createSlice({
  name: "message",
  initialState: {
    isFetchingMsgLoading: false,
    isFetchingMsgSuccess: false,
    isFetchingMsgFailed: false,
    msgError: null,
    messages: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllMessage.pending, (state) => {
        state.isFetchingMsgLoading = true;
        state.isFetchingMsgSuccess = false;
        state.isFetchingMsgFailed = false;
        state.msgError = null;
        state.messages = [];
      })
      .addCase(getAllMessage.fulfilled, (state, action) => {
        state.isFetchingMsgLoading = false;
        state.isFetchingMsgSuccess = true;
        state.isFetchingMsgFailed = false;
        state.msgError = null;
        state.messages = action.payload;
      })
      .addCase(getAllMessage.rejected, (state, action) => {
        state.isFetchingMsgLoading = false;
        state.isFetchingMsgSuccess = false;
        state.isFetchingMsgFailed = true;
        state.msgError = action.error.message;
        state.messages = [];
      });
  },
});

export default messageSlice.reducer;
