import { useState } from "react";
import { motion } from "framer-motion";
import { DiamondRing } from "../DiamondRing";

export function Scene2Proposal({ onComplete }: { onComplete: () => void }) {
  const [burst, setBurst] = useState(false);

  const handleClick = () => {
    setBurst(true);
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 text-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1, transition: { duration: 1 } }}
      exit={{ opacity: 0, scale: 1.05, transition: { duration: 1.5 } }}
    >
      <h1 className="font-serif italic text-5xl md:text-7xl text-white mb-8 glow-gold">
        Will you marry me?
      </h1>
      
      <div className="mb-12 relative">
        <DiamondRing className="scale-125" />
        {burst && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_10px_#fff]"
                initial={{ x: 0, y: 0, opacity: 1 }}
                animate={{ 
                  x: Math.cos(i * 30 * Math.PI / 180) * 150, 
                  y: Math.sin(i * 30 * Math.PI / 180) * 150, 
                  opacity: 0 
                }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            ))}
          </div>
        )}
      </div>
      
      <div className="flex flex-col sm:flex-row gap-6 items-center">
        <button 
          onClick={handleClick}
          className="relative px-8 py-4 rounded-full bg-gradient-to-r from-[#e6c17a] to-[#ff9a9e] text-white font-serif tracking-widest text-lg md:text-xl shadow-[0_0_20px_rgba(255,150,150,0.5)] hover:shadow-[0_0_30px_rgba(255,150,150,0.8)] transition-all duration-300 hover:scale-105 active:scale-95 animate-pulse"
        >
          <span className="relative z-10">YES ♥</span>
          <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 hover:opacity-100 transition-opacity"></div>
        </button>
        
        <button 
          onClick={handleClick}
          className="relative px-8 py-4 rounded-full bg-gradient-to-r from-[#ff4e50] to-[#f9d423] text-white font-serif tracking-widest text-lg md:text-xl shadow-[0_0_20px_rgba(255,100,100,0.5)] hover:shadow-[0_0_30px_rgba(255,100,100,0.8)] transition-all duration-300 hover:scale-105 active:scale-95 animate-pulse"
          style={{ animationDelay: '0.5s' }}
        >
          <span className="relative z-10">AFFIRMATIVE ♥</span>
          <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 hover:opacity-100 transition-opacity"></div>
        </button>
      </div>
    </motion.div>
  );
}
