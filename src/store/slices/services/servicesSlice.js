import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import backendURL from "../../../axios/backend";

export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async () => {
    const response = await backendURL.get("/services");
    return response.data.data;
  }
);

const initialState = {
  data: [],
};

export const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchServices.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export default servicesSlice.reducer;
