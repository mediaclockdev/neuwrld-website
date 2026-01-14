import React from "react";

const FeaturedCategorySkeleton = () => {
  return (
    <div className="container mx-auto px-4 lg:px-8 py-4 space-y-10">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between mb-8 px-4 lg:px-0">
        <div className="h-6 lg:h-8 w-48 bg-gray-200 rounded-md animate-pulse" />
        <div className="h-4 w-20 bg-gray-200 rounded-md animate-pulse" />
      </div>

      {/* Categories Skeleton */}
      <div className="flex gap-8 overflow-x-scroll">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-3">
            <div className="w-32 lg:w-40 h-32 lg:h-40 rounded-full bg-gray-200 animate-pulse" />
            <div className="h-4 w-24 bg-gray-200 rounded-md animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategorySkeleton;
