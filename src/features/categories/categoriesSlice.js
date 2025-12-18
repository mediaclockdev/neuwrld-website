import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, ALL_APi_LIST } from "../../api/apiList";

/* -----------------------------------------
   FETCH CATEGORIES
------------------------------------------ */
export const fetchCategoriesAPI = createAsyncThunk(
  "category/fetchCategoriesAPI",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`${BASE_URL}${ALL_APi_LIST.allCategories}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to fetch categories");
      }

      return data?.data?.categories_nested || [];
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    list: [],
    categories: [],
    breadcrumb: [], // 👈 breadcrumb path
    loading: false,
    error: null,
  },

  reducers: {
    /* -----------------------------------------
       SET BREADCRUMB PATH
    ------------------------------------------ */
    setBreadcrumb: (state, action) => {
      state.breadcrumb = action.payload;
    },

    clearBreadcrumb: (state) => {
      state.breadcrumb = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategoriesAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
        state.list = action.payload;
      })
      .addCase(fetchCategoriesAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setBreadcrumb, clearBreadcrumb } = categorySlice.actions;

export default categorySlice.reducer;
