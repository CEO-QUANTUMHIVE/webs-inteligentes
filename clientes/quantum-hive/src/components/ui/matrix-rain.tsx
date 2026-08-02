"use client";

import type { CSSProperties, ReactNode } from "react";

const CHARACTER_SETS = [
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  "ガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポヴァィゥェォャュョッABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "アカサタナハマヤラワイキシチニヒミリウクスツヌフムユルエケセテネヘメレオコソトノホモヨロヲン0987654321",
  "ンヲロヨモホノトソコオレメヘネテセケエルユムフヌツスクウリミヒニチシキイワラヤマハナタサカア",
  "ガザダバパギジヂビピグズヅブプゲゼデベペゴゾドボポ!@#$%^&*()_+-=[]{}|;:,.<>?",
];

const COLUMNS = Array.from({ length: 40 }, (_, index) => ({
  left: index * 25,
  delay: -(1.5 + ((index * 17) % 26) / 10),
  duration: 2.3 + ((index * 13) % 23) / 10,
  characters: CHARACTER_SETS[index % CHARACTER_SETS.length],
}));

interface MatrixRainProps {
  children?: ReactNode;
  className?: string;
  strips?: number;
}

type MatrixColumnStyle = CSSProperties & {
  "--matrix-left": string;
  "--matrix-delay": string;
  "--matrix-duration": string;
};

export function MatrixRain({ children, className = "", strips = 5 }: MatrixRainProps) {
  return (
    <div className={`matrix-rain-root ${className}`}>
      <div className="matrix-rain-container" aria-hidden="true">
        {Array.from({ length: strips }, (_, stripIndex) => (
          <div className="matrix-rain-pattern" key={stripIndex}>
            {COLUMNS.map((column, columnIndex) => (
              <span
                className="matrix-rain-column"
                key={columnIndex}
                style={{
                  "--matrix-left": `${column.left}px`,
                  "--matrix-delay": `${column.delay}s`,
                  "--matrix-duration": `${column.duration}s`,
                } as MatrixColumnStyle}
              >
                {column.characters}
              </span>
            ))}
          </div>
        ))}
      </div>
      {children && <div className="matrix-rain-content">{children}</div>}

      <style jsx>{`
        .matrix-rain-root {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: inherit;
          overflow: hidden;
          background: #000;
          isolation: isolate;
        }

        .matrix-rain-container {
          position: absolute;
          inset: 0;
          display: flex;
          overflow: hidden;
          background: #000;
          contain: strict;
        }

        .matrix-rain-pattern {
          position: relative;
          width: 1000px;
          height: 100%;
          flex-shrink: 0;
        }

        .matrix-rain-column {
          position: absolute;
          top: -100%;
          left: var(--matrix-left);
          width: 20px;
          height: 100%;
          overflow: visible;
          color: transparent;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 16px;
          font-weight: 700;
          line-height: 18px;
          letter-spacing: 1px;
          white-space: nowrap;
          writing-mode: vertical-lr;
          background: linear-gradient(
            to bottom,
            #fff 0%,
            #fff 5%,
            #00ff41 10%,
            #00ff41 20%,
            #00dd33 30%,
            #00bb22 40%,
            #009911 50%,
            #007700 60%,
            #005500 70%,
            #003300 80%,
            rgba(0, 255, 65, 0.5) 90%,
            transparent 100%
          );
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          animation: matrix-fall var(--matrix-duration) linear var(--matrix-delay) infinite;
          will-change: transform, opacity;
        }

        .matrix-rain-content {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
        }

        @keyframes matrix-fall {
          0% {
            transform: translateY(-10%);
            opacity: 1;
          }
          100% {
            transform: translateY(200%);
            opacity: 0;
          }
        }

        @media (max-width: 768px) {
          .matrix-rain-column {
            width: 18px;
            font-size: 14px;
            line-height: 16px;
          }
        }

        @media (max-width: 480px) {
          .matrix-rain-column {
            width: 15px;
            font-size: 12px;
            line-height: 14px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .matrix-rain-column {
            top: -30%;
            opacity: 0.42;
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
