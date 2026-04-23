import React from "react";

const FeaturedCategorySkeleton = () => {
  return (
    <div className="container mx-auto px-4 lg:px-8 py-4 space-y-10 skeleton-shell">
      <div className="flex items-center justify-between mb-8 px-4 lg:px-0">
        <div className="h-6 lg:h-8 w-48 rounded-md skeleton-block" />
        <div className="h-4 w-20 rounded-md skeleton-block" />
      </div>

      <div className="flex gap-8 overflow-x-scroll">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-3">
            <div className="w-32 lg:w-40 h-32 lg:h-40 rounded-full skeleton-block-soft border border-zinc-800" />
            <div className="h-4 w-24 rounded-md skeleton-block" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategorySkeleton;
