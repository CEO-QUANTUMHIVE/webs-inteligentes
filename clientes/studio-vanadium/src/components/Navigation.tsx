"use client";

import { useEffect, useRef, useState } from "react";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Works", href: "#works" },
    { label: "About", href: "#about" },
  ];

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-[72px] flex items-center justify-between">
        <a href="#home" className="text-[15px] font-medium tracking-tight">
          Studio — Vanadium
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link text-[13px] text-gray-500 hover:text-black transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="cta-button hidden md:block"
        >
          Let&apos;s Collaborate
        </a>

        <button className="md:hidden flex flex-col gap-1.5 w-6">
          <span className="block h-[1.5px] bg-black w-full" />
          <span className="block h-[1.5px] bg-black w-full" />
        </button>
      </div>
    </nav>
  );
}
