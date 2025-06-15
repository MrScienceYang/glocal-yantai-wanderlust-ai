
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, ShoppingCart, Heart, Truck, Shield, Award, Minus, Plus } from 'lucide-react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedSpec, setSelectedSpec] = useState('standard');

  // 模拟产品数据
  const product = {
    id: '1',
    name: '烟台大鲍鱼预制菜',
    description: '新鲜大鲍鱼，急冻锁鲜，开袋即食，营养丰富',
    price: 168,
    originalPrice: 228,
    memberPrice: 150,
    rating: 4.8,
    reviews: 156,
    sales: 267,
    images: [
      '/api/placeholder/500/500',
      '/api/placeholder/300/300',
      '/api/placeholder/300/300',
      '/api/placeholder/300/300'
    ],
    specs: [
      { id: 'standard', name: '标准装 (6只)', price: 168 },
      { id: 'large', name: '豪华装 (12只)', price: 298 },
      { id: 'gift', name: '礼盒装 (8只)', price: 238 }
    ],
    features: [
      '野生大鲍鱼',
      '急冻锁鲜技术',
      '开袋即食',
      '冷链配送',
      '营养丰富'
    ],
    details: {
      origin: '烟台长岛海域',
      weight: '每只约80-100g',
      storage: '冷冻保存，保质期12个月',
      cooking: '解冻后直接食用或简单加热'
    },
    reviews: [
      {
        id: 1,
        user: '美食爱好者',
        rating: 5,
        date: '2024-12-01',
        content: '鲍鱼很新鲜，肉质紧实，味道鲜美，包装也很精美。',
        images: ['/api/placeholder/100/100']
      },
      {
        id: 2,
        user: '王先生',
        rating: 4,
        date: '2024-11-28',
        content: '第二次购买了，品质稳定，送礼很有面子。'
      }
    ]
  };

  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    if (type === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const selectedSpecData = product.specs.find(spec => spec.id === selectedSpec);
  const totalPrice = (selectedSpecData?.price || product.price) * quantity;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* 左侧图片 */}
          <div>
            <div className="mb-4">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(1).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt=""
                  className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-80"
                />
              ))}
            </div>
          </div>

          {/* 右侧信息 */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-gray-600 mb-4">{product.description}</p>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-medium">{product.rating}</span>
                </div>
                <span className="text-gray-500">已售{product.sales}件</span>
                <span className="text-gray-500">{product.reviews.length}条评价</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.features.map((feature, index) => (
                  <Badge key={index} variant="secondary">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>

            {/* 价格 */}
            <div className="border-b pb-4">
              <div className="flex items-center space-x-4 mb-2">
                <span className="text-3xl font-bold text-red-600">¥{selectedSpecData?.price || product.price}</span>
                <span className="text-lg text-gray-500 line-through">¥{product.originalPrice}</span>
                <Badge className="bg-red-100 text-red-700">限时优惠</Badge>
              </div>
              <div className="text-sm text-green-600">会员价：¥{product.memberPrice}</div>
            </div>

            {/* 规格选择 */}
            <div>
              <h3 className="font-medium mb-3">选择规格</h3>
              <div className="grid grid-cols-1 gap-2">
                {product.specs.map((spec) => (
                  <Button
                    key={spec.id}
                    variant={selectedSpec === spec.id ? "default" : "outline"}
                    className="justify-between"
                    onClick={() => setSelectedSpec(spec.id)}
                  >
                    <span>{spec.name}</span>
                    <span>¥{spec.price}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* 数量选择 */}
            <div>
              <h3 className="font-medium mb-3">购买数量</h3>
              <div className="flex items-center space-x-4">
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

            {/* 服务保障 */}
            <div className="grid grid-cols-3 gap-4 py-4 border-y">
              <div className="text-center">
                <Truck className="h-6 w-6 text-blue-500 mx-auto mb-1" />
                <div className="text-xs">冷链配送</div>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 text-green-500 mx-auto mb-1" />
                <div className="text-xs">品质保证</div>
              </div>
              <div className="text-center">
                <Award className="h-6 w-6 text-purple-500 mx-auto mb-1" />
                <div className="text-xs">满包邮</div>
              </div>
            </div>

            {/* 购买按钮 */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-lg font-bold">
                <span>总计</span>
                <span className="text-red-600">¥{totalPrice}</span>
              </div>
              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  加入购物车
                </Button>
                <Button className="flex-1 gradient-ocean text-white">
                  立即购买
                </Button>
              </div>
              <Button variant="outline" className="w-full">
                <Heart className="h-4 w-4 mr-2" />
                收藏商品
              </Button>
            </div>
          </div>
        </div>

        {/* 详情选项卡 */}
        <Card>
          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">商品详情</TabsTrigger>
              <TabsTrigger value="reviews">用户评价</TabsTrigger>
              <TabsTrigger value="qa">常见问题</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-4">产品信息</h3>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">产地：</dt>
                      <dd>{product.details.origin}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">重量：</dt>
                      <dd>{product.details.weight}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">保存：</dt>
                      <dd>{product.details.storage}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">食用：</dt>
                      <dd>{product.details.cooking}</dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">特色亮点</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="p-6">
              <div className="space-y-6">
                {product.reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{review.user}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-3 w-3 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-600 mb-2">{review.content}</p>
                    {review.images && (
                      <div className="flex space-x-2">
                        {review.images.map((img, index) => (
                          <img 
                            key={index}
                            src={img} 
                            alt="" 
                            className="w-16 h-16 object-cover rounded" 
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="qa" className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Q: 这个鲍鱼需要怎么处理？</h4>
                  <p className="text-gray-600">A: 解冻后直接食用或简单加热即可，无需复杂处理。</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Q: 配送范围是哪里？</h4>
                  <p className="text-gray-600">A: 全国配送，冷链物流确保新鲜度。</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Q: 保质期多长？</h4>
                  <p className="text-gray-600">A: 冷冻保存12个月，开袋后请尽快食用。</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetail;
