import { motion, type Variants } from "motion/react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", damping: 18, stiffness: 100 },
  },
};

const wordClass =
  "font-display text-[clamp(7.5rem,24vw,22rem)] md:text-[clamp(10rem,18vw,20rem)] font-black leading-[0.68] tracking-[-0.085em] text-[#f1eee9]";

export default function GamerTitle() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative w-full max-w-7xl mx-auto px-6 md:px-12 pt-4 md:pt-6 pb-2 select-none"
      aria-hidden="true"
    >
      <div className="flex flex-col md:flex-row items-stretch justify-between relative">
        <div className="hidden md:block absolute inset-y-0 left-1/2 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />

        <motion.div variants={itemVariants} className="w-full md:w-1/2">
          <p className="text-xs font-mono tracking-[0.25em] text-white/40 mb-1 ml-2 uppercase">
            2025
          </p>
          <h1 className={wordClass}>GA</h1>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="w-full md:w-1/2 -mt-2 md:mt-0 md:text-right"
        >
          <p className="text-xs font-mono tracking-[0.2em] text-white/40 mb-1 mr-2 uppercase">
            800+ Happy Clients
          </p>
          <h1 className={wordClass}>ER</h1>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="absolute left-[42%] top-[46%] md:left-1/2 md:top-[54%] -translate-x-1/2 -translate-y-1/2"
        >
          <div className="h-10 w-10 md:h-14 md:w-14 rounded-full border border-coral/70 bg-black/70 flex items-center justify-center shadow-[0_0_35px_rgba(255,87,51,0.45)]">
            <span className="font-mono text-[9px] md:text-[10px] tracking-[0.16em] text-coral">PLAY</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
