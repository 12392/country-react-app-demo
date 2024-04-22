import { createContext, useState } from "react";
export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setdarkMode] = useState(
    JSON.parse(localStorage.getItem("isDarkMode"))
  );

  return (
    <>
      <ThemeContext.Provider value={[darkMode, setdarkMode]}>
        {children}
      </ThemeContext.Provider>
    </>
  );
}
