import { useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import AmbientStudio from "./AmbientStudio";
import ChatDrawer from "./ChatDrawer";
import GamerTitle from "./GamerTitle";
import Header from "./Header";
import { LeftInfoBlock, RightInfoBlock } from "./InfoBlocks";
import ProjectModal from "./ProjectModal";
import SoundToggle from "./SoundToggle";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_3Bd1EO6EIHxSqCgleKKy9qZ3l1v/hf_20260708_013819_edaa01af-a48e-49c8-a167-17787c36d012.mp4";

export default function HeroScene() {
  const [ambientGlowColor, setAmbientGlowColor] = useState("rgba(255, 87, 51, 0.45)");
  const [glowSize, setGlowSize] = useState(80);
  const [glowIntensity, setGlowIntensity] = useState(1);
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showGlowControls, setShowGlowControls] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const nextTargetTimeRef = useRef<number | null>(null);

  const storeDuration = () => {
    const video = videoRef.current;
    if (video && Number.isFinite(video.duration)) setVideoDuration(video.duration);
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    if (Number.isFinite(video.duration)) setVideoDuration(video.duration);
    video.pause();
    video.currentTime = 0;
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    let duration = videoDuration || video.duration;
    if (!duration || Number.isNaN(duration) || !Number.isFinite(duration)) duration = 4.0;

    const rect = container.getBoundingClientRect();
    const percentage = (event.clientX - rect.left) / rect.width;
    const progress = (percentage - 0.1) / 0.8;
    const clampedProgress = Math.max(0, Math.min(1, progress));
    const maxSeekableTime = Math.max(0, duration - 0.05);
    const targetTime = clampedProgress * maxSeekableTime;

    if (video.seeking) nextTargetTimeRef.current = targetTime;
    else video.currentTime = targetTime;
  };

  const handleSeeked = () => {
    const video = videoRef.current;
    if (!video || nextTargetTimeRef.current === null) return;
    const nextTime = nextTargetTimeRef.current;
    nextTargetTimeRef.current = null;
    video.currentTime = nextTime;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen bg-black text-white font-sans overflow-hidden flex flex-col justify-between selection:bg-coral selection:text-black"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="grid-bg absolute inset-0 opacity-60 mix-blend-overlay" />

        <motion.div
          className="absolute left-0 top-[20%] blur-[100px] rounded-full filter"
          style={{
            background: `radial-gradient(circle, ${ambientGlowColor} 0%, rgba(0,0,0,0) 70%)`,
            width: `${55 * glowIntensity}%`,
            height: `${55 * glowIntensity}%`,
            transform: `translate(-25%, 15%) scale(${glowSize / 100})`,
          }}
          animate={{ scale: [1, 1.05, 1], opacity: [0.7, 0.85, 0.7] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-0 top-[25%] blur-[110px] rounded-full filter"
          style={{
            background: `radial-gradient(circle, ${ambientGlowColor} 0%, rgba(0,0,0,0) 70%)`,
            width: `${50 * glowIntensity}%`,
            height: `${50 * glowIntensity}%`,
            transform: `translate(25%, -10%) scale(${glowSize / 100})`,
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.75, 0.9, 0.75] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-90" />
      </div>

      <div className="absolute inset-x-0 top-[18%] md:top-[15%] lg:top-[12%] select-none pointer-events-none z-[5]">
        <GamerTitle />
      </div>

      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover opacity-95 mix-blend-screen pointer-events-none z-10"
        onLoadedMetadata={handleLoadedMetadata}
        onDurationChange={storeDuration}
        onCanPlay={storeDuration}
        onSeeked={handleSeeked}
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>

      <div className="relative z-20 h-full flex flex-col justify-between pointer-events-none">
        <div className="pointer-events-auto">
          <Header onOpenProject={() => setIsProjectOpen(true)} onOpenChat={() => setIsChatOpen(true)} />
        </div>

        <div className="w-full pointer-events-auto">
          <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 pb-4 items-end">
            <div className="lg:col-span-6 xl:col-span-7">
              <LeftInfoBlock onOpenProject={() => setIsProjectOpen(true)} />
            </div>
            <div className="lg:col-span-6 xl:col-span-5 flex justify-end">
              <RightInfoBlock onOpenChat={() => setIsChatOpen(true)} />
            </div>
          </div>
        </div>
      </div>

      <AmbientStudio
        color={ambientGlowColor}
        size={glowSize}
        intensity={glowIntensity}
        isOpen={showGlowControls}
        onToggle={() => setShowGlowControls((current) => !current)}
        onColorChange={setAmbientGlowColor}
        onSizeChange={setGlowSize}
        onIntensityChange={setGlowIntensity}
      />
      <SoundToggle />

      <AnimatePresence>
        {isProjectOpen && <ProjectModal onClose={() => setIsProjectOpen(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {isChatOpen && <ChatDrawer onClose={() => setIsChatOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
