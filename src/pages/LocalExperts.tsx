
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, MapPin, Clock, Users, Search, Filter } from 'lucide-react';

const LocalExperts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const experts = [
    {
      id: 1,
      name: '张师傅',
      avatar: '/api/placeholder/100/100',
      specialty: '海鲜美食达人',
      rating: 4.9,
      reviews: 127,
      price: 150,
      location: '芝罘区',
      description: '20年海鲜采购经验，带你品尝最新鲜的烟台海鲜',
      tags: ['美食', '海鲜', '采购'],
      availability: '今日可预约'
    },
    {
      id: 2,
      name: '李小姐',
      avatar: '/api/placeholder/100/100',
      specialty: '历史文化讲解',
      rating: 4.8,
      reviews: 89,
      price: 120,
      location: '蓬莱区',
      description: '历史学硕士，专业讲解蓬莱阁及烟台历史文化',
      tags: ['历史', '文化', '蓬莱阁'],
      availability: '明日可预约'
    },
    {
      id: 3,
      name: '王大哥',
      avatar: '/api/placeholder/100/100',
      specialty: '摄影指导师',
      rating: 4.9,
      reviews: 156,
      price: 200,
      location: '牟平区',
      description: '专业摄影师，熟知烟台最佳拍摄点位',
      tags: ['摄影', '风景', '人像'],
      availability: '今日可预约'
    }
  ];

  const categories = [
    { id: 'all', label: '全部达人', count: 12 },
    { id: 'food', label: '美食向导', count: 5 },
    { id: 'culture', label: '文化讲解', count: 3 },
    { id: 'photography', label: '摄影指导', count: 4 }
  ];

  const filteredExperts = experts.filter(expert => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'food') return expert.tags.includes('美食') || expert.tags.includes('海鲜');
    if (selectedCategory === 'culture') return expert.tags.includes('历史') || expert.tags.includes('文化');
    if (selectedCategory === 'photography') return expert.tags.includes('摄影');
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            本地达人服务
          </h1>
          <p className="text-xl text-gray-600">
            真正的烟台人带你体验最地道的本土文化
          </p>
        </div>

        {/* 搜索和筛选 */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="搜索达人或服务..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              筛选
            </Button>
          </div>

          {/* 分类筛选 */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center"
              >
                {category.label}
                <span className="ml-2 text-xs bg-gray-200 px-2 py-1 rounded-full">
                  {category.count}
                </span>
              </Button>
            ))}
          </div>
        </div>

        {/* 达人列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperts.map((expert) => (
            <Card key={expert.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <img
                    src={expert.avatar}
                    alt={expert.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <CardTitle className="text-lg">{expert.name}</CardTitle>
                    <CardDescription className="text-sunset-600 font-medium">
                      {expert.specialty}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{expert.rating}</span>
                      <span className="text-gray-500">({expert.reviews}条评价)</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      {expert.location}
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm">{expert.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {expert.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-ocean-100 text-ocean-700 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <div className="text-lg font-bold text-ocean-600">¥{expert.price}/小时</div>
                      <div className="text-xs text-green-600">{expert.availability}</div>
                    </div>
                    <Button className="gradient-ocean text-white">
                      立即预约
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocalExperts;
