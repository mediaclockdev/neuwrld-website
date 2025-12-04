import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProductDetails } from "../../features/products/productSlice";

const RecommendedProduct = () => {
  const dashboard = useSelector((s) => s.dashboard.data);

  const recommended =
    dashboard?.data?.recommended_products?.map((item) => ({
      id: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      old_price: item.old_price,
      discount: item.discount,
      rating: item.avg_rating,
      product_sku: item.product_sku,
    })) || [];
  const dispatch = useDispatch();

  return (
    <div className="container mx-auto px-6 lg:px-8 py-4 space-y-10">
      {/* Heading */}
      <div className="flex justify-between items-center px-4 lg:px-0 mb-6">
        <h2 className="text-xl lg:text-3xl font-semibold font-montserrat">
          Recommended Product
        </h2>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-6  ">
        {recommended.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-lg p-3 hover:scale-105 transition-transform duration-300"
          >
            {/* Image */}
            <Link
              to={`/products/${product.product_sku}`}
              onClick={() => dispatch(fetchProductDetails(product.product_sku))}
            >
              <div className="w-full h-44 overflow-hidden rounded-lg">
                <img
                  src={product.image}
                  className="w-full h-full object-cover"
                  alt={product.name}
                />
              </div>
            </Link>

            {/* Name */}
            <p className="font-montserrat text-sm lg:text-base mt-3 truncate">
              {product.name}
            </p>

            {/* Price Section */}
            <div className="mt-2">
              <p className="text-gray-500 line-through text-xs lg:text-sm">
                {product.old_price}
              </p>
              <p className="text-sm lg:text-lg font-semibold">
                {product.price}
              </p>
            </div>

            {/* Bottom Row */}
            <div className="flex justify-between mt-2 items-center">
              <span className="text-yellow-500">⭐ {product.rating}</span>
              <span className="bg-pink-100 text-pink-600 px-2 py-1 rounded-md text-xs lg:text-sm">
                -{product.discount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProduct;
