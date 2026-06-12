'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  toggle: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Initialize to 'dark' to match the server-rendered data-theme="dark"
  // Corrected in useEffect to match localStorage / OS preference.
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem('rex-theme') as Theme | null;
    const resolved: Theme =
      stored ?? (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    setTheme(resolved);
    document.documentElement.dataset.theme = resolved;
  }, []);

  function toggle() {
    setTheme(prev => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      localStorage.setItem('rex-theme', next);
      return next;
    });
  }

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}

export default ThemeProvider;
