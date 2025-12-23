import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const FeaturedCategory = () => {
  const dashboard = useSelector((state) => state.dashboard.data);
  const navigate = useNavigate();

  // extract from trending_categories
  const categories =
    dashboard?.data?.trending_categories?.map((item) => ({
      name: item.name,
      image: item.image,
      slug: item.slug,
      gender: item.gender,
    })) || [];
  console.log("DASHBOARD DATA:", dashboard?.data);
  return (
    <div className="container mx-auto px-4 lg:px-8 py-4 space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 px-4 lg:px-0">
        <h2 className="text-xl lg:text-3xl font-semibold font-montserrat">
          Featured Category
        </h2>

        <button
          onClick={() => navigate("/allcategory")}
          className="text-gray-500 hover:text-gray-700 cursor-pointer text-sm lg:text-base"
        >
          Show All
        </button>
      </div>

      {/* List */}
      <div className="flex justify-between  gap-8 overflow-x-scroll">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="flex flex-col items-center"
            onClick={() => navigate(`/products/${cat.gender}/${cat.slug}`)}
          >
            <div className="w-32 lg:w-40 h-32 lg:h-40 rounded-full overflow-hidden shadow-md hover:scale-105 transition duration-300">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-3 text-base lg:text-xl font-medium text-gray-700  font-montserrat">
              {cat.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategory;
