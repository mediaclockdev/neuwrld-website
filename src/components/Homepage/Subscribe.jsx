import React from "react";

const Subscribe = () => {
  return (
    <div className="bg-black">
      <div className="container mx-auto px-8 py-8 ">
        <div className="flex flex-col items-center space-y-6 text-white">
          <div className="flex flex-col items-center space-y-3 lg:space-y-4">
            <p className="text-lg lg:text-2xl">Stay in Style</p>
            <p className="text-sm lg:text-lg font-inter font-normal text-[#D1D5DB]">
              Subscribe to our newsletter for exclusive offers and latest
              fashion updates
            </p>
          </div>

          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-l-md focus:outline-none text-black bg-white"
            />
            <button className="bg-white text-black font-inter font-normal px-4 py-2 rounded-r-md hover:bg-gray-200 transition-all duration-300 cursor-pointer">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
