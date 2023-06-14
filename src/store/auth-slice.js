import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  loggedInUser: null, // Add loggedInUser property
  allowedUsers: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.loggedInUser = action.payload; // Set the logged-in user
    },
    logout(state) {
      state.isLoggedIn = false;
      state.loggedInUser = null; // Clear the logged-in user
    },
    setAllowedUsers: (state, action) => {
      state.allowedUsers = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
