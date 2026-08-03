"use client";

import { useEffect, useRef } from "react";

export default function Contact() {
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
    <section id="contact" className="py-24 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-16">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400 mb-4">
            Get in Touch
          </p>
          <h2 className="text-[clamp(32px,5vw,56px)] font-bold leading-[1.05] tracking-tight">
            Contact
          </h2>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-6 fade-in-up">
            <p className="text-[clamp(16px,2vw,20px)] leading-[1.7] text-gray-500 mb-12">
              Have a project in mind? We&apos;d love to hear about it. Let&apos;s create something extraordinary together.
            </p>

            <div className="space-y-6">
              <div>
                <p className="text-[11px] uppercase tracking-[0.15em] text-gray-400 mb-2">Address</p>
                <p className="text-[15px] text-gray-600">
                  Jl. Raya Darmo No. 50<br />
                  Surabaya, Jawa Timur 60241<br />
                  Indonesia
                </p>
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-[0.15em] text-gray-400 mb-2">Email</p>
                <a href="mailto:hello@studiovanadium.com" className="text-[15px] text-gray-600 hover:text-violet-primary transition-colors">
                  hello@studiovanadium.com
                </a>
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-[0.15em] text-gray-400 mb-2">Phone</p>
                <a href="tel:+62311234567" className="text-[15px] text-gray-600 hover:text-violet-primary transition-colors">
                  +62 31 1234 567
                </a>
              </div>
            </div>
          </div>

          <div className="md:col-span-6 fade-in-up" style={{ transitionDelay: "200ms" }}>
            <div className="space-y-6">
              <div>
                <p className="text-[11px] uppercase tracking-[0.15em] text-gray-400 mb-2">Social</p>
                <div className="flex flex-col gap-3">
                  {["Instagram", "Behance", "Dribbble", "LinkedIn"].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="text-[15px] text-gray-600 hover:text-violet-primary transition-colors w-fit"
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
