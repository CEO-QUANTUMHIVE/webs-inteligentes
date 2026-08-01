import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, MessageSquare, X } from "lucide-react";

interface HeaderProps {
  onOpenProject: () => void;
  onOpenChat: () => void;
}

const menuItems = [
  ["01", "Selected work"],
  ["02", "Capabilities"],
  ["03", "About Gamer"],
  ["04", "Global offices"],
];

export default function Header({ onOpenProject, onOpenChat }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="relative z-20 w-full px-6 md:px-12 py-5 md:py-7 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setIsMenuOpen(true)}
          className="group flex items-center gap-3 text-left"
          aria-label="Abrir menú"
        >
          <span className="h-10 w-10 rounded-full border border-coral/40 bg-black/50 backdrop-blur-md flex items-center justify-center group-hover:bg-coral group-hover:text-black transition-colors">
            <Menu size={16} />
          </span>
          <span>
            <span className="block font-display font-black tracking-[-0.04em] text-xl leading-none">GAMER</span>
            <span className="hidden sm:block font-mono text-[8px] tracking-[0.22em] text-white/45 mt-1">GLOBAL DESIGN OFFICE</span>
          </span>
        </button>

        <div className="hidden md:flex items-center gap-8 font-mono text-[10px] tracking-[0.16em] text-white/55 uppercase">
          <span className="flex items-center gap-2"><i className="h-1.5 w-1.5 rounded-full bg-coral animate-pulse" /> Madrid · New York</span>
          <span>Local time 21:42</span>
        </div>

        <button
          type="button"
          onClick={onOpenProject}
          className="group h-10 px-3 sm:px-4 md:px-5 rounded-full border border-coral/55 bg-coral text-black font-mono text-[9px] sm:text-[10px] tracking-[0.12em] sm:tracking-[0.14em] font-bold uppercase flex items-center gap-2 hover:bg-[#f1eee9] hover:border-[#f1eee9] transition-colors"
        >
          <span className="hidden sm:inline">Start a project</span>
          <span className="sm:hidden">Project</span>
          <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
        </button>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/65 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="h-full w-full md:w-[58vw] lg:w-[46vw] bg-[#090807] border-r border-coral/25 p-6 md:p-10 flex flex-col"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-6">
                <span className="font-display text-3xl font-black tracking-[-0.05em]">GAMER®</span>
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  className="h-11 w-11 rounded-full border border-white/15 flex items-center justify-center hover:border-coral hover:text-coral transition-colors"
                  aria-label="Cerrar menú"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="flex-1 flex flex-col justify-center">
                {menuItems.map(([number, label], index) => (
                  <motion.a
                    key={label}
                    href="#"
                    initial={{ opacity: 0, x: -28 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.14 + index * 0.07 }}
                    onClick={(event) => event.preventDefault()}
                    className="group flex items-baseline gap-5 border-b border-white/10 py-4 md:py-5"
                  >
                    <span className="font-mono text-[10px] text-coral">{number}</span>
                    <span className="font-display text-[clamp(2rem,5vw,4.7rem)] font-bold tracking-[-0.055em] text-[#f1eee9] group-hover:text-coral group-hover:translate-x-3 transition-all">
                      {label}
                    </span>
                  </motion.a>
                ))}
              </nav>

              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-6">
                <p className="max-w-xs text-xs leading-relaxed text-white/45">
                  Building identities, digital products and cultural moments for ambitious global brands.
                </p>
                <button
                  type="button"
                  onClick={() => { setIsMenuOpen(false); onOpenChat(); }}
                  className="flex items-center gap-2 text-coral font-mono text-[10px] tracking-[0.16em] uppercase"
                >
                  <MessageSquare size={14} /> Talk to the studio
                </button>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
