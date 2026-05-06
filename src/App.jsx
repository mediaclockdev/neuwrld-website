import React, { useEffect } from "react";
import Router from "./Router/Router";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "./features/auth/authSlice";
import { fetchCategoriesAPI } from "./features/categories/categoriesSlice";
import { fetchWishlistAPI } from "./features/wishlist/wishlistSlice";
import { fetchCartAPI } from "./features/cart/cartSlice";

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token || isLoggedIn) {
      dispatch(fetchUserProfile());
      dispatch(fetchWishlistAPI());
      dispatch(fetchCartAPI());
    }
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    dispatch(fetchCategoriesAPI());
  }, [dispatch]);

  return (
    <>
      <Router />
    </>
  );
}

export default App;
