import { useState } from "react";

export default function Rankings() {
  const [activeTab, setActiveTab] = useState("students");

  const studentData = [
    { rank: 1, name: "Emma Thompson", points: 9850, avatar: "👧", level: "Master", badge: "👑" },
    { rank: 2, name: "Alex Chen", points: 9320, avatar: "👦", level: "Expert", badge: "🥈" },
    { rank: 3, name: "Sofia Rodriguez", points: 8890, avatar: "👧", level: "Expert", badge: "🥉" },
    { rank: 4, name: "Marcus Johnson", points: 8450, avatar: "👦", level: "Advanced", badge: "⭐" },
    { rank: 5, name: "Priya Patel", points: 8120, avatar: "👧", level: "Advanced", badge: "⭐" },
  ];

  const teacherData = [
    { rank: 1, name: "Dr. Sarah Mitchell", points: 15420, avatar: "👩‍🏫", level: "Legend", badge: "👑" },
    { rank: 2, name: "Prof. James Anderson", points: 14280, avatar: "👨‍🏫", level: "Master", badge: "🥈" },
    { rank: 3, name: "Ms. Ava Martinez", points: 13850, avatar: "👩‍🏫", level: "Master", badge: "🥉" },
    { rank: 4, name: "Mr. Liam Brown", points: 12920, avatar: "👨‍🏫", level: "Expert", badge: "⭐" },
    { rank: 5, name: "Dr. Olivia Taylor", points: 12450, avatar: "👩‍🏫", level: "Expert", badge: "⭐" },
  ];

  const data = activeTab === "students" ? studentData : teacherData;
  const topThree = data.slice(0, 3);
  const rest = data.slice(3);

  return (
    <section className="min-h-screen bg-gradient-to-b from-primary-dark to-primary px-4 py-24">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <h2 className="flex items-center justify-center gap-4 text-center
          text-4xl md:text-5xl font-bold font-serif text-primary-lighter">
          🏆 Leaderboard Champions
        </h2>

        <p className="text-center text-primary-lighter/80 max-w-xl mx-auto mt-4">
          Celebrating excellence and dedication in our quest community
        </p>

        {/* Tabs */}
        <div className="flex justify-center mt-10">
          <div className="flex gap-2 bg-black/20 p-2 rounded-full
            backdrop-blur border border-primary-lighter/20">

            <button
              onClick={() => setActiveTab("students")}
              className={`px-8 py-3 rounded-full font-semibold transition-all
                ${
                  activeTab === "students"
                    ? "bg-gradient-to-r from-primary-light to-primary-lighter text-primary-dark shadow-lg"
                    : "text-primary-lighter/60 hover:text-primary-lighter"
                }`}
            >
              🎓 Students
            </button>

            <button
              onClick={() => setActiveTab("teachers")}
              className={`px-8 py-3 rounded-full font-semibold transition-all
                ${
                  activeTab === "teachers"
                    ? "bg-gradient-to-r from-primary-light to-primary-lighter text-primary-dark shadow-lg"
                    : "text-primary-lighter/60 hover:text-primary-lighter"
                }`}
            >
              👨‍🏫 Teachers
            </button>
          </div>
        </div>

        {/* Podium */}
        <div className="flex justify-center items-end gap-10 mt-24 flex-wrap">

          {topThree.map((user, i) => (
            <div
              key={user.rank}
              className={`relative rounded-3xl p-8 w-72 text-center
                backdrop-blur border transition hover:-translate-y-2
                ${
                  i === 0
                    ? "bg-primary-lighter/15 border-yellow-400/40"
                    : "bg-primary-lighter/10 border-primary-lighter/30"
                }`}
            >
              <div className={`absolute -top-4 right-5 w-12 h-12 rounded-full
                flex items-center justify-center font-bold
                ${
                  i === 0
                    ? "bg-gradient-to-br from-yellow-400 to-orange-400"
                    : "bg-primary-lighter/30"
                }`}
              >
                {user.rank}
              </div>

              <div className={`w-28 h-28 mx-auto rounded-full flex
                items-center justify-center text-5xl mb-4
                ${
                  i === 0
                    ? "bg-gradient-to-br from-yellow-400 to-orange-400"
                    : "bg-primary-dark/60"
                }`}
              >
                {user.avatar}
              </div>

              <h3 className="text-xl font-bold font-serif text-primary-lighter">
                {user.name}
              </h3>

              <p className={`text-4xl font-bold mt-2 bg-clip-text text-transparent
                ${
                  i === 0
                    ? "bg-gradient-to-r from-yellow-400 to-orange-400"
                    : "bg-gradient-to-r from-primary-light to-primary-lighter"
                }`}
              >
                {user.points.toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        {/* Rankings List */}
        <div className="mt-20 space-y-4">
          {rest.map((user) => (
            <div
              key={user.rank}
              className="flex items-center gap-6
                bg-primary-lighter/10 backdrop-blur
                border border-primary-lighter/20 rounded-2xl
                px-6 py-4 hover:translate-x-2 transition"
            >
              <div className="w-12 h-12 rounded-full border
                border-primary-light/40 flex items-center justify-center
                font-bold text-primary-lighter">
                {user.rank}
              </div>

              <div className="flex items-center gap-4 flex-1">
                <div className="w-14 h-14 rounded-full bg-primary-dark/50
                  flex items-center justify-center text-2xl">
                  {user.avatar}
                </div>

                <div>
                  <div className="font-semibold text-primary-lighter">
                    {user.name}
                  </div>
                  <div className="text-sm text-primary-lighter/60">
                    {user.level}
                  </div>
                </div>
              </div>

              <div className="text-2xl">
                {user.badge}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
