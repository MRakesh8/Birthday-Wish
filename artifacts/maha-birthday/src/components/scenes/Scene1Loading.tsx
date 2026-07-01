import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSharedState } from "../SharedState";

export function Scene1Loading({ onComplete }: { onComplete: () => void }) {
  const [text, setText] = useState("");
  const [showButton, setShowButton] = useState(false);
  const { playAudio, changeAudioSource } = useSharedState();
  const fullText = "For you, Maha...";
  const buttonTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) {
        clearInterval(interval);
        buttonTimeoutRef.current = setTimeout(() => {
          setShowButton(true);
        }, 500);
      }
    }, 60); // Sped up from 150ms to 60ms for faster feel
    return () => {
      clearInterval(interval);
      if (buttonTimeoutRef.current) {
        clearTimeout(buttonTimeoutRef.current);
      }
    };
  }, []);

  const handleStart = () => {
    onComplete();
  };

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5 } }}
    >

      <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 bg-amber-500/20 rounded-full blur-[80px] animate-pulse z-10" />
      <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-amber-700/20 rounded-full blur-[80px] animate-pulse z-10" style={{ animationDelay: '2s' }} />

      <h1 className="font-serif italic font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white glow-text text-center tracking-wide mt-2 z-20 px-4">
        {text}
        {!showButton && <span className="animate-pulse">|</span>}
      </h1>

      <AnimatePresence>
        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-8 z-20"
          >
            <button
              onClick={handleStart}
              className="w-[min(100%,280px)] sm:w-auto px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-amber-700 to-amber-500 text-white font-serif tracking-widest text-base sm:text-lg md:text-xl shadow-[0_0_20px_rgba(180,120,30,0.6)] hover:shadow-[0_0_35px_rgba(180,120,30,0.9)] transition-all hover:scale-105 active:scale-95"
            >
              Open ♥
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
