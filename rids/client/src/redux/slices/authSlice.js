import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("rids_user");

const initialState = {
  user: storedUser ? JSON.parse(storedUser) : null,
  token: localStorage.getItem("rids_token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, ...user } = action.payload;
      state.user = user;
      state.token = token;
      localStorage.setItem("rids_token", token);
      localStorage.setItem("rids_user", JSON.stringify(user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("rids_token");
      localStorage.removeItem("rids_user");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
