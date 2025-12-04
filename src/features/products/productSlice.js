/* productSlice.js */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ALL_APi_LIST, BASE_URL } from "../../api/apiList";

export const fetchProductDetails = createAsyncThunk(
  "product/fetchDetails",
  async (productId, thunkAPI) => {
    if (!productId) return thunkAPI.rejectWithValue("No productId provided");
    const safeId = encodeURIComponent(productId);
    const url = `${BASE_URL}${ALL_APi_LIST.product_details}/${safeId}`; // <-- path param
    console.log("CALLING PRODUCT DETAILS API →", url);

    try {
      const res = await fetch(url);

      // If server returns non-JSON 404 page, .json() might throw. handle it:
      if (!res.ok) {
        let errBody = null;
        try {
          errBody = await res.json();
        } catch (e) {
          errBody = await res.text();
        }
        return thunkAPI.rejectWithValue(errBody || `HTTP ${res.status}`);
      }

      const json = await res.json();
      return json; // keep full payload; reducer can store json.data or json as needed
    } catch (err) {
      return thunkAPI.rejectWithValue("Network Error: " + String(err));
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    product: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.product = null;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        // API returns { success:true, message:..., data: { product: {...}, ... } }
        // store whatever you need — here I'm storing whole payload in product
        state.product = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch product";
      });
  },
});

export default productSlice.reducer;
