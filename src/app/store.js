import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";
import cartReducer from "../features/cart/cartSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import authReducer from "../features/auth/authSlice";
import categoriesReducer from "../features/categories/categoriesSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice";
import addressReducer from "../features/address/addressSlice";
import couponReducer from "../features/coupon/CouponSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    dashboard: dashboardReducer,
    auth: authReducer,
    categories: categoriesReducer,
    wishlist: wishlistReducer,
    address: addressReducer,
    coupon: couponReducer,
  },
});
