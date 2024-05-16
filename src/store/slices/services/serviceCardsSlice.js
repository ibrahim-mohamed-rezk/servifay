import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import backendURL from "../../../axios/backend";

export const fetchServiceCard = createAsyncThunk(
  "services/fetchServiceCard",
  async (path) => {
    const response = await backendURL.get(`/services/${path}`);
    return response.data.data;
  }
);

const initialState = {
  data: [],
};

export const servicCardSlice = createSlice({
  name: "serviceCard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchServiceCard.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(fetchServiceCard.rejected, (state, action) => {
      state.data = "not found";
    });
    builder.addCase(fetchServiceCard.pending, (state, action) => {
      state.data = "loading";
    });
  },
});

export default servicCardSlice.reducer;
