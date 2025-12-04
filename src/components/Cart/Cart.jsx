import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../features/cart/cartSlice";
import close from "../../assets/svg/icons/close.svg";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const user = useSelector((state) => state.auth?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0),
    [cartItems]
  );

  const handleCheckout = () => {
    if (!user) {
      setShowLoginPopup(true);
    } else {
      navigate("/checkout");
    }
  };

  const handleClosePopup = () => {
    setShowLoginPopup(false);
  };

  const handleGoToLogin = () => {
    setShowLoginPopup(false);
    navigate("/login");
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="text-center space-y-6 max-w-md">
          <div className="relative">
            <div className="absolute inset-0 bg-gray-100 rounded-full blur-3xl opacity-30"></div>
            <svg
              className="w-32 h-32 mx-auto text-gray-200 relative"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-nexaReg text-gray-900 tracking-tight">
              Your cart is empty
            </h2>
            <p className="text-gray-400 font-nexaReg text-sm">
              Discover something beautiful
            </p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="group mt-8 px-8 py-3.5 bg-black text-white font-nexaReg text-sm tracking-wide hover:bg-gray-900 transition-all duration-300 hover:scale-105"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Minimal Header */}
        <div className="mb-12">
          <h1 className="font-nexaReg text-4xl lg:text-5xl tracking-tight text-gray-900 mb-2">
            Cart
          </h1>
          <p className="text-gray-400 font-nexaReg text-sm tracking-wide">
            {totalItems} {totalItems === 1 ? "ITEM" : "ITEMS"}
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Cart Items */}
          <div className="lg:col-span-7 space-y-8">
            {cartItems.map((item, index) => (
              <div
                key={item.id}
                className="group relative"
                style={{
                  animation: `fadeIn 0.4s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className="flex gap-6">
                  {/* Image */}
                  <div className="relative flex-shrink-0 w-32 h-32 sm:w-40 sm:h-40 bg-gray-50 overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-grow flex flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-nexabold text-lg text-gray-900 tracking-tight pr-4">
                          {item.name}
                        </h3>
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-1.5 hover:bg-gray-100 rounded-full"
                          aria-label="Remove item"
                        >
                          <img src={close} alt="" className="w-4 h-4" />
                        </button>
                      </div>
                      {item.description && (
                        <p className="text-gray-400 font-roboto text-xs leading-relaxed line-clamp-1">
                          {item.description}
                        </p>
                      )}
                    </div>

                    <div className="flex justify-between items-end mt-4">
                      {/* Quantity */}
                      <div className="flex items-center gap-4 bg-gray-50 px-4 py-2">
                        <button
                          onClick={() => dispatch(decreaseQuantity(item.id))}
                          className="text-gray-600 hover:text-black transition-colors text-sm"
                          aria-label="Decrease"
                        >
                          −
                        </button>
                        <span className="font-nexaReg text-sm min-w-[1.5ch] text-center">
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() => dispatch(increaseQuantity(item.id))}
                          className="text-gray-600 hover:text-black transition-colors text-sm"
                          aria-label="Increase"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <p className="font-nexaReg text-base text-gray-900">
                        ₹{" "}
                        {(
                          parseFloat(
                            item.price.toString().replace(/[^0-9.-]+/g, "")
                          ) * (item.quantity || 1)
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Separator Line */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mt-8"></div>
              </div>
            ))}
          </div>

          {/* Order Summary - Minimal Sidebar */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-8 space-y-8">
              {/* Summary Box */}
              <div className="bg-gray-50 p-8 space-y-6">
                <h2 className="font-nexaReg text-xs tracking-widest text-gray-400 uppercase">
                  Summary
                </h2>

                <div className="space-y-4 pt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-nexaReg text-sm">
                      Subtotal
                    </span>
                    <span className="font-nexaReg text-sm">
                      ₹ {totalAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-nexaReg text-sm">
                      Shipping
                    </span>
                    <span className="font-nexaReg text-sm text-gray-900">
                      Free
                    </span>
                  </div>
                  <div className="h-px bg-gray-200 my-4"></div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-nexabold text-base tracking-tight">
                      Total
                    </span>
                    <span className="font-nexabold text-xl tracking-tight">
                      ₹ {totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-black text-white py-4 font-nexaReg text-sm tracking-widest uppercase hover:bg-gray-900 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Checkout
                </button>

                <button
                  onClick={() => navigate("/")}
                  className="w-full text-center py-3 font-nexaReg text-xs tracking-wider text-gray-500 hover:text-black transition-colors uppercase"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Minimal Login Modal */}
      {showLoginPopup && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white max-w-sm w-full p-8 shadow-2xl relative animate-slideUp">
            <button
              onClick={handleClosePopup}
              className="absolute top-6 right-6 p-2 hover:bg-gray-100 transition-colors rounded-full"
              aria-label="Close"
            >
              <img src={close} alt="" className="w-4 h-4" />
            </button>

            <div className="space-y-6 pt-4">
              <div className="space-y-2">
                <h3 className="font-nexabold text-2xl tracking-tight">
                  Sign in
                </h3>
                <p className="font-nexaReg text-sm text-gray-500">
                  Please log in to continue with your order
                </p>
              </div>

              <div className="space-y-3 pt-4">
                <button
                  onClick={handleGoToLogin}
                  className="w-full bg-black text-white py-3.5 font-nexaReg text-sm tracking-wide hover:bg-gray-900 transition-all"
                >
                  Log In
                </button>
                <button
                  onClick={handleClosePopup}
                  className="w-full text-center py-3 font-nexaReg text-xs text-gray-500 hover:text-black transition-colors uppercase tracking-wider"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Cart;