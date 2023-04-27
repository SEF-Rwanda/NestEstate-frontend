import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseAPIUrl = "/api/v1";
const token = localStorage.getItem("token");

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const createPreference = createAsyncThunk(
  "preference/createPreference",
  async (preferenceData) => {
    const response = await axios.post(
      `${baseAPIUrl}/preferences`,
      preferenceData,
      config
    );
    return response.data.data;
  }
);

export const preferenceSlice = createSlice({
  name: "preference",
  initialState: {
    loading: false,
    success: false,
    error: "",
    preference: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPreference.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createPreference.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.preference = action.payload;
      })
      .addCase(createPreference.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message;
      });
  },
});

export default preferenceSlice.reducer;
