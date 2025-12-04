import React, { useState } from "react";
import logo2 from "../../assets/svg/icons/logo2.svg";
import { Link } from "react-router-dom";

const Signup = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const handleChange = (e, index) => {
    if (isNaN(e.target.value)) return;
    const newOtp = [...otp];
    newOtp[index] = e.target.value.slice(-1);
    setOtp(newOtp);
    if (e.target.nextSibling) e.target.nextSibling.focus();
  };

  return (
    <div className=" min-h-screen flex flex-col items-center justify-center">
      <div className="flex justify-center w-full items-center">
        <Link to={"/"}>
          <img src={logo2} alt="logo" className="size-24 " />
        </Link>
      </div>
      <div className="min-h-screen flex  items-center justify-center  px-4 py-10">
        <div className="bg-white shadow-md rounded-lg px-8 py-7 w-full max-w-md  lg:space-y-6">
          {/* Title */}
          <h2 className="text-2xl font-semibold text-gray-800 ">
            Set Up Your Profile
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Fill in your details below to create your account.
          </p>

          {/* Form */}
          <form className="space-y-4 lg:space-y-5">
            {/* Name and DOB */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none "
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none "
                />
              </div>
            </div>

            {/* Gender & Country */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select className=" w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none">
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Country
                </label>
                <select className=" w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none">
                  <option value="">Select Country</option>
                  <option>India</option>
                  <option>USA</option>
                  <option>UK</option>
                </select>
              </div>
            </div>

            {/* Mobile & Email */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  placeholder="Enter mobile number"
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none"
                />
              </div>
            </div>

            {/* Verify Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Verify Your Email
              </label>
              <p className="text-xs text-gray-500 mb-2">
                We just sent a code to your email. Enter it below:
              </p>

              {/* OTP Boxes */}
              <div className="flex  gap-2">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={data}
                    onChange={(e) => handleChange(e, index)}
                    className="w-10 h-10 border border-gray-300 rounded-md text-center text-lg font-medium outline-none"
                  />
                ))}
              </div>
            </div>

            {/* Loading text */}
            {/* <div className="text-sm text-gray-600 flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            Please wait! While we are verifying it.
            </div> */}

            {/* Passwords */}
            <div className="flex flex-col gap-4 lg:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none "
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none "
                />
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Sign Up
            </button>

            {/* Footer text */}
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-gray-900 font-medium hover:underline"
              >
                Log In
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
