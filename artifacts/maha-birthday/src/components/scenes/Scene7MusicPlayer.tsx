import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useSharedState } from "../SharedState";

export function Scene7MusicPlayer({ onComplete }: { onComplete: () => void }) {
  const { backgroundImage } = useSharedState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [playerImage, setPlayerImage] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (audioSrc) {
      if (!audioRef.current) {
        audioRef.current = new Audio(audioSrc);
        audioRef.current.addEventListener('ended', onComplete);
      } else {
        audioRef.current.src = audioSrc;
      }
      
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('ended', onComplete);
      }
    };
  }, [audioSrc, onComplete]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioSrc(url);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPlayerImage(url);
    }
  };

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center z-10 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1.5 } }}
      exit={{ opacity: 0, transition: { duration: 1.5 } }}
    >
      <div className="absolute inset-0 z-0 overflow-hidden bg-background">
        {backgroundImage ? (
          <div 
            className="w-full h-full bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-900 via-rose-950 to-black" />
        )}
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Circular Player */}
        <div className="relative w-72 h-72 md:w-80 md:h-80 mb-8 flex items-center justify-center">
          {/* Animated rings */}
          <motion.div 
            className="absolute inset-0 rounded-full border-2 border-dashed border-rose-400/50"
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute inset-[-10px] rounded-full border border-pink-300/30"
            animate={{ 
              scale: isPlaying ? [1, 1.05, 1] : 1,
              opacity: isPlaying ? [0.5, 0.8, 0.5] : 0.5
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Image container */}
          <div 
            className="w-[90%] h-[90%] rounded-full overflow-hidden relative shadow-[0_0_30px_rgba(255,100,150,0.4)] group cursor-pointer"
            onClick={togglePlay}
          >
            {playerImage ? (
              <img src={playerImage} alt="Player" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-rose-900/50 flex items-center justify-center">
                <span className="text-6xl opacity-50">♥</span>
              </div>
            )}
            
            {/* Play/Pause overlay */}
            <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'}`}>
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                {isPlaying ? (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                ) : (
                  <svg className="w-8 h-8 ml-2" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                )}
              </div>
            </div>
          </div>
        </div>

        <h2 className="font-script text-4xl md:text-5xl text-white glow-gold mb-8">
          Wanna Be Yours ♥
        </h2>

        <div className="flex flex-col gap-4 items-center">
          <div className="flex gap-4">
            <input type="file" accept="audio/*" className="hidden" ref={fileInputRef} onChange={handleAudioUpload} />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-2 rounded-full bg-white/10 border border-white/20 text-white font-sans text-sm backdrop-blur-sm hover:bg-white/20 transition-all"
            >
              Upload Song ♥
            </button>
            
            <input type="file" accept="image/*" className="hidden" ref={imageInputRef} onChange={handleImageUpload} />
            <button 
              onClick={() => imageInputRef.current?.click()}
              className="px-6 py-2 rounded-full bg-white/10 border border-white/20 text-white font-sans text-sm backdrop-blur-sm hover:bg-white/20 transition-all"
            >
              Upload Photo
            </button>
          </div>

          <button 
            onClick={onComplete}
            className="mt-6 text-pink-300/60 hover:text-pink-300 font-sans text-sm transition-colors border-b border-transparent hover:border-pink-300"
          >
            Skip ♥
          </button>
        </div>
      </div>
    </motion.div>
  );
}
