import React, { useEffect } from "react";
import Router from "./Router/Router";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "./features/auth/authSlice";
import { fetchCategoriesAPI } from "./features/categories/categoriesSlice";
import { fetchWishlistAPI } from "./features/wishlist/wishlistSlice";
import { fetchCartAPI } from "./features/cart/cartSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
