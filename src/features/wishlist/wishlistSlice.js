/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, ALL_APi_LIST } from "../../api/apiList";

/* -----------------------------------------
   Helper: Token Expiry Handler
------------------------------------------ */
const handleTokenError = (data, thunkAPI) => {
  if (data?.message?.toLowerCase()?.includes("token")) {
    localStorage.removeItem("token");
    return thunkAPI.rejectWithValue("TOKEN_EXPIRED");
  }
  return thunkAPI.rejectWithValue(data);
};

/* -----------------------------------------
   FETCH WISHLIST (ON PAGE LOAD)
------------------------------------------ */
export const fetchWishlistAPI = createAsyncThunk(
  "wishlist/fetchWishlistAPI",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return thunkAPI.rejectWithValue("NOT_LOGGED_IN");

      const res = await fetch(`${BASE_URL}${ALL_APi_LIST.getWishlist}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) return thunkAPI.rejectWithValue(data?.message);

      return data?.data?.saved_for_later_items || [];
    } catch (err) {
      return thunkAPI.rejectWithValue("NETWORK_ERROR");
    }
  }
);

/* -----------------------------------------
   ADD TO WISHLIST 
------------------------------------------ */
export const addToWishlistAPI = createAsyncThunk(
  "wishlist/addToWishlistAPI",
  async (product_variant_id, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return thunkAPI.rejectWithValue("NOT_LOGGED_IN");

      const payload = {
        product_variant_id,
        quantity: 1, // ✅ REQUIRED
        is_saved_for_later: 1, // ✅ SAFE (optional but recommended)
      };

      console.log("🚀 Wishlist payload:", payload);

      const res = await fetch(`${BASE_URL}${ALL_APi_LIST.addtoWishlist}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) return handleTokenError(data, thunkAPI);

      return product_variant_id;
    } catch (err) {
      return thunkAPI.rejectWithValue("NETWORK_ERROR");
    }
  }
);

/* -----------------------------------------
   REMOVE FROM WISHLIST (SKU)
------------------------------------------ */
export const removeFromWishlistAPI = createAsyncThunk(
  "wishlist/removeFromWishlistAPI",
  async (product_variant_id, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return thunkAPI.rejectWithValue("NOT_LOGGED_IN");

      const res = await fetch(`${BASE_URL}${ALL_APi_LIST.removeFromWishlist}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_variant_id,
          quantity: 1, // some backends require it here too
          is_saved_for_later: 0, // ✅ SAFE (optional but recommended)
          action: "remove",
        }),
      });

      const data = await res.json();
      if (!res.ok) return handleTokenError(data, thunkAPI);

      return product_variant_id;
    } catch (err) {
      return thunkAPI.rejectWithValue("NETWORK_ERROR");
    }
  }
);

/* -----------------------------------------
   WISHLIST SLICE
------------------------------------------ */
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },

  reducers: {
    /*  Optimistic add */
    addWishlistLocal: (state, action) => {
      if (!state.items.includes(action.payload)) {
        state.items.push(action.payload);
      }
    },

    /*  Optimistic remove */
    removeWishlistLocal: (state, action) => {
      state.items = state.items.filter((sku) => sku !== action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      /* ---------------- FETCH WISHLIST ---------------- */
      .addCase(fetchWishlistAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlistAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchWishlistAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;

        if (action.payload === "TOKEN_EXPIRED") {
          state.items = [];
        }
      })

      /* ---------------- ADD TO WISHLIST ---------------- */
      .addCase(addToWishlistAPI.fulfilled, (state, action) => {
        if (!state.items.includes(action.payload)) {
          state.items.push(action.payload);
        }
      })

      /* ---------------- REMOVE FROM WISHLIST ---------------- */
      .addCase(removeFromWishlistAPI.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (sku) => sku.product_variant_id !== action.payload
        );
      });
  },
});

export const { addWishlistLocal, removeWishlistLocal } = wishlistSlice.actions;

export default wishlistSlice.reducer;
