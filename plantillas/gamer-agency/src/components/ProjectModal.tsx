import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { ArrowRight, Check, X } from "lucide-react";

interface ProjectModalProps {
  onClose: () => void;
}

const projectTypes = ["Brand identity", "Digital product", "Campaign", "Full ecosystem"];
const budgets = ["€25K—50K", "€50K—100K", "€100K—250K", "€250K+"];

export default function ProjectModal({ onClose }: ProjectModalProps) {
  const [projectType, setProjectType] = useState(projectTypes[0]);
  const [budget, setBudget] = useState(budgets[1]);
  const [submitted, setSubmitted] = useState(false);

  const submitProject = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#0a0908] border border-coral/35 shadow-[0_30px_120px_rgba(0,0,0,0.85)]"
      >
        <div className="sticky top-0 z-10 bg-[#0a0908]/95 backdrop-blur-md flex items-center justify-between px-5 md:px-8 py-5 border-b border-white/10">
          <div>
            <p className="font-mono text-[9px] tracking-[0.2em] text-coral uppercase">Project configurator · 01</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold tracking-[-0.04em] mt-1">Build the brief.</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Cerrar configurador" className="h-10 w-10 rounded-full border border-white/15 flex items-center justify-center hover:border-coral hover:text-coral transition-colors">
            <X size={17} />
          </button>
        </div>

        {submitted ? (
          <div className="min-h-[28rem] flex flex-col items-center justify-center text-center p-8">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="h-16 w-16 rounded-full bg-coral text-black flex items-center justify-center mb-6">
              <Check size={28} />
            </motion.div>
            <p className="font-mono text-[9px] tracking-[0.2em] text-coral uppercase">Signal received</p>
            <h3 className="font-display text-4xl md:text-6xl font-bold tracking-[-0.06em] mt-3">Let’s make it real.</h3>
            <p className="text-sm text-white/50 max-w-md mt-4 leading-relaxed">
              Our new-business team will shape your answers into a focused first conversation.
            </p>
            <button type="button" onClick={onClose} className="mt-8 h-11 px-6 rounded-full bg-coral text-black font-mono text-[10px] tracking-[0.15em] font-bold uppercase">Return to Gamer</button>
          </div>
        ) : (
          <form onSubmit={submitProject} className="grid md:grid-cols-2">
            <div className="p-5 md:p-8 border-b md:border-b-0 md:border-r border-white/10">
              <FieldLabel number="01" label="What are we making?" />
              <div className="grid grid-cols-2 gap-2 mt-4">
                {projectTypes.map((type) => (
                  <OptionButton key={type} active={projectType === type} onClick={() => setProjectType(type)}>{type}</OptionButton>
                ))}
              </div>

              <FieldLabel number="02" label="What is the investment?" className="mt-8" />
              <div className="grid grid-cols-2 gap-2 mt-4">
                {budgets.map((option) => (
                  <OptionButton key={option} active={budget === option} onClick={() => setBudget(option)}>{option}</OptionButton>
                ))}
              </div>
            </div>

            <div className="p-5 md:p-8">
              <FieldLabel number="03" label="Who should we call?" />
              <div className="space-y-5 mt-5">
                <TextField label="Name" name="name" placeholder="Your name" required />
                <TextField label="Work email" name="email" placeholder="you@company.com" type="email" required />
                <label className="block">
                  <span className="font-mono text-[8px] tracking-[0.16em] text-white/40 uppercase">One-line challenge</span>
                  <textarea
                    name="challenge"
                    required
                    rows={3}
                    placeholder="We need to become..."
                    className="mt-2 w-full resize-none bg-transparent border-b border-white/20 py-2 text-sm text-white placeholder:text-white/20 focus:border-coral outline-none transition-colors"
                  />
                </label>
              </div>

              <button type="submit" className="group mt-7 w-full h-12 bg-coral text-black font-mono text-[10px] tracking-[0.16em] font-bold uppercase flex items-center justify-center gap-3 hover:bg-[#f1eee9] transition-colors">
                Send the brief <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="font-mono text-[7px] tracking-[0.12em] text-white/25 uppercase mt-3 text-center">No deck required · human reply within 48 hours</p>
            </div>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}

function FieldLabel({ number, label, className = "" }: { number: string; label: string; className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="font-mono text-[8px] text-coral">{number}</span>
      <span className="font-mono text-[9px] tracking-[0.16em] text-white/55 uppercase">{label}</span>
    </div>
  );
}

function OptionButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-16 p-3 border text-left text-xs transition-colors ${active ? "border-coral bg-coral text-black" : "border-white/10 text-white/55 hover:border-coral/60"}`}
    >
      {children}
    </button>
  );
}

function TextField({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="font-mono text-[8px] tracking-[0.16em] text-white/40 uppercase">{label}</span>
      <input {...props} className="mt-2 w-full bg-transparent border-b border-white/20 py-2 text-sm text-white placeholder:text-white/20 focus:border-coral outline-none transition-colors" />
    </label>
  );
}
