/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import search from "../../../assets/svg/icons/search.svg";
import heart from "../../../assets/svg/icons/heart.svg";
import user from "../../../assets/svg/icons/user.svg";
import bag from "../../../assets/svg/icons/bag.svg";
import notification from "../../../assets/svg/icons/notification.svg";
import logo2 from "../../../assets/svg/icons/logo2.svg";
import ham from "../../../assets/svg/icons/hamburgerMenu.svg";
import close from "../../../assets/svg/icons/close.svg";
import { motion, AnimatePresence } from "framer-motion";
import man from "../../../assets/svg/icons/manicon.svg";
import women from "../../../assets/svg/icons/womenicon.svg";
import home from "../../../assets/svg/icons/homeicon.svg";
import newicon from "../../../assets/svg/icons/newicon.svg";
import sale from "../../../assets/svg/icons/sale.svg";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategoriesAPI } from "../../../features/categories/categoriesSlice";
import MegaMenuDialog from "../../../components/MegaMenuDialog";
import ViewProfile from "../../../components/ViewProfile";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [openMenu, setOpenMenu] = useState(null); // "men" or "women"
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);
  const cartItems = useSelector((state) => state.cart.cartItems || []);
  const totalItems = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );
  const dispatch = useDispatch();
  const { list = [], loading } = useSelector((state) => state.categories || {});
  const selectedCategory = list.find((cat) => cat.slug === openMenu);

  const handleMouseEnter = (type) => {
    setOpenMenu(type);

    // Fetch once if not already loaded
    if (!list || list.length === 0) {
      dispatch(fetchCategoriesAPI());
    }
  };

  const handleMouseLeave = () => {
    setOpenMenu(null);
  };
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <div className="max-w-screen-2xl mx-auto px-5 lg:px-8  sticky top-0 bg-gray-50 z-50 shadow-sm ">
      <header>
        <nav>
          <div className="flex justify-between items-center lg:gap-4">
            <div className="flex justify-between items-center gap-4 lg:w-full lg:hidden">
              <div className="flex items-center  gap-4 ">
                <div>
                  {/* hamburger menu */}
                  <img
                    src={ham}
                    alt="hamburger menu"
                    className="size-6 cursor-pointer"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  />

                  <AnimatePresence>
                    {isMenuOpen && (
                      <>
                        {/* Backdrop overlay */}
                        <motion.div
                          className="fixed inset-0 bg-black/40 z-40"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          onClick={() => setIsMenuOpen(false)} // closes menu on backdrop click
                        />
                        <motion.div
                          className="fixed top-0 left-0 h-full w-3/4 bg-white z-50 shadow-lg"
                          key="mobile-menu"
                          initial={{ x: "-100%" }}
                          animate={{ x: 0 }}
                          exit={{ x: "-100%" }}
                          transition={{
                            type: "tween",
                            duration: 0.5,
                            ease: "easeInOut",
                          }}
                        >
                          <div className="h-full w-full space-y-5">
                            <div className="flex justify-between items-center px-4 py-2">
                              <div>
                                <img
                                  src={logo2}
                                  alt="logo"
                                  className="size-16"
                                />
                              </div>

                              <div>
                                <img
                                  src={close}
                                  alt="close button"
                                  className="size-6 cursor-pointer "
                                  onClick={() => setIsMenuOpen(false)}
                                />
                              </div>
                            </div>
                            <div className="px-4 ">
                              <ul className="flex flex-col gap-6 relative">
                                <li>
                                  <Link to={"/"}>
                                    <div className="flex items-center gap-2 cursor-pointer">
                                      <img
                                        src={home}
                                        alt="home icon"
                                        className="size-5"
                                      />
                                      <p className="text-base cursor-pointer">
                                        Home
                                      </p>
                                    </div>
                                  </Link>
                                </li>
                                <li>
                                  <div className="flex items-center gap-2 ">
                                    <img
                                      src={man}
                                      alt="men icon"
                                      className="size-6"
                                    />
                                    <p className="text-base cursor-pointer">
                                      Men
                                    </p>
                                  </div>
                                </li>
                                <li>
                                  <div className="flex items-center gap-2">
                                    <img
                                      src={women}
                                      alt="women icon"
                                      className="size-6"
                                    />
                                    <p className="text-base cursor-pointer">
                                      Women
                                    </p>
                                  </div>
                                </li>
                                <li>
                                  <div className="flex items-center gap-2">
                                    <img
                                      src={newicon}
                                      alt="new icon"
                                      className="size-6"
                                    />
                                    <p className="text-base cursor-pointer">
                                      New Arrivals
                                    </p>
                                  </div>
                                </li>
                                <li>
                                  <div className="flex items-center gap-2">
                                    <img
                                      src={sale}
                                      alt="sales icon"
                                      className="size-6"
                                    />
                                    <p className="text-base cursor-pointer">
                                      Sale
                                    </p>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
                {/* mobile logo */}
                <div>
                  <Link to={"/"}>
                    <img src={logo2} alt="logo" className="size-14" />
                  </Link>
                </div>
              </div>
            </div>
            {/* destop logo */}
            <div className="hidden lg:block">
              <Link to={"/"}>
                <img src={logo2} alt="logo" className="size-20" />
              </Link>
            </div>

            {/* desktop menu */}
            <div
              className="hidden lg:flex items-end pb-8 -mb-8 relative"
              onMouseLeave={() => setOpenMenu(null)}
            >
              <ul className="flex items-center gap-8">
                <li>
                  <NavLink to="/" className="relative group">
                    {({ isActive }) => (
                      <p className="font-open-sans text-base transition-all duration-500">
                        Home
                        <span
                          className={`h-0.5 transition-all duration-500 bg-black absolute -bottom-1 left-0 ${
                            isActive ? "w-full" : "w-0 group-hover:w-full"
                          }`}
                        ></span>
                      </p>
                    )}
                  </NavLink>
                </li>
                <li onMouseEnter={() => handleMouseEnter("men")}>
                  <NavLink to="/category/men" className="relative group">
                    {({ isActive }) => (
                      <p className="font-open-sans text-base transition-all duration-500">
                        Men
                        <span
                          className={`h-0.5 transition-all duration-500 bg-black absolute -bottom-1 left-0 ${
                            isActive ? "w-full" : "w-0 group-hover:w-full"
                          }`}
                        ></span>
                      </p>
                    )}
                  </NavLink>
                </li>
                <li onMouseEnter={() => handleMouseEnter("women")}>
                  <NavLink to="/category/women" className="relative group">
                    {({ isActive }) => (
                      <p className="font-open-sans text-base transition-all duration-500">
                        Women
                        <span
                          className={`h-0.5 transition-all duration-500 bg-black absolute -bottom-1 left-0 ${
                            isActive ? "w-full" : "w-0 group-hover:w-full"
                          }`}
                        ></span>
                      </p>
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/New Arrivals" className="relative group">
                    {({ isActive }) => (
                      <p className="font-open-sans text-base transition-all duration-500">
                        New Arrivals
                        <span
                          className={`h-0.5 transition-all duration-500 bg-black absolute -bottom-1 left-0 ${
                            isActive ? "w-full" : "w-0 group-hover:w-full"
                          }`}
                        ></span>
                      </p>
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/sale" className="relative group">
                    {({ isActive }) => (
                      <p className=" font-open-sans text-base transition-all duration-500">
                        Sale
                        <span
                          className={`h-0.5 transition-all duration-500 bg-black absolute -bottom-1 left-0 ${
                            isActive ? "w-full" : "w-0 group-hover:w-full"
                          }`}
                        ></span>
                      </p>
                    )}
                  </NavLink>
                </li>
              </ul>
              {/* HOVER DIALOG BOX */}
              {openMenu && selectedCategory?.children?.length > 0 && (
                <MegaMenuDialog
                  type={openMenu}
                  categories={selectedCategory.children}
                  onClose={() => setOpenMenu(null)}
                />
              )}
            </div>
            {/* desktop icons */}
            <div
              className="relative pb-6 -mb-8 flex items-end"
              onMouseLeave={() => setShowProfile(false)}
            >
              <ul className="flex items-center gap-4">
                <li>
                  <div className="flex items-center xl:w-80 lg:bg-gray-100 px-0 lg:px-3 py-0 lg:py-2 rounded-sm  focus-within:bg-white focus-within:border border-gray-100">
                    <img src={search} alt="search icon" className="size-4 " />
                    <input
                      type="text"
                      placeholder="Search for products"
                      className=" w-full outline-none text-sm placeholder-gray-500 px-2 py-1 rounded placeholder:font-light placeholder:text-sm focus:outline-none hidden lg:block "
                    />
                  </div>
                </li>
                <li>
                  <img
                    src={heart}
                    alt="heart icon"
                    className="size-4 lg:size-5 cursor-pointer"
                  />
                </li>
                <li onMouseEnter={() => setShowProfile(true)}>
                  <img src={user} className="size-5 cursor-pointer" />

                  {showProfile && (
                    <div className="absolute right-0 top-12.5">
                      <ViewProfile />
                    </div>
                  )}
                </li>
                <li>
                  <Link to={"/cart"}>
                    <div className="lg:flex items-center gap-3 relative z-[100]">
                      <div className="relative">
                        {totalItems > 0 && (
                          <div className="absolute -right-3 -top-2 bg-black/50 text-white rounded-full flex justify-center text-xs size-4 items-center">
                            {totalItems}
                          </div>
                        )}
                        <img
                          src={bag}
                          alt="cart"
                          className="size-4 lg:size-5 cursor-pointer"
                        />
                      </div>
                    </div>
                  </Link>
                </li>
                <li className=" hidden lg:block">
                  <img
                    src={notification}
                    alt="notification icon"
                    className="size-4 lg:size-5 cursor-pointer hidden lg:block"
                  />
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
