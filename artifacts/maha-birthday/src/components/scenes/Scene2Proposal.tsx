import { useState } from "react";
import { motion } from "framer-motion";

export function Scene2Proposal({ onComplete }: { onComplete: () => void }) {
  const [showTransitionVideo, setShowTransitionVideo] = useState(false);

  const handleClick = () => {
    setShowTransitionVideo(true);
  };

  if (showTransitionVideo) {
    return (
      <motion.div
        className="absolute inset-0 z-20 bg-black flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 1.5 } }}
      >
        <video
          src="/proposal-success.mp4"
          autoPlay
          playsInline
          onEnded={onComplete}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="absolute inset-0 z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1 } }}
      exit={{ opacity: 0, transition: { duration: 1.5 } }}
    >
      {/* Full-screen background video */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        <video
          src="/gold-ring-animation.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Subtle dark overlay so text stays readable */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content on top */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-between px-6 text-center pt-10 sm:pt-14 pb-12 sm:pb-16">

        {/* Top — Title */}
        <motion.h1
          className="font-serif italic text-3xl sm:text-5xl md:text-6xl text-white glow-gold leading-tight w-full text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Will you marry me?
        </motion.h1>

        {/* Bottom — Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center w-full max-w-xs sm:max-w-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <button
            onClick={handleClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-amber-700 to-amber-500 text-white font-serif tracking-widest text-lg md:text-xl shadow-[0_0_20px_rgba(180,120,30,0.6)] hover:shadow-[0_0_35px_rgba(180,120,30,0.9)] transition-all duration-300 hover:scale-105 active:scale-95"
          >
            YES ♥
          </button>

          <button
            onClick={handleClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-stone-600 to-amber-700 text-white font-serif tracking-widest text-lg md:text-xl shadow-[0_0_20px_rgba(140,100,30,0.5)] hover:shadow-[0_0_35px_rgba(140,100,30,0.8)] transition-all duration-300 hover:scale-105 active:scale-95"
          >
            AFFIRMATIVE ♥
          </button>
        </motion.div>

      </div>
    </motion.div>
  );
}
