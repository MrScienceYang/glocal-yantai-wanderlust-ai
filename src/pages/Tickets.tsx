
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Ticket, MapPin, Clock, Calendar } from 'lucide-react';
import Layout from '@/components/Layout';
import { useCityContext } from '@/components/CityProvider';
import ForeignTransition from '@/components/ForeignTransition';
import { useNavigate } from 'react-router-dom';

const Tickets = () => {
  const { selectedCountry } = useCityContext();
  const navigate = useNavigate();
  const [showTransition, setShowTransition] = useState(false);
  const [searchParams, setSearchParams] = useState({
    location: '',
    date: '',
    category: ''
  });

  // 模拟门票数据
  const tickets = [
    {
      id: 1,
      name: '故宫博物院',
      category: '文化景点',
      location: '北京市东城区',
      image: '/api/placeholder/300/200',
      price: 60,
      available: 500,
      openTime: '08:30-17:00',
      description: '明清两代的皇家宫殿，世界文化遗产',
      features: ['免排队', '含讲解器', '当日有效']
    },
    {
      id: 2,
      name: '上海迪士尼乐园',
      category: '主题乐园',
      location: '上海市浦东新区',
      image: '/api/placeholder/300/200',
      price: 399,
      available: 1200,
      openTime: '09:00-22:00',
      description: '中国内地首座迪士尼主题乐园',
      features: ['快速通道', '含园区接驳', '当日有效']
    },
    {
      id: 3,
      name: '《狮子王》音乐剧',
      category: '演出',
      location: '上海大剧院',
      image: '/api/placeholder/300/200',
      price: 280,
      available: 45,
      openTime: '19:30-21:30',
      description: '百老汇经典音乐剧中文版',
      features: ['VIP座位', '含节目单', '指定场次']
    }
  ];

  const handleSearch = () => {
    if (selectedCountry !== '中国') {
      setShowTransition(true);
    }
  };

  const handleTransitionComplete = () => {
    window.open('https://www.booking.com/attractions/', '_blank');
    setShowTransition(false);
  };

  const handleBookTicket = (ticket: any) => {
    const orderData = {
      type: 'ticket',
      item: ticket,
      totalPrice: ticket.price
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">门票预订</h1>
        </div>

        {/* 搜索区域 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Ticket className="mr-2 h-5 w-5" />
              门票搜索
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
                  <option value="景点">景点</option>
                  <option value="演出">演出</option>
                  <option value="展览">展览</option>
                  <option value="体验">体验</option>
                </select>
              </div>
            </div>
            <Button onClick={handleSearch} className="w-full gradient-ocean text-white">
              搜索门票
            </Button>
          </CardContent>
        </Card>

        {/* 门票列表 */}
        {selectedCountry === '中国' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">热门门票</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {tickets.map((ticket) => (
                <Card key={ticket.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <img 
                      src={ticket.image} 
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
                        <p className="text-gray-600 mb-2 flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {ticket.openTime}
                        </p>
                        <p className="text-sm text-gray-500 mb-4">{ticket.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {ticket.features.map((feature, index) => (
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
                            variant={ticket.available < 50 ? "destructive" : "secondary"}
                            className="mt-1"
                          >
                            余票 {ticket.available}
                          </Badge>
                        </div>
                        <Button 
                          onClick={() => handleBookTicket(ticket)}
                          disabled={ticket.available === 0}
                          className="gradient-ocean text-white"
                        >
                          立即预订
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Tickets;
