import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Heart, Share2, MapPin, Clock, Users } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/components/CartProvider';
import AIContentGenerator from '@/components/AIContentGenerator';
import { useAIContent } from '@/hooks/useAIContent';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSpec, setSelectedSpec] = useState('标准版 5kg');
  const [aiGeneratedContent, setAiGeneratedContent] = useState<any>(null);

  // 模拟商品数据
  const product = {
    id,
    name: '烟台苹果礼盒装',
    price: 128,
    originalPrice: 168,
    rating: 4.8,
    reviews: 256,
    sold: 1240,
    images: [
      '/api/placeholder/600/400',
      '/api/placeholder/600/400',
      '/api/placeholder/600/400'
    ],
    description: '精选烟台富士苹果，口感脆甜，营养丰富，采用精美礼盒包装，是送礼和自用的绝佳选择。',
    specs: ['标准版 5kg', '豪华版 8kg', '至尊版 10kg'],
    features: [
      '产地直供，新鲜保障',
      '精选优质苹果',
      '专业包装，防撞防损',
      '全国顺丰包邮'
    ],
    seller: {
      name: '烟台果园直营店',
      rating: 4.9,
      location: '山东烟台'
    }
  };

  const handleAddToCart = () => {
    // Add multiple items based on quantity
    for (let i = 0; i < quantity; i++) {
      const itemToAdd = {
        id: `${product.id}-${selectedSpec}`, // Unique ID for spec
        name: `${product.name} (${selectedSpec.split(' ')[0]})`,
        price: product.price,
        image: product.images[0]
      };
      addToCart(itemToAdd);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const handleAIContentGenerated = (content: any) => {
    setAiGeneratedContent(content);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 面包屑导航 */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-primary">首页</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-primary">特色商城</Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 商品图片 */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img 
                src={product.images[0]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.slice(1).map((image, index) => (
                <div key={index} className="aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-pointer hover:opacity-80">
                  <img 
                    src={image} 
                    alt={`${product.name} ${index + 2}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 商品信息 */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-gray-600">{product.description}</p>
            </div>

            {/* 评分和销量 */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <div className="flex items-center mr-2">
                  {[1,2,3,4,5].map((star) => (
                    <Star 
                      key={star} 
                      className={`h-4 w-4 ${star <= product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">{product.rating} ({product.reviews}条评价)</span>
              </div>
              <div className="text-sm text-gray-600">
                已售 {product.sold} 件
              </div>
            </div>

            {/* 价格 */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-red-600">¥{product.price}</span>
              <span className="text-lg text-gray-400 line-through">¥{product.originalPrice}</span>
              <Badge variant="destructive">限时特价</Badge>
            </div>

            {/* 规格选择 */}
            <div>
              <h3 className="text-lg font-medium mb-3">选择规格</h3>
              <div className="flex space-x-3">
                {product.specs.map((spec) => (
                  <Button
                    key={spec}
                    variant={selectedSpec === spec ? "default" : "outline"}
                    onClick={() => setSelectedSpec(spec)}
                    className="min-w-24"
                  >
                    {spec}
                  </Button>
                ))}
              </div>
            </div>

            {/* 数量选择 */}
            <div>
              <h3 className="text-lg font-medium mb-3">数量</h3>
              <div className="flex items-center space-x-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="text-lg font-medium min-w-12 text-center">{quantity}</span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex space-x-4">
              <Button size="lg" className="flex-1 gradient-ocean text-white" onClick={handleBuyNow}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                立即购买
              </Button>
              <Button size="lg" variant="outline" className="flex-1" onClick={handleAddToCart}>
                加入购物车
              </Button>
              <Button size="lg" variant="outline">
                <Heart className="h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* 商家信息 */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{product.seller.name}</h4>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {product.seller.location}
                      <Star className="h-4 w-4 ml-3 mr-1 text-yellow-400 fill-current" />
                      {product.seller.rating}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    进入店铺
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI生成内容展示 */}
        {aiGeneratedContent && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>AI智能推荐</CardTitle>
            </CardHeader>
            <CardContent>
              {aiGeneratedContent.highlights && (
                <div className="mb-4">
                  <h4 className="font-medium mb-2">产品亮点</h4>
                  <ul className="space-y-1">
                    {aiGeneratedContent.highlights.map((highlight: string, index: number) => (
                      <li key={index} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {aiGeneratedContent.usageScenarios && (
                <div>
                  <h4 className="font-medium mb-2">适用场景</h4>
                  <div className="flex flex-wrap gap-2">
                    {aiGeneratedContent.usageScenarios.map((scenario: string, index: number) => (
                      <Badge key={index} variant="outline">{scenario}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* AI内容生成器 */}
        <AIContentGenerator
          type="product"
          context={product}
          onContentGenerated={handleAIContentGenerated}
          buttonText="AI生成商品亮点"
          title="AI商品分析"
          description="让AI为您分析商品特色和使用场景"
        />

        {/* 商品详情 */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">商品详情</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">产品特色</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-4">配送信息</h3>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      24小时内发货
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      全国包邮（港澳台除外）
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      7天无理由退换
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
