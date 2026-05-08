/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import searchicon from "../../../assets/svg/icons/search.svg";
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
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../features/auth/authSlice";
import { toast } from "react-toastify";
import { fetchCategoriesAPI } from "../../../features/categories/categoriesSlice";
import MegaMenuDialog from "../../../components/MegaMenuDialog";
import ViewProfile from "../../../components/ViewProfile";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [openMenu, setOpenMenu] = useState(null); // "men" or "women"
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [searchloading, setSearchLoading] = useState(false);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState(null);
  const [expandedMobileSubCategory, setExpandedMobileSubCategory] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      // Fetch categories if not already loaded
      if (!list || list.length === 0) {
        dispatch(fetchCategoriesAPI());
      }
    } else {
      document.body.style.overflow = "auto";
      // Reset expanded states when menu closes
      setExpandedMobileCategory(null);
      setExpandedMobileSubCategory(null);
    }
  }, [isMenuOpen]);
  useEffect(() => {
    if (!debouncedSearch) {
      setProducts([]);
      setSearchLoading(false);
      return;
    }

    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `https://maroon-crane-692077.hostingersite.com/nuworld_v3/api/v1/products-search?q=${debouncedSearch}`,
        );

        const data = await res.json();

        if (data?.success) {
          setProducts(data?.payload?.data || []);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.log(err);
        setProducts([]);
      } finally {
        setSearchLoading(false);
      }
    };

    fetchProducts();
  }, [debouncedSearch]);

  useEffect(() => {
    if (search) setSearchLoading(true);

    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const { items = [] } = useSelector((state) => state.cart);
  const totalItems = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const { items: wishlistItems = [] } = useSelector((state) => state.wishlist);
  const wishlistCount = Array.isArray(wishlistItems) ? wishlistItems.length : 0;

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

  const handleLogout = () => {
    dispatch(logout());
    setIsMenuOpen(false);
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
   <div className="sticky lg:static top-0 left-0 w-full z-[1000] bg-black text-zinc-100 border-b border-zinc-800">
    <header className="max-w-screen-2xl mx-auto">
  
  {/* NON STICKY TEXT */}
  <p className="font-medium font-tektur text-xs lg:text-base text-center text-gray-50 py-2 px-5 lg:px-8">
    LIMITED RELEASES. EXCLUSIVE DROPS. ELEGANCE IS NOW LIVE
  </p>

  {/* MOBILE STICKY HEADER ONLY */}
<div className="bg-black border-t border-zinc-800 overflow-visible">
    <nav className="px-5 lg:px-8 py-0 lg:py-3">
          <div className="flex justify-between items-center lg:gap-4 ">
            <div className="flex justify-between items-center gap-4 lg:w-full lg:hidden">
              <div className="flex items-center gap-4">
                <div>
                  {/* hamburger menu */}
                  <img
                    src={ham}
                    alt="hamburger menu"
                    className="size-6 cursor-pointer text-white"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  />

                  <AnimatePresence>
                    {isMenuOpen && (
                      <>
                        {/* Backdrop overlay */}
                        <motion.div
                          className="fixed inset-0 bg-black/40 z-[9999]"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          onClick={() => setIsMenuOpen(false)} // closes menu on backdrop click
                        />
                        <motion.div
                          className="fixed top-0 left-0 h-full w-3/4 bg-zinc-900 z-[9999] shadow-lg text-zinc-100"
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
                              <ul className="flex flex-col gap-4 relative">
                                <li>
                                  <NavLink
                                    to={"/"}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={({ isActive }) =>
                                      `flex items-center gap-2 cursor-pointer p-2 rounded-lg transition-colors ${
                                        isActive
                                          ? "bg-zinc-800 text-blue-400"
                                          : "hover:bg-zinc-800"
                                      }`
                                    }
                                  >
                                    <img
                                      src={home}
                                      alt="home icon"
                                      className="size-5"
                                    />
                                    <p className="text-base cursor-pointer font-tektur font-medium">
                                      Home
                                    </p>
                                  </NavLink>
                                </li>

                                <li>
                                  <div className="flex flex-col">
                                    <div
                                      onClick={() =>
                                        setExpandedMobileCategory(
                                          expandedMobileCategory === "men"
                                            ? null
                                            : "men",
                                        )
                                      }
                                      className={`flex items-center justify-between cursor-pointer p-2 rounded-lg transition-colors ${
                                        expandedMobileCategory === "men"
                                          ? "bg-zinc-800 text-blue-400"
                                          : "hover:bg-zinc-800"
                                      }`}
                                    >
                                      <div className="flex items-center gap-2">
                                        <img
                                          src={man}
                                          alt="men icon"
                                          className="size-6"
                                        />
                                        <p className="text-base font-tektur font-medium">
                                          Men
                                        </p>
                                      </div>
                                      <motion.svg
                                        animate={{
                                          rotate:
                                            expandedMobileCategory === "men"
                                              ? 180
                                              : 0,
                                        }}
                                        className="size-4"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                      >
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                      </motion.svg>
                                    </div>

                                    <AnimatePresence>
                                      {expandedMobileCategory === "men" && (
                                        <motion.div
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ height: "auto", opacity: 1 }}
                                          exit={{ height: 0, opacity: 0 }}
                                          className="overflow-hidden pl-8 mt-2 space-y-2"
                                        >
                                          {/* Subcategories for Men */}
                                          {(() => {
                                            const mainCat = list.find(
                                              (c) =>
                                                c.slug?.toLowerCase() === "men",
                                            );
                                            if (!mainCat) return null;

                                            // Support both nested structure (Men > Men > Categories) and flat (Men > Categories)
                                            const data =
                                              mainCat.children?.find(
                                                (c) =>
                                                  c.slug?.toLowerCase() ===
                                                  "men",
                                              ) || mainCat;

                                            return data.children?.map(
                                              (sub) => (
                                                <div
                                                  key={sub.id}
                                                  className="flex flex-col"
                                                >
                                                  {sub.children &&
                                                  sub.children.length > 0 ? (
                                                    <>
                                                      <div
                                                        onClick={() =>
                                                          setExpandedMobileSubCategory(
                                                            expandedMobileSubCategory ===
                                                              sub.id
                                                              ? null
                                                              : sub.id,
                                                          )
                                                        }
                                                        className="flex items-center justify-between py-2 cursor-pointer text-sm font-tektur font-semibold text-zinc-200"
                                                      >
                                                        {sub.title || sub.name}
                                                        <motion.svg
                                                          animate={{
                                                            rotate:
                                                              expandedMobileSubCategory ===
                                                              sub.id
                                                                ? 180
                                                                : 0,
                                                          }}
                                                          className="size-3"
                                                          viewBox="0 0 24 24"
                                                          fill="none"
                                                          stroke="currentColor"
                                                          strokeWidth="2"
                                                        >
                                                          <polyline points="6 9 12 15 18 9"></polyline>
                                                        </motion.svg>
                                                      </div>
                                                      <AnimatePresence>
                                                        {expandedMobileSubCategory ===
                                                          sub.id && (
                                                          <motion.div
                                                            initial={{
                                                              height: 0,
                                                              opacity: 0,
                                                            }}
                                                            animate={{
                                                              height: "auto",
                                                              opacity: 1,
                                                            }}
                                                            exit={{
                                                              height: 0,
                                                              opacity: 0,
                                                            }}
                                                            className="overflow-hidden pl-4 space-y-1"
                                                          >
                                                            {sub.children?.map(
                                                              (item) => (
                                                                <NavLink
                                                                  key={item.id}
                                                                  to={`/products/men/${item.slug}`}
                                                                  onClick={() =>
                                                                    setIsMenuOpen(
                                                                      false,
                                                                    )
                                                                  }
                                                                  className="block py-1.5 text-sm font-tektur text-zinc-500 hover:text-blue-400"
                                                                >
                                                                  {item.title ||
                                                                    item.name}
                                                                </NavLink>
                                                              ),
                                                            )}
                                                          </motion.div>
                                                        )}
                                                      </AnimatePresence>
                                                    </>
                                                  ) : (
                                                    <NavLink
                                                      to={`/products/men/${sub.slug}`}
                                                      onClick={() =>
                                                        setIsMenuOpen(false)
                                                      }
                                                      className="block py-2 text-sm font-tektur text-zinc-300 hover:text-blue-400"
                                                    >
                                                      {sub.title || sub.name}
                                                    </NavLink>
                                                  )}
                                                </div>
                                              ),
                                            );
                                          })()}
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                </li>

                                <li>
                                  <div className="flex flex-col">
                                    <div
                                      onClick={() =>
                                        setExpandedMobileCategory(
                                          expandedMobileCategory === "women"
                                            ? null
                                            : "women",
                                        )
                                      }
                                      className={`flex items-center justify-between cursor-pointer p-2 rounded-lg transition-colors ${
                                        expandedMobileCategory === "women"
                                          ? "bg-zinc-800 text-blue-400"
                                          : "hover:bg-zinc-800"
                                      }`}
                                    >
                                      <div className="flex items-center gap-2">
                                        <img
                                          src={women}
                                          alt="women icon"
                                          className="size-6"
                                        />
                                        <p className="text-base font-tektur font-medium">
                                          Women
                                        </p>
                                      </div>
                                      <motion.svg
                                        animate={{
                                          rotate:
                                            expandedMobileCategory === "women"
                                              ? 180
                                              : 0,
                                        }}
                                        className="size-4"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                      >
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                      </motion.svg>
                                    </div>

                                    <AnimatePresence>
                                      {expandedMobileCategory === "women" && (
                                        <motion.div
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ height: "auto", opacity: 1 }}
                                          exit={{ height: 0, opacity: 0 }}
                                          className="overflow-hidden pl-8 mt-2 space-y-2"
                                        >
                                          {/* Subcategories for Women */}
                                          {(() => {
                                            const mainCat = list.find(
                                              (c) =>
                                                c.slug?.toLowerCase() ===
                                                "women",
                                            );
                                            if (!mainCat) return null;

                                            const data =
                                              mainCat.children?.find(
                                                (c) =>
                                                  c.slug?.toLowerCase() ===
                                                  "women",
                                              ) || mainCat;

                                            return data.children?.map(
                                              (sub) => (
                                                <div
                                                  key={sub.id}
                                                  className="flex flex-col"
                                                >
                                                  {sub.children &&
                                                  sub.children.length > 0 ? (
                                                    <>
                                                      <div
                                                        onClick={() =>
                                                          setExpandedMobileSubCategory(
                                                            expandedMobileSubCategory ===
                                                              sub.id
                                                              ? null
                                                              : sub.id,
                                                          )
                                                        }
                                                        className="flex items-center justify-between py-2 cursor-pointer text-sm font-tektur font-semibold text-zinc-200"
                                                      >
                                                        {sub.title || sub.name}
                                                        <motion.svg
                                                          animate={{
                                                            rotate:
                                                              expandedMobileSubCategory ===
                                                              sub.id
                                                                ? 180
                                                                : 0,
                                                          }}
                                                          className="size-3"
                                                          viewBox="0 0 24 24"
                                                          fill="none"
                                                          stroke="currentColor"
                                                          strokeWidth="2"
                                                        >
                                                          <polyline points="6 9 12 15 18 9"></polyline>
                                                        </motion.svg>
                                                      </div>
                                                      <AnimatePresence>
                                                        {expandedMobileSubCategory ===
                                                          sub.id && (
                                                          <motion.div
                                                            initial={{
                                                              height: 0,
                                                              opacity: 0,
                                                            }}
                                                            animate={{
                                                              height: "auto",
                                                              opacity: 1,
                                                            }}
                                                            exit={{
                                                              height: 0,
                                                              opacity: 0,
                                                            }}
                                                            className="overflow-hidden pl-4 space-y-1"
                                                          >
                                                            {sub.children?.map(
                                                              (item) => (
                                                                <NavLink
                                                                  key={item.id}
                                                                  to={`/products/women/${item.slug}`}
                                                                  onClick={() =>
                                                                    setIsMenuOpen(
                                                                      false,
                                                                    )
                                                                  }
                                                                  className="block py-1.5 text-sm font-tektur text-zinc-500 hover:text-blue-400"
                                                                >
                                                                  {item.title ||
                                                                    item.name}
                                                                </NavLink>
                                                              ),
                                                            )}
                                                          </motion.div>
                                                        )}
                                                      </AnimatePresence>
                                                    </>
                                                  ) : (
                                                    <NavLink
                                                      to={`/products/women/${sub.slug}`}
                                                      onClick={() =>
                                                        setIsMenuOpen(false)
                                                      }
                                                      className="block py-2 text-sm font-tektur text-zinc-300 hover:text-blue-400"
                                                    >
                                                      {sub.title || sub.name}
                                                    </NavLink>
                                                  )}
                                                </div>
                                              ),
                                            );
                                          })()}
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                </li>

                                <li>
                                  <NavLink
                                    to="/sale"
                                    onClick={() => setIsMenuOpen(false)}
                                    className={({ isActive }) =>
                                      `flex items-center gap-2 cursor-pointer p-2 rounded-lg transition-colors ${
                                        isActive
                                          ? "bg-zinc-800 text-blue-400"
                                          : "hover:bg-zinc-800"
                                      }`
                                    }
                                  >
                                    <img
                                      src={sale}
                                      alt="sales icon"
                                      className="size-6"
                                    />
                                    <p className="text-base cursor-pointer font-tektur font-medium">
                                      Sale
                                    </p>
                                  </NavLink>
                                </li>

                                {isLoggedIn && (
                                  <>
                                    <div className="border-t border-zinc-800 my-2"></div>
                                    <li>
                                      <Link
                                        to="/orders"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center gap-2 p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                                      >
                                        <p className="text-base font-tektur font-medium">
                                          My Orders
                                        </p>
                                      </Link>
                                    </li>
                                    <li>
                                      <Link
                                        to="/wishlist"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center gap-2 p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                                      >
                                        <p className="text-base font-tektur font-medium">
                                          My Wishlist
                                        </p>
                                      </Link>
                                    </li>
                                    <li className="pt-4">
                                      <button
                                        onClick={handleLogout}
                                        className="w-full bg-zinc-100 text-black font-bold py-3 rounded-lg font-tektur hover:bg-zinc-200 transition-colors"
                                      >
                                        LOGOUT
                                      </button>
                                    </li>
                                  </>
                                )}
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
                    <img src={logo2} alt="logo" className="size-20 mr-5" />
                  </Link>
                </div>
              </div>
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
                      <p className=" text-base transition-all duration-500 text-zinc-100 font-medium font-tektur">
                        Home
                        <span
                          className={`h-0.5 transition-all duration-500 bg-zinc-100 absolute -bottom-1 left-0 ${
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
                      <p className="font-medium font-tektur text-base transition-all duration-500 text-zinc-100">
                        Men
                        <span
                          className={`h-0.5 transition-all duration-500 bg-zinc-100 absolute -bottom-1 left-0 ${
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
                      <p className="font-medium font-tektur text-base transition-all duration-500 text-zinc-100">
                        Women
                        <span
                          className={`h-0.5 transition-all duration-500 bg-zinc-100 absolute -bottom-1 left-0 ${
                            isActive ? "w-full" : "w-0 group-hover:w-full"
                          }`}
                        ></span>
                      </p>
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/accessories"
                    className="relative group"
                    onClick={(e) => e.preventDefault()}
                  >
                    {({ isActive }) => (
                      <p className="font-medium font-tektur text-base transition-all duration-500 text-zinc-100">
                        Accessories
                        <span
                          className={`h-0.5 transition-all duration-500 bg-zinc-100 absolute -bottom-1 left-0 ${
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

            {/* destop logo */}
            <div className="hidden lg:block">
              <Link to={"/"}>
                <img src={logo2} alt="logo" className="size-24" />
              </Link>
            </div>
            {/* desktop icons */}
            <div
              className="relative pb-6 -mb-8 flex items-end  z-[999]"
              onMouseLeave={() => setShowProfile(false)}
            >
              <ul className="flex items-center gap-4">
                <li className="relative">
                  {/* SEARCH BOX */}
                  <div className="relative">
                    <div className="flex items-center w-[130px] sm:w-[200px] lg:w-64 xl:w-80 bg-zinc-900 px-2 lg:px-3 py-1.5 lg:py-2 rounded-md focus-within:bg-zinc-950 focus-within:border border-zinc-700">
                      {/* icon */}
                      <img
                        src={searchicon}
                        alt="search icon"
                        className="size-3.5 lg:size-4 shrink-0"
                      />

                      {/* input */}
                      <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full outline-none text-xs lg:text-sm placeholder-zinc-500 text-zinc-100 px-2 rounded bg-transparent font-medium font-tektur"
                      />
                    </div>

                    {/* DROPDOWN */}
                    {search && (
                      <div className="fixed top-[120px] left-4 right-4 lg:absolute lg:top-12 lg:left-0 lg:right-auto lg:w-full bg-zinc-900 shadow-2xl rounded-lg max-h-96 overflow-hidden z-[999] border border-zinc-700 animate-in fade-in slide-in-from-top-2 duration-200">
                        {/* Loading state */}
                        {loading ? (
                          <div className="p-6 flex flex-col items-center justify-center gap-3">
                            <div className="w-8 h-8 border-3 border-zinc-600 border-t-blue-500 rounded-full animate-spin"></div>
                            <p className="text-sm text-zinc-300 font-medium font-tektur">
                              Searching products...
                            </p>
                          </div>
                        ) : products.length > 0 ? (
                          <div className="overflow-y-auto max-h-96 divide-y divide-zinc-800">
                            {/* Results header */}
                            <div className="px-4 py-2 bg-zinc-950 sticky top-0 z-10">
                              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">
                                {products.length}{" "}
                                {products.length === 1 ? "Result" : "Results"}{" "}
                                Found
                              </p>
                            </div>

                            {/* Product list */}
                            {products.map((item) => (
                              <Link
                                to={`/products/${item.product_sku}`}
                                key={item.id}
                                className="flex items-center gap-4 p-4 hover:bg-zinc-800 transition-colors duration-150 cursor-pointer group"
                                onClick={() => setSearch("")}
                              >
                                {/* Product image */}
                                <div className="relative flex-shrink-0">
                                  <img
                                    src={item.image}
                                    alt={item.product_name}
                                    className="w-16 h-16 object-cover rounded-lg border border-zinc-700 group-hover:border-zinc-500 transition-colors"
                                  />
                                </div>

                                {/* Product details */}
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-semibold font-tektur text-zinc-100 truncate group-hover:text-blue-400 transition-colors">
                                    {item.product_name}
                                  </p>
                                  <p className="text-sm font-bold text-blue-600 mt-1 font-tektur">
                                    {item.price}
                                  </p>
                                  {item.category && (
                                    <p className="text-xs text-zinc-400 mt-1 font-tektur">
                                      {item.category}
                                    </p>
                                  )}
                                </div>

                                {/* Arrow icon */}
                                <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <svg
                                    className="w-5 h-5 text-zinc-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 5l7 7-7 7"
                                    />
                                  </svg>
                                </div>
                              </Link>
                            ))}
                          </div>
                        ) : (
                          /* Empty state */
                          <div className="p-8 flex flex-col items-center justify-center gap-3">
                            <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center">
                              <svg
                                className="w-8 h-8 text-zinc-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                              </svg>
                            </div>
                            <p className="text-sm font-medium text-zinc-300 font-tektur">
                              No products found
                            </p>
                            <p className="text-xs text-zinc-400 font-tektur">
                              Try searching with different keywords
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </li>

                <li>
                  <Link to="/wishlist">
                    <div className="lg:flex items-center gap-3 relative z-[100]">
                      <div className="relative">
                        {wishlistCount > 0 && (
                          <div className="absolute -right-3 -top-2 bg-black/50 text-white rounded-full flex justify-center text-xs size-4 items-center">
                            {wishlistCount}
                          </div>
                        )}

                        <img
                          src={heart}
                          alt="wishlist"
                          className="size-4 lg:size-5 cursor-pointer"
                        />
                      </div>
                    </div>
                  </Link>
                </li>

                <li onMouseEnter={() => setShowProfile(true)}>
                  <img
                    src={user}
                    alt="user"
                    className="size-5 cursor-pointer"
                  />

                  {showProfile && (
                    <div className="absolute right-0 top-12.5 z-[9999]">
                      <ViewProfile />
                    </div>
                  )}
                </li>
                <li>
                  <Link to={"/cart"}>
                    <div className="lg:flex items-center gap-3 relative z-[100]">
                      <div className="relative">
                        {totalItems > 0 && (
                          <div className="absolute -right-3 -top-2 bg-black/50 text-white rounded-full flex justify-center text-xs size-4 items-center ">
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
  </div>
</header>
    </div>
  );
};

export default Header;
