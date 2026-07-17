import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import thankYouImage from "../../assets/thank-you-3.jpeg";

export function Scene8Final() {
  const [showVideo, setShowVideo] = useState(false);
  const [videoFinished, setVideoFinished] = useState(false);
  const [photos, setPhotos] = useState<string[]>([thankYouImage]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const blobUrlsRef = useRef<string[]>([]);

  useEffect(() => {
    if (photos.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [photos.length]);

  // Cleanup blob URLs on unmount to prevent memory leak
  useEffect(() => {
    return () => {
      blobUrlsRef.current.forEach(url => URL.revokeObjectURL(url));
    };
  }, []);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPhotos = Array.from(files).map(file => {
        const url = URL.createObjectURL(file);
        blobUrlsRef.current.push(url); // Track for cleanup
        return url;
      });
      setPhotos(prev => [...prev, ...newPhotos]);
    }
  };

  // Generate heart positions once (stable across re-renders)
  const heartPositions = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      fontSize: `${Math.random() * 2 + 0.5}rem`,
      animationDuration: `${Math.random() * 10 + 10}s`,
      animationDelay: `${Math.random() * 10}s`,
    }));
  }, []);

  const displayPhotos = photos.length > 0 ? photos : [null, null, null];

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.8 } }}
    >
      {!showVideo ? (
        <>
          {/* Background Gradient */}
          <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-900 via-rose-950 to-black" />
          
          {/* Falling Hearts */}
          <div className="absolute inset-0 pointer-events-none z-0">
            {heartPositions.map((heart) => (
              <div
                key={heart.id}
                className="absolute text-pink-500/40"
                style={{
                  left: heart.left,
                  top: `-10%`,
                  fontSize: heart.fontSize,
                  animation: `fall ${heart.animationDuration} linear infinite`,
                  animationDelay: heart.animationDelay,
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

          <div className="relative z-10 flex flex-col items-center w-full max-w-2xl mt-8">
            <div className="w-full aspect-[4/3] max-w-md relative mb-12 perspective-1000">
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

            <button 
              onClick={() => setShowVideo(true)}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-rose-600 to-pink-500 hover:from-rose-500 hover:to-pink-400 text-white font-serif tracking-widest text-lg shadow-[0_0_20px_rgba(225,29,72,0.6)] hover:shadow-[0_0_35px_rgba(225,29,72,0.8)] transition-all hover:scale-105 active:scale-95 mb-6"
            >
              One Final Message ♥
            </button>
            
            <p className="text-pink-300/50 font-sans italic text-sm text-center w-full mb-4">
              Made with ♥ for Maha
            </p>
          </div>
        </>
      ) : (
        <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center">
          {!videoFinished ? (
            <video
              src="/end.mp4"
              className="w-full h-full object-cover"
              autoPlay
              playsInline
              muted={false}
              onEnded={() => setVideoFinished(true)}
            />
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
              className="text-white text-3xl font-serif glow-text flex flex-col items-center"
            >
              <h1 className="mb-2">Made with ♥</h1>
              <p className="text-lg italic text-rose-300">for Maha</p>
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  );
}
