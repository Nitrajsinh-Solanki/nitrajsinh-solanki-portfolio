"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";
const STORAGE_KEY = "nitrajsinh-portfolio-theme";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;

  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // The theme still works for this session when storage is unavailable.
  }
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const syncFromDocument = () => {
      setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
    };

    const syncFromStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY && event.key !== null) return;
      let next: Theme = "light";
      try {
        next = window.localStorage.getItem(STORAGE_KEY) === "dark" ? "dark" : "light";
      } catch {
        next = "light";
      }
      document.documentElement.dataset.theme = next;
      document.documentElement.style.colorScheme = next;
      setTheme(next);
    };

    syncFromDocument();
    window.addEventListener("storage", syncFromStorage);
    return () => window.removeEventListener("storage", syncFromStorage);
  }, []);

  const switchTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    applyTheme(next);
    setTheme(next);
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={switchTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="theme-toggle inline-flex min-h-9 shrink-0 items-center justify-center gap-2 rounded-lg border border-[#E3E0D8] bg-[#FFFFFF] px-3 text-[12px] font-medium text-[#555963] transition-colors duration-200 hover:text-indigo-600"
    >
      {isDark ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20.9 13.1A8.5 8.5 0 0 1 10.9 3.1 8.5 8.5 0 1 0 20.9 13.1Z" />
        </svg>
      )}
      <span className="hidden sm:inline">{isDark ? "Light mode" : "Dark mode"}</span>
    </button>
  );
}
