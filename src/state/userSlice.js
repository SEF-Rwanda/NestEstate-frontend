import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseAPIUrl = "http://localhost:5000/api/v1";

/**
 * @description This is a slice of the store that holds the state related to user.
 *
 */

const initialState = {
  isCreateUserLoading: false,
  createUserError: "",
  isCreateUserSuccess: false,
};

export const UserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    createUser: async (state, action) => {
      try {
        const { data } = await axios.post(`${baseAPIUrl}/users/signup`, {
          ...action.payload,
        });
        const token = data.data.token;
        state.isCreateUserSuccess = true;

        localStorage.setItem("verificationToken", token);
      } catch (error) {
        console.log(error);
      }
    },
  },
});

export const { createUser } = UserSlice.actions;

export default UserSlice.reducer;
