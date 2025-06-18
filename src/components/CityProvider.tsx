
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import CityTransition from './CityTransition';

interface CityContextType {
  selectedCountry: string;
  selectedProvince: string;
  selectedCity: string;
  updateCity: (country: string, province: string, city: string) => void;
}

const CityContext = createContext<CityContextType | undefined>(undefined);

export const CityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCountry, setSelectedCountry] = useState('中国');
  const [selectedProvince, setSelectedProvince] = useState('山东省');
  const [selectedCity, setSelectedCity] = useState('烟台市');
  const [showTransition, setShowTransition] = useState(false);
  const [newCity, setNewCity] = useState('');
  const { setCityTheme } = useTheme();

  const updateCity = (country: string, province: string, city: string) => {
    if (city !== selectedCity) {
      setNewCity(city);
      setShowTransition(true);
    }
  };

  const handleTransitionComplete = () => {
    setSelectedCountry(newCity === selectedCity ? selectedCountry : 'updating');
    setSelectedProvince(newCity === selectedCity ? selectedProvince : 'updating');
    setSelectedCity(newCity);
    setShowTransition(false);
    
    // 根据城市设置主题
    const cityThemeMap: Record<string, string> = {
      '烟台市': 'yantai',
      '青岛市': 'qingdao',
      '东京都': 'tokyo',
      '首尔市': 'seoul',
    };
    
    setCityTheme(cityThemeMap[newCity] || 'default');
  };

  // 初始化时设置城市主题
  useEffect(() => {
    const cityThemeMap: Record<string, string> = {
      '烟台市': 'yantai',
      '青岛市': 'qingdao',
      '东京都': 'tokyo',
      '首尔市': 'seoul',
    };
    
    setCityTheme(cityThemeMap[selectedCity] || 'default');
  }, []);

  return (
    <CityContext.Provider value={{ selectedCountry, selectedProvince, selectedCity, updateCity }}>
      {children}
      {showTransition && (
        <CityTransition cityName={newCity} onComplete={handleTransitionComplete} />
      )}
    </CityContext.Provider>
  );
};

export const useCityContext = () => {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error('useCityContext must be used within a CityProvider');
  }
  return context;
};
