import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/authslice/userSlice.js";

export default function Signup() {
  const [avatar, setAvatar] = useState(null);
  const [certificate, setCertificate] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullname] = useState("");
  const [role, setRole] = useState("student");

  const { state } = useLocation();
  const email = state?.email;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email not found. Please verify again.");
      return navigate("/verifyEmail");
    }

    if (role === "teacher" && !certificate) {
      return toast.error("Certificate is required for teachers");
    }

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", role);

      if (avatar) formData.append("avatar", avatar);
      if (certificate) formData.append("certificate", certificate);

      const res = await axios.post(
        "http://localhost:4001/api/v1/user/signup",
        formData,
        { withCredentials: true }
      );

      toast.success("Signup successful 🎉");
      dispatch(addUser(res.data.data));
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#005F02] via-[#427A43] to-[#005F02] px-4">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-md bg-[#F2E3BB]/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 space-y-4"
      >
        <h1 className="text-2xl font-bold text-center text-[#005F02]">
          Create Account
        </h1>

        {/* Avatar */}
        <div className="flex justify-center">
          <label className="cursor-pointer">
            <input type="file" hidden accept="image/*"
              onChange={(e) => setAvatar(e.target.files[0])}
            />
            <div className="w-24 h-24 rounded-full border-2 border-[#427A43] overflow-hidden flex items-center justify-center bg-white">
              {avatar ? (
                <img
                  src={URL.createObjectURL(avatar)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-[#427A43] text-sm">Avatar</span>
              )}
            </div>
          </label>
        </div>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-[#427A43]"
        />

        <input
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullname(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-[#427A43]"
        />

        {/* Role */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-[#427A43] bg-transparent"
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        {/* Teacher Certificate */}
        {role === "teacher" && (
          <label className="block">
            <span className="text-sm text-[#005F02] font-medium">
              Teaching Certificate
            </span>
            <input
              type="textarea"
              placeholder="place link or explain certification here"
              value={certificate}
              onChange={(e) => setCertificate(e.target.value)}
              className="w-full mt-2 px-4 py-2 rounded-xl border border-[#427A43] bg-transparent"
            />
          </label>
        )}

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#427A43]"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-3 cursor-pointer"
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <button className="w-full py-3 rounded-xl bg-[#005F02] text-white font-semibold hover:scale-105 transition">
          Sign Up
        </button>
      </form>
    </div>
  );
}
