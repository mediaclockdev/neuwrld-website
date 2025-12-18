import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAPI, verifyOtpAPI } from "../../features/auth/authSlice";
import logo2 from "../../assets/svg/icons/logo2.svg";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile } from "../../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [step, setStep] = useState("enterEmail");
  const [emailaddress, setEmailAddress] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [emailError, setEmailError] = useState("");

  const inputRefs = useRef([]);

  const navigate = useNavigate();
  const isValidEmail = (email) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  // STEP 1 — LOGIN API
  const handleContinue = () => {
    if (!isValidEmail(emailaddress)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    setEmailError("");

    dispatch(loginAPI({ email: emailaddress }))
      .unwrap()
      .then(() => {
        setStep("enterOtp");
      })
      .catch(() => {
        alert("Failed to send OTP");
      });
  };

  // STEP 2 — VERIFY OTP API
  const handleVerify = () => {
    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      alert("Enter full 6-digit OTP");
      return;
    }

    dispatch(verifyOtpAPI({ otp: finalOtp }))
      .unwrap()
      .then(() => {
        // LOAD PROFILE BEFORE REDIRECT
        return dispatch(fetchUserProfile()).unwrap();
      })
      .then(() => {
        navigate("/", { replace: true });
      })
      .catch(() => alert("Invalid OTP"));
  };

  const handleOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text").trim();

    if (/^\d{6}$/.test(text)) {
      const newOtp = text.split("");
      setOtp(newOtp);
      inputRefs.current[5].focus();
    }
  };

  const handleBackToEmail = () => {
    setStep("enterEmail");
    setOtp(new Array(6).fill(""));
  };

  useEffect(() => {
    if (step === "enterOtp") {
      inputRefs.current[0].focus();
    }
  }, [step]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src={logo2}
            alt="Logo"
            className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 drop-shadow-lg"
          />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Welcome Back
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            {step === "enterEmail"
              ? "Sign in to continue to your account"
              : "Verify your identity"}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6">
          {/* STEP 1 — Email */}
          {step === "enterEmail" && (
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="email-input"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email or Mobile Number
                </label>
                <input
                  id="email-input"
                  type="email"
                  placeholder="name@example.com"
                  value={emailaddress}
                  onChange={(e) => {
                    setEmailAddress(e.target.value);
                    setEmailError("");
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleContinue()}
                  className={`w-full px-4 py-3 rounded-lg text-sm sm:text-base 
    focus:ring-2 transition-all outline-none
    ${
      emailError
        ? "border border-red-500 focus:ring-red-500"
        : "border border-gray-300 focus:ring-black"
    }`}
                />
                {emailError && (
                  <p className="text-sm text-red-500 mt-1">{emailError}</p>
                )}
              </div>

              <button
                type="button"
                onClick={handleContinue}
                disabled={loading}
                className="w-full bg-black text-white py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-95"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending OTP...
                  </span>
                ) : (
                  "Continue"
                )}
              </button>
            </div>
          )}

          {/* STEP 2 — OTP */}
          {step === "enterOtp" && (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">
                  We've sent a verification code to
                </p>
                <p className="text-sm font-semibold text-gray-800 break-all px-2">
                  {emailaddress}
                </p>
                <button
                  onClick={handleBackToEmail}
                  className="text-xs text-blue-600 hover:text-blue-700 mt-2 font-medium"
                >
                  Change email
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                  Enter 6-digit OTP
                </label>
                <div className="flex justify-center gap-2 sm:gap-3">
                  {otp.map((v, i) => (
                    <input
                      key={i}
                      ref={(el) => (inputRefs.current[i] = el)}
                      maxLength="1"
                      value={v}
                      onChange={(e) => handleOtpChange(e.target.value, i)}
                      onKeyDown={(e) => handleKeyDown(e, i)}
                      onPaste={handlePaste}
                      className="w-10 h-12 sm:w-12 sm:h-14 border-2 border-gray-300 rounded-lg text-center text-lg sm:text-xl font-semibold focus:border-black focus:ring-2 focus:ring-black focus:outline-none transition-all"
                    />
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleVerify}
                disabled={loading}
                className="w-full bg-black text-white py-3 rounded-lg text-sm sm:text-base font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-95"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Verifying...
                  </span>
                ) : (
                  "Verify OTP"
                )}
              </button>

              <div className="text-center">
                <p className="text-xs text-gray-500">
                  Didn't receive code?{" "}
                  <button
                    onClick={handleContinue}
                    disabled={loading}
                    className="text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50"
                  >
                    Resend
                  </button>
                </p>
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
              <svg
                className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm text-red-700 flex-1">
                {typeof error === "string" ? error : error?.message}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-6 px-4">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Login;
