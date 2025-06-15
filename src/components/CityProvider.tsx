
import React, { createContext, useContext, useState } from 'react';

interface CityContextType {
  selectedCountry: string;
  selectedProvince: string;
  selectedCity: string;
  updateCity: (country: string, province: string, city: string) => void;
}

const CityContext = createContext<CityContextType>({
  selectedCountry: '中国',
  selectedProvince: '山东省',
  selectedCity: '烟台市',
  updateCity: () => {}
});

export const useCityContext = () => useContext(CityContext);

interface CityProviderProps {
  children: React.ReactNode;
}

export const CityProvider = ({ children }: CityProviderProps) => {
  const [selectedCountry, setSelectedCountry] = useState('中国');
  const [selectedProvince, setSelectedProvince] = useState('山东省');
  const [selectedCity, setSelectedCity] = useState('烟台市');

  const updateCity = (country: string, province: string, city: string) => {
    setSelectedCountry(country);
    setSelectedProvince(province);
    setSelectedCity(city);
  };

  return (
    <CityContext.Provider value={{ selectedCountry, selectedProvince, selectedCity, updateCity }}>
      {children}
    </CityContext.Provider>
  );
};
