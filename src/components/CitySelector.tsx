
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Globe, ChevronDown } from 'lucide-react';

// 城市数据结构
const cityData = {
  '中国': {
    '山东省': ['烟台市', '青岛市', '济南市', '威海市', '泰安市', '济宁市'],
    '北京市': ['北京市'],
    '上海市': ['上海市'],
    '广东省': ['广州市', '深圳市', '珠海市', '佛山市', '东莞市'],
    '浙江省': ['杭州市', '宁波市', '温州市', '嘉兴市', '湖州市'],
    '江苏省': ['南京市', '苏州市', '无锡市', '常州市', '南通市']
  },
  '日本': {
    '关东地方': ['东京都', '横滨市', '川崎市', '埼玉市'],
    '关西地方': ['大阪市', '京都市', '神户市', '奈良市'],
    '中部地方': ['名古屋市', '静冈市', '新潟市']
  },
  '韩国': {
    '首尔特别市': ['首尔市'],
    '釜山广域市': ['釜山市'],
    '济州特别自治道': ['济州市']
  },
  '美国': {
    '加利福尼亚州': ['洛杉矶', '旧金山', '圣地亚哥', '萨克拉门托'],
    '纽约州': ['纽约市', '奥尔巴尼', '布法罗'],
    '德克萨斯州': ['休斯敦', '达拉斯', '奥斯汀', '圣安东尼奥']
  },
  '法国': {
    '法兰西岛大区': ['巴黎'],
    '普罗旺斯-阿尔卑斯-蓝色海岸大区': ['马赛', '尼斯', '戛纳'],
    '奥弗涅-罗纳-阿尔卑斯大区': ['里昂', '格勒诺布尔']
  }
};

interface CitySelectorProps {
  onCityChange?: (country: string, province: string, city: string) => void;
}

const CitySelector = ({ onCityChange }: CitySelectorProps) => {
  const [selectedCountry, setSelectedCountry] = useState('中国');
  const [selectedProvince, setSelectedProvince] = useState('山东省');
  const [selectedCity, setSelectedCity] = useState('烟台市');
  const [isOpen, setIsOpen] = useState(false);

  const getProvinces = () => {
    if (!selectedCountry || !cityData[selectedCountry]) return [];
    return Object.keys(cityData[selectedCountry]);
  };

  const getCities = () => {
    if (!selectedCountry || !selectedProvince || !cityData[selectedCountry]?.[selectedProvince]) return [];
    return cityData[selectedCountry][selectedProvince];
  };

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    const provinces = Object.keys(cityData[country]);
    if (provinces.length > 0) {
      setSelectedProvince(provinces[0]);
      const cities = cityData[country][provinces[0]];
      if (cities.length > 0) {
        setSelectedCity(cities[0]);
        onCityChange?.(country, provinces[0], cities[0]);
      }
    }
  };

  const handleProvinceChange = (province: string) => {
    setSelectedProvince(province);
    const cities = cityData[selectedCountry][province];
    if (cities.length > 0) {
      setSelectedCity(cities[0]);
      onCityChange?.(selectedCountry, province, cities[0]);
    }
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    onCityChange?.(selectedCountry, selectedProvince, city);
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center">
          <Globe className="h-4 w-4 mr-2" />
          {selectedCity}
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 p-4 bg-white border shadow-lg z-[9999] fixed">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">国家</label>
            <Select value={selectedCountry} onValueChange={handleCountryChange}>
              <SelectTrigger>
                <SelectValue placeholder="选择国家" />
              </SelectTrigger>
              <SelectContent className="z-[9999]">
                {Object.keys(cityData).map((country) => (
                  <SelectItem key={country} value={country}>{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">省/州/地区</label>
            <Select value={selectedProvince} onValueChange={handleProvinceChange}>
              <SelectTrigger>
                <SelectValue placeholder="选择省份" />
              </SelectTrigger>
              <SelectContent className="z-[9999]">
                {getProvinces().map((province) => (
                  <SelectItem key={province} value={province}>{province}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">城市</label>
            <Select value={selectedCity} onValueChange={handleCityChange}>
              <SelectTrigger>
                <SelectValue placeholder="选择城市" />
              </SelectTrigger>
              <SelectContent className="z-[9999]">
                {getCities().map((city) => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CitySelector;
