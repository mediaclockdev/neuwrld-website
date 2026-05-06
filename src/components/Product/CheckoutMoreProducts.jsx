import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlistAPI,
  removeFromWishlistAPI,
} from "../../features/wishlist/wishlistSlice";
import ProductCard from "./ProductCard";

const CheckoutMoreProducts = ({ products = [] }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const wishlistItems = useSelector((s) => s.wishlist.items || []);

  const isInWishlist = (variantId) =>
    wishlistItems.some(
      (item) => String(item.product_variant_id) === String(variantId)
    );

  const handleWishlist = (variantId) => {
    const action = isInWishlist(variantId)
      ? removeFromWishlistAPI(variantId)
      : addToWishlistAPI(variantId);

    dispatch(action)
      .unwrap()
      .catch((err) => {
        if (err === "NOT_LOGGED_IN") {
          navigate("/login");
        }
      });
  };

  if (!products.length) return null;

  return (
    <div className="space-y-8 pt-16">
      <div>
        <h2 className="text-3xl font-semibold text-gray-50 font-tektur ">You May Also Like</h2>
        <p className="text-gray-300 font-tektur ">
          Handpicked recommendations based on your selection
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((item) => (
          <ProductCard
            key={item?.product_variant_id}
            item={item}
            isWishlisted={isInWishlist(item?.product_variant_id || item?.id)}
            onWishlistClick={handleWishlist}
            onClick={() => navigate(`/products/${item.product_sku}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default CheckoutMoreProducts;
