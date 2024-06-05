import { createContext, useContext, useEffect, useState } from "react";

const ThemeProviderContext = createContext();

export function ThemeProvider({ children, defaultTheme = "system", storageKey = "vite-ui-theme", ...props }) {
  const [theme, setTheme] = useState(() => localStorage.getItem(storageKey) || defaultTheme);
  const [background, setBackground] = useState("");
  const [textColor, setTextColor] = useState("");

  const setThemeStyles = (theme) => {
    if (theme === "dark") {
      setBackground(
        "absolute inset-0 -z-10 h-full w-full bg-slate-950 " +
        "bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] " +
        "bg-[size:14px_24px] [mask-image]"
      );
      setTextColor("text-white");
    } else {
      setBackground(
        "absolute inset-0 -z-10 h-full w-full bg-white " +
        "bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] " +
        "bg-[size:6rem_4rem] " +
        "bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"
      );
      setTextColor("text-black");
    }
  };


  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
      setThemeStyles(systemTheme)
      return;
    }

    root.classList.add(theme);
    setThemeStyles(theme)
  }, [theme]);

  const value = {
    theme,
    background,
    textColor,
    setTheme: (theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      <div className={`relative h-full w-full`}>
        <div className={`absolute inset-0 ${background}`}></div>
        <div className={textColor}>
          {children}
        </div>
      </div>


    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
