import React from "react";

const RecommendedProductSkeleton = () => {
  return (
    <div className="w-full py-6 sm:py-4 lg:py-8 bg-black skeleton-shell">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="mb-6 sm:mb-8 lg:mb-12">
          <div className="h-8 sm:h-10 w-56 rounded-md skeleton-block" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl sm:rounded-2xl border border-zinc-800 overflow-hidden skeleton-panel"
            >
              <div className="w-full aspect-[3/4] sm:aspect-square skeleton-block-soft" />

              <div className="p-2.5 sm:p-3 lg:p-4 space-y-2">
                <div className="h-4 w-full rounded skeleton-block" />
                <div className="h-4 w-3/4 rounded skeleton-block" />

                <div className="flex gap-2 mt-2">
                  <div className="h-5 w-16 rounded skeleton-block" />
                  <div className="h-4 w-12 rounded skeleton-block" />
                </div>

                <div className="h-3 w-20 rounded skeleton-block mt-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default RecommendedProductSkeleton;
