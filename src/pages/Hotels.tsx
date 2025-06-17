
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Hotel, MapPin, Star, Wifi, Car, Utensils } from 'lucide-react';
import Layout from '@/components/Layout';
import { useCityContext } from '@/components/CityProvider';
import ForeignTransition from '@/components/ForeignTransition';
import { useNavigate } from 'react-router-dom';

const Hotels = () => {
  const { selectedCountry } = useCityContext();
  const navigate = useNavigate();
  const [showTransition, setShowTransition] = useState(false);
  const [searchParams, setSearchParams] = useState({
    location: '',
    checkin: '',
    checkout: '',
    guests: '2'
  });

  // 模拟酒店数据
  const hotels = [
    {
      id: 1,
      name: '上海外滩茂悦大酒店',
      rating: 4.8,
      address: '上海市黄浦区中山东一路',
      image: '/api/placeholder/300/200',
      amenities: ['免费WiFi', '停车场', '餐厅', '健身房'],
      rooms: {
        standard: { price: 680, available: 12, type: '标准间' },
        deluxe: { price: 880, available: 8, type: '豪华间' },
        suite: { price: 1280, available: 3, type: '套房' }
      },
      description: '位于外滩核心区域，享有黄浦江美景'
    },
    {
      id: 2,
      name: '北京王府井希尔顿酒店',
      rating: 4.7,
      address: '北京市东城区王府井大街',
      image: '/api/placeholder/300/200',
      amenities: ['免费WiFi', '停车场', '餐厅', '商务中心'],
      rooms: {
        standard: { price: 720, available: 25, type: '标准间' },
        deluxe: { price: 920, available: 15, type: '豪华间' },
        suite: { price: 1580, available: 6, type: '套房' }
      },
      description: '地处王府井商业区核心，交通便利'
    }
  ];

  const handleSearch = () => {
    if (selectedCountry !== '中国') {
      setShowTransition(true);
    }
  };

  const handleTransitionComplete = () => {
    window.open('https://www.booking.com/hotels/', '_blank');
    setShowTransition(false);
  };

  const handleBookHotel = (hotel: any, roomType: string, room: any) => {
    const orderData = {
      type: 'hotel',
      item: { ...hotel, roomType: room.type, price: room.price },
      totalPrice: room.price
    };
    localStorage.setItem('pendingOrder', JSON.stringify(orderData));
    navigate('/checkout');
  };

  if (showTransition) {
    return <ForeignTransition onComplete={handleTransitionComplete} />;
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">酒店预订</h1>
        </div>

        {/* 搜索区域 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Hotel className="mr-2 h-5 w-5" />
              酒店搜索
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">目的地</label>
                <Input
                  placeholder="输入城市或酒店名"
                  value={searchParams.location}
                  onChange={(e) => setSearchParams({...searchParams, location: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">入住日期</label>
                <Input
                  type="date"
                  value={searchParams.checkin}
                  onChange={(e) => setSearchParams({...searchParams, checkin: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">退房日期</label>
                <Input
                  type="date"
                  value={searchParams.checkout}
                  onChange={(e) => setSearchParams({...searchParams, checkout: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">客人数量</label>
                <Input
                  type="number"
                  min="1"
                  value={searchParams.guests}
                  onChange={(e) => setSearchParams({...searchParams, guests: e.target.value})}
                />
              </div>
            </div>
            <Button onClick={handleSearch} className="w-full gradient-ocean text-white">
              搜索酒店
            </Button>
          </CardContent>
        </Card>

        {/* 酒店列表 */}
        {selectedCountry === '中国' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">推荐酒店</h2>
            {hotels.map((hotel) => (
              <Card key={hotel.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="lg:w-1/3">
                      <img 
                        src={hotel.image} 
                        alt={hotel.name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                    <div className="lg:w-2/3">
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-bold">{hotel.name}</h3>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                            <span className="font-medium">{hotel.rating}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-2">{hotel.address}</p>
                        <p className="text-sm text-gray-500 mb-4">{hotel.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {hotel.amenities.map((amenity, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        {Object.entries(hotel.rooms).map(([key, room]: [string, any]) => (
                          <div key={key} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="font-medium">{room.type}</span>
                                <Badge 
                                  variant={room.available < 5 ? "destructive" : "secondary"}
                                  className="ml-2"
                                >
                                  余房 {room.available}
                                </Badge>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold text-red-600">¥{room.price}/晚</div>
                                <Button 
                                  size="sm"
                                  onClick={() => handleBookHotel(hotel, key, room)}
                                  disabled={room.available === 0}
                                  className="mt-1"
                                >
                                  预订
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Hotels;
