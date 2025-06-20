
interface GeolocationPosition {
  latitude: number;
  longitude: number;
}

interface LocationInfo {
  country: string;
  province: string;
  city: string;
  coordinates: GeolocationPosition;
}

export class GeolocationService {
  private static instance: GeolocationService;
  
  static getInstance(): GeolocationService {
    if (!GeolocationService.instance) {
      GeolocationService.instance = new GeolocationService();
    }
    return GeolocationService.instance;
  }

  async getCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'));
        return;
      }

      const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes cache
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error('Geolocation error:', error);
          reject(error);
        },
        options
      );
    });
  }

  async reverseGeocode(lat: number, lng: number): Promise<LocationInfo> {
    try {
      // 使用免费的reverse geocoding API
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=zh`
      );
      
      if (!response.ok) {
        throw new Error('Failed to reverse geocode');
      }

      const data = await response.json();
      
      // 解析返回的数据并映射到我们的城市数据结构
      const country = this.mapCountryName(data.countryName);
      const province = this.mapProvinceName(data.principalSubdivision, country);
      const city = this.mapCityName(data.city || data.locality, province, country);

      return {
        country,
        province,
        city,
        coordinates: { latitude: lat, longitude: lng }
      };
    } catch (error) {
      console.error('Reverse geocoding failed:', error);
      // 返回默认位置（烟台）
      return {
        country: '中国',
        province: '山东省',
        city: '烟台市',
        coordinates: { latitude: lat, longitude: lng }
      };
    }
  }

  private mapCountryName(countryName: string): string {
    const countryMap: Record<string, string> = {
      'China': '中国',
      'Japan': '日本',
      'South Korea': '韩国',
      'United States': '美国',
      'United Kingdom': '英国',
      'France': '法国',
      'Germany': '德国',
      'Italy': '意大利',
      'Spain': '西班牙',
      'Canada': '加拿大',
      'Australia': '澳大利亚'
    };
    return countryMap[countryName] || '中国';
  }

  private mapProvinceName(provinceName: string, country: string): string {
    if (country === '中国') {
      const provinceMap: Record<string, string> = {
        'Shandong': '山东省',
        'Beijing': '北京市',
        'Shanghai': '上海市',
        'Guangdong': '广东省',
        'Jiangsu': '江苏省',
        'Zhejiang': '浙江省'
      };
      return provinceMap[provinceName] || '山东省';
    }
    return provinceName || '';
  }

  private mapCityName(cityName: string, province: string, country: string): string {
    if (country === '中国' && province === '山东省') {
      const cityMap: Record<string, string> = {
        'Yantai': '烟台市',
        'Qingdao': '青岛市',
        'Jinan': '济南市',
        'Weifang': '潍坊市'
      };
      return cityMap[cityName] || '烟台市';
    }
    return cityName || '烟台市';
  }

  async getUserLocation(): Promise<LocationInfo> {
    try {
      const position = await this.getCurrentPosition();
      const locationInfo = await this.reverseGeocode(position.latitude, position.longitude);
      return locationInfo;
    } catch (error) {
      console.error('Failed to get user location:', error);
      // 返回默认位置
      return {
        country: '中国',
        province: '山东省',
        city: '烟台市',
        coordinates: { latitude: 37.4638, longitude: 121.4478 }
      };
    }
  }
}

export const geolocationService = GeolocationService.getInstance();
