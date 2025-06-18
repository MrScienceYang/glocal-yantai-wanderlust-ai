
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'city';

interface ThemeProviderContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  cityTheme: string;
  setCityTheme: (city: string) => void;
}

const ThemeProviderContext = createContext<ThemeProviderContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('theme');
    return (stored as Theme) || 'light';
  });
  
  const [cityTheme, setCityTheme] = useState(() => {
    return localStorage.getItem('cityTheme') || 'default';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.add('light');
    }
    
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('cityTheme', cityTheme);
    const root = window.document.documentElement;
    
    // 移除所有城市主题类
    root.classList.remove('theme-yantai', 'theme-qingdao', 'theme-tokyo', 'theme-seoul');
    
    // 应用城市主题
    if (cityTheme !== 'default') {
      root.classList.add(`theme-${cityTheme.toLowerCase()}`);
    }
  }, [cityTheme]);

  const value = {
    theme,
    setTheme,
    cityTheme,
    setCityTheme,
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
