import React from "react";
import her from "../../assets/svg/forher.svg";
import him from "../../assets/svg/forhim.svg";
import { Link } from "react-router-dom"; 

const Trendsetters = () => {
  return (
    <div className="max-w-screen-2xl mx-auto pb-10 pt-4">
      <p className="font-tektur text-3xl lg:text-[70px] text-white font-medium  lg:text-center mb-5 px-5 lg:px-0">
        Trendsetters
      </p>
      <div className="flex flex-col lg:flex-row w-full items-stretch overflow-hidden">
        <div className="w-full lg:w-1/2">
          <Link to="/category/women">
            <img src={her} alt="For Her" className="w-full h-full object-cover block" />
          </Link>
        </div>
        <div className="w-full lg:w-1/2">
          <Link to="/category/men">
            <img src={him} alt="For Him" className="w-full h-full object-cover block" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Trendsetters;
