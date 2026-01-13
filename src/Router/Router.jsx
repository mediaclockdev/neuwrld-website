import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../Views/Layout/Layout";
import Loader from "../Views/Layout/Loader/Loader";
import Error from "../Views/Layout/Loader/Error";
import Home from "../Views/Pages/Home/Home";
import ProductSummary from "../Views/Pages/Product/ProductSummary";
import Login from "../components/Login/Login";
import Signup from "../components/Login/Signup";
import Forgetpass from "../components/Login/Forgetpass";
import Cart from "../components/Cart/Cart";
import AllCategory from "../components/Category/AllCategory";
import CategoryPage from "../Views/Pages/Category/CategoryPage";
import ProductList from "../Views/Pages/ProductList/ProductList";
import Wishlist from "../Views/Pages/Wishlist/Wishlist";
import Checkout from "../Views/Pages/Checkout/Checkout";
import CheckoutAddress from "../components/CheckoutAddress";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: (
            <Suspense fallback={<Loader />}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "/wishlist",
          element: (
            <Suspense fallback={<Loader />}>
              <Wishlist />
            </Suspense>
          ),
        },
        {
          path: "/allcategory",
          element: (
            <Suspense fallback={<Loader />}>
              <AllCategory />
            </Suspense>
          ),
        },
        {
          path: "/category/:slug",
          element: (
            <Suspense fallback={<Loader />}>
              <CategoryPage />
            </Suspense>
          ),
        },
        {
          path: "/products/:id",
          element: (
            <Suspense fallback={<Loader />}>
              <ProductSummary />
            </Suspense>
          ),
        },
        {
          path: "/cart",
          element: (
            <Suspense fallback={<Loader />}>
              <Cart />
            </Suspense>
          ),
        },
        {
          path: "/checkout",
          element: (
            <Suspense fallback={<Loader />}>
              <Checkout />
            </Suspense>
          ),
        },

        {
          path: "/products/:gender/:category/:subCategory",
          element: (
            <Suspense fallback={<Loader />}>
              <ProductList />
            </Suspense>
          ),
        },
        {
          path: "/products/:gender/:category",
          element: (
            <Suspense fallback={<Loader />}>
              <ProductList />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "/login",
      element: (
        <Suspense fallback={<Loader />}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "/signup",
      element: (
        <Suspense fallback={<Loader />}>
          <Signup />
        </Suspense>
      ),
    },
    {
      path: "/forgotpassword",
      element: (
        <Suspense fallback={<Loader />}>
          <Forgetpass />
        </Suspense>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
