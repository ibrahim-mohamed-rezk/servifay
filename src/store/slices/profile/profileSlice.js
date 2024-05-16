import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import backendURL from "../../../axios/backend";

export const fetchProfile = createAsyncThunk(
  "services/fetchProfile",
  async (userId) => {
    const response = await backendURL.get(`/specialist/${userId}`, {
      headers: {
        Authorization:
          "690Odqhk553hrir5SdpLNLJI8AjifP1JqIAHqnO5EPZrWn1Nrzg0RgVdcJIOCtxq",
      },
    });
    return response.data.data;
  }
);

const initialState = {
  data: [],
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(fetchProfile.rejected, (state, action) => {
      state.data = "not found";
    });
    builder.addCase(fetchProfile.pending, (state, action) => {
      state.data = "loading";
    });
  },
});

export default profileSlice.reducer;
