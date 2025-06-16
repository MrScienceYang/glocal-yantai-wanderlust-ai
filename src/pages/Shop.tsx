import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Star, Search, Filter, Truck, Award } from 'lucide-react';
import { useCityContext } from '@/components/CityProvider';
import { useCart } from '@/components/CartProvider';

const Shop = () => {
  const { selectedCity, selectedCountry } = useCityContext();
  const [activeCategory, setActiveCategory] = useState('all');
  const { addToCart, cartItemCount } = useCart();

  const categories = [
    { id: 'all', label: '全部商品' },
    { id: 'food', label: '特色美食' },
    { id: 'cultural', label: '文创产品' },
    { id: 'specialty', label: '地方特产' }
  ];

  // 不同城市的真实商品数据
  const productsData = {
    '烟台市': [
      {
        id: 1,
        name: '烟台大樱桃礼盒',
        price: 168,
        originalPrice: 228,
        image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=300&h=300&fit=crop',
        rating: 4.8,
        sales: 1560,
        category: 'food',
        description: '烟台福山大樱桃，果大肉厚，酸甜可口',
        tags: ['新鲜直达', '产地直供', '精装礼盒']
      },
      {
        id: 2,
        name: '张裕解百纳干红',
        price: 89,
        originalPrice: 128,
        image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=300&h=300&fit=crop',
        rating: 4.9,
        sales: 890,
        category: 'specialty',
        description: '百年张裕经典干红，醇厚香甜',
        tags: ['百年品牌', '经典口感', '送礼佳品']
      },
      {
        id: 3,
        name: '蓬莱阁文创茶具',
        price: 299,
        originalPrice: 399,
        image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=300&h=300&fit=crop',
        rating: 4.7,
        sales: 450,
        category: 'cultural',
        description: '蓬莱阁主题茶具，传统工艺制作',
        tags: ['手工制作', '文化收藏', '精美工艺']
      },
      {
        id: 4,
        name: '烟台海参即食装',
        price: 288,
        originalPrice: 358,
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=300&fit=crop',
        rating: 4.9,
        sales: 2670,
        category: 'food',
        description: '长岛野生海参，营养丰富，即食方便',
        tags: ['野生海参', '营养丰富', '即食方便']
      },
      {
        id: 5,
        name: '龙口粉丝礼盒',
        price: 58,
        originalPrice: 78,
        image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=300&h=300&fit=crop',
        rating: 4.6,
        sales: 1200,
        category: 'specialty',
        description: '正宗龙口粉丝，绿豆制作，口感Q弹',
        tags: ['传统工艺', '绿豆制作', '口感Q弹']
      },
      {
        id: 6,
        name: '烟台苹果文创手机壳',
        price: 39,
        originalPrice: 59,
        image: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=300&h=300&fit=crop',
        rating: 4.5,
        sales: 670,
        category: 'cultural',
        description: '烟台苹果主题设计，多款机型可选',
        tags: ['创意设计', '多型号', '实用精美']
      },
      // 新增酒类产品
      {
        id: 101,
        name: '冰青青梅果酒·高端版',
        price: 280,
        originalPrice: 320,
        image: '/lovable-uploads/581586bf-9a04-4325-b99e-30cfa6f061ea.png',
        rating: 4.9,
        sales: 1200,
        category: 'specialty',
        description: '四川梅鹤酒业出品，冰青青梅果酒高端版，口感清香回甘',
        tags: ['梅果酒', '高端精品', '四川特产'],
        specs: ['单瓶装', '礼盒装(6瓶)'],
        supplier: '四川梅鹤酒业有限公司'
      },
      {
        id: 102,
        name: '世外梅林香柚青梅酒',
        price: 118,
        originalPrice: 138,
        image: '/lovable-uploads/50b76766-a5f0-4b7f-8aae-093afca8061b.png',
        rating: 4.8,
        sales: 850,
        category: 'specialty',
        description: '马边山水酒业出品，香柚与青梅完美融合，果香浓郁',
        tags: ['香柚梅酒', '果香浓郁', '四川工艺'],
        specs: ['单瓶装', '礼盒装(6瓶)'],
        supplier: '马边山水酒业有限公司'
      },
      {
        id: 103,
        name: '舒醺巧克力威士忌梅酒',
        price: 45,
        originalPrice: 55,
        image: '/lovable-uploads/1f83017a-893e-4ccb-9008-6709b57df8e6.png',
        rating: 4.7,
        sales: 2100,
        category: 'specialty',
        description: '宜宾五粮液仙林生态酒业出品，巧克力与威士忌的完美结合',
        tags: ['巧克力威士忌', '创新口味', '五粮液工艺'],
        specs: ['单瓶装', '礼盒装(6瓶)'],
        supplier: '宜宾五粮液仙林生态酒业'
      },
      {
        id: 104,
        name: '桑果之约乖乖梅果酒',
        price: 39.86,
        originalPrice: 45,
        image: '/lovable-uploads/f17f95a8-00d1-469e-9ad9-b47397319d18.png',
        rating: 4.6,
        sales: 1680,
        category: 'specialty',
        description: '泸州顺成和庄园酒业出品，桑果与梅子的甜蜜邂逅',
        tags: ['桑果梅酒', '甜蜜口感', '庄园酿造'],
        specs: ['单瓶装', '礼盒装(6瓶)'],
        supplier: '泸州顺成和庄园酒业'
      },
      {
        id: 105,
        name: '梅见原味梅酒',
        price: 150,
        originalPrice: 168,
        image: '/lovable-uploads/68a411df-9696-447b-a897-b6ee68c3a8bf.png',
        rating: 4.8,
        sales: 980,
        category: 'specialty',
        description: '重庆瓶子星球酒业集团出品，传统工艺酿造的原味梅酒',
        tags: ['原味梅酒', '传统工艺', '重庆特产'],
        specs: ['单瓶装', '礼盒装(6瓶)'],
        supplier: '重庆瓶子星球酒业集团'
      }
    ],
    '青岛市': [
      {
        id: 1,
        name: '青岛啤酒礼盒装',
        price: 88,
        originalPrice: 108,
        image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=300&h=300&fit=crop',
        rating: 4.8,
        sales: 2340,
        category: 'specialty',
        description: '青岛啤酒经典装，百年品质',
        tags: ['百年品牌', '经典口感', '礼盒装']
      },
      {
        id: 2,
        name: '崂山绿茶',
        price: 128,
        originalPrice: 168,
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=300&fit=crop',
        rating: 4.7,
        sales: 890,
        category: 'specialty',
        description: '崂山高山绿茶，清香回甘',
        tags: ['高山茶', '清香回甘', '养生茶']
      },
      {
        id: 3,
        name: '栈桥文创明信片',
        price: 25,
        originalPrice: 35,
        image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=300&h=300&fit=crop',
        rating: 4.6,
        sales: 1200,
        category: 'cultural',
        description: '青岛栈桥主题明信片套装',
        tags: ['收藏纪念', '精美印刷', '套装']
      }
    ],
    '东京都': [
      {
        id: 1,
        name: '和风抹茶礼盒',
        price: 68,
        originalPrice: 88,
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=300&fit=crop',
        rating: 4.8,
        sales: 1560,
        category: 'food',
        description: '正宗日式抹茶，香浓回甘',
        tags: ['正宗抹茶', '日式风味', '精装礼盒']
      },
      {
        id: 2,
        name: '东京塔模型',
        price: 199,
        originalPrice: 259,
        image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=300&h=300&fit=crop',
        rating: 4.7,
        sales: 780,
        category: 'cultural',
        description: '东京塔精密模型，收藏纪念',
        tags: ['精密制作', '收藏价值', '纪念意义']
      },
      {
        id: 3,
        name: '浅草寺御守',
        price: 45,
        originalPrice: 60,
        image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=300&h=300&fit=crop',
        rating: 4.9,
        sales: 2100,
        category: 'cultural',
        description: '浅草寺开光御守，祈福平安',
        tags: ['开光御守', '祈福平安', '传统工艺']
      }
    ],
    '巴黎': [
      {
        id: 1,
        name: '法式马卡龙礼盒',
        price: 128,
        originalPrice: 168,
        image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=300&h=300&fit=crop',
        rating: 4.8,
        sales: 890,
        category: 'food',
        description: '正宗法式马卡龙，多种口味',
        tags: ['法式甜品', '多种口味', '精美包装']
      },
      {
        id: 2,
        name: '埃菲尔铁塔水晶球',
        price: 89,
        originalPrice: 119,
        image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=300&h=300&fit=crop',
        rating: 4.7,
        sales: 1200,
        category: 'cultural',
        description: '埃菲尔铁塔水晶球，浪漫纪念',
        tags: ['浪漫纪念', '水晶工艺', '精美收藏']
      },
      {
        id: 3,
        name: '香槟礼盒装',
        price: 298,
        originalPrice: 358,
        image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=300&h=300&fit=crop',
        rating: 4.9,
        sales: 560,
        category: 'specialty',
        description: '法国香槟区正宗香槟，庆祝必备',
        tags: ['正宗香槟', '庆祝佳品', '浪漫情调']
      }
    ]
  };

  // 获取当前城市的商品，如果没有则显示默认商品
  const cityProducts = productsData[selectedCity] || [
    {
      id: 1,
      name: `${selectedCity}特色商品`,
      price: 88,
      originalPrice: 108,
      image: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=300&h=300&fit=crop',
      rating: 4.5,
      sales: 500,
      category: 'specialty',
      description: `精选${selectedCity}当地特色产品`,
      tags: ['当地特色', '精选好货', '品质保证']
    }
  ];

  const filteredProducts = cityProducts.filter(product => 
    activeCategory === 'all' || product.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {selectedCity}特色商城
          </h1>
          <p className="text-xl text-gray-600">
            {selectedCity}地道特产与文创产品，将{selectedCity}味道带回家
          </p>
        </div>

        {/* 特色服务展示 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm">
            <Truck className="h-8 w-8 text-ocean-600 mr-3" />
            <div>
              <div className="font-semibold">冷链配送</div>
              <div className="text-sm text-gray-600">新鲜直达</div>
            </div>
          </div>
          <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm">
            <Award className="h-8 w-8 text-sunset-600 mr-3" />
            <div>
              <div className="font-semibold">品质保证</div>
              <div className="text-sm text-gray-600">精选好货</div>
            </div>
          </div>
          <div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm">
            <ShoppingCart className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <div className="font-semibold">满包邮</div>
              <div className="text-sm text-gray-600">全国配送</div>
            </div>
          </div>
        </div>

        {/* 搜索和分类 */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="搜索商品..."
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              筛选
            </Button>
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* 商品列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} className="group block h-full">
              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.originalPrice > product.price && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
                        限时优惠
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-4 flex flex-col flex-grow">
                  <div className="space-y-3 flex-grow">
                    <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                    <CardDescription className="text-sm line-clamp-2">
                      {product.description}
                    </CardDescription>

                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{product.rating}</span>
                      <span className="text-sm text-gray-500">已售{product.sales}</span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {product.tags.slice(0, 2).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-ocean-100 text-ocean-700 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t mt-4">
                    <div>
                      <div className="text-lg font-bold text-red-600">¥{product.price}</div>
                      {product.originalPrice > product.price && (
                        <div className="text-sm text-gray-500 line-through">¥{product.originalPrice}</div>
                      )}
                    </div>
                    <Button 
                      size="sm" 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart({ id: product.id, name: product.name, price: product.price, image: product.image });
                      }}
                      className="gradient-ocean text-white"
                    >
                      加入购物车
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* 购物车图标 */}
        {cartItemCount > 0 && (
          <div className="fixed bottom-6 right-6 z-50">
            <Button asChild className="rounded-full w-16 h-16 gradient-sunset text-white shadow-lg">
              <Link to="/cart">
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center">
                  {cartItemCount}
                </span>
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
