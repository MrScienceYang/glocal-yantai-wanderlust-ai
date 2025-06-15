
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Star, Search, Filter, Truck, Award } from 'lucide-react';

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [cartItems, setCartItems] = useState<number[]>([]);

  const categories = [
    { id: 'all', label: '全部商品' },
    { id: 'seafood', label: '海鲜预制菜' },
    { id: 'cultural', label: '文创产品' },
    { id: 'specialty', label: '烟台特产' }
  ];

  const products = [
    {
      id: 1,
      name: '烟台大鲍鱼预制菜',
      price: 168,
      originalPrice: 228,
      image: '/api/placeholder/300/300',
      rating: 4.8,
      sales: 156,
      category: 'seafood',
      description: '新鲜大鲍鱼，急冻锁鲜，开袋即食',
      tags: ['冷链配送', '开袋即食', '营养丰富']
    },
    {
      id: 2,
      name: '烟台苹果文创礼盒',
      price: 89,
      originalPrice: 128,
      image: '/api/placeholder/300/300',
      rating: 4.9,
      sales: 89,
      category: 'cultural',
      description: '精美包装，送礼佳品，烟台苹果主题设计',
      tags: ['精美包装', '送礼佳品', '文创设计']
    },
    {
      id: 3,
      name: '蓬莱仙境手工艺品',
      price: 299,
      originalPrice: 399,
      image: '/api/placeholder/300/300',
      rating: 4.7,
      sales: 45,
      category: 'cultural',
      description: '本地艺术家手工制作，蓬莱仙境主题',
      tags: ['手工制作', '艺术收藏', '地方特色']
    },
    {
      id: 4,
      name: '烟台海参即食装',
      price: 288,
      originalPrice: 358,
      image: '/api/placeholder/300/300',
      rating: 4.9,
      sales: 267,
      category: 'seafood',
      description: '野生海参，营养丰富，即食方便',
      tags: ['野生海参', '营养丰富', '即食方便']
    }
  ];

  const filteredProducts = products.filter(product => 
    activeCategory === 'all' || product.category === activeCategory
  );

  const addToCart = (productId: number) => {
    setCartItems(prev => [...prev, productId]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            烟台特色商城
          </h1>
          <p className="text-xl text-gray-600">
            海鲜预制菜与文创产品，将烟台味道带回家
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
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
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
              <CardContent className="p-4">
                <div className="space-y-3">
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

                  <div className="flex items-center justify-between pt-3 border-t">
                    <div>
                      <div className="text-lg font-bold text-red-600">¥{product.price}</div>
                      {product.originalPrice > product.price && (
                        <div className="text-sm text-gray-500 line-through">¥{product.originalPrice}</div>
                      )}
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => addToCart(product.id)}
                      className="gradient-ocean text-white"
                    >
                      加入购物车
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 购物车图标 */}
        {cartItems.length > 0 && (
          <div className="fixed bottom-6 right-6 z-50">
            <Button className="rounded-full w-16 h-16 gradient-sunset text-white shadow-lg">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center">
                {cartItems.length}
              </span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
