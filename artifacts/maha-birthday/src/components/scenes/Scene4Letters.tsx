import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Scene4Letters({ onComplete }: { onComplete: () => void }) {
  const [flipped, setFlipped] = useState<boolean[]>([false, false, false, false]);
  const [hasFlippedAll, setHasFlippedAll] = useState(false);

  const cards = [
    { letter: "M", text: "You're sooo much important to me" },
    { letter: "A", text: "You're my happy memories" },
    { letter: "H", text: "You're my favourite person" },
    { letter: "A", text: "I will never ever leave you" },
  ];

  const handleFlip = (index: number) => {
    if (flipped[index]) return; // Only rotate once, do not rotate back
    const nextFlipped = [...flipped];
    nextFlipped[index] = true;
    setFlipped(nextFlipped);
  };

  useEffect(() => {
    if (flipped.every(f => f)) {
      setHasFlippedAll(true);
    }
  }, [flipped]);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 py-6 overflow-y-auto scroll-safe"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1 } }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
    >
      {/* Title & Progress Hearts Indicator */}
      <motion.div 
        className="text-center mb-6 sm:mb-8 z-10"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="font-serif text-2xl sm:text-3xl text-pink-100 mb-2 tracking-wide" style={{ textShadow: '0 0 15px rgba(255,182,193,0.9), 0 0 35px rgba(255,150,170,0.6), 0 2px 4px rgba(0,0,0,0.5)' }}>
          Letters of My Heart
        </h2>
        <p className="font-sans text-xs sm:text-sm text-white/90 italic flex items-center justify-center gap-2" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}>
          <span>Reveal the secrets inside...</span>
          <span className="flex gap-1.5 text-base sm:text-lg">
            {flipped.map((isFlipped, idx) => (
              <span 
                key={idx} 
                className={`transition-all duration-500 scale-100 ${
                  isFlipped 
                    ? 'text-rose-500 drop-shadow-[0_0_6px_rgba(244,63,94,0.8)] scale-110' 
                    : 'text-stone-600'
                }`}
              >
                ♥
              </span>
            ))}
          </span>
        </p>
      </motion.div>

      {/* Grid container with restricted width for perfect proportions on all device shapes */}
      <div className="grid grid-cols-2 gap-4 max-w-sm sm:max-w-md w-full px-1">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            className="w-full aspect-[4/5] perspective-1000 cursor-pointer group"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleFlip(i)}
          >
            <div 
              className={`w-full h-full relative preserve-3d transition-transform duration-700 ${
                flipped[i] ? 'flipped-y' : ''
              }`}
            >
              {/* Front Side */}
              <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl p-4 flex flex-col items-center justify-between border-2 border-amber-400/50 shadow-xl overflow-hidden" style={{ background: 'rgba(80, 65, 50, 0.65)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', boxShadow: '0 8px 40px 0 rgba(0,0,0,0.4)' }}>
                {/* Decorative inner border */}
                <div className="absolute inset-2 border border-dashed border-amber-300/25 rounded-xl pointer-events-none" />
                
                <div className="text-amber-300 text-[10px] sm:text-xs font-serif tracking-widest mt-1" style={{ textShadow: '0 0 8px rgba(200,150,50,0.7), 0 1px 2px rgba(0,0,0,0.5)' }}>
                  ✦ LETTER {i + 1} ✦
                </div>

                <div className="text-6xl sm:text-7xl font-script text-white select-none transform transition-transform duration-300 group-hover:scale-110" style={{ textShadow: '0 0 20px rgba(200,140,40,0.9), 0 0 50px rgba(180,110,20,0.5), 0 2px 4px rgba(0,0,0,0.4)' }}>
                  {card.letter}
                </div>

                <div className="flex items-center gap-1 text-[11px] sm:text-xs text-white font-serif italic mb-1 animate-pulse" style={{ textShadow: '0 0 8px rgba(255,182,193,0.8), 0 1px 3px rgba(0,0,0,0.5)' }}>
                  <span>Tap to read</span>
                  <span className="text-rose-500">♥</span>
                </div>
              </div>

              {/* Back Side */}
              <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-rose-950/90 to-pink-900/90 border-2 border-pink-400/40 rounded-2xl p-4 flex flex-col items-center justify-center text-center shadow-xl overflow-hidden">
                {/* Decorative inner border */}
                <div className="absolute inset-2 border border-dashed border-pink-300/25 rounded-xl pointer-events-none" />

                <div className="text-2xl sm:text-3xl font-script text-amber-300 glow-gold mb-2 select-none">
                  {card.letter}
                </div>

                <p className="font-serif italic text-xs sm:text-sm md:text-base text-white/95 leading-relaxed max-w-[90%] mb-1 select-none">
                  "{card.text}"
                </p>

                <motion.div
                  className="absolute text-pink-400/30 text-base pointer-events-none"
                  animate={{ y: [-5, -25], opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeOut", delay: i * 0.4 }}
                  style={{ bottom: "10px" }}
                >
                  ♥
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Continue button triggers only when all letters have been revealed */}
      <div className="mt-8 sm:mt-10 h-16 flex items-center justify-center z-10 w-full">
        <AnimatePresence>
          {hasFlippedAll && (
            <motion.button
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={onComplete}
              className="px-10 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-serif tracking-widest text-base sm:text-lg shadow-[0_0_20px_rgba(244,63,94,0.4)] hover:shadow-[0_0_35px_rgba(244,63,94,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer animate-pulse"
              style={{ animationDuration: '3s' }}
            >
              Continue ♥
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

