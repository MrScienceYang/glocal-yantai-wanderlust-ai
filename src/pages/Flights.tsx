
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plane, MapPin, Clock, Users, Shield, RefreshCw } from 'lucide-react';
import Layout from '@/components/Layout';
import { useCityContext } from '@/components/CityProvider';
import ForeignTransition from '@/components/ForeignTransition';
import { useNavigate } from 'react-router-dom';
import AIContentGenerator from '@/components/AIContentGenerator';
import { travelDataService, type Flight } from '@/services/travelDataService';
import { toast } from 'sonner';

const Flights = () => {
  const { selectedCountry } = useCityContext();
  const navigate = useNavigate();
  const [showTransition, setShowTransition] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    departure: '',
    travelers: '1'
  });
  const [aiEnhancedFlights, setAiEnhancedFlights] = useState<any>({});

  // 加载航班数据
  useEffect(() => {
    loadFlights();
  }, []);

  const loadFlights = async () => {
    setLoading(true);
    try {
      const data = await travelDataService.getFlights();
      setFlights(data);
      toast.success(`加载了 ${data.length} 个航班`);
    } catch (error) {
      toast.error('加载航班数据失败');
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
      await travelDataService.logSearch('flight', searchParams);
      
      // 搜索航班
      const data = await travelDataService.getFlights({
        from: searchParams.from,
        to: searchParams.to,
        date: searchParams.departure
      });
      setFlights(data);
      toast.success(`找到 ${data.length} 个航班`);
    } catch (error) {
      toast.error('搜索失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const data = await travelDataService.refreshData('flights', searchParams);
      setFlights(data);
      toast.success('航班数据已刷新');
    } catch (error) {
      toast.error('刷新数据失败');
    } finally {
      setRefreshing(false);
    }
  };

  const handleTransitionComplete = () => {
    window.open('https://www.booking.com/flights/', '_blank');
    setShowTransition(false);
  };

  const handleBookFlight = (flight: Flight) => {
    const orderData = {
      type: 'flight',
      item: {
        ...flight,
        departure: { 
          time: new Date(flight.departure_time).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
          airport: flight.departure_airport 
        },
        arrival: { 
          time: new Date(flight.arrival_time).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
          airport: flight.arrival_airport 
        },
        duration: `${Math.floor(flight.duration_minutes / 60)}小时${flight.duration_minutes % 60}分钟`,
        seats: flight.available_seats,
        class: flight.class_type
      },
      totalPrice: flight.price
    };
    localStorage.setItem('pendingOrder', JSON.stringify(orderData));
    navigate('/checkout');
  };

  const handleAIFlightInfoGenerated = (flightId: string, content: any) => {
    setAiEnhancedFlights(prev => ({
      ...prev,
      [flightId]: content
    }));
  };

  if (showTransition) {
    return <ForeignTransition onComplete={handleTransitionComplete} />;
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">机票预订</h1>
          {selectedCountry === '中国' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center space-x-2 text-green-800">
                <Shield className="h-5 w-5" />
                <span className="font-bold text-lg">诚信承诺：不额外收保险费，不搞霸王条款</span>
              </div>
              <p className="text-green-700 mt-2">只做最让用户放心的OTA平台</p>
            </div>
          )}
        </div>

        {/* 搜索区域 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Plane className="mr-2 h-5 w-5" />
                航班搜索
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
                <label className="block text-sm font-medium mb-2">出发地</label>
                <Input
                  placeholder="输入城市或机场"
                  value={searchParams.from}
                  onChange={(e) => setSearchParams({...searchParams, from: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">目的地</label>
                <Input
                  placeholder="输入城市或机场"
                  value={searchParams.to}
                  onChange={(e) => setSearchParams({...searchParams, to: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">出发日期</label>
                <Input
                  type="date"
                  value={searchParams.departure}
                  onChange={(e) => setSearchParams({...searchParams, departure: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">乘客人数</label>
                <Input
                  type="number"
                  min="1"
                  value={searchParams.travelers}
                  onChange={(e) => setSearchParams({...searchParams, travelers: e.target.value})}
                />
              </div>
            </div>
            <Button 
              onClick={handleSearch} 
              className="w-full gradient-ocean text-white"
              disabled={loading}
            >
              {loading ? '搜索中...' : '搜索航班'}
            </Button>
          </CardContent>
        </Card>

        {/* 航班列表 */}
        {selectedCountry === '中国' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">可预订航班</h2>
              <Badge variant="outline" className="text-sm">
                实时数据 · 共 {flights.length} 个航班
              </Badge>
            </div>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
                <p className="mt-4 text-gray-600">加载中...</p>
              </div>
            ) : flights.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">暂无航班数据</p>
              </div>
            ) : (
              flights.map((flight) => (
                <Card key={flight.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold">
                              {new Date(flight.departure_time).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                            </div>
                            <div className="text-sm text-gray-600">{flight.departure_airport}</div>
                          </div>
                          <div className="flex-1 text-center">
                            <div className="flex items-center justify-center space-x-2">
                              <div className="h-0.5 bg-gray-300 flex-1"></div>
                              <Plane className="h-4 w-4 text-gray-400" />
                              <div className="h-0.5 bg-gray-300 flex-1"></div>
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              {Math.floor(flight.duration_minutes / 60)}小时{flight.duration_minutes % 60}分钟
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold">
                              {new Date(flight.arrival_time).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                            </div>
                            <div className="text-sm text-gray-600">{flight.arrival_airport}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{flight.airline} {flight.flight_number}</span>
                          <span>{flight.class_type}</span>
                          <Badge variant={flight.available_seats < 10 ? "destructive" : "secondary"}>
                            余票 {flight.available_seats} 张
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right ml-6">
                        <div className="text-2xl font-bold text-red-600">¥{flight.price}</div>
                        <div className="mt-4 flex justify-between items-center">
                          <div className="flex-1">
                            <Button 
                              onClick={() => handleBookFlight(flight)}
                              className="mt-2 gradient-ocean text-white"
                            >
                              立即预订
                            </Button>
                          </div>
                          <div className="ml-4">
                            <AIContentGenerator
                              type="flight"
                              context={flight}
                              onContentGenerated={(content) => handleAIFlightInfoGenerated(flight.id, content)}
                              buttonText="AI分析"
                              title=""
                              description=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* AI增强信息 */}
                    {aiEnhancedFlights[flight.id] && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-800 mb-2">AI服务亮点</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-blue-700">准点率: {aiEnhancedFlights[flight.id].punctualityRate}</p>
                            <p className="text-blue-700">乘客评价: {aiEnhancedFlights[flight.id].passengerReview}</p>
                          </div>
                          <div>
                            <p className="text-blue-700">服务特色:</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {aiEnhancedFlights[flight.id].additionalServices?.slice(0, 3).map((service: string, index: number) => (
                                <Badge key={index} variant="outline" className="text-xs">{service}</Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
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

export default Flights;
