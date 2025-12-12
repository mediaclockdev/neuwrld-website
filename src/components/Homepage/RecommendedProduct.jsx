import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Star, TrendingUp } from "lucide-react";

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

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8">
      {/* Heading with accent */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="w-7 h-7 " />
          <h2 className="text-2xl lg:text-4xl font-medium   ">
            Recommended For You
          </h2>
        </div>
        <div className="h-1 w-24  rounded-full"></div>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recommended.map((product) => (
          <div
            key={product.id}
            className="group  rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
          >
            <Link
              to={`/products/${product.product_sku}`}
              // onClick={() => dispatch(fetchProductDetails(product.product_sku))}
              className="block"
            >
              {/* Image Container with Discount Badge */}
              <div className="relative w-full h-52 overflow-hidden ">
                <img
                  src={product.image}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  alt={product.name}
                />
                {/* Discount Badge */}
                {product.discount && (
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                    -{product.discount}
                  </div>
                )}
                {/* Overlay on hover */}
                <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300"></div>
              </div>
            </Link>

            {/* Content Section */}
            <div className="p-4">
              {/* Product Name */}
              <h3 className="font-montserrat text-sm lg:text-base font-medium text-gray-800 mb-3 line-clamp-2 min-h-[2.5rem] leading-tight">
                {product.name}
              </h3>

              {/* Price Section */}
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-lg lg:text-xl font-bold text-gray-900">
                  {product.price}
                </span>
                {product.old_price && (
                  <span className="text-xs lg:text-sm text-gray-400 line-through">
                    {product.old_price}
                  </span>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg px-3 py-2 w-fit">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-semibold text-gray-700">
                  {product.rating}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProduct;
