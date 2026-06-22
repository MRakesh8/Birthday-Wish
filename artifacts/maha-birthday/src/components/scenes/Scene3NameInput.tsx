import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Scene3NameInput({ onComplete }: { onComplete: () => void }) {
  const [letters, setLetters] = useState<string[]>(['', '', '', '']);
  const [error, setError] = useState(false);
  const targetName = "MAHA";
  const hasCompleted = useRef(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (/^[a-zA-Z]$/.test(e.key)) addLetter(e.key.toUpperCase());
      else if (e.key === 'Backspace') removeLetter();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [letters]);

  const addLetter = (char: string) => {
    const newLetters = [...letters];
    const emptyIndex = newLetters.findIndex(l => l === '');
    if (emptyIndex !== -1) {
      newLetters[emptyIndex] = char;
      setLetters(newLetters);
      if (emptyIndex === 3) checkName(newLetters.join(''));
    }
  };

  const removeLetter = () => {
    const newLetters = [...letters];
    const lastFilledIndex = newLetters.map(l => l !== '').lastIndexOf(true);
    if (lastFilledIndex !== -1) {
      newLetters[lastFilledIndex] = '';
      setLetters(newLetters);
    }
  };

  const checkName = (name: string) => {
    if (name === targetName) {
      if (hasCompleted.current) return; // Prevent double-fire from fast typing
      hasCompleted.current = true;
      setTimeout(() => onComplete(), 500);
    } else {
      setError(true);
      setTimeout(() => { setError(false); setLetters(['', '', '', '']); }, 1000);
    }
  };

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center z-10 px-3 py-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
      exit={{ opacity: 0, scale: 1.1, transition: { duration: 1 } }}
    >
      <div className="glass-card p-5 sm:p-8 md:p-12 rounded-3xl w-full max-w-lg flex flex-col items-center">
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white mb-6 sm:mb-10 glow-text text-center">
          Enter your name ♥
        </h2>

        {/* Letter boxes */}
        <motion.div
          className="flex gap-2 sm:gap-4 mb-6"
          animate={error ? { x: [-8, 8, -8, 8, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          {letters.map((letter, i) => (
            <div
              key={i}
              className={`w-14 h-16 sm:w-16 sm:h-20 md:w-20 md:h-24 rounded-xl border-2 flex items-center justify-center text-3xl sm:text-4xl md:text-5xl font-serif text-white transition-all duration-300 ${
                letter
                  ? 'border-amber-400 bg-amber-500/20 scale-105 glow-gold'
                  : 'border-stone-500 bg-black/20'
              }`}
            >
              {letter}
            </div>
          ))}
        </motion.div>

        <div className="h-7 mb-4">
          <AnimatePresence mode="wait">
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-amber-300 font-serif italic text-sm sm:text-base"
              >
                Enter your name letter ♥
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Keyboard buttons */}
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 w-full">
          {alphabet.map(char => (
            <button
              key={char}
              onClick={() => addLetter(char)}
              className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-stone-700/60 border border-amber-700/40 text-white text-sm sm:text-base font-sans hover:bg-amber-700/50 hover:scale-110 active:scale-95 transition-all"
            >
              {char}
            </button>
          ))}
          <button
            onClick={removeLetter}
            className="px-3 h-9 sm:h-10 md:h-12 rounded-full bg-stone-700/60 border border-amber-700/40 text-white font-sans hover:bg-amber-700/50 active:scale-95 transition-all text-sm"
          >
            ⌫
          </button>
        </div>
      </div>
    </motion.div>
  );
}
