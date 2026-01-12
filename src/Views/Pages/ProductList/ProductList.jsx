import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL, ALL_APi_LIST } from "../../../api/apiList";

const ProductList = () => {
  const { category, subCategory } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [viewMode, setViewMode] = useState("grid");
  const navigate = useNavigate();

  // Helper function to convert slug to Title Case for API
  const toTitleCase = (slug) => {
    if (!slug) return "";
    return slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join("-");
  };

  // Calculate discount percentage
  const calculateDiscount = (price, oldPrice) => {
    if (!oldPrice) return null;
    const priceNum = parseFloat(price.replace(/[^0-9.]/g, ""));
    const oldPriceNum = parseFloat(oldPrice.replace(/[^0-9.]/g, ""));
    return Math.round(((oldPriceNum - priceNum) / oldPriceNum) * 100);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        // ✅ Use product-listing endpoint with Title Case slugs
        let url = `${BASE_URL}${ALL_APi_LIST.productList}/${toTitleCase(
          category
        )}`;
        if (subCategory) {
          url += `/${toTitleCase(subCategory)}`;
        }

        console.log("FINAL API URL:", url);

        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`HTTP Error: ${res.status}`);
        }

        const result = await res.json();
        console.log("PRODUCT API RESPONSE:", result);

        setProducts(result?.data?.product_variants || []);
      } catch (error) {
        console.error("PRODUCT FETCH ERROR:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, subCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 capitalize">
                {subCategory
                  ? subCategory.replace(/-/g, " ")
                  : category?.replace(/-/g, " ")}
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                {loading
                  ? "Loading..."
                  : `${products.length} ${
                      products.length === 1 ? "product" : "products"
                    }`}
              </p>
            </div>

            {/* Filters & View Toggle */}
            {!loading && products.length > 0 && (
              <div className="flex items-center gap-3">
                {/* View Mode Toggle */}
                {/* <div className="hidden sm:flex items-center gap-1 border border-gray-300 rounded-lg p-1 bg-white">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded transition-all duration-200 ${
                      viewMode === "grid"
                        ? "bg-gray-900 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    aria-label="Grid view"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded transition-all duration-200 ${
                      viewMode === "list"
                        ? "bg-gray-900 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    aria-label="List view"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
                </div> */}
              </div>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-white rounded-xl overflow-hidden border border-gray-100"
              >
                <div className="aspect-[3/4] bg-gray-200"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && products.length === 0 && (
          <div className="text-center py-16 sm:py-24">
            <div className="text-6xl sm:text-7xl mb-4">🛍️</div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters or check back later
            </p>
          </div>
        )}

        {/* Product Grid/List */}
        {!loading && products.length > 0 && (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
                : "space-y-4"
            }
          >
            {products.map((product) => {
              const discount = calculateDiscount(
                product.price,
                product.old_price
              );

              return viewMode === "grid" ? (
                /* Grid View */
                <div
                  key={product.id}
                  className="group bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100"
                  onClick={() => navigate(`/products/${product.product_sku}`)}
                >
                  {/* Image Container */}
                  <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.product_name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {discount && (
                        <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded shadow-md">
                          {discount}% OFF
                        </span>
                      )}
                      {product.out_of_stock && (
                        <span className="bg-gray-900 text-white text-xs font-semibold px-2 py-1 rounded shadow-md">
                          OUT OF STOCK
                        </span>
                      )}
                    </div>

                    {/* Quick Actions */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                        aria-label="Add to wishlist"
                      >
                        <svg
                          className="w-5 h-5 text-gray-700"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                  </div>
                  {/* Product Info */}
                  <div className="p-3 sm:p-4">
                    <h3 className="text-sm sm:text-base font-medium text-gray-900 line-clamp-2 mb-2 group-hover:text-gray-700 transition-colors">
                      {product.product_name}
                    </h3>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-base sm:text-lg font-bold text-gray-900">
                        {product.price}
                      </span>
                      {product.old_price && (
                        <span className="text-xs sm:text-sm text-gray-400 line-through">
                          {product.old_price}
                        </span>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    {/* <button
                      disabled={product.out_of_stock}
                      className={`w-full py-2 sm:py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                        product.out_of_stock
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-gray-900 text-white hover:bg-gray-800 active:scale-95"
                      }`}
                    >
                      {product.out_of_stock ? "Out of Stock" : "Add to Cart"}
                    </button> */}
                  </div>
                </div>
              ) : (
                /* List View */
                <div
                  key={product.id}
                  className="group bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 flex flex-col sm:flex-row gap-4 p-4"
                  onClick={() => navigate(`/products/${product.product_sku}`)}
                >
                  {/* Image */}
                  <div className="relative w-full sm:w-32 h-48 sm:h-40 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.product_name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {discount && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded shadow-md">
                        {discount}% OFF
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between gap-3">
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {product.product_name}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg sm:text-xl font-bold text-gray-900">
                          {product.price}
                        </span>
                        {product.old_price && (
                          <span className="text-sm text-gray-400 line-through">
                            {product.old_price}
                          </span>
                        )}
                      </div>
                      {product.out_of_stock && (
                        <span className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded">
                          Out of Stock
                        </span>
                      )}
                    </div>

                    <button
                      disabled={product.out_of_stock}
                      className={`w-full sm:w-auto px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                        product.out_of_stock
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-gray-900 text-white hover:bg-gray-800 active:scale-95"
                      }`}
                    >
                      {product.out_of_stock ? "Out of Stock" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
