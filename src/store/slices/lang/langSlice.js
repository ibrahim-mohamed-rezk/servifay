import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lang: localStorage.getItem("lang") || "en",
};

export const langSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLang: (state, action) => {
      state.lang = action.payload.lang;
    },
  },
});

export const { setLang } = langSlice.actions;

export default langSlice.reducer;
