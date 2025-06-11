
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Star, ShoppingCart, Users, Heart, Calendar } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: MapPin,
      title: 'AI智能行程定制',
      description: '输入兴趣和预算，获得个性化旅行方案',
      details: '门票预订 • 交通安排 • 酒店推荐',
      color: 'ocean'
    },
    {
      icon: Users,
      title: '本地达人服务',
      description: '专业导览员带你深度体验烟台文化',
      details: '历史讲解 • 美食推荐 • 摄影指导',
      color: 'sunset'
    },
    {
      icon: ShoppingCart,
      title: '特色产品商城',
      description: '烟台预制菜和文创产品一站式购买',
      details: '海鲜预制菜 • 手工艺品 • 文创纪念品',
      color: 'ocean'
    },
    {
      icon: Star,
      title: '盲盒旅行体验',
      description: '随机组合的惊喜旅行套餐',
      details: '¥300 • ¥500 • ¥800 三档选择',
      color: 'sunset'
    },
    {
      icon: Heart,
      title: '用户社区',
      description: '分享旅行心得，发现更多精彩',
      details: '游记分享 • 美食评价 • 攻略交流',
      color: 'ocean'
    },
    {
      icon: Calendar,
      title: '会员订阅',
      description: '专享折扣和每月惊喜礼盒',
      details: '优先预订 • 专属折扣 • 月度礼盒',
      color: 'sunset'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            为什么选择 <span className="text-gradient">Glocal烟台</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            结合AI智能推荐与本地人情味，为你打造独一无二的烟台体验
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <CardHeader>
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${
                  feature.color === 'ocean' ? 'gradient-ocean' : 'gradient-sunset'
                }`}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-4">
                  {feature.details}
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
                >
                  了解更多
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button size="lg" className="gradient-ocean text-white">
            立即体验完整功能
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Features;
