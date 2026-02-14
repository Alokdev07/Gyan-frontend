import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { addUser } from "../../store/authslice/userSlice.js";

export default function Navigation() {
  const [visible, setVisible] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const timerRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const data = useSelector((state) => state.user.data);

  const getProfile = async () => {
    try {
      const response = await axios.get(
        "https://api-gyan-backend.onrender.com/api/v1/user/getProfile",
        { withCredentials: true },
      );

      if (response?.data?.data) {
        dispatch(addUser(response.data.data));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!data) getProfile();
  }, [data]);

  // 🔥 Start auto hide timer
  const startTimer = () => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setVisible(false);
    }, 5000);
  };

  useEffect(() => {
    startTimer();
    return () => clearTimeout(timerRef.current);
  }, []);

  const handleInteraction = () => {
    clearTimeout(timerRef.current);
    setVisible(true);
    startTimer();
  };

  const handleScroll = (sectionId) => {
    handleInteraction();

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* Hover Trigger Area */}
      <div className="h-6 w-full" onMouseEnter={() => setVisible(true)}></div>

      {/* Navbar */}
      <div
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={startTimer}
        className={`left-1/2 -translate-x-1/2 w-full px-3 absolute top-4 transition-all duration-500 ease-in-out
    ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`}
      >
        <div
          className="mx-auto flex items-center justify-between gap-6 px-8 py-3 shadow-2xl backdrop-blur-md 
        w-full max-w-4xl rounded-full bg-[#F2E3BB] transition-all duration-500"
        >
          {/* Logo */}
          <div
            onClick={() => {
              navigate("/");
              handleInteraction();
            }}
            className="font-bold text-[#005F02] text-lg cursor-pointer"
          >
            GyanAryan
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex gap-6 text-[#005F02] font-medium">
            <span
              onClick={() => {
                navigate("/");
                handleInteraction();
              }}
              className="cursor-pointer hover:text-[#427A43]"
            >
              Home
            </span>

            <span
              onClick={() => {
                navigate("/solvequiz");
                handleInteraction();
              }}
              className="cursor-pointer hover:text-[#427A43]"
            >
              Solve Quiz
            </span>

            <span
              onClick={() => {
                navigate("/history");
                handleInteraction();
              }}
              className="cursor-pointer hover:text-[#427A43]"
            >
              History
            </span>

            <span
              onClick={() => handleScroll("contact")}
              className="cursor-pointer hover:text-[#427A43]"
            >
              Contact Us
            </span>
          </nav>

          {/* AUTH */}
          <div className="hidden md:flex items-center gap-3">
            {!data ? (
              <>
                <button
                  onClick={() => {
                    navigate("/login");
                    handleInteraction();
                  }}
                  className="px-4 py-1 rounded-full border border-[#427A43] text-[#005F02]"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    navigate("/verifyEmail");
                    handleInteraction();
                  }}
                  className="px-4 py-1 rounded-full bg-[#005F02] text-[#F2E3BB]"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <img
                  src={data.avatar}
                  alt="avatar"
                  className="w-9 h-9 rounded-full object-cover"
                />
                <span
                  onClick={() =>
                    navigate("/profile", {
                      state: data.username,
                    })
                  }
                  className="font-semibold"
                >
                  {data.username}
                </span>
              </div>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => {
              setCollapsed(!collapsed);
              handleInteraction();
            }}
            className="md:hidden text-[#005F02] text-xl"
          >
            ☰
          </button>
        </div>

        {/* MOBILE MENU */}
        {collapsed && (
          <div className="md:hidden mt-3 mx-auto max-w-4xl rounded-2xl bg-[#F2E3BB] shadow-lg p-4 space-y-4 transition-all duration-300">
            <div className="flex flex-col gap-3 text-[#005F02] font-medium">
              <span
                onClick={() => {
                  navigate("/");
                  handleInteraction();
                }}
                className="cursor-pointer border-b border-[#C0B87A] pb-2"
              >
                Home
              </span>

              <span
                onClick={() => {
                  navigate("/solvequiz");
                  handleInteraction();
                }}
                className="cursor-pointer border-b border-[#C0B87A] pb-2"
              >
                Solve Quiz
              </span>

              <span
                onClick={() => navigate("/history")}
                className="cursor-pointer border-b border-[#C0B87A] pb-2"
              >
                History
              </span>

              <span
                onClick={() => navigate("/profile")}
                className="cursor-pointer border-b border-[#C0B87A] pb-2"
              >
                profile
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
