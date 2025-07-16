
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Plane, MapPin as GuideIcon, ShoppingCart, User, Train, Hotel, Ticket, MapPin, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showTravelMenu, setShowTravelMenu] = useState(false);

  const navItems = [
    { icon: Home, label: '首页', path: '/' },
    { icon: Plane, label: '出行', path: null, isTravel: true },
    { icon: GuideIcon, label: '智慧导游', path: '/smart-guide' },
    { icon: ShoppingCart, label: '商城', path: '/shop' },
    { icon: User, label: '我的', path: '/profile' },
  ];

  const travelOptions = [
    { icon: MapPin, label: 'AI规划', path: '/ai-planning', color: 'text-purple-500' },
    { icon: GuideIcon, label: '智慧导游', path: '/smart-guide', color: 'text-cyan-500', isNew: true },
    { icon: Plane, label: '机票', path: '/flights', color: 'text-blue-500' },
    { icon: Train, label: '火车票', path: '/trains', color: 'text-green-500' },
    { icon: Hotel, label: '酒店', path: '/hotels', color: 'text-orange-500' },
    { icon: Ticket, label: '门票', path: '/tickets', color: 'text-red-500' },
  ];

  const handleTravelClick = () => {
    setShowTravelMenu(true);
  };

  const handleTravelOptionClick = (path: string) => {
    navigate(path);
    setShowTravelMenu(false);
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-40 md:hidden">
        <div className="flex justify-around items-center py-2">
          {navItems.map(({ icon: Icon, label, path, isTravel }) => {
            const isActive = path ? location.pathname === path : false;
            return (
              <Button
                key={label}
                variant="ghost"
                className={`flex flex-col items-center justify-center p-2 h-auto ${
                  isActive 
                    ? 'text-ocean-600 dark:text-ocean-400' 
                    : 'text-gray-600 dark:text-gray-400'
                }`}
                onClick={isTravel ? handleTravelClick : () => path && navigate(path)}
              >
                <Icon className={`h-5 w-5 mb-1 ${isActive ? 'text-ocean-600 dark:text-ocean-400' : ''}`} />
                <span className="text-xs">{label}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* 出行选项弹出菜单 */}
      <Sheet open={showTravelMenu} onOpenChange={setShowTravelMenu}>
        <SheetContent side="bottom" className="h-auto rounded-t-xl">
          <div className="flex flex-col items-center pb-4">
            <div className="w-12 h-1 bg-gray-300 rounded-full mb-4"></div>
            <h3 className="text-lg font-bold mb-6">选择出行服务</h3>
            
            <div className="grid grid-cols-3 gap-6 w-full max-w-sm">
              {travelOptions.map(({ icon: Icon, label, path, color, isNew }) => (
                <button
                  key={path}
                  onClick={() => handleTravelOptionClick(path)}
                  className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors relative"
                >
                  {isNew && (
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      NEW
                    </div>
                  )}
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                    <Icon className={`h-6 w-6 ${color}`} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{label}</span>
                </button>
              ))}
            </div>
            
            <Button
              variant="outline"
              onClick={() => setShowTravelMenu(false)}
              className="mt-6 w-full max-w-sm"
            >
              取消
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileBottomNav;
