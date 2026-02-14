import { useEffect, useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { logoutUser } from "../../store/authslice/userSlice.js";
import {toast} from 'react-toastify'

export default function ProfilePage() {
  const location = useLocation();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.data);
  const navigate = useNavigate()

  if(!currentUser){
    navigate('/')
  }

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const queryParams = new URLSearchParams(location.search);
  const usernameFromQuery = queryParams.get("username");

  const isOwnProfile =
    !usernameFromQuery || usernameFromQuery === currentUser?.username;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let url;

        if (usernameFromQuery) {
          url = `http://localhost:4001/api/v1/user/getUser?username=${usernameFromQuery}`;
        } else {
          url = `http://localhost:4001/api/v1/user/getProfile`;
        }

        const response = await axios.get(url,{withCredentials : true});
        console.log(response.data.data)
        setProfile(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [usernameFromQuery]);

  const handleLogout = async() => {
    try {
        const response = await axios.get("http://localhost:4001/api/v1/user/logout",{withCredentials : true})
        toast.success("logout successfully")
        if(response){
            navigate('/')
        }
    } catch (error) {
        toast.error(error.message)
    }
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#F2E3BB] text-[#005F02] text-2xl font-bold animate-pulse">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#F2E3BB] via-[#C0B87A] to-[#427A43] text-[#005F02]">
      {/* HERO SECTION */}
      <div className="flex flex-col items-center justify-center text-center py-20 px-6">
        <div className="relative group">
          <img
            src={profile?.avatar}
            alt="avatar"
            className="w-40 h-40 rounded-full border-4 border-[#005F02] shadow-2xl object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 rounded-full bg-[#005F02]/20 opacity-0 group-hover:opacity-100 transition duration-500"></div>
        </div>

        <h1 className="mt-6 text-4xl font-extrabold tracking-wide">
          {profile?.fullName}
        </h1>

        <p className="text-lg mt-2 text-[#005F02]/80">@{profile?.username}</p>

        <p className="mt-4 max-w-xl text-[#005F02]/70 leading-relaxed">
          A passionate {profile?.role} continuously building knowledge, growing
          skills, and shaping the future through dedication.
        </p>

        {isOwnProfile && (
          <button
            onClick={handleLogout}
            className="mt-6 px-6 py-2 bg-[#005F02] text-[#F2E3BB] rounded-full shadow-lg 
            hover:bg-[#427A43] hover:scale-105 transition-all duration-300"
          >
            Logout
          </button>
        )}
      </div>

      {/* STATS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-10 pb-20">
        <div
          className="bg-[#F2E3BB] rounded-2xl shadow-xl p-8 text-center
        hover:-translate-y-2 hover:shadow-2xl transition-all duration-500"
        >
          <h2 className="text-3xl font-bold">{profile?.xp}</h2>
          <p className="text-[#427A43] mt-2">Experience Points</p>
        </div>

        <div
          className="bg-[#F2E3BB] rounded-2xl shadow-xl p-8 text-center
        hover:-translate-y-2 hover:shadow-2xl transition-all duration-500"
        >
          <h2 className="text-3xl font-bold">{profile?.rating}</h2>
          <p className="text-[#427A43] mt-2">Rating</p>
        </div>

        <div
          className="bg-[#F2E3BB] rounded-2xl shadow-xl p-8 text-center
        hover:-translate-y-2 hover:shadow-2xl transition-all duration-500"
        >
          <h2 className="text-3xl font-bold capitalize">{profile?.role}</h2>
          <p className="text-[#427A43] mt-2">Role</p>
        </div>
      </div>

      {/* STORY SECTION */}
      <div className="bg-[#005F02] text-[#F2E3BB] py-20 px-8 text-center">
        <h2 className="text-3xl font-bold mb-6">The Journey</h2>

        <p className="max-w-3xl mx-auto text-lg leading-relaxed opacity-90">
          This profile is more than numbers. Every XP earned represents effort.
          Every rating reflects trust. Every solved question builds mastery.
          Growth is not instant — it is consistent.
        </p>
      </div>
    </div>
  );
}
