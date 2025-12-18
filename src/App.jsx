import React, { useEffect } from "react";
import Router from "./Router/Router";
import { useDispatch } from "react-redux";
import { fetchUserProfile } from "./features/auth/authSlice";
import { fetchCategoriesAPI } from "./features/categories/categoriesSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchUserProfile());
    }
  }, []);
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
