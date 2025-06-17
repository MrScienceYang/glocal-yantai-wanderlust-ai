
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Plane, Train, Hotel, Ticket, MapPin, Clock, User, Calendar } from 'lucide-react';
import Layout from '@/components/Layout';

const OrderDetail = () => {
  const { orderId } = useParams();

  // 模拟订单数据
  const order = {
    id: orderId,
    type: 'flight',
    status: 'confirmed',
    bookingTime: '2024-01-15 14:30:00',
    totalPrice: 680,
    details: {
      flightNumber: 'CA1234',
      airline: '中国国航',
      departure: {
        time: '08:30',
        date: '2024-01-20',
        airport: '北京首都机场',
        terminal: 'T3'
      },
      arrival: {
        time: '11:20',
        date: '2024-01-20',
        airport: '上海浦东机场',
        terminal: 'T2'
      },
      passenger: {
        name: '张三',
        idCard: '110101199001011234',
        phone: '138****8888'
      },
      seat: '12A',
      class: '经济舱'
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'flight': return <Plane className="h-5 w-5" />;
      case 'train': return <Train className="h-5 w-5" />;
      case 'hotel': return <Hotel className="h-5 w-5" />;
      case 'ticket': return <Ticket className="h-5 w-5" />;
      default: return <CheckCircle className="h-5 w-5" />;
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'flight': return '机票';
      case 'train': return '火车票';
      case 'hotel': return '酒店';
      case 'ticket': return '门票';
      default: return '订单';
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-primary">首页</Link>
            <span>/</span>
            <Link to="/profile" className="hover:text-primary">个人中心</Link>
            <span>/</span>
            <span className="text-gray-900">订单详情</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">订单详情</h1>
        </div>

        {/* 订单状态 */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-green-600">预订成功</h2>
                  <p className="text-gray-600">订单号：{order.id}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">¥{order.totalPrice}</div>
                <p className="text-sm text-gray-500">预订时间：{order.bookingTime}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 行程信息 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              {getTypeIcon(order.type)}
              <span className="ml-2">{getTypeName(order.type)}信息</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {order.type === 'flight' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{order.details.departure.time}</div>
                    <div className="text-sm text-gray-600">{order.details.departure.date}</div>
                    <div className="font-medium">{order.details.departure.airport}</div>
                    <div className="text-sm text-gray-500">{order.details.departure.terminal}</div>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <div className="h-0.5 bg-gray-300 flex-1"></div>
                      <Plane className="h-5 w-5 text-gray-400" />
                      <div className="h-0.5 bg-gray-300 flex-1"></div>
                    </div>
                    <div className="text-sm font-medium">{order.details.airline}</div>
                    <div className="text-sm text-gray-600">{order.details.flightNumber}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{order.details.arrival.time}</div>
                    <div className="text-sm text-gray-600">{order.details.arrival.date}</div>
                    <div className="font-medium">{order.details.arrival.airport}</div>
                    <div className="text-sm text-gray-500">{order.details.arrival.terminal}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h3 className="font-bold text-lg">乘客信息</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-gray-500" />
                        <span>姓名：{order.details.passenger.name}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2">证件：{order.details.passenger.idCard}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2">手机：{order.details.passenger.phone}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-bold text-lg">座位信息</h3>
                    <div className="space-y-2">
                      <div>座位号：<Badge variant="outline">{order.details.seat}</Badge></div>
                      <div>舱位等级：<Badge variant="secondary">{order.details.class}</Badge></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 操作按钮 */}
        <div className="flex space-x-4">
          <Button variant="outline" asChild>
            <Link to="/profile">返回个人中心</Link>
          </Button>
          <Button className="gradient-ocean text-white">
            下载电子票
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetail;
