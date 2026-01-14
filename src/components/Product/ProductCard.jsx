import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

const ProductCard = ({ item, showWishlist = false, onRemoveWishlist }) => {
  const navigate = useNavigate();

  return (
    <div
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-gray-200"
      onClick={() => navigate(`/products/${item.product_sku}`)}
    >
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
        <img
          src={item.image}
          alt={item.product_name}
          className="w-full h-full object-top object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {item.is_discount && (
            <div className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
              {item.discount} OFF
            </div>
          )}
          {item.out_of_stock && (
            <div className="bg-gray-900 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-lg">
              Out of Stock
            </div>
          )}
        </div>

        {/* Wishlist remove icon */}
        {showWishlist && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemoveWishlist(item.product_variant_id);
            }}
            className="absolute top-3 right-3 bg-white rounded-full p-2 shadow"
          >
            <Heart className="w-5 h-5 fill-red-500 text-red-500" />
          </button>
        )}
      </div>

      {/* Product Info */}
      <div className="p-5 space-y-3">
        <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
          {item.category}
        </p>

        <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {item.product_name}
        </h3>

        <div className="flex items-center gap-2">
          <p className="font-bold text-xl text-gray-900">{item.price}</p>

          {item.old_price && (
            <p className="line-through text-sm text-gray-400">
              {item.old_price}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          {!item.out_of_stock ? (
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <p className="text-sm font-medium text-green-600">In Stock</p>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-red-500 rounded-full" />
              <p className="text-sm font-medium text-red-500">Out of Stock</p>
            </div>
          )}

          <p className="text-sm text-gray-400">View Details →</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
