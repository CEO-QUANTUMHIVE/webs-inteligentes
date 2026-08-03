"use client";

export default function Clients() {
  const clients = [
    "MCI", "HUSSEL", "YELLOW CLINIC", "PLN", "&KINN",
    "RIMBAWAN", "TRIPATRA", "ITS", "FREAKY JUNK", "OUTLOOK PAREKRAF",
    "MANDALIKA", "GAPURA", "JOTUN", "KONSILI", "UNAIR",
  ];

  return (
    <section className="py-16 overflow-hidden border-t border-gray-100">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-8">
        <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400">
          Trusted By
        </p>
      </div>

      <div className="relative">
        <div className="marquee-track flex items-center gap-16 whitespace-nowrap">
          {[...clients, ...clients].map((client, i) => (
            <span
              key={i}
              className="text-[clamp(14px,2vw,18px)] font-medium text-gray-300 tracking-wide uppercase"
            >
              {client}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
