
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ForeignTransitionProps {
  onComplete: () => void;
}

const ForeignTransition = ({ onComplete }: ForeignTransitionProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        {/* 跑步男孩动画 */}
        <div className="mb-8">
          <motion.div
            className="w-32 h-32 mx-auto mb-6"
            animate={{
              x: [-50, 50, -50],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-4xl">
              🏃‍♂️
            </div>
          </motion.div>
        </div>

        {/* 文字动画 */}
        <motion.h2
          className="text-2xl font-bold text-gray-800 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          帮你问问我的外国朋友
        </motion.h2>

        {/* 进度条 */}
        <div className="w-64 mx-auto">
          <div className="bg-gray-200 rounded-full h-2 mb-4">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <p className="text-sm text-gray-600">正在为您连接到 Booking.com...</p>
        </div>
      </div>
    </div>
  );
};

export default ForeignTransition;
