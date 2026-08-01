import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";

interface AudioGraph {
  context: AudioContext;
  master: GainNode;
  oscillators: OscillatorNode[];
  lfo: OscillatorNode;
}

interface AudioWindow extends Window {
  webkitAudioContext?: typeof AudioContext;
}

export default function SoundToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const graphRef = useRef<AudioGraph | null>(null);

  const stopSound = () => {
    const graph = graphRef.current;
    if (!graph) return;

    const now = graph.context.currentTime;
    graph.master.gain.cancelScheduledValues(now);
    graph.master.gain.setValueAtTime(graph.master.gain.value, now);
    graph.master.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

    window.setTimeout(() => {
      graph.oscillators.forEach((oscillator) => oscillator.stop());
      graph.lfo.stop();
      void graph.context.close();
    }, 420);

    graphRef.current = null;
    setIsPlaying(false);
  };

  const startSound = async () => {
    const AudioContextClass = window.AudioContext ?? (window as AudioWindow).webkitAudioContext;
    if (!AudioContextClass) return;

    const context = new AudioContextClass();
    await context.resume();

    const master = context.createGain();
    const filter = context.createBiquadFilter();
    const compressor = context.createDynamicsCompressor();
    master.gain.setValueAtTime(0.0001, context.currentTime);
    master.gain.exponentialRampToValueAtTime(0.055, context.currentTime + 1.4);
    filter.type = "lowpass";
    filter.frequency.value = 520;
    filter.Q.value = 7;

    master.connect(filter);
    filter.connect(compressor);
    compressor.connect(context.destination);

    const frequencies = [55, 82.5, 110];
    const oscillatorTypes: OscillatorType[] = ["sine", "triangle", "sine"];
    const oscillators = frequencies.map((frequency, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = oscillatorTypes[index];
      oscillator.frequency.value = frequency;
      oscillator.detune.value = index === 1 ? -7 : index === 2 ? 4 : 0;
      gain.gain.value = index === 0 ? 0.58 : index === 1 ? 0.2 : 0.08;
      oscillator.connect(gain);
      gain.connect(master);
      oscillator.start();
      return oscillator;
    });

    const lfo = context.createOscillator();
    const lfoGain = context.createGain();
    lfo.type = "sine";
    lfo.frequency.value = 0.075;
    lfoGain.gain.value = 135;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    graphRef.current = { context, master, oscillators, lfo };
    setIsPlaying(true);
  };

  const toggleSound = () => {
    if (graphRef.current) stopSound();
    else void startSound();
  };

  useEffect(() => () => {
    const graph = graphRef.current;
    if (!graph) return;
    graph.oscillators.forEach((oscillator) => oscillator.stop());
    graph.lfo.stop();
    void graph.context.close();
  }, []);

  return (
    <button
      type="button"
      onClick={toggleSound}
      className="fixed left-4 md:left-6 bottom-4 z-40 h-10 px-3 rounded-full border border-white/15 bg-black/75 backdrop-blur-md flex items-center gap-2 hover:border-coral transition-colors"
      aria-label={isPlaying ? "Apagar sonido ambiente" : "Encender sonido ambiente"}
    >
      <span className="text-coral">{isPlaying ? <Volume2 size={14} /> : <VolumeX size={14} />}</span>
      <span className="font-mono text-[8px] md:text-[9px] tracking-[0.14em] uppercase text-white/55">
        Sound {isPlaying ? "on" : "off"}
      </span>
      {isPlaying && (
        <span className="flex items-end gap-[2px] h-3 ml-1" aria-hidden="true">
          {[0, 1, 2].map((bar) => (
            <motion.i
              key={bar}
              className="block w-[2px] bg-coral"
              animate={{ height: [3, 11 - bar * 2, 4] }}
              transition={{ duration: 0.7, repeat: Infinity, delay: bar * 0.12 }}
            />
          ))}
        </span>
      )}
    </button>
  );
}
