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
  id: "",
  is_specialist: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.email_active = action.payload.user_auth.email_active;
      state.image = action.payload.image;
      state.name = action.payload.name;
      state.phone = action.payload.phone;
      state.role = action.payload.role;
      state.token = action.payload.user_auth.token;
      state.isloggedin = true;
      state.governorate = action.payload.user_location.governorate;
      state.country = action.payload.user_location.country;
      state.is_specialist = action.payload.is_specialist;
    },
    setLogOut: (state) => {
      state.email = "";
      state.id = "";
      state.email_active = "";
      state.image = "";
      state.name = "";
      state.phone = "";
      state.role = "";
      state.token = "";
      state.isloggedin = false;
      state.governorate = "";
      state.country = "";
      state.is_specialist = false;
    },
    setSpecialist: (state) => {
      state.is_specialist = true;
    },
  },
});

export const { setLogin, setLogOut, setSpecialist } = authSlice.actions;

export default authSlice.reducer;
