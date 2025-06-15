
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Users } from 'lucide-react';
import { useCityContext } from '@/components/CityProvider';

const expertsByCity: { [key: string]: any[] } = {
  '烟台市': [
    {
      id: 1,
      name: '李明海',
      avatar: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=80&h=80&fit=crop&q=80',
      title: '烟台历史文化专家',
      rating: 4.9,
      reviews: 186,
      completedTours: 340,
      specialties: ['历史讲解', '文化体验', '古建筑'],
      price: '¥180/小时',
      description: '本地资深导游，对烟台历史文化有着深厚的了解，带您穿越时光感受古城魅力。',
      languages: ['中文', 'English'],
      verified: true
    },
    {
      id: 2,
      name: '王小美',
      avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=80&h=80&fit=crop&q=80',
      title: '美食探索达人',
      rating: 4.8,
      reviews: 142,
      completedTours: 220,
      specialties: ['海鲜美食', '小吃探索', '市场游览'],
      price: '¥150/小时',
      description: '土生土长的烟台人，熟知每一条美食街巷，带您品尝最正宗的烟台味道。',
      languages: ['中文'],
      verified: true
    },
    {
      id: 3,
      name: '张摄影师',
      avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=80&h=80&fit=crop&q=80',
      title: '摄影指导专家',
      rating: 4.7,
      reviews: 98,
      completedTours: 156,
      specialties: ['风光摄影', '人像摄影', '日出日落'],
      price: '¥200/小时',
      description: '专业摄影师，熟悉烟台最佳拍摄点位，助您记录最美的旅行时光。',
      languages: ['中文', 'English', '日本語'],
      verified: true
    },
    {
      id: 4,
      name: '陈渔夫',
      avatar: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=80&h=80&fit=crop&q=80',
      title: '海洋文化向导',
      rating: 4.6,
      reviews: 124,
      completedTours: 180,
      specialties: ['渔业文化', '海洋知识', '码头体验'],
      price: '¥160/小时',
      description: '三代渔民世家，对烟台海洋文化了如指掌，带您体验真正的渔家生活。',
      languages: ['中文'],
      verified: true
    }
  ],
  '青岛市': [
    {
      id: 5,
      name: '孙大海',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&q=80',
      title: '青岛啤酒文化向导',
      rating: 4.9,
      reviews: 210,
      completedTours: 400,
      specialties: ['啤酒品鉴', '城市历史', '德式建筑'],
      price: '¥190/小时',
      description: '带你深入了解青岛的啤酒文化和百年历史，品尝第一手原浆啤酒。',
      languages: ['中文', 'English'],
      verified: true
    },
    {
      id: 6,
      name: '刘畅',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&q=80',
      title: '八大关风情讲解员',
      rating: 4.8,
      reviews: 180,
      completedTours: 320,
      specialties: ['建筑美学', '名人故居', '植物科普'],
      price: '¥160/小时',
      description: '漫步在万国建筑博览的八大关，听我讲述这里的光阴故事。',
      languages: ['中文'],
      verified: true
    }
  ],
  '威海市': [
    {
      id: 7,
      name: '林悦',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&q=80',
      title: '威海海滨生活体验师',
      rating: 4.8,
      reviews: 150,
      completedTours: 280,
      specialties: ['海钓', '海滨骑行', '韩国风情'],
      price: '¥170/小时',
      description: '在美丽的海滨城市威海，带你体验最悠闲的度假生活方式。',
      languages: ['中文', '韩语'],
      verified: true
    }
  ]
};

const LocalExperts = () => {
  const { selectedCity } = useCityContext();
  const experts = expertsByCity[selectedCity] || [];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            本地达人
          </h2>
          <p className="text-xl text-gray-600">
            与真正的本地人一起，发现这座城市的真实魅力
          </p>
        </div>

        {experts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {experts.map((expert) => (
                <Card 
                  key={expert.id} 
                  className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="relative inline-block">
                        <img 
                          src={expert.avatar} 
                          alt={expert.name}
                          className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
                        />
                        {expert.verified && (
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-ocean-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {expert.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {expert.title}
                      </p>
                    </div>
    
                    <div className="flex items-center justify-center space-x-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                        <span>{expert.rating}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{expert.completedTours}</span>
                      </div>
                    </div>
    
                    <div className="flex flex-wrap gap-1 mb-4 justify-center">
                      {expert.specialties.slice(0, 2).map((specialty, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
    
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {expert.description}
                    </p>
    
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-lg font-bold text-ocean-600">
                        {expert.price}
                      </div>
                      <div className="flex space-x-1">
                        {expert.languages.slice(0, 2).map((lang, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                      </div>
                    </div>
    
                    <Button className="w-full gradient-ocean text-white hover:opacity-90">
                      预约达人
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-16">
              <Button variant="outline" size="lg">
                查看更多达人
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">当前城市暂无本地达人服务，敬请期待！</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default LocalExperts;
