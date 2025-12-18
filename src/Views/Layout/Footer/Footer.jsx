import React from "react";
import logo2 from "../../../assets/svg/icons/logo2.svg";
import insta from "../../../assets/svg/icons/instagram.svg";
import facebook from "../../../assets/svg/icons/facebook.svg";
import whatsapp from "../../../assets/svg/icons/whatsapp.svg";
import twitter from "../../../assets/svg/icons/twitter.svg";
import youtube from "../../../assets/svg/icons/youtube.svg";

const Footer = () => {
  return (
    <div className="max-w-screen-2xl mx-auto px-5 lg:px-8 py-4 bg-gray-50 shadow-2xl border-t border-gray-50">
      <footer className="space-y-5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 py-2 ">
          <div className="space-y-1 lg:space-y-2">
            <img src={logo2} alt="logo" className="size-16" />
            <p className="text-sm font-inter font-normal text-[#4B5563] ">
              Your ultimate destination for contemporary fashion and timeless
              style.
            </p>
          </div>
          <div className="space-y-2 lg:space-y-3">
            <p className="font-inter font-normal text-base lg:text-lg">
              Company
            </p>
            <ul className="space-y-1 lg:space-y-2 font-inter font-normal text-[#4B5563]">
              <li className="cursor-pointer text-sm lg:text-base">About Us</li>
              <li className="cursor-pointer text-sm lg:text-base">
                Contact Us
              </li>
              <li className="cursor-pointer text-sm lg:text-base">FAQs</li>
              <li className="cursor-pointer text-sm lg:text-base">
                Size Guide
              </li>
            </ul>
          </div>
          <div className="space-y-2 lg:space-y-3">
            <p className="font-inter font-normal text-base lg:text-lg">
              Policies
            </p>
            <ul className="space-y-1 lg:space-y-2 font-inter font-normal text-[#4B5563]">
              <li className="cursor-pointer text-sm lg:text-base ">
                Return Policy
              </li>
              <li className="cursor-pointer text-sm lg:text-base">
                Private Policy
              </li>
              <li className="cursor-pointer text-sm lg:text-base">
                Terms of Service
              </li>
              <li className="cursor-pointer text-sm lg:text-base">
                Shipping Info
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <p>Follows Us</p>
            {/* social icons */}
            <ul className="flex gap-3 items-center ">
              <li>
                <img
                  src={insta}
                  alt="instagram"
                  className="size-4 lg:size-6 cursor-pointer hover:scale-105 transition-transform duration-300"
                />
              </li>
              <li>
                <img
                  src={facebook}
                  alt="facebook"
                  className="size-4 lg:size-6 cursor-pointer hover:scale-105 transition-transform duration-300"
                />
              </li>
              <li>
                <img
                  src={youtube}
                  alt="youtube"
                  className="size-4 lg:size-6 cursor-pointer hover:scale-105 transition-transform duration-300"
                />
              </li>
              <li>
                <img
                  src={whatsapp}
                  alt="whatsapp"
                  className="size-4 lg:size-6 cursor-pointer hover:scale-105 transition-transform duration-300"
                />
              </li>
              <li>
                <img
                  src={twitter}
                  alt="twitter"
                  className="size-4 lg:size-6 cursor-pointer hover:scale-105 transition-transform duration-300"
                />
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#E5E7EB] flex flex-col items-center py-3">
          <p className="text-[#4B5563] font-inter font-normal text-sm lg:text-base">
            © 2025 Fashion Brand. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
