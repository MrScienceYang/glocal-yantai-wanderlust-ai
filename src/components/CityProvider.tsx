
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import CityTransition from './CityTransition';
import { geolocationService } from '../services/geolocationService';

interface CityContextType {
  selectedCountry: string;
  selectedProvince: string;
  selectedCity: string;
  isLoadingLocation: boolean;
  updateCity: (country: string, province: string, city: string) => void;
  requestUserLocation: () => Promise<void>;
}

const CityContext = createContext<CityContextType | undefined>(undefined);

export const CityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCountry, setSelectedCountry] = useState('中国');
  const [selectedProvince, setSelectedProvince] = useState('山东省');
  const [selectedCity, setSelectedCity] = useState('烟台市');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const [newCity, setNewCity] = useState('');
  const { setCityTheme } = useTheme();

  const updateCity = (country: string, province: string, city: string) => {
    if (city !== selectedCity) {
      setNewCity(city);
      setShowTransition(true);
    }
  };

  const requestUserLocation = async () => {
    setIsLoadingLocation(true);
    try {
      console.log('Requesting user location...');
      const locationInfo = await geolocationService.getUserLocation();
      console.log('User location:', locationInfo);
      
      updateCity(locationInfo.country, locationInfo.province, locationInfo.city);
    } catch (error) {
      console.error('Failed to get user location:', error);
    } finally {
      setIsLoadingLocation(false);
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

  // 初始化时自动获取用户位置
  useEffect(() => {
    const initializeLocation = async () => {
      // 检查是否已经获取过位置信息
      const savedLocation = localStorage.getItem('userLocation');
      if (savedLocation) {
        try {
          const location = JSON.parse(savedLocation);
          setSelectedCountry(location.country);
          setSelectedProvince(location.province);
          setSelectedCity(location.city);
          
          // 设置城市主题
          const cityThemeMap: Record<string, string> = {
            '烟台市': 'yantai',
            '青岛市': 'qingdao',
            '东京都': 'tokyo',
            '首尔市': 'seoul',
          };
          setCityTheme(cityThemeMap[location.city] || 'default');
          return;
        } catch (error) {
          console.error('Failed to parse saved location:', error);
        }
      }

      // 自动请求用户位置
      setIsLoadingLocation(true);
      try {
        const locationInfo = await geolocationService.getUserLocation();
        setSelectedCountry(locationInfo.country);
        setSelectedProvince(locationInfo.province);
        setSelectedCity(locationInfo.city);
        
        // 保存位置信息到本地存储
        localStorage.setItem('userLocation', JSON.stringify({
          country: locationInfo.country,
          province: locationInfo.province,
          city: locationInfo.city
        }));

        // 设置城市主题
        const cityThemeMap: Record<string, string> = {
          '烟台市': 'yantai',
          '青岛市': 'qingdao',
          '东京都': 'tokyo',
          '首尔市': 'seoul',
        };
        setCityTheme(cityThemeMap[locationInfo.city] || 'default');
        
        console.log('Auto-detected location:', locationInfo);
      } catch (error) {
        console.error('Failed to auto-detect location:', error);
        // 使用默认位置
        const cityThemeMap: Record<string, string> = {
          '烟台市': 'yantai',
          '青岛市': 'qingdao',
          '东京都': 'tokyo',
          '首尔市': 'seoul',
        };
        setCityTheme(cityThemeMap[selectedCity] || 'default');
      } finally {
        setIsLoadingLocation(false);
      }
    };

    initializeLocation();
  }, []);

  return (
    <CityContext.Provider value={{ 
      selectedCountry, 
      selectedProvince, 
      selectedCity, 
      isLoadingLocation,
      updateCity,
      requestUserLocation
    }}>
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
