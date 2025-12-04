import React from "react";
import logo2 from "../../assets/svg/icons/logo2.svg";
import { Link } from "react-router-dom";

const Forgetpass = () => {
  return (
    <div className="bg-gray-50 min-h-screen ">
      <div className="flex justify-center w-full items-center">
        <Link to={"/"}>
          <img src={logo2} alt="logo" className="size-24 " />
        </Link>
      </div>
      <div className="max-w-md mx-auto flex flex-col items-center justify-center px-8 py-7 bg-white shadow-md rounded-lg   ">
        <div className="flex flex-col items-center space-y-2 ">
          <p className="font-inter text-sm">YOUR ACCOUNT</p>
          <h1 className="font-inter text-3xl font-normal">
            Forget your password
          </h1>
        </div>
        <div className="w-full max-w-sm py-5">
          <form className="flex flex-col space-y-5  ">
            {/* Email */}
            <label className="flex flex-col  font-inter text-base">
              Email
              <input
                type="email"
                className=" border-b border-black outline-none focus:border-gray-500 placeholder:text-sm placeholder:font-light"
              />
            </label>
            <button
              type="submit"
              className="cursor-pointer w-full bg-black text-white py-3 flex items-center justify-center  tracking-wider "
            >
              <p className="font-inter text-base">LOG IN</p>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forgetpass;
