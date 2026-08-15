"use client";

import { useEffect, useRef, useState } from "react";
import { CursorEffectProps, DEFAULTS } from "./types";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?><{}[]";

export default function TextScramble({ color, secondaryColor, size = DEFAULTS.size, speed = DEFAULTS.speed, intensity = DEFAULTS.intensity }: CursorEffectProps) {
  const [text, setText] = useState("HOVER ME");
  const [scrambling, setScrambling] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const targetRef = useRef("HOVER ME");
  const colorRef = useRef(color || DEFAULTS.color);
  const speedRef = useRef(speed);

  useEffect(() => { colorRef.current = color || DEFAULTS.color; }, [color]);
  useEffect(() => { speedRef.current = speed; }, [speed]);

  const scramble = (target: string) => {
    targetRef.current = target;
    setScrambling(true);
    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setText(
        target
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration) return target[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      iteration += 1 / 2;
      if (iteration >= target.length) {
        setText(target);
        setScrambling(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, 30 / speedRef.current);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const words = [
    "QUANTUM HIVE",
    "WEBS INTELIGENTES",
    "AGENTES CONVERSACIONALES",
    "DISEÑO PREMIUM",
    "DESARROLLO ÁGIL",
  ];

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center gap-8"
      style={{ background: "transparent" }}
    >
      <p
        className="cursor-default select-none text-4xl font-bold tracking-wider text-white transition-colors md:text-6xl"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          color: scrambling ? colorRef.current : "#ffffff",
        }}
        onMouseEnter={() => scramble(words[Math.floor(Math.random() * words.length)])}
      >
        {text}
      </p>
      <div className="flex gap-3">
        {words.slice(0, 4).map((w) => (
          <button
            key={w}
            className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/50 transition-all hover:border-cyan-400/50 hover:text-cyan-400"
            onMouseEnter={() => scramble(w)}
          >
            {w.split(" ")[0]}
          </button>
        ))}
      </div>
    </div>
  );
}
