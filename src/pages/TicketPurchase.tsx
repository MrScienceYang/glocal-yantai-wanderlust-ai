
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, MapPin, Clock, Star, Users, Minus, Plus } from 'lucide-react';
import { useParams } from 'react-router-dom';

const TicketPurchase = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');

  // 模拟景点数据
  const attraction = {
    id: '1',
    name: '蓬莱阁风景区',
    description: '中国古代四大名楼之一，八仙过海传说发源地',
    price: 120,
    memberPrice: 108,
    rating: 4.8,
    reviews: 2456,
    images: [
      '/api/placeholder/600/400',
      '/api/placeholder/300/200',
      '/api/placeholder/300/200'
    ],
    features: [
      '包含蓬莱阁主楼',
      '八仙渡海口',
      '蓬莱水城',
      '免费导览服务'
    ],
    openTime: '08:00-17:30',
    address: '山东省烟台市蓬莱区迎宾路7号',
    tips: [
      '建议游览时间：3-4小时',
      '景区内有餐厅和纪念品店',
      '登楼需要额外购买登楼票',
      '停车费10元/次'
    ]
  };

  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    if (type === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const totalPrice = attraction.memberPrice * quantity;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧主要内容 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 景点图片 */}
            <Card>
              <CardContent className="p-0">
                <img
                  src={attraction.images[0]}
                  alt={attraction.name}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h1 className="text-3xl font-bold">{attraction.name}</h1>
                    <div className="flex items-center space-x-2">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{attraction.rating}</span>
                      <span className="text-gray-500">({attraction.reviews}条评价)</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{attraction.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{attraction.address}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      <span className="text-sm">开放时间：{attraction.openTime}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {attraction.features.map((feature, index) => (
                      <Badge key={index} variant="secondary">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 游玩贴士 */}
            <Card>
              <CardHeader>
                <CardTitle>游玩贴士</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {attraction.tips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-ocean-600 mr-2">•</span>
                      <span className="text-sm text-gray-600">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* 更多图片 */}
            <Card>
              <CardHeader>
                <CardTitle>景点图片</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {attraction.images.slice(1).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt=""
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 右侧购买区域 */}
          <div className="space-y-6">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>门票预订</CardTitle>
                <CardDescription>选择日期和数量，立即预订</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 价格展示 */}
                <div className="border-b pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">门市价</span>
                    <span className="text-gray-500 line-through">¥{attraction.price}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">会员价</span>
                    <span className="text-2xl font-bold text-red-600">¥{attraction.memberPrice}</span>
                  </div>
                  <Badge className="mt-2 bg-red-100 text-red-700">
                    会员专享 9折优惠
                  </Badge>
                </div>

                {/* 日期选择 */}
                <div>
                  <Label htmlFor="date">选择日期</Label>
                  <Input
                    id="date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                {/* 数量选择 */}
                <div>
                  <Label>购买数量</Label>
                  <div className="flex items-center space-x-4 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange('decrease')}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="font-medium text-lg w-8 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuantityChange('increase')}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* 总价 */}
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span>总计</span>
                    <span className="text-red-600">¥{totalPrice}</span>
                  </div>
                </div>

                {/* 购买按钮 */}
                <Button 
                  className="w-full gradient-ocean text-white"
                  size="lg"
                  disabled={!selectedDate}
                >
                  立即预订
                </Button>

                <div className="text-center text-xs text-gray-500">
                  支持退改 | 快速出票 | 随时退款
                </div>
              </CardContent>
            </Card>

            {/* 推荐组合 */}
            <Card>
              <CardHeader>
                <CardTitle>推荐组合</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-sm">蓬莱阁+海洋世界</div>
                      <div className="text-xs text-gray-500">套票更优惠</div>
                    </div>
                    <Button variant="outline" size="sm">查看</Button>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-sm">蓬莱阁+达人导览</div>
                      <div className="text-xs text-gray-500">深度文化游</div>
                    </div>
                    <Button variant="outline" size="sm">查看</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketPurchase;
