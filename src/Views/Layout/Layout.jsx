import React from "react";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import ScrollToTop from "./ScrollToTop";

const Layout = () => {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
