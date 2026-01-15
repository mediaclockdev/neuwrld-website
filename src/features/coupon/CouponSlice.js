// store/slices/couponSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, ALL_APi_LIST } from "../../api/apiList";

// Apply coupon

export const applyCoupon = createAsyncThunk(
  "applycoupon",
  async ({ coupon }, { rejectWithValue, getState }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User not authenticated");

      const state = getState();
      const summary = state.cart?.summary;

      const parseAmount = (value) =>
        Number(String(value).replace(/[^0-9.]/g, ""));

      const orderAmount = parseAmount(
        summary?.final_amount || summary?.raw_subtotal
      );

      if (!coupon?.code) {
        throw new Error("Coupon code is required");
      }

      if (!orderAmount || Number.isNaN(orderAmount)) {
        throw new Error("Invalid cart amount");
      }

      const res = await fetch(`${BASE_URL}${ALL_APi_LIST.applyCoupon}`, {
        method: "POST", // ✅ POST confirmed
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify({
          coupon_code: coupon.code, // ✅ from coupon-list
          order_amount: orderAmount, // ✅ final amount
        }),
      });

      const text = await res.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Invalid server response");
      }

      if (!res.ok || data?.success === false) {
        throw new Error(data?.message || "Failed to apply coupon");
      }

      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

//  Coupon List API

export const fetchCoupons = createAsyncThunk(
  "couponlist",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}${ALL_APi_LIST.couponlist}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const couponSlice = createSlice({
  name: "coupon",
  initialState: {
    coupons: [],
    appliedCoupon: null,
    discount: 0,
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearCouponState: (state) => {
      state.appliedCoupon = null;
      state.discount = 0;
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* Apply Coupon */
      .addCase(applyCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.appliedCoupon = action.payload;
        state.discount = action.payload.discount || 0;
        state.success = "Coupon applied successfully";
      })

      .addCase(applyCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.discount = 0;
      })

      /* Coupon List */
      .addCase(fetchCoupons.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = action.payload.data;
      })
      .addCase(fetchCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCouponState } = couponSlice.actions;
export default couponSlice.reducer;
