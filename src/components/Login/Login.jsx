import React, { useState } from "react";
import { Link } from "react-router-dom";
import facebook from "../../assets/svg/icons/facebook.svg";
import google from "../../assets/svg/icons/googleicon.svg";
import apple from "../../assets/svg/icons/appleicon.svg";
import logo2 from "../../assets/svg/icons/logo2.svg";

const Login = () => {
  const [activeTab, setActiveTab] = useState("email");

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="flex justify-center w-full items-center">
        <Link to={"/"}>
          <img src={logo2} alt="logo" className="size-24 " />
        </Link>
      </div>
      <div className="max-w-screen-2xl mx-auto  flex flex-col items-center justify-center px-4 ">
        <div className="bg-white shadow-md rounded-lg px-8 py-7 w-full max-w-md space-y-6">
          {/* Title */}
          <div className="flex flex-col items-center space-y-1">
            <h2 className="text-xl lg:text-2xl font-semibold font-inter">
              Welcome Back!
            </h2>
            <p className="text-gray-500 text-xs lg:text-sm">
              Sign in to your account
            </p>
          </div>

          {/* Tabs */}
          <div className="flex border-b">
            <button
              className={`w-1/2 pb-2 text-sm font-medium ${
                activeTab === "email"
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("email")}
            >
              Email Login
            </button>
            <button
              className={`w-1/2 pb-2 text-sm font-medium ${
                activeTab === "quick"
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("quick")}
            >
              Quick Login Card
            </button>
          </div>

          {/* Email Login */}
          {activeTab === "email" && (
            <form className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-normal">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border-b border-gray-200  px-2 lg:px-3 py-1 lg:py-2 focus:outline-none focus:border-gray-500 placeholder:text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-normal">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full border-b border-gray-200  px-2 lg:px-3 py-1 lg:py-2 focus:outline-none focus:border-gray-500 placeholder:text-sm"
                />
              </div>

              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center gap-1">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <Link to={"/forgotpassword"}>
                  <p className="text-gray-500 hover:text-black">
                    Forgot Password?
                  </p>
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-md  cursor-pointer "
              >
                Sign In
              </button>
            </form>
          )}

          {/* Divider */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-gray-200" />
            <p className="text-gray-500 text-sm">or</p>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Social Login */}
          <div className="flex justify-center gap-4">
            <button className=" rounded-md p-2 w-12 h-12 flex items-center justify-center hover:bg-gray-100">
              <img src={apple} alt="apple" />
            </button>
            <button className="  rounded-md p-2 w-12 h-12 flex items-center justify-center hover:bg-gray-100">
              <img src={facebook} alt="facebook" />
            </button>
            <button className="rounded-md p-2 w-12 h-12 flex items-center justify-center hover:bg-gray-100">
              <img src={google} alt="google" />
            </button>
          </div>

          {/* Sign up link */}
          <p className="text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link to={"/signup"} className="text-black font-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
