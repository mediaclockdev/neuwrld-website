import React from "react";

const HeroSkeleton = () => {
  return (
    <div className="relative w-full h-[35vh] md:h-[75vh] lg:h-[85vh] overflow-hidden">
      {/* Background shimmer */}
      <div className="absolute inset-0 bg-gray-300 animate-pulse" />

      {/* Optional content skeleton (center) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-48 bg-gray-400 rounded-md animate-pulse" />
          <div className="h-5 w-64 bg-gray-400 rounded-md animate-pulse" />
          <div className="h-10 w-32 bg-gray-400 rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  );
};
export default HeroSkeleton;
