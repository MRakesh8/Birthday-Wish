import { useEffect } from "react";
import { motion } from "framer-motion";
import { useSharedState } from "../SharedState";

export function Scene7MusicPlayer({ onComplete }: { onComplete: () => void }) {
  const { backgroundImage, isPlaying, playAudio, pauseAudio, changeAudioSource } = useSharedState();
  const playerImage = '/play-song.png';

  useEffect(() => {
    changeAudioSource('/I-Wanna-Be-Yours-Arctic-Monkeys-_-__-Lyrics-Status-Video-_-__-_shorts-_lyrics-_foryou_MP3_160K_.mp3.mp3.mpeg', true);
  }, [changeAudioSource]);

  const togglePlay = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center z-10 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1.5 } }}
      exit={{ opacity: 0, transition: { duration: 1.5 } }}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {backgroundImage ? (
          <img
            src={backgroundImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center opacity-30"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-stone-700 via-stone-600 to-stone-800" />
        )}
      </div>

      <div className="relative z-10 flex flex-col items-center">

        {/* Circular Player — responsive size */}
        <div className="relative mb-6 sm:mb-8 flex items-center justify-center"
          style={{ width: 'min(72vw, 288px)', height: 'min(72vw, 288px)' }}
        >
          {/* Spinning dashed ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-dashed border-amber-400/60"
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          {/* Pulse ring */}
          <motion.div
            className="absolute rounded-full border border-amber-300/30"
            style={{ inset: -10 }}
            animate={{
              scale: isPlaying ? [1, 1.05, 1] : 1,
              opacity: isPlaying ? [0.4, 0.8, 0.4] : 0.4
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Image + tap to play/pause — always shows overlay on mobile */}
          <button
            onClick={togglePlay}
            className="w-[90%] h-[90%] rounded-full overflow-hidden relative shadow-[0_0_30px_rgba(200,140,40,0.5)] focus:outline-none"
            style={{ aspectRatio: '1' }}
          >
            <img src={playerImage} alt="Player" className="w-full h-full object-cover" />

            {/* Overlay — always visible on touch, fades on play */}
            <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}>
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center text-white">
                {isPlaying ? (
                  <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                ) : (
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                )}
              </div>
            </div>
          </button>
        </div>

        <h2 className="font-serif italic font-light text-3xl sm:text-4xl md:text-5xl text-white glow-text mb-6 sm:mb-8 text-center px-4 tracking-wide">
          Our Song ♥
        </h2>

        <button
          onClick={onComplete}
          className="w-[min(100%,280px)] sm:w-auto px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-amber-700 to-amber-500 text-white font-serif font-bold tracking-widest text-base sm:text-lg md:text-xl shadow-[0_0_20px_rgba(180,120,30,0.6)] hover:shadow-[0_0_35px_rgba(180,120,30,0.9)] transition-all active:scale-95"
          style={{ marginBottom: 'max(1.5rem, env(safe-area-inset-bottom, 1.5rem))' }}
        >
          Thank you ♥
        </button>
      </div>
    </motion.div>
  );
}
