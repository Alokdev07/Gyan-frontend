import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";


export default function VerifyEmail() {
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!showOtp || timeLeft === 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [showOtp, timeLeft]);

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const HandleVerifyFunction = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        "https://api-gyan-backend.onrender.com/api/v1/user/verifyEmail",
        {
          email,
          purpose: "register",
        },
        { withCredentials: true },
      );
      if (!response) return;
      toast.success(response.data.message);
      setShowOtp(true);
      setTimeLeft(300);
    } catch (err) {
      console.log(err.response?.data);
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const HandleVerify = async () => {
    try {
      const response = await axios.post(
        "https://api-gyan-backend.onrender.com/api/v1/user/verifyOtp",
        { email, otp, purpose: "register" },
        { withCredentials: true },
      );

      if (!response) return;
      toast.success(response.data.message);

      navigate("/signup", {
        state: { email },
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const googleLogin = useGoogleLogin({
    flow: "auth-code",

    onSuccess: async (authResult) => {
      try {
        setGoogleLoading(true);

        const code = authResult.code;

        const response = await axios.get(
          `https://api-gyan-backend.onrender.com/api/v1/user/googleLogin?code=${code}`,
          { withCredentials: true },
        );

        toast.success("Google sign-in successful");

        navigate("/extraInfo", {
          state: response.data.data?.email,
        });
      } catch (err) {
        toast.error(err.response?.data?.message || "Google login failed");
      } finally {
        setGoogleLoading(false);
      }
    },

    onError: () => {
      toast.error("Google login cancelled");
      setGoogleLoading(false);
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#005F02] via-[#427A43] to-[#005F02] px-4">
      <div className="w-full max-w-md bg-[#F2E3BB]/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 animate-fadeIn">
        <h1 className="text-2xl font-bold text-center text-[#005F02] mb-2">
          Verify Your Email
        </h1>

        <p className="text-center text-sm text-[#427A43] mb-6">
          Enter your email to receive OTP
        </p>

        {/* EMAIL */}
        <div className="flex gap-3 mb-6">
          <input
            type="email"
            value={email}
            disabled={showOtp} 
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-xl border border-[#427A43] focus:outline-none focus:ring-2 focus:ring-[#005F02] disabled:opacity-60"
          />

          <button
            onClick={HandleVerifyFunction}
            disabled={loading || showOtp} 
            className={`px-5 py-3 rounded-xl font-semibold transition-all duration-300
              ${
                loading || showOtp
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#005F02] text-white hover:scale-105"
              }`}
          >
            {showOtp ? "OTP Sent" : loading ? "Sending..." : "Verify"}
          </button>
        </div>

        {/* OTP */}
        {showOtp && (
          <div className="animate-slideUp">
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full px-4 py-3 rounded-xl border border-[#C0B87A] text-center tracking-widest text-lg focus:outline-none focus:ring-2 focus:ring-[#005F02]"
            />

            <p className="text-center mt-3 text-sm text-[#427A43]">
              {timeLeft > 0 ? (
                <>
                  OTP expires in{" "}
                  <span className="font-semibold">{formatTime()}</span>
                </>
              ) : (
                <span className="text-red-600 font-semibold">
                  OTP expired. Please resend.
                </span>
              )}
            </p>

            <button
              onClick={HandleVerify}
              disabled={otp.length !== 6}
              className="w-full mt-5 py-3 rounded-xl bg-[#427A43] text-white font-semibold hover:bg-[#005F02] transition-all duration-300 disabled:opacity-50"
            >
              Confirm OTP
            </button>
          </div>
        )}

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-[#427A43]/40"></div>
          <span className="text-sm text-[#427A43]">OR</span>
          <div className="flex-1 h-px bg-[#427A43]/40"></div>
        </div>

        {/* Google Sign In */}
        <button
          onClick={googleLogin}
          disabled={googleLoading}
          className={`
    w-full h-11 flex items-center justify-center gap-3
    bg-white border border-gray-300 rounded-xl
    font-medium text-gray-700
    shadow-sm
    transition-all duration-300
    ${
      googleLoading
        ? "opacity-70 cursor-not-allowed"
        : "hover:shadow-md hover:scale-[1.02] active:scale-95"
    }
  `}
        >
          {googleLoading ? (
            <>
              <svg
                className="w-5 h-5 animate-spin text-gray-600"
                viewBox="0 0 24 24"
              >
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
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              <span>Signing in…</span>
            </>
          ) : (
            <>
              {/* Google Icon */}
              <svg width="20" height="20" viewBox="0 0 48 48">
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.66 1.22 9.14 3.6l6.82-6.82C35.73 2.37 30.24 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.92 6.15C12.37 13.16 17.74 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.5 24c0-1.64-.15-3.22-.43-4.74H24v9.03h12.65c-.55 2.96-2.21 5.47-4.71 7.18l7.3 5.67C43.44 36.72 46.5 30.87 46.5 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.48 28.37c-.5-1.48-.78-3.06-.78-4.68s.28-3.2.78-4.68l-7.92-6.15C.92 16.01 0 19.91 0 24c0 4.09.92 7.99 2.56 11.14l7.92-6.77z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.24 0 11.73-2.06 15.64-5.61l-7.3-5.67c-2.03 1.36-4.62 2.16-8.34 2.16-6.26 0-11.63-3.66-13.52-8.87l-7.92 6.77C6.51 42.62 14.62 48 24 48z"
                />
              </svg>

              <span>Continue with Google</span>
            </>
          )}
        </button>

        <p className="text-center text-sm text-[#427A43] mt-6">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-semibold text-[#005F02] hover:underline"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
