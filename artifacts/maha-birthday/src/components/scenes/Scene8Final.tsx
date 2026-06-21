import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Scene8Final() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (photos.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [photos.length]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPhotos = Array.from(files).map(file => URL.createObjectURL(file));
      setPhotos(prev => [...prev, ...newPhotos]);
    }
  };

  const displayPhotos = photos.length > 0 ? photos : [null, null, null];

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 2 } }}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-900 via-rose-950 to-black" />
      
      {/* Falling Hearts */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-500/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-10%`,
              fontSize: `${Math.random() * 2 + 0.5}rem`,
              animation: `fall ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          >
            ♥
          </div>
        ))}
      </div>
      
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }
      `}</style>

      <div className="relative z-10 flex flex-col items-center w-full max-w-2xl">
        <motion.h1 
          className="font-serif italic font-light text-5xl md:text-7xl text-white glow-text mb-2 tracking-wide"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Thank you
        </motion.h1>
        
        <motion.h2 
          className="font-serif text-4xl md:text-5xl text-pink-200 mb-12 glow-text"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Maha ♥
        </motion.h2>

        {/* Slideshow */}
        <div className="w-full aspect-[4/3] max-w-md relative mb-8 perspective-1000">
          <div className="w-full h-full relative flex items-center justify-center">
            <AnimatePresence mode="popLayout">
              {displayPhotos.length > 0 && (
                <motion.div
                  key={currentIndex}
                  className="absolute inset-0 glass-card rounded-2xl overflow-hidden shadow-2xl border-rose-300/30 border p-2"
                  initial={{ opacity: 0, x: 100, rotateY: -15 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  exit={{ opacity: 0, x: -100, rotateY: 15 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  {displayPhotos[currentIndex] ? (
                    <img src={displayPhotos[currentIndex] as string} className="w-full h-full object-cover rounded-xl" alt="Memory" />
                  ) : (
                    <div className="w-full h-full bg-rose-950/40 rounded-xl flex items-center justify-center border border-dashed border-rose-400/20">
                      <span className="text-4xl text-pink-500/30">♥</span>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <input type="file" accept="image/*" multiple className="hidden" ref={fileInputRef} onChange={handlePhotoUpload} />
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 font-sans text-sm hover:bg-white/10 hover:text-white transition-all backdrop-blur-sm"
        >
          Add Photos
        </button>

        <p className="absolute bottom-4 text-pink-300/50 font-sans italic text-sm text-center w-full">
          Made with ♥ for Maha
        </p>
      </div>
    </motion.div>
  );
}
