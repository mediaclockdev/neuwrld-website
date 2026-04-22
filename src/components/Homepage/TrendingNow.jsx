import React, { useState } from "react";
import collection from "../../assets/Images/collection.png";
import collection1 from "../../assets/Images/collection2.png";
import collection2 from "../../assets/Images/collection3.png";
import arrow from "../../assets/svg/icons/rightarrow.svg";

const TrendingNow = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="max-w-screen-2xl mx-auto py-4">
      {/* Title */}
      <div className="px-5 mb-4">
        <p className="font-tektur font-medium text-2xl sm:text-[40px] text-white">
          [New Collection]
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0">
        {/* Left: Large Collection Image */}
        <div className="px-5 lg:px-0 lg:pl-5 max-w-[700px] min-h-[320px]">
          <img
            src={collection}
            alt="New Collection"
            className="w-full h-full object-cover  border-5 border-[#979797] border-l-0"
          />
        </div>

        {/* Right: Content Section */}
        <div className="px-5 lg:px-10 xl:px-16 flex flex-col justify-center">
          {/* Heading */}
          <div className="mb-4 lg:mb-6">
            <h2 className="font-tektur text-3xl sm:text-4xl lg:text-5xl xl:text-[70px] ">
              <span className="text-white font-medium">NEW </span>
              <span
                className="font-bold"
                style={{
                  color: "transparent",
                  WebkitTextStroke: "1px #BCC3C4",
                }}
              >
                SEASON
              </span>
            </h2>
            <h2 className="font-tektur text-3xl sm:text-4xl lg:text-5xl xl:text-[70px]">
              <span className="text-white font-medium">NEW </span>
              <span
                className="font-bold"
                style={{
                  color: "transparent",
                  WebkitTextStroke: "1px #BCC3C4",
                }}
              >
                ENERGY
              </span>
            </h2>
          </div>

          {/* Description */}
          <p className="font-tektur text-white/80 text-sm sm:text-base max-w-[460px] mb-6 lg:mb-8 leading-relaxed">
            New collection just dropped. Step into the future of style with our
            latest collection. Hoodies, Jackets, Pants and statement pieces.
          </p>

          {/* Staggered Images Container */}
        <div className="relative h-[240px] sm:h-[260px] lg:h-[280px] mb-4">
    
    {/* Left image — lower start */}
    <div
      className="absolute overflow-hidden"
      style={{ left: 0, top: "40px", width: "42%", height: "100%" }}
    >
      <img
        src={collection1}
        alt="Trending product 1"
        className="w-full h-full object-cover"
      />
    </div>

    {/* Right image — higher start, slightly smaller */}
    <div
      className="absolute overflow-hidden"
      style={{ left: "46%", top: 0, width: "38%", height: "85%" }}
    >
      <img
        src={collection2}
        alt="Trending product 2"
        className="w-full h-full object-cover"
      />
    </div>
  </div>

{/* Shop the collection button — aligned right */}
<div className="flex justify-end">
  <button
    className="relative bg-black text-white py-2.5 px-2.5 flex items-center gap-3 overflow-hidden group cursor-pointer "
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    <span
      className={`absolute inset-0 bg-[#909497] transform transition-transform duration-500 ease-out ${
        isHovered ? "translate-x-0" : "-translate-x-full"
      }`}
    />
    <span
      className={`relative z-10 font-tektur text-base lg:text-xl font-normal transition-colors duration-500 ${
        isHovered ? "text-black" : "text-white"
      }`}
    >
      Shop the collection
    </span>
    <span className="relative z-10 flex items-center transition-transform duration-300 group-hover:translate-x-1">
      <img src={arrow} alt="" className="w-4 h-4 sm:w-5 sm:h-5" />
    </span>
  </button>
</div>
        </div>
      </div>
    </div>
  );
};

export default TrendingNow;
