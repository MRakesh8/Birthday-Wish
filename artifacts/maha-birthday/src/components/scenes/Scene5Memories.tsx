import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useSharedState } from "../SharedState";

export function Scene5Memories({ onComplete }: { onComplete: () => void }) {
  const { backgroundImage, setBackgroundImage } = useSharedState();
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showNext, setShowButton] = useState(false);
  
  const tamilLines = [
    "தவறு என்று தெரிந்த பின் எதற்கு கேக்கவேண்டும் மன்னிப்பு!!!",
    "நன்றி கூறினேன் நீ என்னை ரசித்ததுற்கு",
    "வேண்டாம் என்று தான் சொன்னார்கள் ஏனோ தெரியவில்லை மனம் திரும்ப சேர துடிக்கிறது",
    "உறக்கத்திலும் என் உதடு சிரிக்கிறது",
    "காத்திருந்த எனக்கு தான் தெரியும் நீ வரமாட்டாய் என்று",
    "நான் காத்திருந்த போது வராத நீ நான் இடத்தை விட்டு சென்ற பின் அலைபேசியில் அழைக்கிறாயே அதற்கு காரணம்!!!",
    "அலைபேசியில் இரண்டு வார்த்தை பேசிவிட்டு Sorry என்று செய்தி அனுப்புவது எதற்கு",
    "முதலில் உன்னை பார்த்ததும் முடிவில் உன்னை பார்த்ததும் சிறு தொலைவில் தான்",
    "நான் உன்னை முதலில் பார்த்ததும் ரசிக்க தொடங்கினேன் உன்னுடைய அசைவுகளால்"
  ];

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setBackgroundImage(url);
    }
  };

  useEffect(() => {
    if (currentLineIndex >= tamilLines.length) {
      setShowButton(true);
      return;
    }

    const currentText = tamilLines[currentLineIndex];
    // Convert to array of characters to handle unicode properly
    const chars = Array.from(currentText);

    if (currentCharIndex < chars.length) {
      const timeout = setTimeout(() => {
        setCurrentCharIndex(prev => prev + 1);
      }, 50); // Typing speed
      return () => clearTimeout(timeout);
    } else {
      // Line finished typing
      const newLines = [...lines];
      if (newLines.length <= currentLineIndex) {
        newLines.push(currentText);
        setLines(newLines);
      }
      
      const timeout = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, 1000); // Pause between lines
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentCharIndex, lines]);

  // Fallback timeout to show button
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 45000);
    return () => clearTimeout(timer);
  }, []);

  const visibleLines = [...lines];
  let currentTypingLine = "";
  if (currentLineIndex < tamilLines.length) {
    const chars = Array.from(tamilLines[currentLineIndex]);
    currentTypingLine = chars.slice(0, currentCharIndex).join('');
  }

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center z-10 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1.5 } }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
    >
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-background">
        {backgroundImage ? (
          <div 
            className="w-full h-full bg-cover bg-center bg-zoom"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-rose-950 via-pink-900 to-rose-950 bg-zoom" />
        )}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      </div>

      <div className="absolute top-4 right-4 z-20">
        <input 
          type="file" 
          accept="image/*" 
          className="hidden" 
          ref={fileInputRef}
          onChange={handleImageUpload}
        />
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2 rounded-full bg-black/30 border border-white/20 text-white/70 text-sm hover:bg-black/50 hover:text-white transition-all backdrop-blur-md"
        >
          Upload Photo
        </button>
      </div>

      <div className="glass-card w-full max-w-3xl max-h-[80vh] overflow-y-auto rounded-2xl p-6 md:p-10 z-10 flex flex-col relative scrollbar-hide">
        <div className="space-y-4 mb-8">
          {visibleLines.map((line, i) => (
            <motion.p 
              key={i} 
              className="text-pink-50 font-serif text-lg md:text-xl leading-relaxed text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {line}
            </motion.p>
          ))}
          {currentLineIndex < tamilLines.length && (
            <p className="text-pink-50 font-serif text-lg md:text-xl leading-relaxed text-center">
              {currentTypingLine}
              <span className="animate-pulse opacity-70">|</span>
            </p>
          )}
        </div>

        <motion.div 
          className="mt-auto flex justify-center pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: showNext ? 1 : 0 }}
        >
          <button
            onClick={onComplete}
            disabled={!showNext}
            className={`px-8 py-3 rounded-full bg-white/10 border border-white/20 text-white font-serif tracking-wide text-lg backdrop-blur-sm transition-all hover:bg-white/20 active:scale-95 ${!showNext && 'pointer-events-none'}`}
          >
            Next ♥
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
