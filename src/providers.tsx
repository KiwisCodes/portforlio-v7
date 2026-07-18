import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type Theme = 'dark' | 'light';

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined);

export function Providers({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme') as Theme;
      if (saved === 'dark' || saved === 'light') return saved;
      
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    }
    return 'dark';
  });

  useEffect(() => {
    // Lenis Smooth Scroll Setup
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);

    // Store the fn reference so cleanup can deregister the SAME function
    const tickerFn = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerFn);
    };
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    // Safe sync guard to align states
    if (!root.classList.contains(theme)) {
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    const root = window.document.documentElement;
    root.classList.add('theme-transitioning');
    root.classList.remove('light', 'dark');
    root.classList.add(newTheme);

    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);

    setTimeout(() => root.classList.remove('theme-transitioning'), 250);
  };

  const toggleTheme = () => {
    const root = window.document.documentElement;
    root.classList.add('theme-transitioning');
    
    const next = theme === 'dark' ? 'light' : 'dark';
    root.classList.remove('light', 'dark');
    root.classList.add(next);

    setThemeState(next);
    localStorage.setItem('theme', next);

    setTimeout(() => root.classList.remove('theme-transitioning'), 250);
  };

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
