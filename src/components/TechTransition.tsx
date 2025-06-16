
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TechTransitionProps {
  isVisible: boolean;
  onComplete: () => void;
}

const TechTransition: React.FC<TechTransitionProps> = ({ isVisible, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [numbers, setNumbers] = useState(Array(20).fill(0));

  const targetText = "用AI赋能实体经济";

  useEffect(() => {
    if (!isVisible) return;

    // 数字矩阵动画
    const numberInterval = setInterval(() => {
      setNumbers(prev => prev.map(() => Math.floor(Math.random() * 10)));
    }, 100);

    // 文字打字机效果
    const textTimeout = setTimeout(() => {
      let index = 0;
      const typeInterval = setInterval(() => {
        if (index <= targetText.length) {
          setDisplayText(targetText.slice(0, index));
          index++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => {
            onComplete();
          }, 1000);
        }
      }, 150);

      return () => clearInterval(typeInterval);
    }, 1500);

    return () => {
      clearInterval(numberInterval);
      clearTimeout(textTimeout);
    };
  }, [isVisible, onComplete, targetText]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
        >
          {/* 数字矩阵背景 */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="grid grid-cols-20 gap-2 h-full w-full opacity-20">
              {numbers.map((num, index) => (
                <motion.div
                  key={index}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ 
                    y: 0, 
                    opacity: [0, 1, 0],
                    color: ['#00ff00', '#ffffff', '#00ff00']
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.1
                  }}
                  className="text-green-400 font-mono text-xs text-center"
                >
                  {num}
                </motion.div>
              ))}
            </div>
          </div>

          {/* 中央内容 */}
          <div className="relative z-10 text-center">
            {/* 扫描线效果 */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="w-96 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mb-8"
            />

            {/* 主文案 */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="relative"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                {displayText}
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-cyan-400"
                >
                  |
                </motion.span>
              </h1>
              
              {/* 发光效果 */}
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(6, 182, 212, 0.3)",
                    "0 0 40px rgba(6, 182, 212, 0.6)",
                    "0 0 20px rgba(6, 182, 212, 0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-lg -z-10"
              />
            </motion.div>

            {/* 加载指示器 */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1, duration: 2 }}
              className="w-96 h-1 bg-gradient-to-r from-cyan-400 to-green-400 rounded-full mx-auto mt-8"
            />

            {/* 底部文字 */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 1 }}
              className="text-gray-400 mt-4 font-mono"
            >
              正在进入合作伙伴专区...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TechTransition;
