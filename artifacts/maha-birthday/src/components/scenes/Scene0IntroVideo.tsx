import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

export function Scene0IntroVideo({ onComplete }: { onComplete: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      // Attempt to play automatically
      videoRef.current.play().catch(e => console.log("Video play failed due to autoplay policy", e));
    }
  }, []);

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
        muted // Muted is usually required for autoplay to work without user interaction
        onEnded={onComplete}
      />
    </motion.div>
  );
}
