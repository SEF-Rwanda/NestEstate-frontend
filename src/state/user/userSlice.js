import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import jwt_decode from "jwt-decode";

const baseAPIUrl = "/api/v1";

export const signup = createAsyncThunk("user/signup", async (newUserData) => {
  const response = await axios.post(`${baseAPIUrl}/users/signup`, newUserData);
  const token = response.data.data.token;
  localStorage.setItem("verificationToken", token);
  return response.data;
});

export const login = createAsyncThunk("user/login", async (userCredentials) => {
  const response = await axios.post(
    `${baseAPIUrl}/users/login`,
    userCredentials
  );
  const token = response.data.token;
  localStorage.setItem("token", token);
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

const token = localStorage.getItem("token");
let usr = null;
if (token) {
  usr = jwt_decode(token);
}
export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",

  async ({ firstName, lastName }, thunkAPI) => {
    try {
      const response = await axios.put(
        `${baseAPIUrl}/users/profile/${usr._id}`,
        {
          firstName,
          lastName,
        }
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async () => {
    const token = localStorage.getItem("token");
    let user = null;
    if (token) {
      user = jwt_decode(token);
    }

    const response = await axios.get(`${baseAPIUrl}/users/profile/${user._id}`);

    return response.data.data;
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
    verifyResult: null,
    userUpdated: {},
    userProfile: null,
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
      .addCase(verifyAccount.fulfilled, (state, action) => {
        state.isVerifyLoading = false;
        state.isVerifySuccess = true;
        state.verifyResult = action.payload;
        state.verifyError = null;
      })
      .addCase(verifyAccount.rejected, (state, action) => {
        state.isVerifyLoading = false;
        state.isVerifySuccess = false;
        state.verifyError = action.error.message;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.userUpdated = {};
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.userUpdated = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.userUpdated = {};
        state.error = action.error.message;
      })
      .addCase(login.pending, (state, action) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message;
      })
      .addCase(getUserProfile.pending, (state, action) => {
        state.loading = true;
        state.success = false;
        state.userProfile = null;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.userProfile = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.userProfile = null;
        state.error = action.error.message;
      });
  },
});

export const selectSuccess = (state) => state.user.success;
export const selectLoading = (state) => state.user.loading;
export const selectUpdated = (state) => state.user.userUpdated;
export const selectError = (state) => state.user.error;

export default userSlice.reducer;
