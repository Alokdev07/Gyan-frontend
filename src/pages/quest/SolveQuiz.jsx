import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function SolveQuiz() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [lastId, setLastId] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [subject, setSubject] = useState("All");
  const [searchInput, setSearchInput] = useState("All");
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState([]);
  const navigate = useNavigate();

  const quizRef = useRef(null);
  const user = useSelector((state) => state.user.data);

  if (!user) {
    navigate("/login");
  }

  const fetchQuestions = async (reset = false) => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:4001/api/v1/quiz/getquiz",
        {
          params: {
            subject,
            lastId: reset ? null : lastId,
            limit: 5,
          },
          withCredentials: true,
        }
      );

      const data = res.data.data;

      if (reset) {
        setQuestions(data.questions);
        setCurrentIndex(0);
        setAttempts([]);
      } else {
        setQuestions((prev) => [...prev, ...data.questions]);
      }

      setLastId(data.newLastId);
      setHasMore(data.hasMore);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions(true);
  }, [subject]);

  const scrollToTop = () => {
    quizRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleSelect = (index) => {
    if (showAnswer) return;

    setSelected(index);
    setShowAnswer(true);

    const currentQuestion = questions[currentIndex];
    const isCorrect = index === currentQuestion.answer;

    const attemptData = {
      questionId: currentQuestion._id,
      selectedOption: index,
      isCorrect,
    };

    setAttempts((prev) => [...prev, attemptData]);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
    setSelected(null);
    setShowAnswer(false);
    scrollToTop();
  };

  const handleLoadMore = async () => {
    await fetchQuestions(false);
    setCurrentIndex((prev) => prev + 1);
    setSelected(null);
    setShowAnswer(false);
    scrollToTop();
  };

  const handleSearch = () => {
    setSubject(searchInput);
  };

  const submitQuiz = async () => {
    try {
      const res = await axios.post(
        "http://localhost:4001/api/v1/attempt/saveHistory",
        { attempts },
        { withCredentials: true }
      );
      if (res.data.data) {
        navigate("/history");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const question = questions[currentIndex];
  const progress =
    questions.length > 0
      ? ((currentIndex + 1) / questions.length) * 100
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-100 to-pink-100 px-6 py-10">
      
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-800">
            🧠 Solve Quiz
          </h1>
          <p className="text-gray-600 mt-2">
            Challenge yourself and grow daily
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search subject..."
            className="px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-400 outline-none"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-purple-600 text-white rounded-xl shadow hover:scale-105 transition"
          >
            Search
          </button>
        </div>
      </div>

      {/* 🔥 NO QUIZ MESSAGE ADDED HERE */}
      {!loading && questions.length === 0 && (
        <div className="max-w-5xl mx-auto bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-16 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            🎉 No Quiz Available
          </h2>
          <p className="text-gray-600 text-lg">
            There is no quiz available or you have attempted all quizzes.
          </p>
        </div>
      )}

      {/* Quiz Card */}
      {question && (
        <div
          ref={quizRef}
          className="max-w-5xl mx-auto bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-10 transition-all"
        >
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-gray-600">
              Question {currentIndex + 1} of {questions.length}
            </div>
            <div
              onClick={() =>
                navigate("/profile", {
                  state: {
                    username: question.createdBy?.username,
                  },
                })
              }
              className="text-sm text-purple-600 font-medium"
            >
              Created by: {question.createdBy?.username || "Unknown"}
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3 mb-8">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            {question.question}
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
            {question.options.map((opt, index) => {
              let style =
                "px-5 py-4 rounded-2xl border text-left transition-all duration-300 font-medium shadow-sm";

              if (showAnswer) {
                if (index === question.answer) {
                  style +=
                    " bg-green-500 text-white border-green-600 scale-105";
                } else if (index === selected) {
                  style += " bg-red-500 text-white border-red-600";
                } else {
                  style += " bg-gray-100 text-gray-500";
                }
              } else {
                style +=
                  " bg-white hover:bg-purple-50 hover:scale-105 cursor-pointer";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  className={style}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {showAnswer &&
            currentIndex < questions.length - 1 && (
              <div className="mt-10 text-right">
                <button
                  onClick={handleNext}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl shadow-lg hover:scale-105 transition"
                >
                  Next →
                </button>
              </div>
            )}

          {showAnswer &&
            currentIndex === questions.length - 1 && (
              <div className="mt-10 flex flex-col md:flex-row justify-center gap-6">
                {hasMore && (
                  <button
                    onClick={handleLoadMore}
                    disabled={loading}
                    className={`px-8 py-3 rounded-xl shadow-lg transition flex items-center gap-2 justify-center
                      ${
                        loading
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-indigo-600 to-purple-500 text-white hover:scale-105"
                      }`}
                  >
                    {loading && (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    )}
                    {loading ? "Loading..." : "Load More Questions"}
                  </button>
                )}

                <button
                  onClick={submitQuiz}
                  className="px-10 py-3 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-xl shadow-lg text-lg font-semibold hover:scale-105 transition"
                >
                  Submit Quiz 🚀
                </button>
              </div>
            )}
        </div>
      )}

      <div className="max-w-5xl mx-auto mt-16 text-center text-gray-500 text-sm">
        Keep practicing daily to improve your accuracy and speed 💡
      </div>
    </div>
  );
}