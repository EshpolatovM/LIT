import { createContext, useContext, useState, useEffect, useCallback } from "react";

const ThemeContext = createContext(undefined);

const THEMES = {
  light: {
    name: "light",
    bg: {
      primary: "#f8fafc",
      secondary: "#ffffff",
      tertiary: "#f1f5f9",
      card: "#ffffff",
      sidebar: "rgba(255,255,255,0.8)",
      header: "rgba(255,255,255,0.85)",
    },
    text: {
      primary: "#0f172a",
      secondary: "#475569",
      tertiary: "#94a3b8",
      muted: "#64748b",
      brand: "#2563eb",
      brandLight: "#3b82f6",
    },
    border: {
      primary: "#e2e8f0",
      secondary: "#f1f5f9",
      active: "#2563eb",
    },
    accent: {
      blue: "#2563eb",
      blueBg: "#eef2ff",
      green: "#059669",
      greenBg: "#f0fdf4",
      amber: "#d97706",
      amberBg: "#fffbeb",
      purple: "#7c3aed",
      purpleBg: "#f5f3ff",
      red: "#dc2626",
      redBg: "#fef2f2",
      pink: "#db2777",
      pinkBg: "#fdf2f8",
    },
    progress: {
      bg: "#e2e8f0",
      bar: "#3b82f6",
    },
    shadow: {
      sm: "0 1px 2px rgba(0,0,0,0.04)",
      md: "0 4px 12px rgba(0,0,0,0.06)",
      lg: "0 8px 30px rgba(0,0,0,0.08)",
      xl: "0 20px 60px rgba(0,0,0,0.1)",
    },
  },
  dark: {
    name: "dark",
    bg: {
      primary: "#0b1120",
      secondary: "#111827",
      tertiary: "#1a2035",
      card: "#0f1729",
      sidebar: "rgba(11,17,32,0.9)",
      header: "rgba(11,17,32,0.92)",
    },
    text: {
      primary: "#f1f5f9",
      secondary: "#94a3b8",
      tertiary: "#64748b",
      muted: "#475569",
      brand: "#60a5fa",
      brandLight: "#93bbfd",
    },
    border: {
      primary: "#1e293b",
      secondary: "#1a2035",
      active: "#3b82f6",
    },
    accent: {
      blue: "#3b82f6",
      blueBg: "rgba(59,130,246,0.1)",
      green: "#34d399",
      greenBg: "rgba(52,211,153,0.1)",
      amber: "#fbbf24",
      amberBg: "rgba(251,191,36,0.1)",
      purple: "#a78bfa",
      purpleBg: "rgba(167,139,250,0.1)",
      red: "#f87171",
      redBg: "rgba(248,113,113,0.1)",
      pink: "#f472b6",
      pinkBg: "rgba(244,114,182,0.1)",
    },
    progress: {
      bg: "#1e293b",
      bar: "#3b82f6",
    },
    shadow: {
      sm: "0 1px 2px rgba(0,0,0,0.2)",
      md: "0 4px 12px rgba(0,0,0,0.3)",
      lg: "0 8px 30px rgba(0,0,0,0.4)",
      xl: "0 20px 60px rgba(0,0,0,0.5)",
    },
  },
};

function ThemeProvider({ children }) {
  const [themeName, setThemeName] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("lit-theme") || "light";
    }
    return "light";
  });

  const theme = THEMES[themeName] || THEMES.light;

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(themeName);
    localStorage.setItem("lit-theme", themeName);
  }, [themeName]);

  const toggleTheme = useCallback(() => {
    setThemeName((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const setTheme = useCallback((name) => {
    if (THEMES[name]) {
      setThemeName(name);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, themeName, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export { ThemeProvider, useTheme, THEMES };
export default ThemeContext;
