import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSharedState } from "../SharedState";

export function Scene5Memories({ onComplete }: { onComplete: () => void }) {
  const { backgroundImage } = useSharedState();
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showNext, setShowButton] = useState(false);
  const [lineComplete, setLineComplete] = useState(false);

  const tamilLines = [
    "தவறு என்று தெரிந்த பின் எதற்கு கேக்கவேண்டும் மன்னிப்பு!!!",
    "நன்றி கூறினேன் நீ என்னை ரசித்ததுற்கு",
    "வேண்டாம் என்று தான் சொன்னார்கள் ஏனோ தெரியவில்லை மனம் திரும்ப சேர துடிக்கிறது",
    "காத்திருந்த எனக்கு தான் தெரியும் நீ வரமாட்டாய் என்று... வந்திருக்கலாம் தானே",
    "உன் உதட்டில் சிறிது சிரிப்பைய் பார்த்திருப்பேன் , என் உதட்டிலும் தான்..! பரவாயில்லை...",
    "நான் கத்திருந்த போது வராத நீ நான் இடத்தை விட்டு சென்ற பின் அலைபேசில் அழைக்கிரயே அதற்கு காரணம்!!!",
    "அலைபேசில் இரண்டு வார்த்தை பேசிவிட்டு Sorry என்று செய்தி அனுப்புவது எதற்கு",
    "முதலில் உன்னை பார்த்ததும் முடிவில் உன்னை பார்த்ததும் சிறு தொலைவில் தான்",
    "நான் உன்னை முதலில் பார்த்ததும் ரரிக்க தொடங்கினேன் உன்னுடைய அசையுகளால்"
  ];

  useEffect(() => {
    if (currentLineIndex >= tamilLines.length) { setShowButton(true); return; }
    const currentText = tamilLines[currentLineIndex];
    const chars = Array.from(currentText);
    if (currentCharIndex < chars.length) {
      setLineComplete(false);
      const timeout = setTimeout(() => setCurrentCharIndex(prev => prev + 1), 50);
      return () => clearTimeout(timeout);
    } else {
      setLineComplete(true);
      const newLines = [...lines];
      if (newLines.length <= currentLineIndex) { newLines.push(currentText); setLines(newLines); }
      const timeout = setTimeout(() => {
        setLineComplete(false);
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentCharIndex, lines]);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 45000);
    return () => clearTimeout(timer);
  }, []);

  const visibleLines = [...lines];
  let currentTypingLine = "";
  if (currentLineIndex < tamilLines.length) {
    currentTypingLine = Array.from(tamilLines[currentLineIndex]).slice(0, currentCharIndex).join('');
  }

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center z-10 p-3 sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1.5 } }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
    >
      {/* Background — uses img tag for proper mobile cover */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {backgroundImage ? (
          <img
            src={backgroundImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-stone-700 via-stone-600 to-stone-700" />
        )}
        <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px]" />
      </div>

      {/* Card */}
      <div className="glass-card w-full max-w-2xl rounded-2xl p-4 sm:p-6 md:p-10 z-10 flex flex-col relative scrollbar-hide"
        style={{ maxHeight: 'calc(100dvh - 32px)', overflowY: 'auto' }}
      >
        <div className="space-y-3 sm:space-y-4 mb-6">
          {visibleLines.map((line, i) => (
            <motion.p
              key={i}
              className="text-white/90 font-tamil text-base sm:text-lg md:text-xl leading-loose text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {line}
            </motion.p>
          ))}
          {currentLineIndex < tamilLines.length && !lineComplete && (
            <p className="text-white/90 font-tamil text-base sm:text-lg md:text-xl leading-loose text-center">
              {currentTypingLine}
              <span className="animate-pulse opacity-70">|</span>
            </p>
          )}
        </div>

        <motion.div
          className="flex justify-center pt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: showNext ? 1 : 0 }}
        >
          <button
            onClick={onComplete}
            disabled={!showNext}
            className={`px-8 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-serif tracking-wide text-base sm:text-lg shadow-[0_0_20px_rgba(255,80,120,0.5)] hover:shadow-[0_0_35px_rgba(255,80,120,0.8)] transition-all hover:scale-105 active:scale-95 ${!showNext && 'pointer-events-none'}`}
          >
            Next ♥
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
