import { useEffect, useState } from "react";

export default function AboutUs() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => setIsVisible(true), []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary via-primary-dark to-primary py-24 px-5">
      <div className="mx-auto max-w-[1400px] relative z-10">

        {/* Hero */}
        <div className={`text-center mb-24 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <div className="inline-flex items-center gap-3 mb-10 rounded-full border border-primary-lighter/30 bg-primary-lighter/10 px-6 py-2 text-primary-lighter uppercase tracking-widest text-sm font-semibold backdrop-blur">
            <span className="h-2.5 w-2.5 rounded-full bg-primary-light animate-pulsate"></span>
            Our Story
          </div>

          <h2 className="flex flex-wrap justify-center gap-4 text-6xl font-serif font-bold text-primary-lighter mb-8 max-md:text-4xl">
            <span>Revolutionizing</span>
            <span className="bg-gradient-to-r from-primary-lighter to-primary-light bg-clip-text text-transparent">
              Education
            </span>
            <span>Through</span>
            <span className="bg-gradient-to-r from-primary-lighter to-primary-light bg-clip-text text-transparent">
              Adventure
            </span>
          </h2>

          <p className="mx-auto max-w-3xl text-lg text-primary-lighter/90 leading-relaxed">
            We believe learning should ignite curiosity, not extinguish it.
            Quest transforms education into an epic journey where knowledge
            is the ultimate treasure.
          </p>
        </div>

        {/* Mission */}
        <div className="mb-24 rounded-3xl border-2 border-primary-lighter/20 bg-primary-lighter/10 backdrop-blur-xl px-20 py-16 text-center max-md:px-8">
          <div className="text-6xl mb-6 animate-float">🎓</div>
          <h3 className="text-4xl font-serif font-bold text-primary-lighter mb-6">
            Our Mission
          </h3>
          <p className="mx-auto max-w-2xl text-primary-lighter/85 leading-relaxed">
            To democratize quality education by gamifying the learning experience
            and empowering students worldwide.
          </p>
        </div>

        {/* Features */}
        <div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(280px,1fr))] mb-24">
          {[
            { icon: "🎯", title: "Quest-Based Learning" },
            { icon: "👨‍🏫", title: "Expert Mentorship" },
            { icon: "🏆", title: "Achievement System" },
            { icon: "🌍", title: "Global Community" },
          ].map((f, i) => (
            <div
              key={i}
              className="animate-slideUp rounded-2xl border border-primary-lighter/20 bg-primary-lighter/5 p-10 backdrop-blur transition hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="mb-6 text-4xl">{f.icon}</div>
              <h4 className="text-xl font-bold text-primary-lighter mb-3">
                {f.title}
              </h4>
              <p className="text-sm text-primary-lighter/75 leading-relaxed">
                Transform learning into an engaging, rewarding journey.
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="relative overflow-hidden rounded-3xl border-2 border-primary-lighter/30 bg-gradient-to-r from-primary-light/20 to-primary-lighter/10 backdrop-blur-xl px-16 py-20 text-center max-md:px-8">
          <h3 className="text-5xl font-serif font-bold text-primary-lighter mb-6 max-md:text-3xl">
            Ready to Start Your Quest?
          </h3>
          <p className="mb-10 text-primary-lighter/85">
            Join thousands of learners transforming their future.
          </p>
          <button className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-primary-light to-primary-lighter px-12 py-5 text-lg font-bold text-primary-dark transition hover:-translate-y-1 hover:shadow-xl">
            Begin Your Adventure →
          </button>
        </div>

      </div>
    </section>
  );
}
