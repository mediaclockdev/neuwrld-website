import React, { useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  removeFromCartAPI,
  updateQuantityAPI,
  fetchCartAPI,
} from "../../features/cart/cartSlice";
import close from "../../assets/svg/icons/close.svg";

const cleanNumber = (value) => {
  if (!value) return 0;
  return Number(String(value).replace(/[^0-9.]/g, ""));
};

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
  useEffect(() => {
    dispatch(fetchCartAPI());
  }, [dispatch]);

  const handleRemove = (item) => {
    console.log("Removing:", item); 
    dispatch(removeFromCartAPI(item.product_variant_id));
  };

  const handleIncrease = (item) => {
    dispatch(
      updateQuantityAPI({
        product_variant_id: item.product_variant_id,
        quantity: Number(item.quantity) + 1,
      })
    );
  };

  const handleDecrease = (item) => {
    dispatch(
      updateQuantityAPI({
        product_variant_id: item.product_variant_id,
        quantity: Math.max(1, Number(item.quantity) - 1),
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
        <h1 className="text-4xl font-bold">Cart</h1>
        <p className="text-gray-500">{totalItems} items</p>

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
                    <h3 className="font-semibold">{item.name}</h3>

                    <button onClick={() => handleRemove(item)}>
                      <img src={close} className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-4 mt-3 bg-gray-100 px-3 py-1 w-max rounded">
                    <button onClick={() => handleDecrease(item)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncrease(item)}>+</button>
                  </div>

                  <p className="text-lg font-semibold mt-3">
                    ₹ {cleanNumber(item.price) * Number(item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-5 bg-gray-50 p-6 rounded-lg">
            <h2 className="font-bold text-lg mb-4">Summary</h2>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹ {cleanNumber(summary?.subtotal)}</span>
              </div>

              <div className="flex justify-between">
                <span>Discount</span>
                <span>- ₹ {cleanNumber(summary?.discount)}</span>
              </div>

              <div className="flex justify-between mt-4 border-t pt-3">
                <span>Total</span>
                <span className="font-bold text-xl">
                  ₹ {cleanNumber(summary?.grand_total)}
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full mt-6 bg-black text-white py-3 rounded"
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
