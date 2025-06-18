
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Plane, Gift, ShoppingCart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: '首页', path: '/' },
    { icon: Plane, label: '出行', path: '/ai-planning' },
    { icon: Gift, label: '盲盒', path: '/mystery-box' },
    { icon: ShoppingCart, label: '商城', path: '/shop' },
    { icon: User, label: '我的', path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-50 md:hidden">
      <div className="flex justify-around items-center py-2">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          return (
            <Button
              key={path}
              variant="ghost"
              className={`flex flex-col items-center justify-center p-2 h-auto ${
                isActive 
                  ? 'text-ocean-600 dark:text-ocean-400' 
                  : 'text-gray-600 dark:text-gray-400'
              }`}
              onClick={() => navigate(path)}
            >
              <Icon className={`h-5 w-5 mb-1 ${isActive ? 'text-ocean-600 dark:text-ocean-400' : ''}`} />
              <span className="text-xs">{label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNav;
