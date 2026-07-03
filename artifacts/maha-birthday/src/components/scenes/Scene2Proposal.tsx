import { useState, useRef } from "react";
import { motion } from "framer-motion";
import successVideo from '../../assets/Ring_optimized.mp4';

export function Scene2Proposal({ onComplete }: { onComplete: () => void }) {
  const [showTransitionVideo, setShowTransitionVideo] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0, isMoved: false });
  const hasCompleted = useRef(false);

  const moveButton = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    // Generate random coordinates: X between 10%-90%, Y between 10%-60%
    // Restricting Y to 60% ensures the No button NEVER goes near the YES button at the bottom
    const randomX = Math.random() * 80 + 10; 
    const randomY = Math.random() * 50 + 10;
    setNoPos({ x: randomX, y: randomY, isMoved: true });
  };

  const handleClick = () => {
    setShowTransitionVideo(true);
  };

  const [videoEnded, setVideoEnded] = useState(false);

  const handleVideoEnded = () => {
    setVideoEnded(true);
  };

  const handleContinue = () => {
    if (hasCompleted.current) return;
    hasCompleted.current = true;
    onComplete();
  };

  if (showTransitionVideo) {
    return (
      <motion.div
        className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
      >
        <video
          src={successVideo}
          autoPlay
          playsInline
          onEnded={handleVideoEnded}
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {videoEnded && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleContinue}
            className="z-30 absolute bottom-12 px-8 py-4 rounded-full bg-gradient-to-r from-amber-700 to-amber-500 text-white font-serif tracking-widest text-lg shadow-[0_0_20px_rgba(180,120,30,0.6)] hover:scale-105 active:scale-95 transition-all"
          >
            Continue ♥
          </motion.button>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="absolute inset-0 z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.6 } }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      {/* Full-screen background video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
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
          className="font-serif italic text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white glow-gold leading-tight w-full text-center px-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Will you marry me?
        </motion.h1>

        {/* Bottom — Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-8 sm:gap-12 items-center justify-center w-full px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <button
            onClick={handleClick}
            className="w-[min(100%,280px)] sm:w-auto px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-amber-700 to-amber-500 text-white font-serif tracking-widest text-lg md:text-xl shadow-[0_0_20px_rgba(180,120,30,0.6)] hover:shadow-[0_0_35px_rgba(180,120,30,0.9)] transition-all duration-300 hover:scale-105 active:scale-95"
          >
            YES ♥
          </button>

          {/* Invisible placeholder keeps the layout from collapsing when No button becomes fixed */}
          {noPos.isMoved && (
            <div className="flex items-center justify-center w-[min(100%,280px)] sm:w-auto px-6 py-3 sm:px-8 sm:py-4 invisible select-none">
              No
            </div>
          )}

          <div
            onMouseEnter={moveButton}
            onTouchStart={moveButton}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            style={{
              WebkitTapHighlightColor: 'transparent',
              ...(noPos.isMoved ? { 
                position: 'fixed',
                left: `${noPos.x}%`,
                top: `${noPos.y}%`,
                transform: 'translate(-50%, -50%)',
                transition: 'left 0.2s ease-out, top 0.2s ease-out',
                zIndex: 50
              } : {
                zIndex: 50
              })
            }}
            className="flex items-center justify-center w-[min(100%,280px)] sm:w-auto px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-stone-600 to-amber-700 text-white font-serif tracking-widest text-lg md:text-xl shadow-[0_0_20px_rgba(140,100,30,0.5)] hover:shadow-[0_0_35px_rgba(140,100,30,0.8)] cursor-not-allowed select-none"
          >
            No
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
