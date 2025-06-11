
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Clock } from 'lucide-react';

const PopularDestinations = () => {
  const destinations = [
    {
      id: 1,
      name: '蓬莱阁',
      image: '/api/placeholder/400/300',
      rating: 4.8,
      reviews: 2840,
      category: '历史文化',
      duration: '3-4小时',
      price: '¥140',
      tags: ['古建筑', '海景', '历史']
    },
    {
      id: 2,
      name: '养马岛',
      image: '/api/placeholder/400/300',
      rating: 4.6,
      reviews: 1560,
      category: '自然风光',
      duration: '半天',
      price: '免费',
      tags: ['海滩', '骑行', '度假']
    },
    {
      id: 3,
      name: '烟台山景区',
      image: '/api/placeholder/400/300',
      rating: 4.7,
      reviews: 980,
      category: '城市景观',
      duration: '2-3小时',
      price: '¥50',
      tags: ['灯塔', '近代建筑', '拍照']
    },
    {
      id: 4,
      name: '张裕酒文化博物馆',
      image: '/api/placeholder/400/300',
      rating: 4.5,
      reviews: 720,
      category: '文化体验',
      duration: '2小时',
      price: '¥60',
      tags: ['品酒', '历史', '文化']
    },
    {
      id: 5,
      name: '金沙滩海滨公园',
      image: '/api/placeholder/400/300',
      rating: 4.4,
      reviews: 1240,
      category: '休闲娱乐',
      duration: '半天',
      price: '免费',
      tags: ['海滩', '日落', '休闲']
    },
    {
      id: 6,
      name: '烟台海洋极地世界',
      image: '/api/placeholder/400/300',
      rating: 4.6,
      reviews: 1680,
      category: '亲子游乐',
      duration: '4-5小时',
      price: '¥160',
      tags: ['海洋馆', '表演', '亲子']
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            热门目的地
          </h2>
          <p className="text-xl text-gray-600">
            发现烟台最受欢迎的景点和体验
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <Card 
              key={destination.id} 
              className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90 text-gray-800">
                    {destination.category}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 rounded-full px-2 py-1 flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{destination.rating}</span>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {destination.name}
                </h3>
                
                <div className="flex items-center text-gray-600 text-sm mb-3">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="mr-4">{destination.reviews} 条评价</span>
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{destination.duration}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {destination.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-ocean-600">
                    {destination.price}
                  </div>
                  <div className="text-sm text-gray-500">
                    起
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
