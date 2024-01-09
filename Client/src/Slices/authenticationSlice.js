import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: (() => {
    try {
      return JSON.parse(localStorage.getItem("userInfo")) || null;
    } catch (error) {
      console.error("Error parsing userInfo from localStorage:", error);
      return null;
    }
  })(),
  adminInfo: (() => {
    try {
      return JSON.parse(localStorage.getItem("adminInfo")) || null;
    } catch (error) {
      console.error("Error parsing userInfo from localStorage:", error);
      return null;
    }
  })(),
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setUserCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },

    setAdminCredentials: (state, action) => {
      state.adminInfo = action.payload;
      localStorage.setItem("adminInfo", JSON.stringify(action.payload));
    },

    userLogout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },

    adminLogout: (state, action) => {
      state.adminInfo = null;
      localStorage.removeItem("adminInfo");
    },
  },
});

export const {
  setUserCredentials,
  setAdminCredentials,
  userLogout,
  adminLogout,
} = authenticationSlice.actions;
export default authenticationSlice.reducer;
