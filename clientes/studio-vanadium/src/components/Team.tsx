"use client";

import { useEffect, useRef } from "react";

const team = [
  { name: "Ahmad Fauzi", role: "Founder & Creative Director" },
  { name: "Dian Permata", role: "Art Director" },
  { name: "Rizky Pratama", role: "Senior Designer" },
  { name: "Maya Sari", role: "Brand Strategist" },
  { name: "Budi Santoso", role: "UI/UX Designer" },
  { name: "Putri Wulandari", role: "Graphic Designer" },
  { name: "Farhan Hidayat", role: "Motion Designer" },
  { name: "Ayu Lestari", role: "Project Manager" },
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
    <section className="py-24 px-6 md:px-12 bg-gray-800">
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
              <div className="aspect-[3/4] rounded-xl bg-gray-700 mb-4 overflow-hidden">
                <img
                  src={`https://picsum.photos/seed/${member.name.toLowerCase().replace(/\s/g, "")}/400/533`}
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
