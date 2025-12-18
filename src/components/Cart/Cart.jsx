import React, { useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  removeFromCartAPI,
  updateQuantityAPI,
  fetchCartAPI,
  updateQuantityLocal,
  removeItemLocal,
} from "../../features/cart/cartSlice";

import close from "../../assets/svg/icons/close.svg";

const parsePrice = (value) => Number(String(value).replace(/[^0-9.]/g, ""));

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = useSelector((state) => state.cart.items || []);
  const summary = useSelector((state) => state.cart.summary || {});
  const loading = useSelector((state) => state.cart.loading);

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + Number(item.quantity || 0), 0),
    [items]
  );
  // 🔹 Subtotal from cart items
  const calculatedSubtotal = useMemo(() => {
    return items.reduce(
      (sum, item) => sum + parsePrice(item.price) * Number(item.quantity),
      0
    );
  }, [items]);

  // 🔹 Tax (use backend value if available, else fallback)
  const TAX_RATE = 0.02; // 2%

  const calculatedTax = useMemo(() => {
    return calculatedSubtotal * TAX_RATE;
  }, [calculatedSubtotal]);

  // 🔹 Discount (keep 0 or extend later)
  const calculatedDiscount = 0;

  // 🔹 Final total
  const calculatedTotal = useMemo(() => {
    return calculatedSubtotal + calculatedTax - calculatedDiscount;
  }, [calculatedSubtotal, calculatedTax, calculatedDiscount]);

  useEffect(() => {
    dispatch(fetchCartAPI());
  }, [dispatch]);

  const handleRemove = (item) => {
    // ✅ remove instantly
    dispatch(removeItemLocal(item.product_variant_id));

    // ✅ sync backend
    dispatch(removeFromCartAPI(item.product_variant_id));
  };

  const handleIncrease = (item) => {
    const newQty = item.quantity + 1;

    // optimistic update
    dispatch(
      updateQuantityLocal({
        product_variant_id: item.product_variant_id,
        quantity: newQty,
      })
    );

    dispatch(
      updateQuantityAPI({
        product_variant_id: item.product_variant_id,
        quantity: newQty,
      })
    );
  };

  const handleDecrease = (item) => {
    if (Number(item.quantity) <= 1) return;

    const newQty = Number(item.quantity) - 1;

    dispatch(
      updateQuantityLocal({
        product_variant_id: item.product_variant_id,
        quantity: newQty,
      })
    );

    dispatch(
      updateQuantityAPI({
        product_variant_id: item.product_variant_id,
        quantity: newQty,
      })
    );
  };

  if (loading) return <p className="p-6">Loading cart...</p>;

  if (!items.length)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2>Your cart is empty</h2>
      </div>
    );
  console.log("CART ITEMS:", items);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-semibold font-montserrat">Cart</h1>
        <p className="text-gray-500 font-montserrat">{totalItems} items</p>

        <div className="grid lg:grid-cols-12 gap-10 mt-10">
          <div className="lg:col-span-7 space-y-6">
            {items.map((item) => (
              <div key={item.id} className="flex gap-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded"
                />

                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium font-montserrat tracking-tighter text-lg">
                      {item.name}
                    </h3>

                    <button onClick={() => handleRemove(item)}>
                      <img src={close} className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-4 mt-3 bg-gray-100 px-3 py-1 w-max rounded">
                    <button
                      onClick={() => handleDecrease(item)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => handleIncrease(item)}
                      disabled={item.quantity >= 5}
                    >
                      +
                    </button>
                  </div>

                  <p className="text-lg font-semibold mt-3 font-montserrat">
                    ${parsePrice(item.price) * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-5 bg-gray-50 p-6 rounded-lg">
            <h2 className="font-semibold text-lg mb-4 font-montserrat">
              Summary
            </h2>

            <div className="space-y-2">
              <div className="flex justify-between font-montserrat s">
                <span>Subtotal</span>
                <span>$ {calculatedSubtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between font-montserrat">
                <span>Tax</span>
                <span>+ {calculatedTax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between font-montserrat">
                <span>Discount</span>
                <span>- ${calculatedDiscount.toFixed(2)}</span>
              </div>

              <div className="flex justify-between mt-4 border-t pt-3 font-montserrat">
                <span>Total</span>
                <span className="font-semibold text-xl">
                  $ {calculatedTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full mt-6 bg-black text-white py-3 rounded font-montserrat"
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
