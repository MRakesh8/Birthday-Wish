import { useState } from "react";
import { SharedStateProvider } from "./components/SharedState";
import { FloatingHearts } from "./components/FloatingHearts";
import { Scene1Loading } from "./components/scenes/Scene1Loading";
import { Scene2Proposal } from "./components/scenes/Scene2Proposal";
import { Scene3NameInput } from "./components/scenes/Scene3NameInput";
import { Scene4Letters } from "./components/scenes/Scene4Letters";
import { Scene5Memories } from "./components/scenes/Scene5Memories";
import { Scene6Birthday } from "./components/scenes/Scene6Birthday";
import { Scene7MusicPlayer } from "./components/scenes/Scene7MusicPlayer";
import { Scene8Final } from "./components/scenes/Scene8Final";
import { AnimatePresence } from "framer-motion";

function AppContent() {
  const [currentScene, setCurrentScene] = useState(1);

  const nextScene = () => setCurrentScene(prev => prev + 1);

  return (
    <div className="relative w-full h-screen bg-background overflow-hidden selection:bg-pink-500/30">
      <FloatingHearts />
      <AnimatePresence mode="wait">
        {currentScene === 1 && <Scene1Loading key="scene1" onComplete={nextScene} />}
        {currentScene === 2 && <Scene2Proposal key="scene2" onComplete={nextScene} />}
        {currentScene === 3 && <Scene3NameInput key="scene3" onComplete={nextScene} />}
        {currentScene === 4 && <Scene4Letters key="scene4" onComplete={nextScene} />}
        {currentScene === 5 && <Scene5Memories key="scene5" onComplete={nextScene} />}
        {currentScene === 6 && <Scene6Birthday key="scene6" onComplete={nextScene} />}
        {currentScene === 7 && <Scene7MusicPlayer key="scene7" onComplete={nextScene} />}
        {currentScene === 8 && <Scene8Final key="scene8" />}
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
