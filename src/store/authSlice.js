import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: JSON.parse(localStorage.getItem("status")) || false,
  userData: JSON.parse(localStorage.getItem("userData")) || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
      // Save to localStorage
      localStorage.setItem("userData", JSON.stringify(action.payload.userData));
      localStorage.setItem("status", true);
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
      // Clear localStorage
      localStorage.removeItem("userData");
      localStorage.removeItem("status");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   status: localStorage.getItem("status"),
//   userData: localStorage.getItem("userData"),
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     login: (state, action) => {
//       state.status = true;
//       console.log(action.payload.userData);

//       state.userData = action.payload.userData;
//     },
//     logout: (state) => {
//       state.status = false;
//       state.userData = null;
//     },
//   },
// });
// export const { login, logout } = authSlice.actions;
// export default authSlice.reducer;
