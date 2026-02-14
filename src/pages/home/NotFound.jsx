import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function NotFound() {
  const navigate = useNavigate();
  const textRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (textRef.current) {
        textRef.current.classList.toggle("scale-105");
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] overflow-hidden relative">
      
      {/* Glow Background Circle */}
      <div className="absolute w-[400px] h-[400px] bg-purple-500 opacity-20 rounded-full blur-3xl animate-pulse"></div>

      <div className="text-center z-10">
        
        {/* 404 Text */}
        <h1
          ref={textRef}
          className="text-[120px] md:text-[160px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 transition-transform duration-1000 ease-in-out"
        >
          404
        </h1>

        {/* Message */}
        <p className="text-gray-300 text-lg md:text-xl mt-4 animate-fadeIn">
          Oops! The page you’re looking for doesn’t exist.
        </p>

        {/* Button */}
        <button
          onClick={() => navigate("/")}
          className="mt-8 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold shadow-lg hover:scale-110 hover:shadow-purple-500/50 transition-all duration-300"
        >
          Go Back Home
        </button>
      </div>

      {/* Floating Animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .animate-fadeIn {
            animation: fadeIn 1.2s ease forwards;
          }
        `}
      </style>
    </div>
  );
}