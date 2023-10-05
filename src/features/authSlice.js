import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true; // Update the status to indicate that the user is logged in
      state.userData = action.payload.userData; // Update the user data with the provided data
    },

    logout: (state) => {
      state.status = false; // Set the status to false
      state.userData = null; // Clear the user data
    },
  },
});

export default authSlice.reducer;
export const { login, logout } = authSlice.actions;
