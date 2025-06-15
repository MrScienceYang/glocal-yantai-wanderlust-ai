
import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { addressData } from '@/data/addressData';
import { useTranslation } from 'react-i18next';

interface AddressSelectorProps {
  onAddressChange: (address: { province: string; city: string; district: string }) => void;
  value: { province: string; city: string; district: string };
}

const AddressSelector: React.FC<AddressSelectorProps> = ({ onAddressChange, value }) => {
  const { t } = useTranslation();
  
  const { province, city, district } = value;

  const provinces = Object.keys(addressData);
  const cities = province ? Object.keys(addressData[province]) : [];
  const districts = province && city ? addressData[province][city] : [];

  const handleProvinceChange = (newProvince: string) => {
    onAddressChange({ province: newProvince, city: '', district: '' });
  };

  const handleCityChange = (newCity: string) => {
    onAddressChange({ province, city: newCity, district: '' });
  };
  
  const handleDistrictChange = (newDistrict: string) => {
    onAddressChange({ province, city, district: newDistrict });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Select onValueChange={handleProvinceChange} value={province}>
        <SelectTrigger>
          <SelectValue placeholder={t('checkout.province_placeholder')} />
        </SelectTrigger>
        <SelectContent>
          {provinces.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
        </SelectContent>
      </Select>
      <Select onValueChange={handleCityChange} value={city} disabled={!province}>
        <SelectTrigger>
          <SelectValue placeholder={t('checkout.city_placeholder')} />
        </SelectTrigger>
        <SelectContent>
          {cities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
        </SelectContent>
      </Select>
      <Select onValueChange={handleDistrictChange} value={district} disabled={!city}>
        <SelectTrigger>
          <SelectValue placeholder={t('checkout.district_placeholder')} />
        </SelectTrigger>
        <SelectContent>
          {districts.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  );
};

export default AddressSelector;
