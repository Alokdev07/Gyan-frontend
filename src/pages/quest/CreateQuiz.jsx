import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function CreateQuiz() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    question: "",
    options: ["", "", "", ""],
    answer: 0,
    subject: "",
    expiryTime: "",
  });
  const navigate = useNavigate()
  const user = useSelector((state) => state.user.data)
  if(!user){
    navigate('/login')
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...formData.options];
    updatedOptions[index] = value;
    setFormData({ ...formData, options: updatedOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        "https://api-gyan-backend.onrender.com/api/v1/quiz/createquiz",
        formData,
        { withCredentials: true },
      );

      toast.success("Quiz created successfully 🎉");

      console.log(response.data);

      
      setFormData({
        question: "",
        options: ["", "", "", ""],
        answer: 0,
        subject: "",
        expiryTime: "",
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F2E3BB] py-12 px-4">
      <div className="max-w-5xl mx-auto text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-bold text-[#005F02] leading-tight">
          Craft Knowledge.
          <span className="block text-[#427A43] mt-2">
            Create Powerful Quizzes.
          </span>
        </h1>

        <p className="mt-6 text-lg text-[#427A43]/80 max-w-2xl mx-auto">
          Design engaging questions that challenge minds, spark curiosity, and
          inspire learning. Build your quiz with precision and clarity.
        </p>

        <div className="w-24 h-1 bg-[#C0B87A] mx-auto mt-8 rounded-full"></div>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-sm font-semibold text-[#005F02] mb-2">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Enter subject (e.g. Mathematics)"
              className="w-full px-4 py-3 rounded-xl border border-[#C0B87A] focus:outline-none focus:ring-2 focus:ring-[#427A43]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#005F02] mb-2">
              Question
            </label>
            <textarea
              name="question"
              value={formData.question}
              onChange={handleChange}
              rows="4"
              placeholder="Write your question here..."
              className="w-full px-4 py-3 rounded-xl border border-[#C0B87A] focus:outline-none focus:ring-2 focus:ring-[#427A43]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#005F02] mb-4">
              Options (Select correct answer)
            </label>

            <div className="grid md:grid-cols-2 gap-4">
              {formData.options.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-[#F2E3BB] p-3 rounded-xl"
                >
                  <input
                    type="radio"
                    name="answer"
                    value={index}
                    checked={Number(formData.answer) === index}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        answer: Number(e.target.value),
                      })
                    }
                    className="accent-[#005F02]"
                  />
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    className="w-full px-3 py-2 rounded-lg border border-[#C0B87A] focus:outline-none focus:ring-2 focus:ring-[#427A43]"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#005F02] mb-2">
              Expiry Time
            </label>
            <select
              name="expiryTime"
              value={formData.expiryTime}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-[#C0B87A] focus:outline-none focus:ring-2 focus:ring-[#427A43]"
            >
              <option value="">Select time</option>
              <option value="1m">1 Minute</option>
              <option value="2m">2 Minutes</option>
              <option value="3m">3 Minutes</option>
              <option value="4m">4 Minutes</option>
              <option value="5m">5 Minutes</option>
            </select>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={loading}
              className={`w-full md:w-auto px-8 py-3 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#005F02] hover:bg-[#427A43]"
              }`}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  Creating...
                </div>
              ) : (
                "Create Quiz"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
