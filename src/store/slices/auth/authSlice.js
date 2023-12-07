import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  email_active: "",
  image: "",
  name: "",
  phone: "",
  role: "",
  token: "",
  isloggedin: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.email = action.payload.email;
      state.email_active = action.payload.email_active;
      state.image = action.payload.image;
      state.name = action.payload.name;
      state.phone = action.payload.phone;
      state.role = action.payload.role;
      state.token = action.payload.token;
      state.isloggedin = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLogin } = authSlice.actions;

export default authSlice.reducer;
