
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Clock } from 'lucide-react';
import { useCityContext } from './CityProvider';

const PopularDestinations = () => {
  const { selectedCity, selectedCountry } = useCityContext();

  // 不同城市的真实景点数据
  const destinationsData = {
    '烟台市': [
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
        reviews: 756,
        category: '文化体验',
        duration: '2小时',
        price: '¥50',
        tags: ['红酒', '文化', '品鉴']
      },
      {
        id: 5,
        name: '龙口南山景区',
        image: '/api/placeholder/400/300',
        rating: 4.6,
        reviews: 1120,
        category: '自然风光',
        duration: '半天',
        price: '¥120',
        tags: ['佛教', '山景', '祈福']
      },
      {
        id: 6,
        name: '海昌鲸鲨海洋公园',
        image: '/api/placeholder/400/300',
        rating: 4.4,
        reviews: 2100,
        category: '家庭娱乐',
        duration: '全天',
        price: '¥280',
        tags: ['海洋生物', '亲子', '表演']
      }
    ],
    '青岛市': [
      {
        id: 1,
        name: '栈桥',
        image: '/api/placeholder/400/300',
        rating: 4.6,
        reviews: 3200,
        category: '历史文化',
        duration: '1-2小时',
        price: '免费',
        tags: ['地标', '海景', '拍照']
      },
      {
        id: 2,
        name: '八大关',
        image: '/api/placeholder/400/300',
        rating: 4.7,
        reviews: 2800,
        category: '历史文化',
        duration: '2-3小时',
        price: '免费',
        tags: ['建筑群', '历史', '漫步']
      },
      {
        id: 3,
        name: '崂山',
        image: '/api/placeholder/400/300',
        rating: 4.5,
        reviews: 1900,
        category: '自然风光',
        duration: '全天',
        price: '¥130',
        tags: ['道教', '山景', '登山']
      }
    ],
    '东京都': [
      {
        id: 1,
        name: '浅草寺',
        image: '/api/placeholder/400/300',
        rating: 4.7,
        reviews: 3200,
        category: '历史文化',
        duration: '2-3小时',
        price: '免费',
        tags: ['古建筑', '文化', '购物']
      },
      {
        id: 2,
        name: '东京塔',
        image: '/api/placeholder/400/300',
        rating: 4.5,
        reviews: 2800,
        category: '城市地标',
        duration: '2小时',
        price: '¥180',
        tags: ['夜景', '观景台', '地标']
      },
      {
        id: 3,
        name: '新宿御苑',
        image: '/api/placeholder/400/300',
        rating: 4.6,
        reviews: 1900,
        category: '自然风光',
        duration: '3小时',
        price: '¥30',
        tags: ['樱花', '公园', '休闲']
      },
      {
        id: 4,
        name: '明治神宫',
        image: '/api/placeholder/400/300',
        rating: 4.8,
        reviews: 2400,
        category: '历史文化',
        duration: '2小时',
        price: '免费',
        tags: ['神社', '文化', '祈福']
      },
      {
        id: 5,
        name: '银座',
        image: '/api/placeholder/400/300',
        rating: 4.4,
        reviews: 3500,
        category: '购物娱乐',
        duration: '半天',
        price: '免费',
        tags: ['购物', '美食', '奢侈品']
      },
      {
        id: 6,
        name: '筑地外市场',
        image: '/api/placeholder/400/300',
        rating: 4.6,
        reviews: 2200,
        category: '美食体验',
        duration: '3小时',
        price: '¥100',
        tags: ['海鲜', '市场', '早餐']
      }
    ],
    '巴黎': [
      {
        id: 1,
        name: '埃菲尔铁塔',
        image: '/api/placeholder/400/300',
        rating: 4.9,
        reviews: 5000,
        category: '城市地标',
        duration: '2-3小时',
        price: '€25',
        tags: ['地标', '夜景', '浪漫']
      },
      {
        id: 2,
        name: '卢浮宫',
        image: '/api/placeholder/400/300',
        rating: 4.8,
        reviews: 4200,
        category: '历史文化',
        duration: '半天',
        price: '€17',
        tags: ['艺术', '历史', '博物馆']
      },
      {
        id: 3,
        name: '凯旋门',
        image: '/api/placeholder/400/300',
        rating: 4.6,
        reviews: 3100,
        category: '历史文化',
        duration: '1小时',
        price: '€13',
        tags: ['历史', '建筑', '观景']
      },
      {
        id: 4,
        name: '巴黎圣母院',
        image: '/api/placeholder/400/300',
        rating: 4.7,
        reviews: 3800,
        category: '历史文化',
        duration: '2小时',
        price: '免费',
        tags: ['哥特式', '建筑', '文化']
      },
      {
        id: 5,
        name: '塞纳河游船',
        image: '/api/placeholder/400/300',
        rating: 4.5,
        reviews: 2600,
        category: '观光体验',
        duration: '1.5小时',
        price: '€15',
        tags: ['游船', '河景', '浪漫']
      },
      {
        id: 6,
        name: '蒙马特高地',
        image: '/api/placeholder/400/300',
        rating: 4.6,
        reviews: 2900,
        category: '艺术文化',
        duration: '半天',
        price: '免费',
        tags: ['艺术', '咖啡', '街头']
      }
    ],
    '纽约市': [
      {
        id: 1,
        name: '自由女神像',
        image: '/api/placeholder/400/300',
        rating: 4.7,
        reviews: 4500,
        category: '历史地标',
        duration: '半天',
        price: '$23',
        tags: ['地标', '历史', '渡轮']
      },
      {
        id: 2,
        name: '中央公园',
        image: '/api/placeholder/400/300',
        rating: 4.8,
        reviews: 3600,
        category: '自然休闲',
        duration: '3-4小时',
        price: '免费',
        tags: ['公园', '散步', '湖泊']
      },
      {
        id: 3,
        name: '时代广场',
        image: '/api/placeholder/400/300',
        rating: 4.4,
        reviews: 5200,
        category: '城市地标',
        duration: '1-2小时',
        price: '免费',
        tags: ['繁华', '购物', '夜景']
      }
    ],
    '首尔市': [
      {
        id: 1,
        name: '景福宫',
        image: '/api/placeholder/400/300',
        rating: 4.6,
        reviews: 2800,
        category: '历史文化',
        duration: '2-3小时',
        price: '₩3000',
        tags: ['宫殿', '历史', '文化']
      },
      {
        id: 2,
        name: 'N首尔塔',
        image: '/api/placeholder/400/300',
        rating: 4.5,
        reviews: 3200,
        category: '城市地标',
        duration: '2小时',
        price: '₩16000',
        tags: ['塔', '夜景', '恋人']
      },
      {
        id: 3,
        name: '明洞',
        image: '/api/placeholder/400/300',
        rating: 4.4,
        reviews: 4100,
        category: '购物娱乐',
        duration: '半天',
        price: '免费',
        tags: ['购物', '美食', '化妆品']
      }
    ]
  };

  // 获取当前城市的景点，如果没有则显示默认内容
  const destinations = destinationsData[selectedCity] || [
    {
      id: 1,
      name: `${selectedCity}著名景点`,
      image: '/api/placeholder/400/300',
      rating: 4.5,
      reviews: 1000,
      category: '热门景点',
      duration: '2-3小时',
      price: selectedCountry === '中国' ? '¥100' : '$20',
      tags: ['热门', '必游', '文化']
    },
    {
      id: 2,
      name: `${selectedCity}特色体验`,
      image: '/api/placeholder/400/300',
      rating: 4.3,
      reviews: 800,
      category: '文化体验',
      duration: '半天',
      price: selectedCountry === '中国' ? '¥80' : '$15',
      tags: ['体验', '文化', '特色']
    },
    {
      id: 3,
      name: `${selectedCity}美食街区`,
      image: '/api/placeholder/400/300',
      rating: 4.4,
      reviews: 1200,
      category: '美食体验',
      duration: '2小时',
      price: selectedCountry === '中国' ? '¥60' : '$25',
      tags: ['美食', '特色', '休闲']
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
            发现{selectedCity}最受欢迎的景点和体验
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
