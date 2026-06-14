import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function Scene3NameInput({ onComplete }: { onComplete: () => void }) {
  const [letters, setLetters] = useState<string[]>(['', '', '', '']);
  const [error, setError] = useState(false);
  const targetName = "MAHA";

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (/^[a-zA-Z]$/.test(e.key)) {
        addLetter(e.key.toUpperCase());
      } else if (e.key === 'Backspace') {
        removeLetter();
      }
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
      
      if (emptyIndex === 3) {
        checkName(newLetters.join(''));
      }
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
      setTimeout(() => onComplete(), 500);
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
        setLetters(['', '', '', '']);
      }, 1000);
    }
  };

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
      exit={{ opacity: 0, scale: 1.1, transition: { duration: 1 } }}
    >
      <div className="glass-card p-8 md:p-12 rounded-3xl w-full max-w-2xl flex flex-col items-center">
        <h2 className="font-serif text-3xl md:text-4xl text-white mb-10 glow-text text-center">
          Enter your name ♥
        </h2>
        
        <motion.div 
          className="flex gap-4 mb-8"
          animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          {letters.map((letter, i) => (
            <div 
              key={i}
              className={`w-16 h-20 md:w-20 md:h-24 rounded-xl border-2 flex items-center justify-center text-4xl md:text-5xl font-serif text-white shadow-[0_0_15px_rgba(255,100,150,0.3)] transition-all duration-300 ${
                letter ? 'border-pink-400 bg-pink-500/20 scale-105 glow-text' : 'border-pink-800 bg-black/20'
              }`}
            >
              {letter}
            </div>
          ))}
        </motion.div>
        
        <div className="h-8 mb-6">
          <AnimatePresence mode="wait">
            {error && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-pink-300 font-serif italic"
              >
                Enter your name letter ♥
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 max-w-md mt-4">
          {alphabet.map(char => (
            <button
              key={char}
              onClick={() => addLetter(char)}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-rose-900/50 border border-rose-500/30 text-white font-sans hover:bg-rose-500/50 hover:scale-110 active:scale-95 transition-all"
            >
              {char}
            </button>
          ))}
          <button
             onClick={removeLetter}
             className="px-4 h-10 md:h-12 rounded-full bg-rose-900/50 border border-rose-500/30 text-white font-sans hover:bg-rose-500/50 active:scale-95 transition-all"
          >
            ⌫
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Needed AnimatePresence import
import { AnimatePresence } from "framer-motion";
