import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  token: "",
  isLoggedIn: false,
  email: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.idToken;
      state.isLoggedIn = !!action.payload.idToken;
      state.email = action.payload.email;
    },
    logout: () => {
      return initialState;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
