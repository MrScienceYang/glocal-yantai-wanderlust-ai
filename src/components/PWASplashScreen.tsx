
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PWASplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-white flex items-center justify-center"
        >
          <div className="text-center">
            <motion.img
              src="/lovable-uploads/c53a8e8d-fa2e-4442-87eb-933ed992241d.png"
              alt="Glocal Logo"
              className="w-32 h-32 mx-auto mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
            
            {/* 纸飞机动画 */}
            <motion.div
              initial={{ x: -100, y: -50, rotate: -45 }}
              animate={{ x: 50, y: 100, rotate: 0 }}
              transition={{ duration: 2, ease: 'easeInOut' }}
              className="relative"
            >
              <motion.div
                className="w-8 h-8 bg-ocean-500 rounded-sm transform rotate-45"
                animate={{ rotate: [45, 50, 45] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
              />
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-3xl font-bold text-gray-800 mt-8"
            >
              Glocal
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-gray-600 mt-2"
            >
              想去哪里自己定，glocal就是行
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PWASplashScreen;
