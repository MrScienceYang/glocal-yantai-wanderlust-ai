
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Hotel, MapPin, Star, Wifi, Car, Utensils, RefreshCw } from 'lucide-react';
import Layout from '@/components/Layout';
import { useCityContext } from '@/components/CityProvider';
import ForeignTransition from '@/components/ForeignTransition';
import { useNavigate } from 'react-router-dom';
import { travelDataService, type Hotel as HotelType } from '@/services/travelDataService';
import { toast } from 'sonner';

const Hotels = () => {
  const { selectedCountry } = useCityContext();
  const navigate = useNavigate();
  const [showTransition, setShowTransition] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hotels, setHotels] = useState<HotelType[]>([]);
  const [searchParams, setSearchParams] = useState({
    location: '',
    checkin: '',
    checkout: '',
    guests: '2'
  });

  // 加载酒店数据
  useEffect(() => {
    loadHotels();
  }, []);

  const loadHotels = async () => {
    setLoading(true);
    try {
      const data = await travelDataService.getHotels();
      setHotels(data);
      toast.success(`加载了 ${data.length} 家酒店`);
    } catch (error) {
      toast.error('加载酒店数据失败');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (selectedCountry !== '中国') {
      setShowTransition(true);
      return;
    }

    setLoading(true);
    try {
      // 记录搜索日志
      await travelDataService.logSearch('hotel', searchParams);
      
      // 搜索酒店
      const data = await travelDataService.getHotels({
        location: searchParams.location,
        checkin: searchParams.checkin,
        checkout: searchParams.checkout
      });
      setHotels(data);
      toast.success(`找到 ${data.length} 家酒店`);
    } catch (error) {
      toast.error('搜索失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const data = await travelDataService.refreshData('hotels', searchParams);
      setHotels(data);
      toast.success('酒店数据已刷新');
    } catch (error) {
      toast.error('刷新数据失败');
    } finally {
      setRefreshing(false);
    }
  };

  const handleTransitionComplete = () => {
    window.open('https://www.booking.com/hotels/', '_blank');
    setShowTransition(false);
  };

  const handleBookHotel = (hotel: HotelType, roomType: string, price: number, available: number) => {
    const orderData = {
      type: 'hotel',
      item: { 
        ...hotel, 
        roomType, 
        price,
        available
      },
      totalPrice: price
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
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Hotel className="mr-2 h-5 w-5" />
                酒店搜索
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                刷新数据
              </Button>
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
            <Button 
              onClick={handleSearch} 
              className="w-full gradient-ocean text-white"
              disabled={loading}
            >
              {loading ? '搜索中...' : '搜索酒店'}
            </Button>
          </CardContent>
        </Card>

        {/* 酒店列表 */}
        {selectedCountry === '中国' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">推荐酒店</h2>
              <Badge variant="outline" className="text-sm">
                实时数据 · 共 {hotels.length} 家酒店
              </Badge>
            </div>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
                <p className="mt-4 text-gray-600">加载中...</p>
              </div>
            ) : hotels.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">暂无酒店数据</p>
              </div>
            ) : (
              hotels.map((hotel) => (
                <Card key={hotel.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="lg:w-1/3">
                        <img 
                          src={hotel.image_url || '/api/placeholder/300/200'} 
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
                              <span className="font-medium">{hotel.rating || 'N/A'}</span>
                            </div>
                          </div>
                          <p className="text-gray-600 mb-2">{hotel.address}</p>
                          <p className="text-sm text-gray-500 mb-4">{hotel.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {hotel.amenities?.map((amenity, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {amenity}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3">
                          {hotel.standard_price && (
                            <div className="border rounded-lg p-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <span className="font-medium">标准间</span>
                                  <Badge 
                                    variant={hotel.standard_available && hotel.standard_available < 5 ? "destructive" : "secondary"}
                                    className="ml-2"
                                  >
                                    余房 {hotel.standard_available || 0}
                                  </Badge>
                                </div>
                                <div className="text-right">
                                  <div className="text-lg font-bold text-red-600">¥{hotel.standard_price}/晚</div>
                                  <Button 
                                    size="sm"
                                    onClick={() => handleBookHotel(hotel, '标准间', hotel.standard_price, hotel.standard_available || 0)}
                                    disabled={!hotel.standard_available}
                                    className="mt-1"
                                  >
                                    预订
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {hotel.deluxe_price && (
                            <div className="border rounded-lg p-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <span className="font-medium">豪华间</span>
                                  <Badge 
                                    variant={hotel.deluxe_available && hotel.deluxe_available < 5 ? "destructive" : "secondary"}
                                    className="ml-2"
                                  >
                                    余房 {hotel.deluxe_available || 0}
                                  </Badge>
                                </div>
                                <div className="text-right">
                                  <div className="text-lg font-bold text-red-600">¥{hotel.deluxe_price}/晚</div>
                                  <Button 
                                    size="sm"
                                    onClick={() => handleBookHotel(hotel, '豪华间', hotel.deluxe_price, hotel.deluxe_available || 0)}
                                    disabled={!hotel.deluxe_available}
                                    className="mt-1"
                                  >
                                    预订
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}

                          {hotel.suite_price && (
                            <div className="border rounded-lg p-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <span className="font-medium">套房</span>
                                  <Badge 
                                    variant={hotel.suite_available && hotel.suite_available < 5 ? "destructive" : "secondary"}
                                    className="ml-2"
                                  >
                                    余房 {hotel.suite_available || 0}
                                  </Badge>
                                </div>
                                <div className="text-right">
                                  <div className="text-lg font-bold text-red-600">¥{hotel.suite_price}/晚</div>
                                  <Button 
                                    size="sm"
                                    onClick={() => handleBookHotel(hotel, '套房', hotel.suite_price, hotel.suite_available || 0)}
                                    disabled={!hotel.suite_available}
                                    className="mt-1"
                                  >
                                    预订
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Hotels;
