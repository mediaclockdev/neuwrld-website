import React, { useState } from "react";
import about1 from "../../assets/Images/about1.png";
import about2 from "../../assets/Images/about2.png";
import about3 from "../../assets/Images/about3.png";
import arrow from "../../assets/svg/icons/rightarrow.svg";
import background from "../../assets/svg/background.svg";

const About = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center px-5 py-10 gap-2 lg:gap-10 overflow-hidden">
      {/* Left: Overlapping Images */}
      <div className="relative w-full h-[350px] sm:h-[380px] lg:h-[450px] mx-auto max-w-[480px] lg:max-w-[700px] overflow-visible">
        <img
          src={background}
          alt="background"
          className="absolute -top-10 left-0 lg:left-8 w-[100%] lg:w-[120%] h-[100%] lg:h-[120%] object-cover z-0 rounded-full"
        />
        {/* Image 1 – bottom left */}
        <div
          className="absolute top-[60px] left-[5%] sm:left-[10%] lg:top-[80px] lg:left-0 xl:left-28 w-[140px] h-[200px] sm:w-[180px] sm:h-[260px] lg:w-[220px] lg:h-[320px] rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-[1] transition-transform duration-400 ease-out hover:scale-105 hover:z-10"
          style={{ transform: "rotate(-6deg)" }}
        >
          <img
            src={about1}
            alt="Street style fashion 1"
            className="w-full h-full object-cover block border-[3px] border-[#979797] shadow-lg"
          />
        </div>

        {/* Image 2 – center top */}
        <div
          className="absolute top-[5px] left-[25%] sm:left-[30%] lg:top-[10px] lg:left-[120px] xl:left-[270px] w-[150px] h-[220px] sm:w-[190px] sm:h-[280px] lg:w-[230px] lg:h-[340px] rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-[3] transition-transform duration-400 ease-out hover:scale-105 hover:z-10"
          style={{ transform: "rotate(-3deg)" }}
        >
          <img
            src={about2}
            alt="Street style fashion 2"
            className="w-full h-full object-cover block  border-[3px] border-[#979797] shadow-lg"
          />
        </div>

        {/* Image 3 – right bottom */}
        <div
          className="absolute top-[70px] left-[52%] sm:left-[58%] lg:top-[100px] lg:left-[260px] xl:left-[460px] w-[140px] h-[200px] sm:w-[180px] sm:h-[250px] lg:w-[220px] lg:h-[300px] rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-[2] transition-transform duration-400 ease-out hover:scale-105 hover:z-10"
          style={{ transform: "rotate(5deg)" }}
        >
          <img
            src={about3}
            alt="Street style fashion 3"
            className="w-full h-full object-cover block  border-[3px] border-[#979797] shadow-lg"
          />
        </div>
      </div>

      {/* Right: Content */}
      <div className="flex-1 min-w-0">
        {/* Heading */}
        <h2 className="flex items-center gap-2 sm:gap-4 flex-wrap">
          <span className="font-tektur text-3xl sm:text-4xl lg:text-[70px] font-medium text-white">
            About
          </span>
          <span
            className="font-tektur text-3xl sm:text-4xl lg:text-[70px] font-bold"
            style={{
              color: "transparent",
              WebkitTextStroke: "1px #BCC3C4",
            }}
          >
            NEUWORLD
          </span>
        </h2>

        {/* Description */}
        <p className="font-tektur text-white text-sm lg:text-lg max-w-[610px] mb-5 lg:mb-7">
          To us fashion goes beyond style- it serves as a language of
          expression.Neuworld was born with the purpose of representing those
          people who is willing to be more than real.
        </p>

        {/* White Info Card */}
        <div className="bg-white rounded-tr-[60px] sm:rounded-tr-[100px] rounded-bl-[60px] sm:rounded-bl-[100px] p-4 sm:p-5 max-w-full sm:max-w-[395px] flex flex-col justify-center items-center shadow-lg gap-4">
          <p className="font-tektur text-[#1a1a1a] text-xs sm:text-sm leading-6 sm:leading-7 font-semibold m-0">
            Our collection embody freedom individuality and authenticity.We
            embrace diversity and transform it into a collective cultural
            experience.
          </p>

          {/* CTA Button */}
          <button
            className="relative inline-flex items-center gap-2.5 bg-[#111] text-white border-none py-3 px-5 sm:py-3.5 sm:px-7 font-tektur text-sm sm:text-[15px] font-semibold cursor-pointer overflow-hidden rounded hover:text-[#111] transition-colors duration-400"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span
              className={`absolute inset-0 bg-[#909497] transition-transform duration-500 ease-out ${
                isHovered ? "translate-x-0" : "-translate-x-full"
              }`}
            />
            <span className="relative z-10">More About Us</span>
            <span className="relative z-10 flex items-center">
              <img src={arrow} alt="" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
