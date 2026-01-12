import React from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";

const CheckoutMoreProducts = ({ products = [] }) => {
  const navigate = useNavigate();

  if (!products.length) return null;

  return (
    <div className="space-y-8 pt-16">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">You May Also Like</h2>
        <p className="text-gray-600">
          Handpicked recommendations based on your selection
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((item) => (
          <ProductCard
            key={item.product_variant_id}
            item={item}
            onClick={() => navigate(`/products/${item.product_sku}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default CheckoutMoreProducts;
