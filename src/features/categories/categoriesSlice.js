import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, ALL_APi_LIST } from "../../api/apiList";

export const fetchCategoriesAPI = createAsyncThunk(
  "categories/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`${BASE_URL}${ALL_APi_LIST.allCategories}`);
      const response = await res.json();

      if (!res.ok) return thunkAPI.rejectWithValue(response);

      return response.data?.categories_nested || [];
    } catch (err) {
      return thunkAPI.rejectWithValue("Network Error");
    }
  }
);

const categoriesSlice = createSlice({
  name: "allCategories",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategoriesAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCategoriesAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categoriesSlice.reducer;
