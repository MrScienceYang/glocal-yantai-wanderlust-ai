import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Train, MapPin, Clock, Shield } from 'lucide-react';
import Layout from '@/components/Layout';
import { useCityContext } from '@/components/CityProvider';
import ForeignTransition from '@/components/ForeignTransition';
import { useNavigate } from 'react-router-dom';
import AIContentGenerator from '@/components/AIContentGenerator';

const Trains = () => {
  const { selectedCountry } = useCityContext();
  const navigate = useNavigate();
  const [showTransition, setShowTransition] = useState(false);
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    departure: ''
  });
  const [aiEnhancedTrains, setAiEnhancedTrains] = useState<any>({});

  // 模拟车次数据
  const trains = [
    {
      id: 1,
      trainNumber: 'G123',
      type: '高速动车',
      departure: { time: '08:00', station: '北京南' },
      arrival: { time: '12:30', station: '上海虹桥' },
      duration: '4小时30分钟',
      seats: {
        business: { price: 1748, available: 12 },
        first: { price: 933, available: 45 },
        second: { price: 553, available: 218 }
      }
    },
    {
      id: 2,
      trainNumber: 'G456',
      type: '高速动车',
      departure: { time: '14:20', station: '北京南' },
      arrival: { time: '18:50', station: '上海虹桥' },
      duration: '4小时30分钟',
      seats: {
        business: { price: 1748, available: 3 },
        first: { price: 933, available: 67 },
        second: { price: 553, available: 156 }
      }
    }
  ];

  const handleSearch = () => {
    if (selectedCountry !== '中国') {
      setShowTransition(true);
    }
  };

  const handleTransitionComplete = () => {
    window.open('https://www.booking.com/trains/', '_blank');
    setShowTransition(false);
  };

  const handleBookTrain = (train: any, seatType: string, price: number) => {
    const orderData = {
      type: 'train',
      item: { ...train, seatType, price },
      totalPrice: price
    };
    localStorage.setItem('pendingOrder', JSON.stringify(orderData));
    navigate('/checkout');
  };

  const handleAITrainInfoGenerated = (trainId: number, content: any) => {
    setAiEnhancedTrains(prev => ({
      ...prev,
      [trainId]: content
    }));
  };

  if (showTransition) {
    return <ForeignTransition onComplete={handleTransitionComplete} />;
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">火车票预订</h1>
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
            <CardTitle className="flex items-center">
              <Train className="mr-2 h-5 w-5" />
              车次搜索
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">出发站</label>
                <Input
                  placeholder="输入火车站"
                  value={searchParams.from}
                  onChange={(e) => setSearchParams({...searchParams, from: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">到达站</label>
                <Input
                  placeholder="输入火车站"
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
            </div>
            <Button onClick={handleSearch} className="w-full gradient-ocean text-white">
              搜索车次
            </Button>
          </CardContent>
        </Card>

        {/* 车次列表 */}
        {selectedCountry === '中国' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">可预订车次</h2>
            {trains.map((train) => (
              <Card key={train.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl font-bold text-blue-600">{train.trainNumber}</div>
                        <Badge variant="outline">{train.type}</Badge>
                      </div>
                      <div className="text-sm text-gray-600">{train.duration}</div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-xl font-bold">{train.departure.time}</div>
                        <div className="text-sm text-gray-600">{train.departure.station}</div>
                      </div>
                      <div className="flex-1 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <div className="h-0.5 bg-gray-300 flex-1"></div>
                          <Train className="h-4 w-4 text-gray-400" />
                          <div className="h-0.5 bg-gray-300 flex-1"></div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold">{train.arrival.time}</div>
                        <div className="text-sm text-gray-600">{train.arrival.station}</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">商务座</span>
                        <span className="text-lg font-bold text-red-600">¥{train.seats.business.price}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <Badge variant={train.seats.business.available < 10 ? "destructive" : "secondary"}>
                          余票 {train.seats.business.available}
                        </Badge>
                        <Button 
                          size="sm"
                          onClick={() => handleBookTrain(train, '商务座', train.seats.business.price)}
                          disabled={train.seats.business.available === 0}
                        >
                          预订
                        </Button>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">一等座</span>
                        <span className="text-lg font-bold text-red-600">¥{train.seats.first.price}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <Badge variant={train.seats.first.available < 10 ? "destructive" : "secondary"}>
                          余票 {train.seats.first.available}
                        </Badge>
                        <Button 
                          size="sm"
                          onClick={() => handleBookTrain(train, '一等座', train.seats.first.price)}
                          disabled={train.seats.first.available === 0}
                        >
                          预订
                        </Button>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">二等座</span>
                        <span className="text-lg font-bold text-red-600">¥{train.seats.second.price}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <Badge variant={train.seats.second.available < 10 ? "destructive" : "secondary"}>
                          余票 {train.seats.second.available}
                        </Badge>
                        <Button 
                          size="sm"
                          onClick={() => handleBookTrain(train, '二等座', train.seats.second.price)}
                          disabled={train.seats.second.available === 0}
                        >
                          预订
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* AI增强信息 */}
                  {aiEnhancedTrains[train.id] && (
                    <div className="mt-4 p-4 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-800 mb-2">AI服务分析</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-green-700">准点率: {aiEnhancedTrains[train.id].punctuality}</p>
                          <p className="text-green-700">舒适度: {aiEnhancedTrains[train.id].comfort}</p>
                        </div>
                        <div>
                          <p className="text-green-700">车内设施:</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {aiEnhancedTrains[train.id].facilities?.slice(0, 3).map((facility: string, index: number) => (
                              <Badge key={index} variant="outline" className="text-xs">{facility}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* AI内容生成按钮 */}
                  <div className="mt-4">
                    <AIContentGenerator
                      type="train"
                      context={train}
                      onContentGenerated={(content) => handleAITrainInfoGenerated(train.id, content)}
                      buttonText="AI分析列车服务"
                      title=""
                      description=""
                    />
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

export default Trains;
