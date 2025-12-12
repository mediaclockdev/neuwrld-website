import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const ViewProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, isLoggedIn } = useSelector((state) => state.auth);

  const handleLoginClick = () => {
    navigate("/login", { state: { from: window.location.pathname } });
  };

  const handleLogout = () => {
    dispatch(logout());
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
      <div className="w-full max-w-sm bg-white shadow-lg rounded-lg p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Welcome
        </h2>
        <p className="text-gray-600 text-xs sm:text-sm">
          To access account and manage orders
        </p>
        <button
          onClick={handleLoginClick}
          className="w-full border-2 border-pink-500 text-pink-500 font-semibold py-2 sm:py-3 rounded hover:bg-pink-50 transition-colors"
        >
          LOGIN / SIGNUP
        </button>
      </div>
    );
  }

  /** ✅ LOGGED IN **/
  return (
    <div className="w-full max-w-sm bg-white shadow-lg rounded-lg p-4 sm:p-6">
      {/* User Info */}
      <div className="flex flex-col gap-2 sm:gap-3">
        <h2 className="text-base lg:text-xl font-semibold text-gray-800">
          Hello, {user?.name || user?.email || "User"}
        </h2>
        <p className="text-gray-600 text-xs sm:text-sm">
          Manage your account & orders
        </p>
      </div>

      <div className="border-t border-gray-200 py-4 sm:py-6"></div>

      <nav className="flex flex-col gap-3 sm:gap-4">
        <a
          href="/orders"
          className="text-gray-700 hover:text-pink-500 transition-colors"
        >
          My Orders
        </a>
        <a
          href="/wishlist"
          className="text-gray-700 hover:text-pink-500 transition-colors"
        >
          Wishlist
        </a>
        <a
          href="/addresses"
          className="text-gray-700 hover:text-pink-500 transition-colors"
        >
          Addresses
        </a>
        <a
          href="/profile"
          className="text-gray-700 hover:text-pink-500 transition-colors"
        >
          Profile
        </a>
        <a
          href="/settings"
          className="text-gray-700 hover:text-pink-500 transition-colors"
        >
          Settings
        </a>
      </nav>

      <div className="border-t border-gray-200 py-4 sm:py-6"></div>

      <button
        onClick={handleLogout}
        className="w-full bg-gray-900 text-white font-semibold py-2 rounded hover:bg-gray-800"
      >
        LOGOUT
      </button>
    </div>
  );
};

export default ViewProfile;
