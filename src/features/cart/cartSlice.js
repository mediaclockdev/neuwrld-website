/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, ALL_APi_LIST } from "../../api/apiList";

/* -----------------------------------------
   Helper: Token Expiry Handler
------------------------------------------ */
const handleTokenError = (data, thunkAPI) => {
  if (data?.message?.toLowerCase().includes("token")) {
    localStorage.removeItem("token");
    return thunkAPI.rejectWithValue("TOKEN_EXPIRED");
  }
  return thunkAPI.rejectWithValue(data);
};

/* -----------------------------------------
   FETCH CART (ONLY ON PAGE LOAD)
------------------------------------------ */
export const fetchCartAPI = createAsyncThunk(
  "cart/fetchCartAPI",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`${BASE_URL}${ALL_APi_LIST.getCart}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      if (!res.ok) return handleTokenError(data, thunkAPI);

      return {
        items: data?.data?.cart_items || [],
        summary: data?.data?.cart_summary || {},
      };
    } catch (err) {
      return thunkAPI.rejectWithValue("NETWORK_ERROR");
    }
  }
);

/* -----------------------------------------
   ADD TO CART
------------------------------------------ */
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

      // Fetch cart ONCE after adding
      thunkAPI.dispatch(fetchCartAPI());
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue("NETWORK_ERROR");
    }
  }
);

/* -----------------------------------------
   UPDATE QUANTITY (OPTIMISTIC)
------------------------------------------ */
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

      if (!res.ok || data.success === false) {
        return thunkAPI.rejectWithValue({
          product_variant_id,
          allowed_quantity: data?.data?.allowed_quantity,
          message: data?.message,
        });
      }

      return { product_variant_id, quantity };
    } catch (err) {
      return thunkAPI.rejectWithValue("NETWORK_ERROR");
    }
  }
);

/* -----------------------------------------
   REMOVE FROM CART (OPTIMISTIC)
------------------------------------------ */
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

      return product_variant_id;
    } catch (err) {
      return thunkAPI.rejectWithValue("NETWORK_ERROR");
    }
  }
);

/* -----------------------------------------
   CART SLICE
------------------------------------------ */
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    summary: {},
    loading: false,
    error: null,
  },

  reducers: {
    /* 🔥 Optimistic quantity update */
    updateQuantityLocal: (state, action) => {
      const { product_variant_id, quantity } = action.payload;
      const item = state.items.find(
        (i) => i.product_variant_id === product_variant_id
      );
      if (item) item.quantity = quantity;
    },

    /* 🔥 Optimistic remove */
    removeItemLocal: (state, action) => {
      state.items = state.items.filter(
        (i) => i.product_variant_id !== action.payload
      );
    },
  },

  extraReducers: (builder) => {
    builder
      /* ---------------- FETCH CART ---------------- */
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
          state.summary = {};
        }
      })

      /* ---------------- UPDATE QUANTITY ---------------- */
      .addCase(updateQuantityAPI.rejected, (state, action) => {
        const { product_variant_id, allowed_quantity } = action.payload || {};

        if (product_variant_id && allowed_quantity) {
          const item = state.items.find(
            (i) => i.product_variant_id === product_variant_id
          );

          if (item) {
            item.quantity = allowed_quantity;
          }
        }

        state.error = action.payload?.message || "Quantity update failed";
      })

      /* ---------------- REMOVE ITEM ---------------- */
      .addCase(removeFromCartAPI.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (i) => i.product_variant_id !== action.payload
        );
      });
  },
});

export const { updateQuantityLocal, removeItemLocal } = cartSlice.actions;

export default cartSlice.reducer;
