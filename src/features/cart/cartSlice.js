/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, ALL_APi_LIST } from "../../api/apiList";

// Helper: auto logout on token expired
const handleTokenError = (data, thunkAPI) => {
  if (data?.message?.toLowerCase().includes("token")) {
    localStorage.removeItem("token");
    return thunkAPI.rejectWithValue("TOKEN_EXPIRED");
  }
  return thunkAPI.rejectWithValue(data);
};

// --------------------------------------------------
// ADD TO CART
// --------------------------------------------------
export const addToCartAPI = createAsyncThunk(
  "cart/addToCartAPI",
  async (payload, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return thunkAPI.rejectWithValue("NOT_LOGGED_IN");

      const res = await fetch(`${BASE_URL}${ALL_APi_LIST.addToCart}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) return handleTokenError(data, thunkAPI);

      thunkAPI.dispatch(fetchCartAPI());
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Network Error");
    }
  }
);

// --------------------------------------------------
// FETCH CART
// --------------------------------------------------
export const fetchCartAPI = createAsyncThunk(
  "cart/fetchCartAPI",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`${BASE_URL}${ALL_APi_LIST.getCart}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();

      // Handle token expired
      if (data?.message === "Token expired") {
        localStorage.removeItem("token");
        return thunkAPI.rejectWithValue("TOKEN_EXPIRED");
      }

      if (!res.ok) return thunkAPI.rejectWithValue(data);

      // Return EXACT structure needed by Redux slice
      return {
        items: data?.data?.cart_items || [],
        summary: data?.data?.cart_summary || {},
      };
    } catch (err) {
      return thunkAPI.rejectWithValue("Network Error");
    }
  }
);

// --------------------------------------------------
// REMOVE FROM CART
// --------------------------------------------------
export const removeFromCartAPI = createAsyncThunk(
  "cart/removeFromCartAPI",
  async (product_variant_id, thunkAPI) => {
    try {
      const res = await fetch(`${BASE_URL}${ALL_APi_LIST.removeCart}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ product_variant_id }),
      });

      const data = await res.json();
      if (!res.ok) return handleTokenError(data, thunkAPI);

      thunkAPI.dispatch(fetchCartAPI());
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Network Error");
    }
  }
);

// --------------------------------------------------
// UPDATE QUANTITY
// --------------------------------------------------
export const updateQuantityAPI = createAsyncThunk(
  "cart/updateQuantityAPI",
  async ({ product_variant_id, quantity }, thunkAPI) => {
    try {
      const res = await fetch(`${BASE_URL}${ALL_APi_LIST.updateQuantity}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ product_variant_id, quantity }),
      });

      const data = await res.json();
      if (!res.ok) return handleTokenError(data, thunkAPI);

      thunkAPI.dispatch(fetchCartAPI());
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Network Error");
    }
  }
);

// --------------------------------------------------
// CART SLICE
// --------------------------------------------------
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    summary: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.summary = action.payload.summary;
      })

      .addCase(fetchCartAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;

        if (action.payload === "TOKEN_EXPIRED") {
          state.items = [];
          state.summary = null;
        }
      });
  },
});

export default cartSlice.reducer;
