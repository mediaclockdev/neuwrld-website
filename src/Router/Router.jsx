import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../Views/Layout/Layout";
import Loader from "../Views/Layout/Loader/Loader";
import Error from "../Views/Layout/Loader/Error";

const Home = lazy(() => import("../Views/Pages/Home/Home"));
const ProductSummary = lazy(() => import("../Views/Pages/Product/ProductSummary"));
const Login = lazy(() => import("../components/Login/Login"));
const Signup = lazy(() => import("../components/Login/Signup"));
const Forgetpass = lazy(() => import("../components/Login/Forgetpass"));
const Cart = lazy(() => import("../components/Cart/Cart"));
const AllCategory = lazy(() => import("../components/Category/AllCategory"));
const CategoryPage = lazy(() => import("../Views/Pages/Category/CategoryPage"));
const ProductList = lazy(() => import("../Views/Pages/ProductList/ProductList"));
const Wishlist = lazy(() => import("../Views/Pages/Wishlist/Wishlist"));
const Checkout = lazy(() => import("../Views/Pages/Checkout/Checkout"));
const Order = lazy(() => import("../components/Order"));

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
          path: "/orders",
          element: (
            <Suspense fallback={<Loader />}>
              <Order />
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
