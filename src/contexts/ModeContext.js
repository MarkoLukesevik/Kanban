import { createContext, useState } from "react";

export const ModeContext = createContext(false);
export function ModeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  const handleModeChange = () => {
    setIsDark(!isDark);
  };

  return (
    <ModeContext.Provider value={{ isDark, handleModeChange }}>
      {children}
    </ModeContext.Provider>
  );
}
