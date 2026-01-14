import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ProductCard from "../../../components/Product/ProductCard";
import {
  fetchWishlistAPI,
  removeFromWishlistAPI,
} from "../../../features/wishlist/wishlistSlice";

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, loading } = useSelector((s) => s.wishlist);

  useEffect(() => {
    dispatch(fetchWishlistAPI())
      .unwrap()
      .catch((err) => {
        if (err === "NOT_LOGGED_IN") navigate("/login");
      });
  }, [dispatch, navigate]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="h-[340px] rounded-xl bg-gray-100 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
        <button
          onClick={() => navigate("/")}
          className="text-blue-600 underline"
        >
          Continue shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold mb-6">My Wishlist</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <ProductCard
            key={item.product_variant_id}
            item={item}
            showWishlist
            showAddToCart
            onRemoveWishlist={(variantId) =>
              dispatch(removeFromWishlistAPI(variantId))
            }
            onClick={() => navigate(`/products/${item.product_sku}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
