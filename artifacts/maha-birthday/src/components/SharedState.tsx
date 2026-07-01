import { createContext, useContext, useState, useEffect, useRef, ReactNode, useCallback } from "react";

interface SharedStateContextType {
  backgroundImage: string | null;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  playAudio: () => void;
  pauseAudio: () => void;
  changeAudioSource: (src: string, autoPlay?: boolean) => void;
}

const SharedStateContext = createContext<SharedStateContextType | undefined>(undefined);

export function SharedStateProvider({ children }: { children: ReactNode }) {
  const [backgroundImage] = useState<string | null>('/GB.jpeg');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audio.loop = false;
    audioRef.current = audio;

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('ended', handleEnded);

    return () => {
      if (audioRef.current) {
        audio.removeEventListener('ended', handleEnded);
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error("Error playing audio:", err));
    }
  }, []);

  const pauseAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const changeAudioSource = useCallback((src: string, autoPlay: boolean = false) => {
    if (audioRef.current) {
      const currentSrc = audioRef.current.src;
      // Only change source if it's actually different
      if (!currentSrc.endsWith(src)) {
        audioRef.current.pause();
        audioRef.current.src = src;
        audioRef.current.load();
      }
      
      if (autoPlay) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(err => console.error("Error playing audio after source change:", err));
      }
      // Don't pause if source didn't change and autoPlay is false
    }
  }, []);

  return (
    <SharedStateContext.Provider
      value={{
        backgroundImage,
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
