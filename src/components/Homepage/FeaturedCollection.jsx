import React from "react";
import { useSelector } from "react-redux";

const FeaturedCategory = () => {
  const dashboard = useSelector((state) => state.dashboard.data);

  // extract from trending_categories
  const categories =
    dashboard?.data?.trending_categories?.map((item) => ({
      name: item.name,
      image: item.image,
    })) || [];
  console.log("DASHBOARD DATA:", dashboard?.data);
  return (
    <div className="container mx-auto px-6 lg:px-8 py-4 space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 px-4 lg:px-0">
        <h2 className="text-xl lg:text-3xl font-semibold font-montserrat">
          Featured Category
        </h2>

        <button className="text-gray-500 hover:text-gray-700 cursor-pointer text-sm lg:text-base">
          Show All
        </button>
      </div>

      {/* List */}
      <div className="flex flex-wrap justify-center lg:justify-start gap-8">
        {categories.map((cat, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden shadow-md hover:scale-105 transition duration-300">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-3 text-lg font-medium text-gray-700 font-montserrat">
              {cat.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategory;
