import React, { useState } from "react";
import axios from "axios";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:4001/api/v1/user/getComplaint",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        setIsSubmitted(true);

        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: "", email: "", message: "" });
        }, 3000);
      }
    } catch (error) {
      console.error("Complaint Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-gradient-to-b from-primary-dark to-[#003601] text-primary-lighter">
      {/* Contact Section */}
      <div className="border-b border-primary-lighter/10 bg-gradient-to-br from-primary/30 to-primary-dark/30 py-24">
        <div className="mx-auto max-w-7xl px-5 grid lg:grid-cols-2 gap-20 items-center">

          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-lighter/30 bg-primary-lighter/10 px-5 py-2 text-sm font-semibold mb-6">
              💬 Get in Touch
            </div>

            <h3 className="font-serif text-4xl font-bold mb-5">
              We're Here to Help
            </h3>

            <p className="text-primary-lighter/80 leading-relaxed mb-10">
              Have a question or concern? Drop us a message and our team will get
              back to you within 24 hours.
            </p>

            <div className="space-y-5">
              {[
                ["📧", "Email Us", "csekhar2028@gmail.com"],
                ["📱", "Call Us", "+95832 965 11"],
                ["⏰", "Working Hours", "Mon–Fri, 9AM–6PM"],
              ].map(([icon, label, value], i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 rounded-xl border border-primary-lighter/10 bg-primary-lighter/5 px-5 py-4"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-light/20 text-2xl">
                    {icon}
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-primary-lighter/60">
                      {label}
                    </p>
                    <p className="font-semibold">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-primary-lighter/20 bg-primary-lighter/10 backdrop-blur-xl p-10"
          >
            <h4 className="flex items-center gap-3 text-2xl font-bold mb-8">
              📝 Submit a Complaint
            </h4>

            {["name", "email"].map((field) => (
              <div key={field} className="mb-6">
                <label className="block mb-2 text-sm font-semibold capitalize">
                  {field}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-xl border border-primary-lighter/20 bg-primary-dark/40 px-4 py-3 text-sm placeholder-primary-lighter/40 focus:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary-light/20"
                />
              </div>
            ))}

            <div className="mb-8">
              <label className="block mb-2 text-sm font-semibold">
                Your Message
              </label>
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleInputChange}
                required
                className="w-full rounded-xl border border-primary-lighter/20 bg-primary-dark/40 px-4 py-3 text-sm resize-none focus:border-primary-light focus:outline-none focus:ring-2 focus:ring-primary-light/20"
              />
            </div>

            <button
              type="submit"
              disabled={loading || isSubmitted}
              className={`w-full rounded-xl py-4 font-bold transition ${
                isSubmitted
                  ? "bg-green-500 text-white"
                  : "bg-gradient-to-r from-primary-light to-primary-lighter text-primary-dark hover:-translate-y-1 hover:shadow-xl"
              }`}
            >
              {loading
                ? "Sending..."
                : isSubmitted
                ? "✓ Message Sent"
                : "Send Message →"}
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-20">
        <div className="mx-auto max-w-7xl px-5 grid gap-14 lg:grid-cols-4 border-b border-primary-lighter/10 pb-16">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">⚔️</span>
              <span className="font-serif text-3xl font-bold">Quest</span>
            </div>
            <p className="text-primary-lighter/70 max-w-md mb-6">
              Transforming education into epic adventures.
            </p>

            <div className="flex gap-3">
              {["🐦", "💼", "📸", "💬"].map((icon, i) => (
                <div
                  key={i}
                  className="h-11 w-11 flex items-center justify-center rounded-full border border-primary-lighter/20 bg-primary-lighter/10 hover:bg-primary-light/30 transition"
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          {["Quick Links", "Legal"].map((title, i) => (
            <div key={i}>
              <h4 className="font-bold mb-4">{title}</h4>
              <ul className="space-y-3 text-primary-lighter/70">
                <li className="hover:text-primary-lighter hover:translate-x-2 transition">
                  Link One
                </li>
                <li className="hover:text-primary-lighter hover:translate-x-2 transition">
                  Link Two
                </li>
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-lighter/60 px-5 max-w-7xl mx-auto">
          <p>© 2026 Quest Education Platform</p>
          <p>
            Payments by <span className="text-primary-light font-semibold">Razorpay</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;