import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    chatOpen: false,
    mobileMenuOpen: false,
  },
  reducers: {
    toggleChat: (state) => {
      state.chatOpen = !state.chatOpen;
    },
    setChatOpen: (state, action) => {
      state.chatOpen = action.payload;
    },
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    closeMobileMenu: (state) => {
      state.mobileMenuOpen = false;
    },
  },
});

export const { toggleChat, setChatOpen, toggleMobileMenu, closeMobileMenu } = uiSlice.actions;
export default uiSlice.reducer;
