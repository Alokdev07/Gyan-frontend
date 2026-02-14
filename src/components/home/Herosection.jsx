import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function HeroSection() {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [particles, setParticles] = useState([]);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.data);
  console.log(user);

  useEffect(() => {
    setParticles(
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        icon: ["🏆", "⭐", "🎯", "💡", "🚀", "📚", "🎓", "✨"][i],
      })),
    );
  }, []);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setMouse({
      x: (e.clientX - r.left) / r.width,
      y: (e.clientY - r.top) / r.height,
    });
  };

  function handleClick() {
    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    if (user.role !== "teacher") {
      toast.error("Only teachers can create quests");
      return;
    }

    navigate("/createquiz");
  }

  return (
    <section
      onMouseMove={onMove}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-dark px-6 py-24 flex items-center"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(194,184,122,.15),transparent_50%),radial-gradient(circle_at_80%_50%,rgba(242,227,187,.15),transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
          <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-primary-lighter/10 border border-primary-lighter/30 text-primary-lighter text-sm mb-8">
            <span className="w-2 h-2 bg-primary-light rounded-full animate-pulse" />
            Transform Learning into Adventure
          </span>

          <h1 className="font-serif text-primary-lighter text-5xl lg:text-7xl font-bold leading-tight mb-8">
            <span className="block animate-fadeUp">Embark on</span>
            <span className="block bg-gradient-to-r from-primary-lighter to-primary-light bg-clip-text text-transparent animate-fadeUp delay-150">
              Epic Quests
            </span>
            <span className="block animate-fadeUp delay-300">of Knowledge</span>
          </h1>

          <p className="text-primary-lighter/90 max-w-xl leading-relaxed mb-10">
            Join a revolutionary platform where education meets gamification.
            Create challenges, mentor students, or embark on learning quests.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 mb-12">
            <button 
            onClick={() => navigate('/verifyEmail')}
            className="flex items-center gap-4 px-8 py-4 rounded-xl bg-gradient-to-r from-primary-light to-primary-lighter text-primary-dark font-semibold hover:-translate-y-1 transition">
              👨‍🏫 Become a Tutor →
            </button>

            <button
              onClick={handleClick}
              className="flex items-center gap-4 px-8 py-4 rounded-xl border-2 border-primary-light text-primary-lighter hover:bg-primary-lighter/10 transition"
            >
              ⚔️ Create a Quest →
            </button>
          </div>

          <div className="flex gap-8 text-primary-lighter">
            <Stat n="5,000+" l="Active Quests" />
            <Stat n="15K+" l="Students" />
            <Stat n="98%" l="Success" />
          </div>
        </div>

        <div className="relative h-[520px]">
          <div
            className="w-full h-full relative transition-transform duration-300"
            style={{
              transform: `perspective(1000px)
                rotateY(${mouse.x * 10 - 5}deg)
                rotateX(${mouse.y * -10 + 5}deg)`,
            }}
          >
            {/* Book */}
            <div className="absolute left-1/2 top-1/2 w-72 h-96 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-primary-light to-primary-lighter rounded-2xl shadow-2xl flex items-center justify-center animate-float">
              <span className="font-serif text-3xl text-primary-dark font-bold">
                Quest Log
              </span>
            </div>

            <div className="absolute inset-0 flex items-center justify-center animate-rotateSlow">
              {["🎯", "🏆", "⭐", "💎", "🚀", "🎓"].map((i, idx) => (
                <div
                  key={idx}
                  className="absolute w-14 h-14 flex items-center justify-center rounded-full bg-primary-lighter/20 border border-primary-lighter/30 backdrop-blur-lg"
                  style={{
                    transform: `rotate(${idx * 60}deg) translateY(-220px)`,
                  }}
                >
                  {i}
                </div>
              ))}
            </div>

            {particles.map((p) => (
              <span
                key={p.id}
                className="absolute text-xl opacity-70 animate-float"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
              >
                {p.icon}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, l }) {
  return (
    <div>
      <div className="text-3xl font-bold font-serif">{n}</div>
      <div className="text-xs uppercase tracking-widest opacity-70">{l}</div>
    </div>
  );
}
