import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {addUser} from '../../store/authslice/userSlice.js'

export default function ExtraInfo() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const {email} = location.state;

  const [form, setForm] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "student",
    certificate: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "https://api-gyan-backend.onrender.com/api/v1/user/complete-google-signup",
        {
          email,
          ...form,
        },
        { withCredentials: true },
      );
      if (response) {
        dispatch(addUser(response.data.data))
        toast.success("Account created successfully 🎉");
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#005F02] via-[#427A43] to-[#005F02] px-4">
      <div className="w-full max-w-lg bg-[#F2E3BB]/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 animate-fadeIn">
        {/* Header */}
        <h1 className="text-2xl font-bold text-center text-[#005F02] mb-2">
          Complete Your Profile
        </h1>
        <p className="text-center text-sm text-[#427A43] mb-6">
          Just one more step to get started
        </p>

        {/* Email (read only) */}
        <input
          value={email}
          disabled
          className="w-full mb-4 px-4 py-3 rounded-xl bg-gray-200 text-gray-600 cursor-not-allowed"
        />

        {/* Full Name */}
        <input
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-3 rounded-xl border border-[#427A43] focus:ring-2 focus:ring-[#005F02] outline-none"
        />

        {/* Username */}
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-3 rounded-xl border border-[#427A43] focus:ring-2 focus:ring-[#005F02] outline-none"
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-3 rounded-xl border border-[#427A43] focus:ring-2 focus:ring-[#005F02] outline-none"
        />

        {/* Confirm Password */}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-3 rounded-xl border border-[#427A43] focus:ring-2 focus:ring-[#005F02] outline-none"
        />

        {/* Role */}
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-3 rounded-xl border border-[#427A43] bg-white focus:ring-2 focus:ring-[#005F02]"
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        {/* Certificate (only for teacher) */}
        {form.role === "teacher" && (
          <textarea
            name="certificate"
            placeholder="Paste certificate link or describe your certification"
            value={form.certificate}
            onChange={handleChange}
            rows={4}
            className="w-full mb-4 px-4 py-3 rounded-xl border border-[#C0B87A] focus:ring-2 focus:ring-[#005F02] outline-none"
          />
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`
            w-full py-3 rounded-xl font-semibold text-white
            transition-all duration-300
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#005F02] hover:bg-[#427A43] hover:scale-[1.02]"
            }
          `}
        >
          {loading ? "Creating account..." : "Finish Signup"}
        </button>
      </div>
    </div>
  );
}
