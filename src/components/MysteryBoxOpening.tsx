
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gift, Sparkles, Star, Confetti } from 'lucide-react';

interface MysteryBoxOpeningProps {
  isOpen: boolean;
  onComplete: () => void;
  boxName: string;
}

const MysteryBoxOpening: React.FC<MysteryBoxOpeningProps> = ({ 
  isOpen, 
  onComplete, 
  boxName 
}) => {
  const [stage, setStage] = useState<'waiting' | 'shaking' | 'opening' | 'revealing'>('waiting');
  const [showSparkles, setShowSparkles] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const sequence = async () => {
        // 摇晃阶段
        setStage('shaking');
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // 开启阶段
        setStage('opening');
        setShowSparkles(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // 揭晓阶段
        setStage('revealing');
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        onComplete();
      };
      
      sequence();
    }
  }, [isOpen, onComplete]);

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
              ${stage === 'opening' ? 'scale-110' : ''}
              ${stage === 'revealing' ? 'scale-125 rotate-12' : ''}
            `}>
              <Gift 
                className={`
                  h-24 w-24 text-white
                  ${stage === 'opening' ? 'animate-pulse' : ''}
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
