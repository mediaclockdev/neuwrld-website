import React from "react";

const HeroSkeleton = () => {
  return (
    <div className="relative w-full h-[50vh] md:h-[85vh] min-h-[500px] max-h-[600px] overflow-hidden skeleton-shell">
      <div className="absolute inset-0 skeleton-panel" />
      <div className="absolute inset-0 bg-black/35 z-10" />

      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20 px-5 w-full max-w-4xl">
        <div className="space-y-4 max-w-2xl">
          <div className="h-9 md:h-16 lg:h-20 w-3/4 rounded-md skeleton-block" />
          <div className="h-9 md:h-16 lg:h-20 w-4/5 rounded-md skeleton-block" />
          <div className="h-9 md:h-16 lg:h-20 w-2/3 rounded-md skeleton-block" />
        </div>

        <div className="mt-8 max-w-[395px] rounded-tr-[100px] rounded-bl-[100px] p-6 md:p-8 skeleton-block-soft border border-zinc-800">
          <div className="space-y-3">
            <div className="h-3 w-full rounded skeleton-block" />
            <div className="h-3 w-11/12 rounded skeleton-block" />
            <div className="h-3 w-4/5 rounded skeleton-block" />
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="h-11 w-52 rounded-tr-[5px] rounded-bl-[5px] skeleton-block" />
            <div className="h-11 w-11 rounded-full skeleton-block" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeroSkeleton;
