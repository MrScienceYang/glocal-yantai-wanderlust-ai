
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
          className="fixed inset-0 z-[9999] bg-gradient-to-br from-ocean-500 to-ocean-700 flex items-center justify-center"
        >
          <div className="text-center">
            <motion.img
              src="/lovable-uploads/68b73a5f-0e47-4e84-bc10-68e8aceb1e32.png"
              alt="Glocal Logo"
              className="w-24 h-24 mx-auto mb-8"
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
                className="w-8 h-8 bg-white rounded-sm transform rotate-45"
                animate={{ rotate: [45, 50, 45] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
              />
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-3xl font-bold text-white mt-8"
            >
              Glocal
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-white opacity-90 mt-2"
            >
              发现真正的本地味道
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PWASplashScreen;
