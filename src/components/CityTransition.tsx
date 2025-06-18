
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CityTransitionProps {
  cityName: string;
  onComplete: () => void;
}

const CityTransition = ({ cityName, onComplete }: CityTransitionProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-ocean-400 to-ocean-600"
        >
          <div className="relative w-full h-full overflow-hidden">
            {/* 公路背景 */}
            <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-gray-600 to-gray-500">
              <div className="absolute bottom-20 w-full h-2 bg-yellow-400 opacity-80"></div>
              <div className="absolute bottom-16 w-full h-1 bg-white opacity-60"></div>
            </div>
            
            {/* 公交车动画 */}
            <motion.div
              initial={{ x: '-100px', opacity: 0 }}
              animate={{ x: '50vw', opacity: 1 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              className="absolute bottom-24 w-32 h-20 bg-blue-500 rounded-lg shadow-lg"
            >
              <div className="absolute top-2 left-2 right-2 h-12 bg-blue-300 rounded"></div>
              <div className="absolute bottom-2 left-4 w-6 h-6 bg-black rounded-full"></div>
              <div className="absolute bottom-2 right-4 w-6 h-6 bg-black rounded-full"></div>
            </motion.div>

            {/* 公交站台 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute bottom-20 right-20 w-24 h-32 bg-gray-700 rounded-t-lg"
            >
              <div className="absolute top-4 left-2 right-2 h-20 bg-gray-200 rounded"></div>
            </motion.div>

            {/* 欢迎文字 */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-center"
            >
              <h1 className="text-4xl font-bold text-white mb-4">
                欢迎来到 {cityName}
              </h1>
              <p className="text-xl text-white opacity-90">
                准备开始您的精彩旅程
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CityTransition;
