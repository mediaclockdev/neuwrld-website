/* eslint-disable no-unused-vars */
import React, { useMemo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchCartAPI,
  updateQuantityAPI,
  removeFromCartAPI,
  updateQuantityLocal,
  removeItemLocal,
} from "../../features/cart/cartSlice";

import close from "../../assets/svg/icons/close.svg";

/* ----------------------------------
   Helpers
---------------------------------- */
const parsePrice = (value) => Number(String(value).replace(/[^0-9.]/g, ""));

/* ----------------------------------
   Skeletons
---------------------------------- */
const CartItemSkeleton = () => (
  <div className="flex gap-6 animate-pulse">
    <div className="w-32 h-32 bg-gray-200 rounded" />
    <div className="flex-1 space-y-3">
      <div className="h-4 w-2/3 bg-gray-200 rounded" />
      <div className="h-3 w-1/3 bg-gray-200 rounded" />
      <div className="h-8 w-24 bg-gray-200 rounded" />
    </div>
  </div>
);

const SummarySkeleton = () => (
  <div className="space-y-3 animate-pulse">
    <div className="h-4 bg-gray-200 rounded" />
    <div className="h-4 bg-gray-200 rounded" />
    <div className="h-4 bg-gray-200 rounded" />
    <div className="h-6 bg-gray-300 rounded mt-4" />
  </div>
);

/* ----------------------------------
   Main Cart
---------------------------------- */
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = useSelector((state) => state.cart.items || []);
  const summary = useSelector((state) => state.cart.summary || {});
  const loading = useSelector((state) => state.cart.loading);

  const [updating, setUpdating] = useState(false);

  /* ----------------------------------
     Initial fetch
  ---------------------------------- */
  useEffect(() => {
    dispatch(fetchCartAPI());
  }, [dispatch]);

  /* ----------------------------------
     Derived values
  ---------------------------------- */
  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + Number(item.quantity || 0), 0),
    [items]
  );

  /* ----------------------------------
     Handlers
  ---------------------------------- */
  const handleIncrease = async (item) => {
    const newQty = item.quantity + 1;

    dispatch(
      updateQuantityLocal({
        product_variant_id: item.product_variant_id,
        quantity: newQty,
      })
    );

    setUpdating(true);

    try {
      await dispatch(
        updateQuantityAPI({
          product_variant_id: item.product_variant_id,
          quantity: newQty,
        })
      ).unwrap();

      // FULL REFRESH
      dispatch(fetchCartAPI());
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  const handleDecrease = async (item) => {
    if (item.quantity <= 1) return;

    const newQty = item.quantity - 1;

    dispatch(
      updateQuantityLocal({
        product_variant_id: item.product_variant_id,
        quantity: newQty,
      })
    );

    setUpdating(true);

    try {
      await dispatch(
        updateQuantityAPI({
          product_variant_id: item.product_variant_id,
          quantity: newQty,
        })
      ).unwrap();

      dispatch(fetchCartAPI());
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  const handleRemove = async (item) => {
    dispatch(removeItemLocal(item.product_variant_id));
    setUpdating(true);

    try {
      await dispatch(removeFromCartAPI(item.product_variant_id)).unwrap();

      dispatch(fetchCartAPI());
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  /* ----------------------------------
     Empty cart
  ---------------------------------- */
  if (!loading && !items.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2>Your cart is empty</h2>
      </div>
    );
  }

  /* ----------------------------------
     Render
  ---------------------------------- */
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-semibold">Cart</h1>
        <p className="text-gray-500">{totalItems} items</p>

        <div className="grid lg:grid-cols-12 gap-10 mt-10">
          {/* LEFT */}
          <div className="lg:col-span-7 space-y-6">
            {loading
              ? Array.from({ length: 2 }).map((_, i) => (
                  <CartItemSkeleton key={i} />
                ))
              : items.map((item) => (
                  <div key={item.id} className="flex gap-6">
                    <img
                      src={item.image}
                      alt={item.product_name}
                      className="w-32 h-32 object-cover rounded"
                    />

                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium text-lg">
                            {item.product_name}
                          </h3>

                          {item.attributes && (
                            <div className="text-sm text-gray-500 mt-1">
                              {Object.entries(item.attributes).map(
                                ([key, value]) => (
                                  <span key={key} className="mr-3">
                                    {key}: {value}
                                  </span>
                                )
                              )}
                            </div>
                          )}
                        </div>

                        <button onClick={() => handleRemove(item)}>
                          <img src={close} className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-4 mt-3 bg-gray-100 px-3 py-1 w-max rounded">
                        <button
                          onClick={() => handleDecrease(item)}
                          disabled={updating}
                        >
                          -
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          onClick={() => handleIncrease(item)}
                          disabled={updating}
                        >
                          +
                        </button>
                      </div>

                      <p className="text-lg font-semibold mt-3">
                        $
                        {(
                          parsePrice(item.unit_price) * Number(item.quantity)
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-5 bg-gray-50 p-6 rounded-lg">
            <h2 className="font-semibold text-lg mb-4">Summary</h2>

            {loading || updating ? (
              <SummarySkeleton />
            ) : (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{summary.subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>+{summary.total_tax}</span>
                </div>

                <div className="flex justify-between">
                  <span>Discount</span>
                  <span>-{summary.discount}</span>
                </div>

                <div className="flex justify-between mt-4 border-t pt-3">
                  <span>Total</span>
                  <span className="font-semibold text-xl">
                    {summary.final_amount}
                  </span>
                </div>
              </div>
            )}

            <button
              onClick={() => navigate("/checkout")}
              disabled={updating}
              className="w-full mt-6 bg-black text-white py-3 rounded disabled:opacity-60"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
