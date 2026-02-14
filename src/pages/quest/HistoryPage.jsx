import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function HistoryPage() {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user.data);
  const navigate = useNavigate();
  if (!user) {
          navigate("/login");
        }
  console.log(historyData)
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://api-gyan-backend.onrender.com/api/v1/attempt/getHistory",
          { withCredentials: true },
        );
        setHistoryData(res.data.data.history);
      } catch (err) {
        setError("Failed to fetch history");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F2E3BB] flex flex-col justify-center items-center">
        <div className="w-14 h-14 border-4 border-[#427A43] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-[#005F02] font-semibold">
          Loading your history...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F2E3BB] flex justify-center items-center">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2E3BB] p-4 md:p-8">
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#005F02]">
          📜 Your Quiz History
        </h1>
        <p className="text-[#427A43] mt-2">
          Track your progress and performance
        </p>
      </div>

      {historyData.length === 0 && (
        <div className="text-center text-[#005F02] font-semibold mt-10">
          No history found yet 🚀
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-6">
  {historyData.map((item, index) => (
    <div
      key={item._id}
      className="relative bg-gradient-to-r from-[#005F02] via-[#427A43] to-[#005F02]
                 text-white p-5 rounded-xl shadow-md
                 transition-all duration-500
                 hover:shadow-xl hover:-translate-y-1
                 animate-fadeIn"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      
      <div className="absolute -left-3 top-6 w-6 h-6 bg-[#C0B87A] rounded-full border-4 border-[#F2E3BB]"></div>

      
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="text-xs text-[#F2E3BB] uppercase tracking-wide">
            {item.question.subject}
          </p>
          <p
          onClick={() => navigate('/profile',{
            state : {
              "username" : item.question.createdBy.username
            }
          })}
          className="text-sm text-[#C0B87A]">
            Created by {item.question.createdBy.username}
          </p>
        </div>

        <span className="text-xs text-[#F2E3BB]">
          {new Date(item.createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* Question */}
      <h2 className="text-base md:text-lg font-semibold mb-3 leading-snug">
        {item.question.question}
      </h2>

      {/* Result Summary (Compact) */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-3">
          <span
            className={`px-3 py-1 rounded-full font-medium text-xs
              ${
                item.isCorrect
                  ? "bg-[#C0B87A] text-[#005F02]"
                  : "bg-red-500 text-white"
              }`}
          >
            {item.isCorrect ? "Correct" : "Wrong"}
          </span>

          <span className="text-[#F2E3BB]">
            +{item.xpEarned} XP
          </span>
        </div>

        <span className="text-[#F2E3BB] text-xs">
          You selected option {item.selectedOption + 1}
        </span>
      </div>
    </div>
  ))}
</div>

      <style>
        {`
          .animate-fadeIn {
            opacity: 0;
            transform: translateY(20px);
            animation: fadeInUp 0.6s ease forwards;
          }

          @keyframes fadeInUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}
