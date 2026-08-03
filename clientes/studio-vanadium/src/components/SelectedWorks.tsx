"use client";

import { useEffect, useRef } from "react";

const works = [
  { title: "MCI", category: "Brand Identity", year: "2024", image: "https://picsum.photos/seed/mci/800/600" },
  { title: "Hussel", category: "Visual Identity", year: "2024", image: "https://picsum.photos/seed/hussel/800/600" },
  { title: "Yellow Clinic", category: "Brand Strategy", year: "2024", image: "https://picsum.photos/seed/yellowclinic/800/600" },
  { title: "Outlook Parekraf", category: "Editorial Design", year: "2024", image: "https://picsum.photos/seed/parekraf/800/600" },
  { title: "PLN", category: "Environmental Graphic", year: "2024", image: "https://picsum.photos/seed/pln/800/600" },
  { title: "&Kinn", category: "Packaging Design", year: "2024", image: "https://picsum.photos/seed/kinn/800/600" },
  { title: "Rimbawan", category: "Brand Identity", year: "2024", image: "https://picsum.photos/seed/rimbawan/800/600" },
  { title: "Tripatra", category: "Corporate Identity", year: "2024", image: "https://picsum.photos/seed/tripatra/800/600" },
  { title: "ITS", category: "Visual Identity", year: "2024", image: "https://picsum.photos/seed/its/800/600" },
  { title: "Freaky Junk", category: "Brand Activation", year: "2024", image: "https://picsum.photos/seed/freakyjunk/800/600" },
];

export default function SelectedWorks() {
  const gridRef = useRef<HTMLDivElement>(null);

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

    const items = gridRef.current?.querySelectorAll(".work-card");
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="works" className="py-24 px-6 md:px-12 bg-gray-800">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-16">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400 mb-4">
            Portfolio
          </p>
          <h2 className="text-[clamp(32px,5vw,56px)] font-bold leading-[1.05] tracking-tight text-white">
            Selected Works
          </h2>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {works.map((work, index) => (
            <div
              key={index}
              className="work-card group cursor-pointer opacity-0 translate-y-8 transition-all duration-700"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden rounded-xl aspect-[4/3] bg-gray-700">
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-end p-6">
                  <div className="translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-white text-[11px] uppercase tracking-[0.15em] mb-1">
                      {work.category}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <h3 className="text-white text-[clamp(18px,2vw,24px)] font-medium">
                  {work.title}
                </h3>
                <span className="text-gray-500 text-[13px]">
                  {work.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
