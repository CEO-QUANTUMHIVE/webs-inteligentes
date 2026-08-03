"use client";

import { useEffect, useRef } from "react";

const team = [
  { name: "Ahmad Fauzi", role: "Founder & Creative Director", image: "/team/1.jpg" },
  { name: "Dian Permata", role: "Art Director", image: "/team/2.jpg" },
  { name: "Rizky Pratama", role: "Senior Designer", image: "/team/3.jpg" },
  { name: "Maya Sari", role: "Brand Strategist", image: "/team/4.jpg" },
  { name: "Budi Santoso", role: "UI/UX Designer", image: "/team/5.jpg" },
  { name: "Putri Wulandari", role: "Graphic Designer", image: "/team/6.jpg" },
  { name: "Farhan Hidayat", role: "Motion Designer", image: "/team/7.jpg" },
  { name: "Ayu Lestari", role: "Project Manager", image: "/team/8.jpg" },
];

export default function Team() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const items = containerRef.current?.querySelectorAll(".team-card");
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 px-6 md:px-12 bg-[#131313]">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-16">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400 mb-4">
            The People
          </p>
          <h2 className="text-[clamp(32px,5vw,56px)] font-bold leading-[1.05] tracking-tight text-white">
            Our Team
          </h2>
        </div>

        <div
          ref={containerRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {team.map((member, index) => (
            <div
              key={index}
              className="team-card opacity-0 translate-y-8 transition-all duration-700"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="aspect-[3/4] rounded-xl bg-gray-800 mb-4 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                />
              </div>
              <h3 className="text-white text-[15px] font-medium mb-1">
                {member.name}
              </h3>
              <p className="text-gray-500 text-[12px]">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
