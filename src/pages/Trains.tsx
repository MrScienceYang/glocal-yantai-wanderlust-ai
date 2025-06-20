
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Train, MapPin, Clock, Shield, RefreshCw } from 'lucide-react';
import Layout from '@/components/Layout';
import { useCityContext } from '@/components/CityProvider';
import ForeignTransition from '@/components/ForeignTransition';
import { useNavigate } from 'react-router-dom';
import AIContentGenerator from '@/components/AIContentGenerator';
import { travelDataService, type Train as TrainType } from '@/services/travelDataService';
import { toast } from 'sonner';

const Trains = () => {
  const { selectedCountry } = useCityContext();
  const navigate = useNavigate();
  const [showTransition, setShowTransition] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [trains, setTrains] = useState<TrainType[]>([]);
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    departure: ''
  });
  const [aiEnhancedTrains, setAiEnhancedTrains] = useState<any>({});

  // 加载火车数据
  useEffect(() => {
    loadTrains();
  }, []);

  const loadTrains = async () => {
    setLoading(true);
    try {
      const data = await travelDataService.getTrains();
      setTrains(data);
      toast.success(`加载了 ${data.length} 条火车数据`);
    } catch (error) {
      toast.error('加载火车数据失败');
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
      await travelDataService.logSearch('train', searchParams);
      
      // 搜索火车票
      const data = await travelDataService.getTrains({
        from: searchParams.from,
        to: searchParams.to,
        date: searchParams.departure
      });
      setTrains(data);
      toast.success(`找到 ${data.length} 趟列车`);
    } catch (error) {
      toast.error('搜索失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const data = await travelDataService.refreshData('trains', searchParams);
      setTrains(data);
      toast.success('数据已刷新');
    } catch (error) {
      toast.error('刷新数据失败');
    } finally {
      setRefreshing(false);
    }
  };

  const handleTransitionComplete = () => {
    window.open('https://www.booking.com/trains/', '_blank');
    setShowTransition(false);
  };

  const handleBookTrain = (train: TrainType, seatType: string, price: number) => {
    const orderData = {
      type: 'train',
      item: { ...train, seatType, price },
      totalPrice: price
    };
    localStorage.setItem('pendingOrder', JSON.stringify(orderData));
    navigate('/checkout');
  };

  const handleAITrainInfoGenerated = (trainId: string, content: any) => {
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
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Train className="mr-2 h-5 w-5" />
                车次搜索
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
            <Button 
              onClick={handleSearch} 
              className="w-full gradient-ocean text-white"
              disabled={loading}
            >
              {loading ? '搜索中...' : '搜索车次'}
            </Button>
          </CardContent>
        </Card>

        {/* 车次列表 */}
        {selectedCountry === '中国' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">可预订车次</h2>
              <Badge variant="outline" className="text-sm">
                实时数据 · 共 {trains.length} 趟
              </Badge>
            </div>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
                <p className="mt-4 text-gray-600">加载中...</p>
              </div>
            ) : trains.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">暂无车次数据</p>
              </div>
            ) : (
              trains.map((train) => (
                <Card key={train.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-4">
                          <div className="text-2xl font-bold text-blue-600">{train.train_number}</div>
                          <Badge variant="outline">{train.train_type}</Badge>
                        </div>
                        <div className="text-sm text-gray-600">
                          {Math.floor(train.duration_minutes / 60)}小时{train.duration_minutes % 60}分钟
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="text-xl font-bold">
                            {new Date(train.departure_time).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                          </div>
                          <div className="text-sm text-gray-600">{train.departure_station}</div>
                        </div>
                        <div className="flex-1 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <div className="h-0.5 bg-gray-300 flex-1"></div>
                            <Train className="h-4 w-4 text-gray-400" />
                            <div className="h-0.5 bg-gray-300 flex-1"></div>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold">
                            {new Date(train.arrival_time).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                          </div>
                          <div className="text-sm text-gray-600">{train.arrival_station}</div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {train.business_class_price && (
                        <div className="border rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">商务座</span>
                            <span className="text-lg font-bold text-red-600">¥{train.business_class_price}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <Badge variant={train.business_class_seats && train.business_class_seats < 10 ? "destructive" : "secondary"}>
                              余票 {train.business_class_seats || 0}
                            </Badge>
                            <Button 
                              size="sm"
                              onClick={() => handleBookTrain(train, '商务座', Number(train.business_class_price))}
                              disabled={!train.business_class_seats}
                            >
                              预订
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      {train.first_class_price && (
                        <div className="border rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">一等座</span>
                            <span className="text-lg font-bold text-red-600">¥{train.first_class_price}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <Badge variant={train.first_class_seats && train.first_class_seats < 10 ? "destructive" : "secondary"}>
                              余票 {train.first_class_seats || 0}
                            </Badge>
                            <Button 
                              size="sm"
                              onClick={() => handleBookTrain(train, '一等座', Number(train.first_class_price))}
                              disabled={!train.first_class_seats}
                            >
                              预订
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      {train.second_class_price && (
                        <div className="border rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">二等座</span>
                            <span className="text-lg font-bold text-red-600">¥{train.second_class_price}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <Badge variant={train.second_class_seats && train.second_class_seats < 10 ? "destructive" : "secondary"}>
                              余票 {train.second_class_seats || 0}
                            </Badge>
                            <Button 
                              size="sm"
                              onClick={() => handleBookTrain(train, '二等座', Number(train.second_class_price))}
                              disabled={!train.second_class_seats}
                            >
                              预订
                            </Button>
                          </div>
                        </div>
                      )}
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
              ))
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Trains;
