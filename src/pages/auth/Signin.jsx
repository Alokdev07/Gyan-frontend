import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {useDispatch} from 'react-redux'
import { addUser } from "../../store/authslice/userSlice.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!form.identifier.trim()) {
      newErrors.identifier = "Username or email is required";
    } else if (form.identifier.includes("@") && !isEmail(form.identifier)) {
      newErrors.identifier = "Enter a valid email address";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post(
        "https://api-gyan-backend.onrender.com/api/v1/user/login",
        form,
        {
          withCredentials: true,
        },
      );
      if(response){
        toast.success("Signup successful 🎉");
              dispatch(addUser(response.data.data));
              navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#005F02] to-[#427A43] px-4">
      <div className="w-full max-w-md bg-[#F2E3BB]/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-[#C0B87A]">
        <h2 className="text-3xl font-bold text-[#005F02] text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-[#427A43] mb-6">
          Sign in to your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username / Email */}
          <div>
            <label className="block text-sm font-medium text-[#005F02] mb-1">
              Username or Email
            </label>
            <input
              type="text"
              name="identifier"
              value={form.identifier}
              onChange={handleChange}
              placeholder="username or email"
              className={`w-full px-4 py-3 rounded-lg bg-transparent outline-none border transition-all
                ${
                  errors.identifier
                    ? "border-red-500 focus:ring-red-400"
                    : "border-[#C0B87A] focus:border-[#005F02] focus:ring-[#005F02]"
                } focus:ring-2`}
            />
            {errors.identifier && (
              <p className="text-red-600 text-xs mt-1">{errors.identifier}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-[#005F02] mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full px-4 py-3 rounded-lg bg-transparent outline-none border transition-all pr-12
                  ${
                    errors.password
                      ? "border-red-500 focus:ring-red-400"
                      : "border-[#C0B87A] focus:border-[#005F02] focus:ring-[#005F02]"
                  } focus:ring-2`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#427A43] hover:text-[#005F02]"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-600 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-[#005F02] text-white font-semibold text-lg
                       hover:bg-[#427A43] transition-all duration-300 shadow-md hover:shadow-xl"
          >
            Sign In
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-sm text-[#427A43]">
            Don’t have an account?{" "}
            <Link
              to="/verifyEmail"
              className="font-semibold text-[#005F02] hover:text-[#427A43] underline-offset-4 hover:underline transition-all"
            >
              Sign up
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-[#427A43] mt-6">
          © 2026 Secure Auth System
        </p>
      </div>
    </div>
  );
}
