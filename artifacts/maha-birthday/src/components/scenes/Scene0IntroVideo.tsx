import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Scene0IntroVideo({ onComplete }: { onComplete: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playBlocked, setPlayBlocked] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      // Attempt to play automatically
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => {
          console.log("Video play failed due to autoplay policy", e);
          setPlayBlocked(true);
        });
      }
    }
  }, []);

  const handleTapToPlay = () => {
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setPlayBlocked(false);
      }).catch(e => console.error("Still blocked", e));
    }
  };

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center z-[100] bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5 } }}
    >
      <video
        ref={videoRef}
        src="/first.mp4"
        className="w-full h-full object-contain"
        autoPlay
        playsInline
        onEnded={onComplete}
      />

      <AnimatePresence>
        {playBlocked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/60 cursor-pointer backdrop-blur-sm"
            onClick={handleTapToPlay}
          >
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 animate-pulse">
              <svg className="w-8 h-8 text-white ml-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <p className="text-white/80 font-serif tracking-widest text-lg">Tap anywhere to start</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
