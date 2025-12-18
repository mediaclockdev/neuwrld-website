import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AllCategory = () => {
  const navigate = useNavigate();

  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );

  if (loading) return <p className="p-6">Loading categories...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-2xl font-semibold mb-6">All Categories</h2>

      <div className="grid grid-cols-2 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className=" cursor-pointer hover:shadow py-2 px-4 rounded-xl space-y-2"
            onClick={() => navigate(`/category/${cat.slug}`)}
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-52 object-cover object-top rounded "
            />

            <h3 className="text-lg font-medium">{cat.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCategory;
