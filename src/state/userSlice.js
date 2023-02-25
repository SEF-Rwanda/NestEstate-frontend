import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * @description This is a slice of the store that holds the state related to user.
 *
 */

const initialState = {
  createUserLoading: false,
  createUserError: "",
};

export const UserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    createUser: (state) => {
          state.createUserLoading = true;
          
    },
  },
});

export const { createUser } = UserSlice.actions;

export default UserSlice.reducer;
