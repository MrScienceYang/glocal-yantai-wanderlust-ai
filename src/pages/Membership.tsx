
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Star, Gift, Zap, Users } from 'lucide-react';

const Membership = () => {
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  const plans = [
    {
      id: 'monthly',
      name: '月度会员',
      price: 29,
      period: '/月',
      description: '适合偶尔出游的用户',
      features: [
        'AI行程规划 10次/月',
        '商城折扣券 5张/月',
        '达人服务 9折优惠',
        '门票预订 9.5折',
        '社区高级功能',
        '客服优先响应'
      ],
      popular: false
    },
    {
      id: 'yearly',
      name: '年度会员',
      price: 199,
      period: '/年',
      description: '最受欢迎的选择',
      features: [
        'AI行程规划 无限次',
        '商城折扣券 10张/月',
        '达人服务 8.5折优惠',
        '门票预订 9折',
        '社区高级功能',
        '客服优先响应',
        '专属会员礼盒',
        '生日特别福利'
      ],
      popular: true
    },
    {
      id: 'premium',
      name: '至尊会员',
      price: 599,
      period: '/年',
      description: '终极旅行体验',
      features: [
        'AI行程规划 无限次',
        '商城折扣券 20张/月',
        '达人服务 8折优惠',
        '门票预订 8.5折',
        '社区高级功能',
        '专属客服管家',
        '季度会员礼盒',
        '免费盲盒 1次/月',
        '专属活动邀请'
      ],
      popular: false
    }
  ];

  const memberBenefits = [
    {
      icon: <Zap className="h-6 w-6 text-blue-500" />,
      title: 'AI智能规划',
      description: '无限次使用AI行程规划，专业算法为你定制完美旅程'
    },
    {
      icon: <Gift className="h-6 w-6 text-green-500" />,
      title: '专属折扣',
      description: '享受平台所有商品和服务的会员专属折扣价格'
    },
    {
      icon: <Users className="h-6 w-6 text-purple-500" />,
      title: '优先服务',
      description: '本地达人服务优先预订，专属客服快速响应'
    },
    {
      icon: <Star className="h-6 w-6 text-yellow-500" />,
      title: '会员礼盒',
      description: '定期收到精选烟台特产和文创产品礼盒'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Crown className="h-12 w-12 text-yellow-500 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">
              会员特权
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            升级会员，解锁全部功能，享受专属服务和超值优惠
          </p>
        </div>

        {/* 会员权益展示 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {memberBenefits.map((benefit, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 价格方案 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative hover:shadow-xl transition-all cursor-pointer ${
                selectedPlan === plan.id ? 'ring-2 ring-purple-500' : ''
              } ${plan.popular ? 'scale-105 border-purple-200' : ''}`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-purple-500 text-white px-4 py-1">
                    最受欢迎
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-purple-600">¥{plan.price}</span>
                  <span className="text-gray-500">{plan.period}</span>
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-3" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full mt-6 ${
                    plan.popular 
                      ? 'gradient-sunset text-white' 
                      : selectedPlan === plan.id
                        ? 'gradient-ocean text-white'
                        : 'border-purple-200 text-purple-600 hover:bg-purple-50'
                  }`}
                  variant={plan.popular || selectedPlan === plan.id ? 'default' : 'outline'}
                >
                  {selectedPlan === plan.id ? '已选择' : '选择此方案'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 购买按钮 */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="gradient-sunset text-white px-12 py-4 text-lg"
          >
            立即开通会员
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            支持支付宝、微信支付，开通即享全部权益
          </p>
        </div>
      </div>
    </div>
  );
};

export default Membership;
