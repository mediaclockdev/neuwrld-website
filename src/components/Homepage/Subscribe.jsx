import { useState } from "react";
import React from "react";
import subscribeimg from "../../assets/Images/subscribeimage.png";

const Subscribe = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative w-full h-[50vh] md:h-[85vh] min-h-[500px] max-h-[900px] overflow-visible">
      <img
        src={subscribeimg}
        alt="image"
        className="absolute inset-0 w-full h-full object-cover object-top  transition-opacity duration-1000 "
      />
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div className="absolute left-0 top-16 lg:top-1/2 lg:-translate-y-1/2 z-30 px-5">
        <p className="text-white font-tektur uppercase space-y-4">
          <span className="block text-3xl md:text-6xl lg:text-[80px] font-bold">
            Stay Ahead.Get
          </span>
          {/* --- FIX 2: CULTURE highlighted with dark box --- */}
          <p className="block text-3xl md:text-6xl lg:text-[90px] font-bold font-tektur">
            <span className="bg-black  px-2 py-1 inline-block font-bold"
             style={{
                color: "transparent",
                WebkitTextStroke: "1px #BCC3C4",
              }}>
              EXCLUSIVE{" "}
            </span>{" "}
            DROPS.
          </p>
        </p>
      </div>
      <div className="absolute right-0 bottom-10  z-30 px-5">
        <div className="mt-8 bg-white rounded-tr-[100px] rounded-bl-[100px] p-5 max-w-[395px] flex flex-col justify-center items-center">
          <div className="space-y-2">
            <p className="text-black text-sm lg:text-lg font-medium font-tektur">
              Sign up for early access, to limited releases and exclusive drops
            </p>
            <p className=" text-sm lg:text-lg font-medium font-tektur text-black">
              E-mail
            </p>
            <input
              type="email"
              className="bg-[#EFEDED] font-tektur text-[#979797] text-xs placeholder:text-white font-tektur py-2 px-2 rounded-lg"
              placeholder="Enter Email..."
            />
          </div>
          {/* --- FIX 4: Button with proper slide-in bg + arrow icon --- */}
          <button
            className="relative mt-5 bg-black text-white font-bold py-2.5 px-2.5 flex items-center gap-4 text-sm overflow-hidden group cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span
              className={`absolute inset-0 bg-[#909497] transform transition-transform duration-500 ease-out ${
                isHovered ? "translate-x-0" : "-translate-x-full"
              }`}
            />
            <span
              className={`relative z-10 font-tektur text-base lg:text-xl font-normal transition-colors duration-500 ${isHovered ? "text-black" : "text-white"}`}
            >
              Join The Club
            </span>
            <span
              className={`relative z-10 transition-colors duration-500 ${isHovered ? "text-black" : "text-white"}`}
            >
              &gt;
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
