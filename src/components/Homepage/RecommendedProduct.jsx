import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  addToWishlistAPI,
  removeFromWishlistAPI,
} from "../../features/wishlist/wishlistSlice";
import { Star, Heart } from "lucide-react";
import RecommendedProductSkeleton from "./RecommendedProductSkeleton";

const RecommendedProduct = () => {
  const dashboard = useSelector((s) => s.dashboard.data);
  const dashboardState = useSelector((s) => s.dashboard);
  const loading = dashboardState.loading;

  const recommended =
    dashboard?.data?.recommended_products?.map((item) => {
      console.log(
        "🟡 Mapping product:",
        item.product_name,
        "→ variant_id:",
        item.id
      );

      return {
        id: item.id,
        name: item.product_name,
        image: item.image,
        price: item.price,
        old_price: item.old_price,
        discount: item.discount,
        rating: item.avg_rating,
        product_sku: item.product_sku,
        product_variant_id: item.id,
      };
    }) || [];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wishlistItems = useSelector((s) => s.wishlist.items);

  const handleWishlist = (product_variant_id) => {
    console.log("❤️ Wishlist clicked → variant_id:", product_variant_id);

    const isWishlisted = wishlistItems.includes(product_variant_id);

    const action = isWishlisted
      ? removeFromWishlistAPI(product_variant_id)
      : addToWishlistAPI(product_variant_id);

    dispatch(action)
      .unwrap()
      .catch((err) => {
        if (err === "NOT_LOGGED_IN") {
          navigate("/login");
        }
      });
  };
  if (loading) return <RecommendedProductSkeleton />;

  return (
    <div className="w-full  py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Heading Section */}
        <div className="mb-6 sm:mb-8 lg:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-montserrat text-gray-900 mb-2">
                Recommended For You
              </h2>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-3 sm:gap-4 md:gap-5 lg:gap-6 ">
          {recommended.map((product) => (
            <div
              key={product.id}
              className="relative group bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 flex flex-col h-full"
            >
              {/* Wishlist Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  console.log(
                    "🖱️ Heart clicked for:",
                    product.name,
                    "variant_id:",
                    product.id
                  );
                  handleWishlist(product.product_variant_id);
                }}
                className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 bg-white/90 backdrop-blur-sm rounded-full p-1.5 sm:p-2 shadow-md hover:shadow-lg hover:scale-110 active:scale-95 transition-all duration-200"
                aria-label="Add to wishlist"
              >
                <Heart
                  className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-200 ${
                    wishlistItems.includes(product.id)
                      ? "fill-red-500 text-red-500"
                      : "text-gray-400 hover:text-red-400"
                  }`}
                />
              </button>

              <Link
                to={`/products/${product.product_sku}`}
                className="block flex-1  flex-col"
              >
                {/* Image Container */}
                <div className="relative w-full aspect-[3/4] sm:aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                    alt={product.name}
                    loading="lazy"
                  />

                  {/* Discount Badge */}
                  {product.discount && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs sm:text-sm font-bold px-2 py-1 rounded-lg shadow-md">
                      {product.discount}
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content Section */}
                <div className="p-2.5 sm:p-3 lg:p-4 flex flex-col flex-1">
                  {/* Product Name */}
                  <h3 className="font-montserrat text-xs sm:text-sm lg:text-base font-medium text-gray-800 mb-2 sm:mb-3 line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem] leading-snug flex-1">
                    {product.name}
                  </h3>

                  {/* Price Section */}
                  <div className="flex flex-wrap items-baseline gap-1 sm:gap-2 mb-2 sm:mb-3">
                    <span className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                      {product.price}
                    </span>
                    {product.old_price && (
                      <span className="text-xs sm:text-sm text-gray-400 font-medium line-through">
                        {product.old_price}
                      </span>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    {product.avg_rating > 0 ? (
                      <>
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>
                          {product.avg_rating} ({product.total_rating})
                        </span>
                      </>
                    ) : (
                      <span>No ratings yet</span>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {recommended.length === 0 && (
          <div className="text-center py-12 sm:py-16 lg:py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full mb-4">
              <Star className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
              No Recommendations Yet
            </h3>
            <p className="text-sm sm:text-base text-gray-500">
              Check back soon for personalized product suggestions
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendedProduct;
