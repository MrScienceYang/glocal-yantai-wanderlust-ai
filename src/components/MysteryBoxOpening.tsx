
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Gift, Sparkles, Star } from 'lucide-react';

interface MysteryBoxOpeningProps {
  isOpen: boolean;
  onComplete: (items: any[]) => void;
  boxName: string;
  boxPrice: number;
  possibleItems: any[];
}

const MysteryBoxOpening: React.FC<MysteryBoxOpeningProps> = ({ 
  isOpen, 
  onComplete, 
  boxName,
  boxPrice,
  possibleItems
}) => {
  const [stage, setStage] = useState<'waiting' | 'shaking' | 'opening' | 'revealing'>('waiting');
  const [progress, setProgress] = useState(0);
  const [showSparkles, setShowSparkles] = useState(false);

  const generateRandomItems = () => {
    // 根据盲盒价格生成对应数量的物品
    const itemCount = boxPrice >= 800 ? 4 : boxPrice >= 500 ? 3 : 2;
    const shuffled = [...possibleItems].sort(() => Math.random() - 0.5);
    const selectedItems = shuffled.slice(0, itemCount);
    
    // 确保总价值超过购买价格
    let totalValue = selectedItems.reduce((sum, item) => sum + item.value, 0);
    if (totalValue <= boxPrice) {
      // 如果价值不够，随机增加一些物品
      const additionalItems = shuffled.slice(itemCount, itemCount + 2);
      selectedItems.push(...additionalItems);
    }
    
    return selectedItems.map(item => ({
      ...item,
      quantity: Math.floor(Math.random() * 2) + 1
    }));
  };

  useEffect(() => {
    if (isOpen) {
      setStage('waiting');
      setProgress(0);
      
      const sequence = async () => {
        // 等待1秒
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // 摇晃阶段 - 2秒
        setStage('shaking');
        setShowSparkles(true);
        
        // 进度条动画
        const progressInterval = setInterval(() => {
          setProgress(prev => {
            if (prev >= 100) {
              clearInterval(progressInterval);
              return 100;
            }
            return prev + 2;
          });
        }, 100);
        
        await new Promise(resolve => setTimeout(resolve, 5000));
        
        // 开启阶段
        setStage('opening');
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // 揭晓阶段
        setStage('revealing');
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // 生成随机物品并回调
        const randomItems = generateRandomItems();
        onComplete(randomItems);
      };
      
      sequence();
    }
  }, [isOpen, onComplete, boxPrice, possibleItems]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative">
        {/* 背景特效 */}
        {showSparkles && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random()}s`
                }}
              >
                <Sparkles className="h-4 w-4 text-yellow-400" />
              </div>
            ))}
          </div>
        )}

        <Card className="w-80 h-80 bg-gradient-to-br from-purple-600 to-pink-600 border-none shadow-2xl">
          <CardContent className="flex flex-col items-center justify-center h-full relative">
            {/* 盲盒图标 */}
            <div className={`
              relative transition-all duration-1000
              ${stage === 'shaking' ? 'animate-bounce' : ''}
              ${stage === 'opening' ? 'scale-110 animate-pulse' : ''}
              ${stage === 'revealing' ? 'scale-125 rotate-12' : ''}
            `}>
              <Gift 
                className={`
                  h-24 w-24 text-white
                  ${stage === 'shaking' || stage === 'opening' ? 'drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]' : ''}
                `} 
              />
              
              {/* 盒盖 */}
              <div className={`
                absolute -top-2 -left-2 w-28 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 
                rounded-t-lg transition-all duration-1000
                ${stage === 'opening' || stage === 'revealing' ? '-translate-y-16 rotate-45' : ''}
              `}>
                <div className="w-full h-full bg-gradient-to-r from-yellow-300 to-orange-400 rounded-t-lg" />
              </div>
            </div>

            {/* 文本提示 */}
            <div className="mt-8 text-center text-white">
              <h3 className="text-xl font-bold mb-2">{boxName}</h3>
              <p className="text-sm opacity-90">
                {stage === 'waiting' && '准备开启...'}
                {stage === 'shaking' && '正在摇晃盲盒...'}
                {stage === 'opening' && '盲盒正在开启...'}
                {stage === 'revealing' && '惊喜即将揭晓！'}
              </p>
            </div>

            {/* 进度条 */}
            {stage === 'shaking' && (
              <div className="absolute bottom-8 left-8 right-8">
                <div className="text-white text-xs mb-2 text-center">开启进度</div>
                <Progress 
                  value={progress} 
                  className="h-3 bg-white/20"
                />
              </div>
            )}

            {/* 光效 */}
            {(stage === 'opening' || stage === 'revealing') && (
              <div className="absolute inset-0 bg-gradient-radial from-yellow-300/30 to-transparent animate-pulse" />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MysteryBoxOpening;
