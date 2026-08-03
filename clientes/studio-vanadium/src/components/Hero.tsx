"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [time, setTime] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center items-center px-6 md:px-12 pt-24 pb-16 relative"
    >
      <div
        className={`text-center transition-all duration-1000 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h1 className="text-[clamp(40px,8vw,100px)] font-bold leading-[0.9] tracking-tight mb-6">
          Studio —
          <br />
          <span className="gradient-text">Vanadium</span>
        </h1>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-[13px] text-gray-400 mt-8">
          <span>6°58&apos;22.8&quot;S 112°45&apos;12.0&quot;E</span>
          <span className="hidden md:inline">·</span>
          <span>{mounted ? time : "00:00:00"} WIB</span>
          <span className="hidden md:inline">·</span>
          <span>Surabaya, Indonesia</span>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-gray-300" />
      </div>
    </section>
  );
}
