import React from "react";
import { Link } from "react-router-dom";
import logo2 from "../../../assets/svg/icons/logo2.svg";
import insta from "../../../assets/svg/icons/instagram.svg";
import facebook from "../../../assets/svg/icons/facebook.svg";
import whatsapp from "../../../assets/svg/icons/whatsapp.svg";
import twitter from "../../../assets/svg/icons/twitter.svg";
import youtube from "../../../assets/svg/icons/youtube.svg";

const Footer = () => {
  return (
    <div className=" bg-black border-t border-zinc-800">
      <footer className="space-y-5 max-w-screen-2xl mx-auto px-5 lg:px-8 py-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 py-2 ">
          <div className="space-y-1 lg:space-y-2">
            <Link to="/">
              <img src={logo2} alt="logo" className="size-16" />
            </Link>
            <p className="text-sm font-inter font-normal text-zinc-400 font-tektur">
              Your ultimate destination for contemporary fashion and timeless
              style.
            </p>
          </div>
          <div className="space-y-2 lg:space-y-3">
            <p className="font-inter font-normal text-base lg:text-lg text-zinc-100  font-tektur">
              Company
            </p>
            <ul className="space-y-1 lg:space-y-2 font-inter font-normal text-zinc-400  font-tektur">
              <li className="cursor-pointer text-sm lg:text-base font-tektur hover:text-white transition-colors duration-300">
                About Us
              </li>
              <li className="cursor-pointer text-sm lg:text-base font-tektur hover:text-white transition-colors duration-300">
                Contact Us
              </li>
              <li className="cursor-pointer text-sm lg:text-base font-tektur hover:text-white transition-colors duration-300">
                FAQs
              </li>
              <li className="cursor-pointer text-sm lg:text-base font-tektur hover:text-white transition-colors duration-300">
                Size Guide
              </li>
            </ul>
          </div>
          <div className="space-y-2 lg:space-y-3">
            <p className="font-inter font-normal text-base lg:text-lg text-zinc-100 font-tektur">
              Policies
            </p>
            <ul className="space-y-1 lg:space-y-2 font-inter font-normal text-zinc-400 font-tektur">
              <li className="cursor-pointer text-sm lg:text-base font-tektur hover:text-white transition-colors duration-300">
                Return Policy
              </li>
              <li className="cursor-pointer text-sm lg:text-base font-tektur hover:text-white transition-colors duration-300">
                Private Policy
              </li>
              <li className="cursor-pointer text-sm lg:text-base font-tektur hover:text-white transition-colors duration-300">
                Terms of Service
              </li>
              <li className="cursor-pointer text-sm lg:text-base font-tektur hover:text-white transition-colors duration-300">
                Shipping Info
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <p className="text-zinc-100 font-tektur ">Follows Us</p>
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
        <div className="border-t border-zinc-800 flex flex-col items-center py-3">
          <p className="text-zinc-400 font-inter font-normal text-sm lg:text-base font-tektur">
            © 2026 Neuwrld. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
