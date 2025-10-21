import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    signInStart: (state) => {
      (state.loading = true), (state.error = null);
    },
    signInSuccess: (state, action) => {
      (state.currentUser = action.payload),
        (state.loading = false),
        (state.error = null);
    },
    signInFailure: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
    signUpStart: (state) => {
      (state.loading = true), (state.error = null);
    },
    signUpSuccess: (state) => {
      (state.loading = false), (state.error = null);
    },
    signUpFailure: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
    signoutSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    clearAuthentication: (state) => {
      state.currentUser = null; // Clear the user's authentication data
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signUpStart,
  signUpSuccess,
  signUpFailure,
  signoutSuccess,
  clearAuthentication,
} = authenticationSlice.actions;

export default authenticationSlice.reducer;
