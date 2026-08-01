import { motion } from "motion/react";
import { ArrowRight, MessageCircle } from "lucide-react";

const avatars = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80",
];

export function LeftInfoBlock({ onOpenProject }: { onOpenProject: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-xl mb-12 md:mb-10"
    >
      <p className="font-mono text-[9px] md:text-[10px] tracking-[0.22em] text-coral uppercase mb-2 md:mb-4">
        Independent global design agency
      </p>
      <h2 className="font-display text-[clamp(1.65rem,3vw,3.15rem)] font-medium tracking-[-0.045em] leading-[0.98] text-[#f1eee9]">
        We create brands people<br className="hidden sm:block" /> choose to live with.
      </h2>
      <button
        type="button"
        onClick={onOpenProject}
        className="mt-3 md:mt-5 group flex items-center gap-3 font-mono text-[9px] md:text-[10px] tracking-[0.16em] uppercase text-white/70 hover:text-coral transition-colors"
      >
        Configure your next project
        <span className="h-7 w-7 rounded-full border border-coral/50 flex items-center justify-center group-hover:bg-coral group-hover:text-black transition-colors">
          <ArrowRight size={12} />
        </span>
      </button>
    </motion.div>
  );
}

export function RightInfoBlock({ onOpenChat }: { onOpenChat: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.82, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md border-t border-white/15 pt-3 md:pt-5 mb-12 md:mb-10"
    >
      <div className="flex items-center justify-between gap-5">
        <div className="flex -space-x-2.5">
          {avatars.map((src, index) => (
            <img
              key={src}
              src={src}
              alt={`Cliente Gamer ${index + 1}`}
              referrerPolicy="no-referrer"
              className="h-8 w-8 md:h-10 md:w-10 rounded-full object-cover border-2 border-black grayscale hover:grayscale-0 transition-all"
            />
          ))}
          <span className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-coral text-black border-2 border-black flex items-center justify-center font-mono text-[8px] font-bold">+797</span>
        </div>
        <span className="font-mono text-[8px] md:text-[9px] tracking-[0.15em] text-white/40 uppercase text-right">
          Trusted across<br />27 countries
        </span>
      </div>

      <div className="mt-3 md:mt-5 flex items-end justify-between gap-5">
        <p className="text-[11px] md:text-xs leading-relaxed text-white/55 max-w-[28ch]">
          Strategy, identity and digital experiences for brands moving at the speed of culture.
        </p>
        <button
          type="button"
          onClick={onOpenChat}
          className="shrink-0 h-10 w-10 rounded-full border border-coral/50 text-coral flex items-center justify-center hover:bg-coral hover:text-black transition-colors"
          aria-label="Abrir chat con Gamer AI"
        >
          <MessageCircle size={16} />
        </button>
      </div>
    </motion.div>
  );
}
