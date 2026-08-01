import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { ArrowUp, Bot, Sparkles, X } from "lucide-react";

interface ChatDrawerProps {
  onClose: () => void;
}

interface Message {
  id: number;
  sender: "ai" | "user";
  text: string;
}

const replies = [
  "We work best with ambitious teams facing a real inflection point: a launch, repositioning or new digital product.",
  "A focused identity engagement usually runs 8–12 weeks. Larger brand and product ecosystems are shaped in phases.",
  "Tell me the category, the business shift and what must feel different when the work is done.",
];

export default function ChatDrawer({ onClose }: ChatDrawerProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: "ai", text: "Hi. I’m the Gamer studio assistant. What are you trying to change?" },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  const sendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = input.trim();
    if (!text || isThinking) return;

    const id = Date.now();
    setMessages((current) => [...current, { id, sender: "user", text }]);
    setInput("");
    setIsThinking(true);

    window.setTimeout(() => {
      const reply = replies[messages.filter((message) => message.sender === "user").length % replies.length];
      setMessages((current) => [...current, { id: id + 1, sender: "ai", text: reply }]);
      setIsThinking(false);
    }, 850);
  };

  return (
    <motion.aside
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[28rem] bg-[#0a0908] border-l border-coral/30 shadow-[-30px_0_100px_rgba(0,0,0,0.7)] flex flex-col"
    >
      <div className="flex items-center justify-between p-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <span className="h-10 w-10 rounded-full bg-coral text-black flex items-center justify-center"><Bot size={17} /></span>
          <div>
            <p className="font-display font-bold tracking-[-0.03em]">Gamer AI</p>
            <p className="font-mono text-[8px] tracking-[0.16em] text-white/35 uppercase flex items-center gap-1.5"><i className="h-1.5 w-1.5 rounded-full bg-coral" /> Studio knowledge online</p>
          </div>
        </div>
        <button type="button" onClick={onClose} aria-label="Cerrar chat" className="h-10 w-10 rounded-full border border-white/15 flex items-center justify-center hover:border-coral hover:text-coral transition-colors"><X size={16} /></button>
      </div>

      <div className="px-5 py-3 border-b border-white/10 bg-coral/[0.04]">
        <p className="font-mono text-[8px] tracking-[0.14em] text-white/35 uppercase flex items-center gap-2"><Sparkles size={11} className="text-coral" /> Ask about fit, process, timing or investment</p>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`max-w-[85%] text-sm leading-relaxed p-3 ${message.sender === "user" ? "ml-auto bg-coral text-black" : "border border-white/10 bg-white/[0.03] text-white/65"}`}
          >
            {message.text}
          </motion.div>
        ))}
        {isThinking && (
          <div className="flex gap-1 p-3 border border-white/10 w-fit">
            {[0, 1, 2].map((dot) => <motion.i key={dot} className="h-1.5 w-1.5 rounded-full bg-coral" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 0.8, repeat: Infinity, delay: dot * 0.12 }} />)}
          </div>
        )}
        <div ref={endRef} />
      </div>

      <form onSubmit={sendMessage} className="p-4 border-t border-white/10">
        <div className="flex items-center gap-2 border border-white/15 p-2 focus-within:border-coral transition-colors">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask Gamer AI..."
            className="flex-1 bg-transparent px-2 text-sm text-white placeholder:text-white/25 outline-none"
          />
          <button type="submit" disabled={!input.trim() || isThinking} className="h-9 w-9 rounded-full bg-coral text-black flex items-center justify-center disabled:opacity-25"><ArrowUp size={15} /></button>
        </div>
        <p className="font-mono text-[7px] text-white/20 tracking-[0.12em] uppercase text-center mt-3">Prototype assistant · no data is transmitted</p>
      </form>
    </motion.aside>
  );
}
