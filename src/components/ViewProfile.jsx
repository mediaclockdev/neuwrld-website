import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";

const ViewProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, isLoggedIn } = useSelector((state) => state.auth);

  const handleLoginClick = () => {
    navigate("/login", { state: { from: window.location.pathname } });
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
  };

  /** ⏳ LOADING STATE **/
  if (loading) {
    return (
      <div className="w-full max-w-sm bg-white shadow-lg rounded-lg p-4 sm:p-6">
        <div className="animate-pulse flex flex-col gap-3 sm:gap-4">
          <div className="h-6 sm:h-8 bg-gray-200 rounded"></div>
          <div className="h-3 sm:h-4 bg-gray-200 rounded"></div>
          <div className="h-10 sm:h-12 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  /** ❌ NOT LOGGED IN **/
  if (!isLoggedIn) {
    return (
      <div className="w-full max-w-sm bg-white shadow-lg rounded-lg p-4 sm:p-6 space-y-2">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 font-tektur">
          Welcome
        </h2>
        <p className="text-gray-600 text-xs sm:text-sm font-tektur">
          To access account and manage orders
        </p>
        <button
          onClick={handleLoginClick}
          className="w-full border-2  font-semibold py-2 sm:py-3 rounded hover:bg-gray-50 font-tektur text-black cursor-pointer transition-colors"
        >
          LOGIN / SIGNUP
        </button>
      </div>
    );
  }

  
  return (
    <div className="w-full max-w-sm bg-white shadow-lg rounded-lg p-4 sm:p-6">
      {/* User Info */}
      <div className="flex flex-col gap-2 sm:gap-3">
        <h2 className="text-base lg:text-xl font-semibold text-gray-800 font-tektur">
          Hello, {user?.name || user?.email || "User"}
        </h2>
        <p className="text-gray-600 text-xs sm:text-sm font-tektur">
          Manage your account & orders
        </p>
      </div>

      <div className="border-t border-gray-200 py-4 sm:py-6"></div>

      <nav className="flex flex-col gap-3 sm:gap-4">
        <Link
          to="/orders"
          className="text-zinc-700 hover:text-gray-900 transition-colors duration-500 font-tektur hover:underline"
        >
          My Orders
        </Link>
        <Link
          to="/wishlist"
          className="text-zinc-700 hover:text-gray-900 transition-colors duration-500 font-tektur hover:underline"
        >
          Wishlist
        </Link>
        <Link
          // to="/addresses"
          className="text-zinc-700 hover:text-gray-900 transition-colors duration-500 font-tektur hover:underline"
        >
          Addresses
        </Link>
        <Link
          // to="/profile"
          className="text-zinc-700 hover:text-gray-900 transition-colors duration-500 font-tektur hover:underline"
        >
          Profile
        </Link>
        <Link
          // to="/settings"
          className="text-zinc-700 hover:text-gray-900 transition-colors duration-500 font-tektur hover:underline"
        >
          Settings
        </Link>
      </nav>

      <div className="border-t border-gray-200 py-4 sm:py-6"></div>

      <button
        onClick={handleLogout}
        className="w-full bg-gray-900 text-white font-semibold py-2 rounded hover:bg-gray-800 font-tektur"
      >
        LOGOUT
      </button>
    </div>
  );
};

export default ViewProfile;
