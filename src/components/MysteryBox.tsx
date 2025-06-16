import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Gift, Star, MapPin, ShoppingCart, Utensils, Share2, Sparkles } from 'lucide-react';
import { useCityContext } from '@/components/CityProvider';
import { useCart } from '@/components/CartProvider';
import { toast } from 'sonner';

const tiersByCity: { [key: string]: any[] } = {
  '烟台市': [
    {
      id: 'yantai-explorer',
      name: '探索版',
      price: 300,
      originalValue: '350+',
      color: 'from-blue-400 to-blue-600',
      icon: MapPin,
      features: [
        '1个景点门票',
        '1份特色小食',
        '1件文创纪念品',
        '本地交通券'
      ],
      popular: false,
      image: '/lovable-uploads/581586bf-9a04-4325-b99e-30cfa6f061ea.png'
    },
    {
      id: 'yantai-experience',
      name: '体验版',
      price: 500,
      originalValue: '550+',
      color: 'from-purple-400 to-purple-600',
      icon: Star,
      features: [
        '2个景点门票',
        '1顿正宗海鲜餐',
        '1份预制菜套装',
        '2件精选文创',
        '达人陪游1小时'
      ],
      popular: true,
      image: '/lovable-uploads/50b76766-a5f0-4b7f-8aae-093afca8061b.png'
    },
    {
      id: 'yantai-luxury',
      name: '深度版',
      price: 800,
      originalValue: '850+',
      color: 'from-orange-400 to-red-500',
      icon: Gift,
      features: [
        '3个景点门票',
        '2顿特色餐饮',
        '豪华预制菜礼盒',
        '3件限量文创',
        '达人陪游3小时',
        '专属摄影服务'
      ],
      popular: false,
      image: '/lovable-uploads/1f83017a-893e-4ccb-9008-6709b57df8e6.png'
    }
  ],
  '青岛市': [
    {
      id: 'qingdao-beer',
      name: '啤酒之旅',
      price: 350,
      originalValue: '400+',
      color: 'from-yellow-400 to-yellow-600',
      icon: Utensils,
      features: [
        '青岛啤酒博物馆门票',
        '1份特色烤肉',
        '原浆啤酒品鉴',
        '啤酒主题文创'
      ],
      popular: true,
      image: '/lovable-uploads/f17f95a8-00d1-469e-9ad9-b47397319d18.png'
    },
    {
      id: 'qingdao-coastal',
      name: '滨海之约',
      price: 550,
      originalValue: '600+',
      color: 'from-teal-400 to-cyan-600',
      icon: Star,
      features: [
        '崂山景区门票',
        '1顿海景大餐',
        '帆船出海体验',
        '达人陪同讲解'
      ],
      popular: false,
      image: '/lovable-uploads/68a411df-9696-447b-a897-b6ee68c3a8bf.png'
    }
  ]
};

const MysteryBox = () => {
  const { selectedCity } = useCityContext();
  const { addToCart } = useCart();
  const tiers = tiersByCity[selectedCity] || [];
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);
  const [purchasingTier, setPurchasingTier] = useState<any>(null);

  useEffect(() => {
    if (tiers.length > 0) {
      const popularTier = tiers.find(t => t.popular);
      setSelectedTier(popularTier ? popularTier.id : tiers[0].id);
    } else {
      setSelectedTier(null);
    }
  }, [tiers]);

  const handlePurchase = (tier: any) => {
    setPurchasingTier(tier);
    setShowPurchaseDialog(true);
  };

  const confirmPurchase = () => {
    if (purchasingTier) {
      addToCart({
        id: purchasingTier.id,
        name: `盲盒游${selectedCity} - ${purchasingTier.name}`,
        price: purchasingTier.price,
        image: purchasingTier.image || '/placeholder.svg'
      });
      setShowPurchaseDialog(false);
      setPurchasingTier(null);
      toast.success('盲盒已添加到购物车！', {
        description: '前往购物车完成支付后即可开启盲盒'
      });
    }
  };

  const shareBox = (tier: any) => {
    if (navigator.share) {
      navigator.share({
        title: `盲盒游${selectedCity} - ${tier.name}`,
        text: `发现了一个超棒的旅行盲盒！${tier.name}，只要¥${tier.price}，价值¥${tier.originalValue}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('链接已复制到剪贴板');
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            🎁 盲盒游{selectedCity}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            充满惊喜的随机旅行体验，每次开启都有意想不到的发现
          </p>
          <div className="inline-flex items-center bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium">
            <Gift className="h-4 w-4 mr-2" />
            保证价值超出购买金额 ¥50+
          </div>
        </div>

        {tiers.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {tiers.map((tier) => (
                <Card 
                  key={tier.id}
                  className={`relative cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                    selectedTier === tier.id ? 'ring-4 ring-purple-400 ring-opacity-60' : ''
                  } ${tier.popular ? 'border-purple-400 border-2' : ''}`}
                  onClick={() => setSelectedTier(tier.id)}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1">
                        最受欢迎
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${tier.color} flex items-center justify-center mb-4`}>
                      <tier.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold">
                      {tier.name}
                    </CardTitle>
                    <div className="space-y-2">
                      <div className="text-4xl font-bold text-gray-900">
                        ¥{tier.price}
                      </div>
                      <div className="text-sm text-gray-500">
                        价值 ¥{tier.originalValue}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {tier.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="space-y-3">
                      <Button 
                        className={`w-full ${tier.popular ? 'gradient-sunset' : 'gradient-ocean'} text-white hover:opacity-90`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePurchase(tier);
                        }}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        立即购买
                      </Button>
                      
                      <Button 
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          shareBox(tier);
                        }}
                      >
                        <Share2 className="mr-2 h-4 w-4" />
                        分享给朋友
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">
                盲盒可能包含的精彩内容
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-ocean-100 rounded-full flex items-center justify-center mb-3 mx-auto">
                    <MapPin className="h-8 w-8 text-ocean-600" />
                  </div>
                  <h4 className="font-semibold mb-2">景点门票</h4>
                  <p className="text-sm text-gray-600">热门景点、小众秘境</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-3 mx-auto">
                    <Utensils className="h-8 w-8 text-orange-600" />
                  </div>
                  <h4 className="font-semibold mb-2">美食体验</h4>
                  <p className="text-sm text-gray-600">特色大餐、地道小吃、预制菜套装</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-3 mx-auto">
                    <Gift className="h-8 w-8 text-purple-600" />
                  </div>
                  <h4 className="font-semibold mb-2">文创纪念品</h4>
                  <p className="text-sm text-gray-600">手工艺品、特色文创、限量收藏品</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-3 mx-auto">
                    <Star className="h-8 w-8 text-pink-600" />
                  </div>
                  <h4 className="font-semibold mb-2">达人服务</h4>
                  <p className="text-sm text-gray-600">专业导览、摄影服务、深度体验</p>
                </div>
              </div>
            </div>
          </>
        ) : (
           <div className="text-center py-16">
            <p className="text-xl text-gray-500">当前城市暂无盲盒产品，敬请期待！</p>
          </div>
        )}

        {/* 购买确认对话框 */}
        <Dialog open={showPurchaseDialog} onOpenChange={setShowPurchaseDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-purple-600" />
                确认购买盲盒
              </DialogTitle>
            </DialogHeader>
            {purchasingTier && (
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-lg">{purchasingTier.name}</h3>
                  <p className="text-2xl font-bold text-purple-600">¥{purchasingTier.price}</p>
                  <p className="text-sm text-gray-600">价值 ¥{purchasingTier.originalValue}</p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">包含内容：</h4>
                  <ul className="space-y-1">
                    {purchasingTier.features.map((feature, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setShowPurchaseDialog(false)}
                  >
                    取消
                  </Button>
                  <Button 
                    className="flex-1 gradient-ocean text-white"
                    onClick={confirmPurchase}
                  >
                    加入购物车
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default MysteryBox;
