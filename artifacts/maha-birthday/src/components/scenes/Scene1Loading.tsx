import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DiamondRing } from "../DiamondRing";

export function Scene1Loading({ onComplete }: { onComplete: () => void }) {
  const [text, setText] = useState("");
  const fullText = "For you, Maha...";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) {
        clearInterval(interval);
      }
    }, 150);
    
    const timeout = setTimeout(() => {
      onComplete();
    }, 7000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.5 } }}
    >
      <div className="absolute top-0 left-0 w-64 h-64 bg-pink-500/20 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-rose-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <DiamondRing className="mb-12 scale-150" />
      
      <h1 className="font-script text-4xl md:text-5xl text-white glow-gold h-12">
        {text}
        <span className="animate-pulse">|</span>
      </h1>
    </motion.div>
  );
}
