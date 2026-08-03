"use client";

import { useEffect, useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Absorb",
    description: "We immerse ourselves in your brand world — understanding your vision, audience, and the landscape you operate in.",
  },
  {
    number: "02",
    title: "Encode",
    description: "We distill insights into strategic frameworks, defining the visual language and narrative that will drive your brand forward.",
  },
  {
    number: "03",
    title: "Generate",
    description: "We bring ideas to life through design — crafting identities, systems, and experiences that resonate and endure.",
  },
  {
    number: "04",
    title: "Apply",
    description: "We implement across every touchpoint — ensuring consistency and impact from digital to physical environments.",
  },
];

export default function Process() {
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
      { threshold: 0.2 }
    );

    const items = containerRef.current?.querySelectorAll(".fade-in-up");
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-24 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-16">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400 mb-4">
            Our Approach
          </p>
          <h2 className="text-[clamp(32px,5vw,56px)] font-bold leading-[1.05] tracking-tight">
            The Process
          </h2>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="fade-in-up"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="process-number mb-6">{step.number}</div>
              <h3 className="text-[clamp(24px,3vw,32px)] font-bold mb-4">
                {step.title}
              </h3>
              <p className="text-[14px] leading-[1.7] text-gray-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
