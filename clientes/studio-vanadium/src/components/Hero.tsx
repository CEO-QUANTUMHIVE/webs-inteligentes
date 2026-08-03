"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      const timeOptions: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTime(new Intl.DateTimeFormat("en-US", timeOptions).format(now));
      
      const dateOptions: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Jakarta",
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      setDate(new Intl.DateTimeFormat("en-US", dateOptions).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center items-center px-6 md:px-12 relative"
    >
      <div
        className={`text-center transition-all duration-1000 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h1 className="font-[300] text-[clamp(60px,12vw,180px)] leading-[0.9] tracking-[-0.02em] mb-8">
          Studio — Vanadium
        </h1>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 text-[13px] text-gray-400 mt-8">
          <span>7° 18&apos; 38.664&apos;&apos; S 112° 45&apos; 32.1084&apos;&apos; E</span>
          <span>{mounted ? time : "00:00:00"} WIB</span>
          <span>{date || "Loading..."}</span>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <div className="w-[1px] h-16 bg-gradient-to-b from-gray-300 to-transparent" />
      </div>
    </section>
  );
}
