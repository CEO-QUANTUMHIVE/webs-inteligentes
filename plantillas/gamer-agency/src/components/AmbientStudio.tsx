import { AnimatePresence, motion } from "motion/react";
import { Aperture, Minus, Plus, SlidersHorizontal, X } from "lucide-react";

interface AmbientStudioProps {
  color: string;
  size: number;
  intensity: number;
  isOpen: boolean;
  onToggle: () => void;
  onColorChange: (color: string) => void;
  onSizeChange: (size: number) => void;
  onIntensityChange: (intensity: number) => void;
}

const glowPresets = [
  "rgba(255, 87, 51, 0.45)",
  "rgba(255, 69, 0, 0.52)",
  "rgba(255, 112, 78, 0.42)",
];

export default function AmbientStudio({
  color,
  size,
  intensity,
  isOpen,
  onToggle,
  onColorChange,
  onSizeChange,
  onIntensityChange,
}: AmbientStudioProps) {
  return (
    <div className="fixed right-4 md:right-6 bottom-4 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="w-[min(20rem,calc(100vw-2rem))] bg-[#0b0a09]/95 border border-coral/30 backdrop-blur-xl p-4 shadow-[0_20px_80px_rgba(0,0,0,0.65)]"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <p className="font-mono text-[9px] tracking-[0.2em] text-coral uppercase">Ambient studio</p>
                <p className="text-[10px] text-white/40 mt-1">Tune the room, not the brand.</p>
              </div>
              <button type="button" onClick={onToggle} aria-label="Cerrar controles de luz" className="text-white/45 hover:text-coral">
                <X size={15} />
              </button>
            </div>

            <div className="pt-4 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[8px] tracking-[0.16em] text-white/45 uppercase">Glow temperature</span>
                  <span className="font-mono text-[8px] text-coral">CORAL</span>
                </div>
                <div className="flex gap-2">
                  {glowPresets.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => onColorChange(preset)}
                      className={`h-7 flex-1 border transition-colors ${color === preset ? "border-coral" : "border-white/10"}`}
                      style={{ background: preset }}
                      aria-label="Cambiar temperatura del glow"
                    />
                  ))}
                </div>
              </div>

              <ControlRow label="Field size" value={`${size}%`}>
                <StepButton onClick={() => onSizeChange(Math.max(40, size - 10))} label="Reducir tamaño"><Minus size={12} /></StepButton>
                <input
                  aria-label="Tamaño del glow"
                  type="range"
                  min="40"
                  max="150"
                  value={size}
                  onChange={(event) => onSizeChange(Number(event.target.value))}
                  className="w-full accent-[#ff5733]"
                />
                <StepButton onClick={() => onSizeChange(Math.min(150, size + 10))} label="Aumentar tamaño"><Plus size={12} /></StepButton>
              </ControlRow>

              <ControlRow label="Intensity" value={`${intensity.toFixed(1)}x`}>
                <StepButton onClick={() => onIntensityChange(Math.max(0.5, intensity - 0.1))} label="Reducir intensidad"><Minus size={12} /></StepButton>
                <input
                  aria-label="Intensidad del glow"
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={intensity}
                  onChange={(event) => onIntensityChange(Number(event.target.value))}
                  className="w-full accent-[#ff5733]"
                />
                <StepButton onClick={() => onIntensityChange(Math.min(2, intensity + 0.1))} label="Aumentar intensidad"><Plus size={12} /></StepButton>
              </ControlRow>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={onToggle}
        className="group flex items-center gap-2 h-10 pl-3 pr-4 rounded-full border border-coral/45 bg-black/75 backdrop-blur-md text-coral hover:bg-coral hover:text-black transition-colors"
      >
        {isOpen ? <Aperture size={14} /> : <SlidersHorizontal size={14} />}
        <span className="font-mono text-[8px] md:text-[9px] tracking-[0.16em] uppercase">Ambient</span>
      </button>
    </div>
  );
}

function ControlRow({ label, value, children }: { label: string; value: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[8px] tracking-[0.16em] text-white/45 uppercase">{label}</span>
        <span className="font-mono text-[8px] text-coral">{value}</span>
      </div>
      <div className="grid grid-cols-[1.75rem_1fr_1.75rem] items-center gap-2">{children}</div>
    </div>
  );
}

function StepButton({ onClick, label, children }: { onClick: () => void; label: string; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} aria-label={label} className="h-7 w-7 border border-white/10 flex items-center justify-center text-white/55 hover:border-coral hover:text-coral transition-colors">
      {children}
    </button>
  );
}
