
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Ticket, MapPin, Clock, Calendar, RefreshCw } from 'lucide-react';
import Layout from '@/components/Layout';
import { useCityContext } from '@/components/CityProvider';
import ForeignTransition from '@/components/ForeignTransition';
import { useNavigate } from 'react-router-dom';
import AIContentGenerator from '@/components/AIContentGenerator';
import { travelDataService, type Ticket as TicketType } from '@/services/travelDataService';
import { toast } from 'sonner';

const Tickets = () => {
  const { selectedCountry } = useCityContext();
  const navigate = useNavigate();
  const [showTransition, setShowTransition] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [searchParams, setSearchParams] = useState({
    location: '',
    date: '',
    category: ''
  });
  const [aiEnhancedTickets, setAiEnhancedTickets] = useState<any>({});

  // 加载门票数据
  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    setLoading(true);
    try {
      const data = await travelDataService.getTickets();
      setTickets(data);
      toast.success(`加载了 ${data.length} 张门票`);
    } catch (error) {
      toast.error('加载门票数据失败');
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
      await travelDataService.logSearch('ticket', searchParams);
      
      // 搜索门票
      const data = await travelDataService.getTickets({
        location: searchParams.location,
        category: searchParams.category,
        date: searchParams.date
      });
      setTickets(data);
      toast.success(`找到 ${data.length} 张门票`);
    } catch (error) {
      toast.error('搜索失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const data = await travelDataService.refreshData('tickets', searchParams);
      setTickets(data);
      toast.success('门票数据已刷新');
    } catch (error) {
      toast.error('刷新数据失败');
    } finally {
      setRefreshing(false);
    }
  };

  const handleTransitionComplete = () => {
    window.open('https://www.booking.com/attractions/', '_blank');
    setShowTransition(false);
  };

  const handleBookTicket = (ticket: TicketType) => {
    const orderData = {
      type: 'ticket',
      item: ticket,
      totalPrice: ticket.price
    };
    localStorage.setItem('pendingOrder', JSON.stringify(orderData));
    navigate('/checkout');
  };

  const handleAITicketInfoGenerated = (ticketId: string, content: any) => {
    setAiEnhancedTickets(prev => ({
      ...prev,
      [ticketId]: content
    }));
  };

  if (showTransition) {
    return <ForeignTransition onComplete={handleTransitionComplete} />;
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">门票预订</h1>
        </div>

        {/* 搜索区域 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Ticket className="mr-2 h-5 w-5" />
                门票搜索
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
                <label className="block text-sm font-medium mb-2">目的地</label>
                <Input
                  placeholder="输入景点或城市"
                  value={searchParams.location}
                  onChange={(e) => setSearchParams({...searchParams, location: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">游玩日期</label>
                <Input
                  type="date"
                  value={searchParams.date}
                  onChange={(e) => setSearchParams({...searchParams, date: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">分类</label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={searchParams.category}
                  onChange={(e) => setSearchParams({...searchParams, category: e.target.value})}
                >
                  <option value="">全部分类</option>
                  <option value="文化景点">文化景点</option>
                  <option value="主题乐园">主题乐园</option>
                  <option value="观光景点">观光景点</option>
                  <option value="自然景观">自然景观</option>
                  <option value="演出">演出</option>
                  <option value="展览">展览</option>
                  <option value="体验">体验</option>
                </select>
              </div>
            </div>
            <Button 
              onClick={handleSearch} 
              className="w-full gradient-ocean text-white"
              disabled={loading}
            >
              {loading ? '搜索中...' : '搜索门票'}
            </Button>
          </CardContent>
        </Card>

        {/* 门票列表 */}
        {selectedCountry === '中国' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold mb-4">热门门票</h2>
              <Badge variant="outline" className="text-sm">
                实时数据 · 共 {tickets.length} 张门票
              </Badge>
            </div>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
                <p className="mt-4 text-gray-600">加载中...</p>
              </div>
            ) : tickets.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">暂无门票数据</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {tickets.map((ticket) => (
                  <Card key={ticket.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <img 
                        src={ticket.image_url || '/api/placeholder/300/200'} 
                        alt={ticket.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="p-6">
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-bold">{ticket.name}</h3>
                            <Badge variant="outline">{ticket.category}</Badge>
                          </div>
                          <p className="text-gray-600 mb-2 flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {ticket.location}
                          </p>
                          {ticket.open_time && (
                            <p className="text-gray-600 mb-2 flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {ticket.open_time}
                            </p>
                          )}
                          <p className="text-sm text-gray-500 mb-4">{ticket.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {ticket.features?.map((feature, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-2xl font-bold text-red-600">¥{ticket.price}</div>
                            <Badge 
                              variant={ticket.available_quantity < 50 ? "destructive" : "secondary"}
                              className="mt-1"
                            >
                              余票 {ticket.available_quantity}
                            </Badge>
                          </div>
                          <Button 
                            onClick={() => handleBookTicket(ticket)}
                            disabled={ticket.available_quantity === 0}
                            className="gradient-ocean text-white"
                          >
                            立即预订
                          </Button>
                        </div>

                        {/* AI增强信息 */}
                        {aiEnhancedTickets[ticket.id] && (
                          <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                            <h4 className="font-medium text-purple-800 mb-2">AI景点亮点</h4>
                            <p className="text-sm text-purple-700 mb-2">{aiEnhancedTickets[ticket.id].introduction}</p>
                            <div className="flex flex-wrap gap-2">
                              {aiEnhancedTickets[ticket.id].highlights?.slice(0, 3).map((highlight: string, index: number) => (
                                <Badge key={index} variant="outline" className="text-xs">{highlight}</Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* AI内容生成按钮 */}
                        <div className="mt-4">
                          <AIContentGenerator
                            type="ticket"
                            context={ticket}
                            onContentGenerated={(content) => handleAITicketInfoGenerated(ticket.id, content)}
                            buttonText="AI景点分析"
                            title=""
                            description=""
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Tickets;
