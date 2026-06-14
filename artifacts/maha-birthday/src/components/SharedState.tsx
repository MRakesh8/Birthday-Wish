import { createContext, useContext, useState, ReactNode } from "react";

interface SharedStateContextType {
  backgroundImage: string | null;
  setBackgroundImage: (url: string | null) => void;
}

const SharedStateContext = createContext<SharedStateContextType | undefined>(undefined);

export function SharedStateProvider({ children }: { children: ReactNode }) {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

  return (
    <SharedStateContext.Provider value={{ backgroundImage, setBackgroundImage }}>
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
