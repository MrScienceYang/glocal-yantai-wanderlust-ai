import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Gift, Star, MapPin, Utensils, Camera, Sparkles, Clock, Users, Share2 } from 'lucide-react';
import { useCityContext } from '@/components/CityProvider';
import { useCart } from '@/components/CartProvider';
import { toast } from 'sonner';
import MysteryBoxOpening from '@/components/MysteryBoxOpening';

const cityData = {
  '烟台市': {
    mysteryBoxes: [
      { 
        id: 'yantai-explorer', 
        name: '探索者盲盒', 
        price: 300, 
        originalValue: '350-400', 
        theme: '经济实惠', 
        color: 'from-blue-400 to-blue-600', 
        items: ['景点门票', '小食体验', '纪念品'], 
        description: '适合初次来烟台的朋友，性价比超高',
        image: '/lovable-uploads/581586bf-9a04-4325-b99e-30cfa6f061ea.png',
        difficulty: 'easy',
        duration: '半天',
        groupSize: '1-2人'
      },
      { 
        id: 'yantai-foodie', 
        name: '美食家盲盒', 
        price: 500, 
        originalValue: '550-600', 
        theme: '品质之选', 
        color: 'from-green-400 to-green-600', 
        items: ['精选餐厅', '特色小吃', '海鲜体验', '文创产品'], 
        description: '专为美食爱好者设计，包含烟台特色美食体验',
        image: '/lovable-uploads/50b76766-a5f0-4b7f-8aae-093afca8061b.png',
        difficulty: 'medium',
        duration: '1天',
        groupSize: '2-4人'
      },
      { 
        id: 'yantai-luxury', 
        name: '奢华体验盲盒', 
        price: 800, 
        originalValue: '850-950', 
        theme: '极致奢享', 
        color: 'from-purple-400 to-purple-600', 
        items: ['高端餐厅', '私人导览', '豪华住宿', '精品纪念'], 
        description: '顶级体验，让您感受烟台的奢华与精致',
        image: '/lovable-uploads/1f83017a-893e-4ccb-9008-6709b57df8e6.png',
        difficulty: 'premium',
        duration: '2天',
        groupSize: '2-6人'
      }
    ],
    possibleItems: [
      { name: '蓬莱阁门票', type: 'attraction', icon: MapPin, value: 100, rarity: 'common' },
      { name: '张师傅海鲜大餐', type: 'food', icon: Utensils, value: 180, rarity: 'rare' },
      { name: '烟台苹果文创礼盒', type: 'gift', icon: Gift, value: 89, rarity: 'common' },
      { name: '专业摄影服务', type: 'service', icon: Camera, value: 200, rarity: 'epic' },
      { name: '烟台大鲍鱼预制菜', type: 'food', icon: Utensils, value: 168, rarity: 'rare' },
      { name: '本地达人陪游服务', type: 'service', icon: Star, value: 150, rarity: 'rare' }
    ]
  },
  '青岛市': {
    mysteryBoxes: [
      { 
        id: 'qingdao-beer', 
        name: '啤酒畅饮盲盒', 
        price: 350, 
        originalValue: '400-450', 
        theme: '啤酒狂欢', 
        color: 'from-yellow-400 to-amber-600', 
        items: ['啤酒博物馆', '原浆品鉴', '下酒烤肉'], 
        description: '体验青岛啤酒文化的核心魅力',
        image: '/lovable-uploads/f17f95a8-00d1-469e-9ad9-b47397319d18.png',
        difficulty: 'easy',
        duration: '半天',
        groupSize: '2-4人'
      },
      { 
        id: 'qingdao-coastal', 
        name: '红瓦绿树盲盒', 
        price: 550, 
        originalValue: '600-650', 
        theme: '文艺之旅', 
        color: 'from-red-400 to-rose-600', 
        items: ['八大关漫步', '网红咖啡店', '名人故居探访'], 
        description: '感受青岛的浪漫与文艺气息',
        image: '/lovable-uploads/68a411df-9696-447b-a897-b6ee68c3a8bf.png',
        difficulty: 'medium',
        duration: '1天',
        groupSize: '1-3人'
      }
    ],
    possibleItems: [
      { name: '青岛啤酒博物馆门票', type: 'attraction', icon: MapPin, value: 60, rarity: 'common' },
      { name: '网红大虾套餐', type: 'food', icon: Utensils, value: 150, rarity: 'rare' },
      { name: '帆船出海体验', type: 'service', icon: Star, value: 220, rarity: 'epic' },
    ]
  }
}

const MysteryBox = () => {
  const { selectedCity } = useCityContext();
  const { addToCart } = useCart();
  const [selectedBox, setSelectedBox] = useState<string | null>(null);
  const [isOpening, setIsOpening] = useState(false);
  const [openedBox, setOpenedBox] = useState<any>(null);
  const [showOpeningAnimation, setShowOpeningAnimation] = useState(false);

  const currentCityData = cityData[selectedCity] || { mysteryBoxes: [], possibleItems: [] };
  const { mysteryBoxes, possibleItems } = currentCityData;

  const generateRandomItems = (boxType: string) => {
    const itemCount = boxType === 'yantai-luxury' ? 4 : boxType === 'yantai-foodie' ? 3 : 2;
    return possibleItems
      .sort(() => Math.random() - 0.5)
      .slice(0, itemCount)
      .map(item => ({
        ...item,
        quantity: Math.floor(Math.random() * 2) + 1
      }));
  };

  const handlePurchase = (box: any) => {
    addToCart({
      id: box.id,
      name: box.name,
      price: box.price,
      image: box.image || '/placeholder.svg'
    });
    toast.success('盲盒已添加到购物车！');
  };

  const handleOpenBox = async (boxId: string) => {
    const box = mysteryBoxes.find(b => b.id === boxId);
    if (!box) return;

    setSelectedBox(boxId);
    setShowOpeningAnimation(true);
  };

  const handleOpeningComplete = () => {
    setShowOpeningAnimation(false);
    setIsOpening(true);

    setTimeout(() => {
      const box = mysteryBoxes.find(b => b.id === selectedBox);
      if (!box) return;

      const randomItems = generateRandomItems(box.id);
      const totalValue = randomItems.reduce((sum, item) => sum + (item.value * item.quantity), 0);

      setOpenedBox({
        ...box,
        items: randomItems,
        totalValue,
        openedAt: new Date().toISOString()
      });
      setIsOpening(false);
    }, 1000);
  };

  const shareBox = (box: any) => {
    const shareData = {
      title: `我刚开启了${box.name}！`,
      text: `获得了价值¥${box.totalValue}的惊喜内容！快来试试盲盒游${selectedCity}吧`,
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
      toast.success('分享内容已复制到剪贴板');
    }
  };

  const resetBox = () => {
    setSelectedBox(null);
    setOpenedBox(null);
    setIsOpening(false);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-800';
      case 'rare': return 'bg-blue-100 text-blue-800';
      case 'epic': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    const colors = {
      easy: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      premium: 'bg-purple-100 text-purple-800'
    };
    const labels = {
      easy: '轻松',
      medium: '标准',
      premium: '精品'
    };
    return { color: colors[difficulty], label: labels[difficulty] };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            盲盒游{selectedCity}
          </h1>
          <p className="text-xl text-gray-600">
            充满惊喜的随机旅行体验，每次都有意想不到的发现
          </p>
        </div>

        {!openedBox ? (
          <>
            {/* 盲盒介绍 */}
            <div className="bg-white rounded-xl p-8 mb-12 shadow-sm">
              <div className="text-center mb-8">
                <Sparkles className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4">什么是盲盒旅行？</h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  盲盒旅行是一种全新的旅游体验方式。您只需选择价位，我们为您随机搭配景点、美食、住宿和文创产品，
                  保证总价值超过您的支付金额，让每次旅行都充满惊喜和期待！
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Gift className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">随机惊喜</h3>
                  <p className="text-sm text-gray-600">每个盲盒都包含不同的体验组合</p>
                </div>
                <div>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">超值体验</h3>
                  <p className="text-sm text-gray-600">总价值保证超过购买价格</p>
                </div>
                <div>
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">独特发现</h3>
                  <p className="text-sm text-gray-600">探索你可能错过的隐藏宝藏</p>
                </div>
              </div>
            </div>

            {/* 盲盒选择 */}
            {mysteryBoxes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {mysteryBoxes.map((box) => {
                  const difficultyBadge = getDifficultyBadge(box.difficulty);
                  return (
                    <Card 
                      key={box.id} 
                      className="group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-4"
                    >
                      <CardHeader>
                        <div className={`w-full h-32 rounded-lg bg-gradient-to-br ${box.color} flex items-center justify-center mb-4 relative overflow-hidden`}>
                          <Gift className="w-16 h-16 text-white animate-bounce" />
                          <div className="absolute top-2 right-2">
                            <Badge className={difficultyBadge.color}>
                              {difficultyBadge.label}
                            </Badge>
                          </div>
                        </div>
                        <CardTitle className="text-xl text-center">{box.name}</CardTitle>
                        <CardDescription className="text-center">
                          {box.theme}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-purple-600">¥{box.price}</div>
                            <div className="text-sm text-gray-500">价值 ¥{box.originalValue}</div>
                          </div>

                          {/* 盲盒信息 */}
                          <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                            <div className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {box.duration}
                            </div>
                            <div className="flex items-center">
                              <Users className="w-3 h-3 mr-1" />
                              {box.groupSize}
                            </div>
                            <div className="flex items-center">
                              <Star className="w-3 h-3 mr-1" />
                              随机
                            </div>
                          </div>

                          <div className="space-y-2">
                            <h4 className="font-medium text-center">可能包含：</h4>
                            <div className="flex flex-wrap gap-2 justify-center">
                              {box.items.map((item, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs"
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>

                          <p className="text-sm text-gray-600 text-center">
                            {box.description}
                          </p>

                          <div className="space-y-2">
                            <Button 
                              onClick={() => handlePurchase(box)}
                              className="w-full gradient-ocean text-white group-hover:shadow-lg"
                              size="lg"
                            >
                              立即购买
                            </Button>
                            <Button 
                              onClick={() => handleOpenBox(box.id)}
                              variant="outline"
                              className="w-full"
                              size="sm"
                            >
                              <Gift className="w-4 h-4 mr-2" />
                              模拟开启
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
                </div>
            ) : (
                <div className="text-center py-16">
                    <p className="text-xl text-gray-500">当前城市暂无盲盒产品，敬请期待！</p>
                </div>
            )}
          </>
        ) : (
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden">
              <CardHeader className="text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <div className="animate-pulse">
                  <Sparkles className="w-16 h-16 mx-auto mb-4" />
                </div>
                <CardTitle className="text-2xl">恭喜！您的{openedBox.name}已开启</CardTitle>
                <CardDescription className="text-purple-100">
                  总价值 ¥{openedBox.totalValue}，超值体验等您享受！
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {openedBox.items.map((item: any, index: number) => (
                    <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mr-4">
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{item.name}</h3>
                          <Badge className={getRarityColor(item.rarity)} size="sm">
                            {item.rarity}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          价值 ¥{item.value} × {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Button className="flex-1 gradient-ocean text-white" size="lg">
                    立即使用
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => shareBox(openedBox)}
                    className="flex-1" 
                    size="lg"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    分享成果
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={resetBox}
                    className="flex-1" 
                    size="lg"
                  >
                    再来一次
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 盲盒开启动画 */}
        <MysteryBoxOpening
          isOpen={showOpeningAnimation}
          onComplete={handleOpeningComplete}
          boxName={selectedBox ? mysteryBoxes.find(b => b.id === selectedBox)?.name || '' : ''}
        />
      </div>
    </div>
  );
};

export default MysteryBox;
