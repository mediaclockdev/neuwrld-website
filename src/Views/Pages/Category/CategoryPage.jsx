import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../../components/Breadcrumb";

const CategoryPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const categories = useSelector((state) => state.categories?.categories || []);

  // 🔎 Find current category (Men / Women)
  const currentCategory = categories.find((cat) => cat.slug === slug);

  if (!currentCategory) {
    return <p className="p-6">Category not found</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <Breadcrumb />

        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            {currentCategory.name}
          </h1>
          {currentCategory.children && currentCategory.children.length > 0 && (
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              Explore our collection of {currentCategory.children.length}{" "}
              categories
            </p>
          )}
        </div>

        {/* Category Grid */}
        {currentCategory.children && currentCategory.children.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {currentCategory.children.map((child) => (
              <div
                key={child.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* Category Header */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-5 py-4 border-b border-gray-200">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                    {child.title || child.name}
                  </h2>
                  {child.children && child.children.length > 0 && (
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      {child.children.length} items
                    </p>
                  )}
                </div>

                {/* Subcategories Grid */}
                {child.children && child.children.length > 0 && (
                  <div className="p-4 sm:p-5">
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      {child.children.map((sub) => (
                        <div
                          key={sub.id}
                          className="group cursor-pointer"
                          onClick={() =>
                            navigate(
                              `/products/${slug}/${child.slug}/${sub.slug}`
                            )
                          }
                        >
                          {/* Image Container */}
                          <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 mb-2">
                            {sub.image ? (
                              <>
                                <img
                                  src={sub.image}
                                  alt={sub.title || sub.name}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                  loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                              </>
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400 text-3xl">
                                📦
                              </div>
                            )}
                          </div>

                          {/* Title */}
                          <p className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-gray-900 text-center line-clamp-2">
                            {sub.title || sub.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* View All Button */}
                <div className="px-5 pb-4">
                  <button
                    onClick={() => navigate(`/products/${slug}/${child.slug}`)}
                    className="w-full py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    View All {child.title || child.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="text-gray-400 text-5xl mb-4">📦</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No categories found
            </h3>
            <p className="text-gray-500">Check back later for new items</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
