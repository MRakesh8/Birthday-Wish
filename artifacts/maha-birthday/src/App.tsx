import { useState, useCallback, useRef, useEffect, Suspense, lazy } from "react";
import { SharedStateProvider } from "./components/SharedState";
import { FloatingHearts } from "./components/FloatingHearts";
import { Scene1Loading } from "./components/scenes/Scene1Loading";
import { AnimatePresence } from "framer-motion";

// Lazy load scenes for much faster initial load
const Scene2Proposal = lazy(() => import("./components/scenes/Scene2Proposal").then(m => ({ default: m.Scene2Proposal })));
const Scene3NameInput = lazy(() => import("./components/scenes/Scene3NameInput").then(m => ({ default: m.Scene3NameInput })));
const Scene4Letters = lazy(() => import("./components/scenes/Scene4Letters").then(m => ({ default: m.Scene4Letters })));
const Scene5Memories = lazy(() => import("./components/scenes/Scene5Memories").then(m => ({ default: m.Scene5Memories })));
const Scene6Birthday = lazy(() => import("./components/scenes/Scene6Birthday").then(m => ({ default: m.Scene6Birthday })));
const Scene7MusicPlayer = lazy(() => import("./components/scenes/Scene7MusicPlayer").then(m => ({ default: m.Scene7MusicPlayer })));
const Scene8Final = lazy(() => import("./components/scenes/Scene8Final").then(m => ({ default: m.Scene8Final })));

const TOTAL_SCENES = 8;

function AppContent() {
  const [currentScene, setCurrentScene] = useState(1);
  const isTransitioning = useRef(false);

  // Smart asset prefetching: delays heavy downloads until after initial render
  useEffect(() => {
    const timer = setTimeout(() => {
      const videos = ["/gold-ring-animation.mp4", "/proposal-success.mp4", "/hbd-animation.mp4", "/birthday-animation.mp4"];
      videos.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'video';
        link.href = src;
        document.head.appendChild(link);
      });
      const images = ["/thank-you-3.jpeg", "/play-song.png"];
      images.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    }, 1500); 
    return () => clearTimeout(timer);
  }, []);

  const nextScene = useCallback(() => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;

    setCurrentScene(prev => {
      const next = prev + 1;
      return next > TOTAL_SCENES ? TOTAL_SCENES : next;
    });

    setTimeout(() => {
      isTransitioning.current = false;
    }, 300);
  }, []);

  return (
    <div className="relative w-full h-[100dvh] bg-background overflow-hidden selection:bg-pink-500/30">
      {/* Global Background Image (GB.jpeg) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/GB.jpeg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center bg-zoom"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
      </div>

      <FloatingHearts />
      <AnimatePresence mode="wait">
        {currentScene === 1 && <Scene1Loading key="scene1" onComplete={nextScene} />}
        {currentScene === 2 && (
          <Suspense fallback={<div key="scene2" className="absolute inset-0" />}>
            <Scene2Proposal key="scene2" onComplete={nextScene} />
          </Suspense>
        )}
        {currentScene === 3 && (
          <Suspense fallback={<div key="scene3" className="absolute inset-0" />}>
            <Scene3NameInput key="scene3" onComplete={nextScene} />
          </Suspense>
        )}
        {currentScene === 4 && (
          <Suspense fallback={<div key="scene4" className="absolute inset-0" />}>
            <Scene4Letters key="scene4" onComplete={nextScene} />
          </Suspense>
        )}
        {currentScene === 5 && (
          <Suspense fallback={<div key="scene5" className="absolute inset-0" />}>
            <Scene5Memories key="scene5" onComplete={nextScene} />
          </Suspense>
        )}
        {currentScene === 6 && (
          <Suspense fallback={<div key="scene6" className="absolute inset-0" />}>
            <Scene6Birthday key="scene6" onComplete={nextScene} />
          </Suspense>
        )}
        {currentScene === 7 && (
          <Suspense fallback={<div key="scene7" className="absolute inset-0" />}>
            <Scene7MusicPlayer key="scene7" onComplete={nextScene} />
          </Suspense>
        )}
        {currentScene === 8 && (
          <Suspense fallback={<div key="scene8" className="absolute inset-0" />}>
            <Scene8Final key="scene8" />
          </Suspense>
        )}
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <SharedStateProvider>
      <AppContent />
    </SharedStateProvider>
  );
}

export default App;
