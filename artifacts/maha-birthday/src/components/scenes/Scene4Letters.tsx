import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function Scene4Letters({ onComplete }: { onComplete: () => void }) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const cards = [
    { letter: "M", text: "You're sooo much important to me" },
    { letter: "A", text: "You're my happy memories" },
    { letter: "H", text: "You're my favourite person" },
    { letter: "A", text: "I will never ever leave you" },
  ];

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 py-8 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1 } }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            className="glass-card p-6 rounded-2xl flex flex-col items-center text-center relative overflow-hidden"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: i * 0.8 }}
          >
            <div className="text-6xl md:text-8xl font-script text-white glow-gold mb-4 relative z-10">
              {card.letter}
            </div>
            <p className="font-serif italic text-xl md:text-2xl text-pink-100 relative z-10">
              {card.text}
            </p>
            
            {/* Inner card sparkles */}
            <motion.div 
              className="absolute text-pink-400 opacity-50 z-0"
              animate={{ y: [-10, -50], x: [-10, 20], opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 3, delay: i * 0.5 }}
            >
              ♥
            </motion.div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="mt-12 h-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: showButton ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        {showButton && (
          <button
            onClick={onComplete}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white font-serif tracking-wide text-lg shadow-[0_0_15px_rgba(255,100,150,0.4)] hover:shadow-[0_0_25px_rgba(255,100,150,0.6)] transition-all hover:scale-105 active:scale-95"
          >
            Continue ♥
          </button>
        )}
      </motion.div>
    </motion.div>
  );
}
