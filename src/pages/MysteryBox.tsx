
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift, Star, MapPin, Utensils, Camera, Sparkles } from 'lucide-react';
import { useCityContext } from '@/components/CityProvider';

const cityData = {
  '烟台市': {
    mysteryBoxes: [
      { id: 1, name: '探索者盲盒', price: 300, originalValue: '350-400', theme: '经济实惠', color: 'from-blue-400 to-blue-600', items: ['景点门票', '小食体验', '纪念品'], description: '适合初次来烟台的朋友，性价比超高' },
      { id: 2, name: '美食家盲盒', price: 500, originalValue: '550-600', theme: '品质之选', color: 'from-green-400 to-green-600', items: ['精选餐厅', '特色小吃', '海鲜体验', '文创产品'], description: '专为美食爱好者设计，包含烟台特色美食体验' },
      { id: 3, name: '奢华体验盲盒', price: 800, originalValue: '850-950', theme: '极致奢享', color: 'from-purple-400 to-purple-600', items: ['高端餐厅', '私人导览', '豪华住宿', '精品纪念'], description: '顶级体验，让您感受烟台的奢华与精致' }
    ],
    possibleItems: [
      { name: '蓬莱阁门票', type: 'attraction', icon: MapPin, value: 100 },
      { name: '张师傅海鲜大餐', type: 'food', icon: Utensils, value: 180 },
      { name: '烟台苹果文创礼盒', type: 'gift', icon: Gift, value: 89 },
      { name: '专业摄影服务', type: 'service', icon: Camera, value: 200 },
      { name: '烟台大鲍鱼预制菜', type: 'food', icon: Utensils, value: 168 },
      { name: '本地达人陪游服务', type: 'service', icon: Star, value: 150 }
    ]
  },
  '青岛市': {
    mysteryBoxes: [
      { id: 4, name: '啤酒畅饮盲盒', price: 350, originalValue: '400-450', theme: '啤酒狂欢', color: 'from-yellow-400 to-amber-600', items: ['啤酒博物馆', '原浆品鉴', '下酒烤肉'], description: '体验青岛啤酒文化的核心魅力' },
      { id: 5, name: '红瓦绿树盲盒', price: 550, originalValue: '600-650', theme: '文艺之旅', color: 'from-red-400 to-rose-600', items: ['八大关漫步', '网红咖啡店', '名人故居探访'], description: '感受青岛的浪漫与文艺气息' }
    ],
    possibleItems: [
      { name: '青岛啤酒博物馆门票', type: 'attraction', icon: MapPin, value: 60 },
      { name: '网红大虾套餐', type: 'food', icon: Utensils, value: 150 },
      { name: '帆船出海体验', type: 'service', icon: Star, value: 220 },
    ]
  }
}

const MysteryBox = () => {
  const { selectedCity } = useCityContext();
  const [selectedBox, setSelectedBox] = useState<number | null>(null);
  const [isOpening, setIsOpening] = useState(false);
  const [openedBox, setOpenedBox] = useState<any>(null);

  const currentCityData = cityData[selectedCity] || { mysteryBoxes: [], possibleItems: [] };
  const { mysteryBoxes, possibleItems } = currentCityData;

  const handleOpenBox = async (boxId: number) => {
    setSelectedBox(boxId);
    setIsOpening(true);

    // 模拟开启过程
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 随机生成盲盒内容
    const box = mysteryBoxes.find(b => b.id === boxId);
    if (!box) {
      setIsOpening(false);
      return;
    }
    const randomItems = possibleItems
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(Math.random() * 2) + 2);

    const totalValue = randomItems.reduce((sum, item) => sum + item.value, 0);

    setOpenedBox({
      ...box,
      items: randomItems,
      totalValue
    });

    setIsOpening(false);
  };

  const resetBox = () => {
    setSelectedBox(null);
    setOpenedBox(null);
    setIsOpening(false);
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
                {mysteryBoxes.map((box) => (
                    <Card 
                    key={box.id} 
                    className={`group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-4 ${
                        selectedBox === box.id ? 'ring-4 ring-purple-400' : ''
                    }`}
                    >
                    <CardHeader>
                        <div className={`w-full h-32 rounded-lg bg-gradient-to-br ${box.color} flex items-center justify-center mb-4`}>
                        <Gift className="w-16 h-16 text-white animate-bounce" />
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

                        <Button 
                            onClick={() => handleOpenBox(box.id)}
                            disabled={isOpening}
                            className="w-full gradient-ocean text-white group-hover:shadow-lg"
                            size="lg"
                        >
                            {isOpening && selectedBox === box.id ? '正在开启...' : '立即购买'}
                        </Button>
                        </div>
                    </CardContent>
                    </Card>
                ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <p className="text-xl text-gray-500">当前城市暂无盲盒产品，敬请期待！</p>
                </div>
            )}
          </>
        ) : (
          /* ... keep existing code (开启结果 JSX) ... */
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
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-600">价值 ¥{item.value}</p>
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
      </div>
    </div>
  );
};

export default MysteryBox;
