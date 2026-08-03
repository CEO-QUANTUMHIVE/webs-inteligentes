"use client";

import { useEffect, useRef } from "react";

const services = [
  {
    title: "Brand Identity Design",
    label: "[OUR SERVICE]",
    items: [
      "Brand Strategy + Positioning",
      "Brand Naming + Story",
      "Brand Activation",
      "Logotype & Logomarks",
    ],
    details: [
      "Verbal Identity",
      "Visual Identity System",
    ],
  },
  {
    title: "Creative Communication Design",
    label: "[OUR SERVICE]",
    items: [
      "Company Branding",
      "Copywriting",
      "Media Relations",
      "Leader Branding",
    ],
    details: [
      "Social Media Management",
      "Public Relations Handling",
    ],
  },
  {
    title: "Graphic Design",
    label: "[OUR SERVICE]",
    items: [
      "Collaterals Design",
      "Editorial Design",
      "Graphic Elements",
      "Pattern/Icon Design",
    ],
    details: [
      "Mascot Design",
      "Packaging Design",
      "Data Visualization/Infographics",
      "Illustrations",
      "Digital Imaging",
    ],
  },
  {
    title: "Environmental Graphic Design",
    label: "[OUR SERVICE]",
    items: [
      "Wayfinding Systems",
      "Signage Design",
      "Graphic Environments",
      "Exhibitions Design",
      "Booth Design",
    ],
    details: [],
  },
  {
    title: "UI/UX Design",
    label: "[OUR SERVICE]",
    items: [
      "User Research & Strategy",
      "Wireframing & Prototyping",
      "Visual Design",
      "Usability Testing",
    ],
    details: [
      "Design System",
      "Responsive Design",
    ],
  },
  {
    title: "Multimedia",
    label: "[OUR SERVICE]",
    items: [
      "Motion Graphics",
      "Video Production",
      "Animation",
      "Interactive Media",
    ],
    details: [
      "3D Visualization",
      "AR/VR Experiences",
    ],
  },
];

export default function Services() {
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

    const items = containerRef.current?.querySelectorAll(".slide-in-left");
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="py-24 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-16">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400 mb-4">
            What We Do
          </p>
          <h2 className="text-[clamp(32px,5vw,56px)] font-bold leading-[1.05] tracking-tight">
            Our Services
          </h2>
        </div>

        <div ref={containerRef} className="space-y-0">
          {services.map((service, index) => (
            <div
              key={index}
              className="slide-in-left border-t border-gray-100 py-8 md:py-12"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start">
                <div className="md:col-span-5">
                  <h3 className="text-[clamp(24px,3vw,36px)] font-medium leading-[1.1] mb-3">
                    {service.title}
                  </h3>
                  <p className="text-[11px] uppercase tracking-[0.15em] text-gray-400 mb-4">
                    {service.label}
                  </p>
                </div>

                <div className="md:col-span-3">
                  <p className="text-[14px] leading-[1.8] text-gray-500">
                    {service.items.join("\n")}
                  </p>
                </div>

                <div className="md:col-span-4">
                  {service.details.length > 0 && (
                    <p className="text-[14px] leading-[1.8] text-gray-400">
                      {service.details.join("\n")}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div className="border-t border-gray-100" />
        </div>
      </div>
    </section>
  );
}
