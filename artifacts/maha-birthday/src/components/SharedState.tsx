import { createContext, useContext, useState, useEffect, useRef, ReactNode, useCallback } from "react";

interface SharedStateContextType {
  backgroundImage: string | null;
  setBackgroundImage: (url: string | null) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  playAudio: () => void;
  pauseAudio: () => void;
  changeAudioSource: (src: string, autoPlay?: boolean) => void;
}

const SharedStateContext = createContext<SharedStateContextType | undefined>(undefined);

export function SharedStateProvider({ children }: { children: ReactNode }) {
  const [backgroundImage, setBackgroundImage] = useState<string | null>('/GB.jpeg');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/love-reels.mp3');
    audio.loop = false; // Disable auto replay
    audioRef.current = audio;

    const handlePlaySuccess = () => {
      setIsPlaying(true);
      cleanUpListeners();
    };

    const attemptPlay = () => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(handlePlaySuccess)
          .catch((err) => {
            console.log("Audio autoplay block, waiting for interaction", err);
          });
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('ended', handleEnded);

    const cleanUpListeners = () => {
      window.removeEventListener('click', attemptPlay);
      window.removeEventListener('touchstart', attemptPlay);
      window.removeEventListener('keydown', attemptPlay);
    };

    // Try playing immediately
    attemptPlay();

    // Setup interaction listeners to play on first user action
    window.addEventListener('click', attemptPlay);
    window.addEventListener('touchstart', attemptPlay);
    window.addEventListener('keydown', attemptPlay);

    return () => {
      cleanUpListeners();
      if (audioRef.current) {
        audio.removeEventListener('ended', handleEnded);
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error("Error playing audio:", err));
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const changeAudioSource = useCallback((src: string, autoPlay: boolean = false) => {
    if (audioRef.current) {
      const currentSrc = audioRef.current.src;
      if (!currentSrc.endsWith(src)) {
        audioRef.current.pause();
        audioRef.current.src = src;
        audioRef.current.load();
      }
      
      if (autoPlay) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(err => console.error("Error playing audio after source change:", err));
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, []);

  return (
    <SharedStateContext.Provider
      value={{
        backgroundImage,
        setBackgroundImage,
        isPlaying,
        setIsPlaying,
        playAudio,
        pauseAudio,
        changeAudioSource
      }}
    >
      {children}
    </SharedStateContext.Provider>
  );
}

export function useSharedState() {
  const context = useContext(SharedStateContext);
  if (context === undefined) {
    throw new Error("useSharedState must be used within a SharedStateProvider");
  }
  return context;
}

