import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    search: "",
    category: [],
    sortBy: "",
    pageNumber: 1,
    itemsPerPage: 4,
  },
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.data = action.payload;
    },
    setSearch: (state, action) => {
      state.data.search = action.payload;
    },
  },
});

export const { setFilters, setSearch } = filtersSlice.actions;
export default filtersSlice.reducer;
