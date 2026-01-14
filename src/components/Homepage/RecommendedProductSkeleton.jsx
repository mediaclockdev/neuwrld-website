import React from "react";

const RecommendedProductSkeleton = () => {
  return (
    <div className="w-full py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Heading Skeleton */}
        <div className="mb-6 sm:mb-8 lg:mb-12">
          <div className="h-8 sm:h-10 w-56 bg-gray-200 rounded-md" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 overflow-hidden"
            >
              {/* Image Skeleton */}
              <div className="w-full aspect-[3/4] sm:aspect-square bg-gray-200" />

              {/* Content Skeleton */}
              <div className="p-2.5 sm:p-3 lg:p-4 space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-3/4 bg-gray-200 rounded" />

                <div className="flex gap-2 mt-2">
                  <div className="h-5 w-16 bg-gray-200 rounded" />
                  <div className="h-4 w-12 bg-gray-200 rounded" />
                </div>

                <div className="h-3 w-20 bg-gray-200 rounded mt-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default RecommendedProductSkeleton;
