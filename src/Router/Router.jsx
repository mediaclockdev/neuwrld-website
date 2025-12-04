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
