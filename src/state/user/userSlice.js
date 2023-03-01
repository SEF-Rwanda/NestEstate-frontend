import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseAPIUrl = "http://localhost:5000/api/v1";

export const signup = createAsyncThunk("user/signup", async (newUserData) => {
  const response = await axios.post(`${baseAPIUrl}/users/signup`, newUserData);
  const token = response.data.data.token;
  localStorage.setItem("verificationToken", token);
  return response.data;
});

export const verifyAccount = createAsyncThunk(
  "user/verifyAccount",
  async (verificationData) => {
    const token = localStorage.getItem("verificationToken");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(
      `${baseAPIUrl}/users/verifyEmail`,
      verificationData,
      config
    );
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    success: false,
    error: null,
    isVerifyLoading: false,
    isVerifySuccess: false,
    verifyError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message;
      })
      .addCase(verifyAccount.pending, (state) => {
        state.isVerifyLoading = true;
        state.isVerifySuccess = false;
        state.verifyError = null;
      })
      .addCase(verifyAccount.fulfilled, (state) => {
        state.isVerifyLoading = false;
        state.isVerifySuccess = true;
        state.verifyError = null;
      })
      .addCase(verifyAccount.rejected, (state, action) => {
        state.isVerifyLoading = false;
        state.isVerifySuccess = false;
        state.verifyError = action.error.message;
      });
  },
});

export const selectSuccess = (state) => state.user.success;
export const selectLoading = (state) => state.user.loading;
export const selectError = (state) => state.user.error;

export default userSlice.reducer;
