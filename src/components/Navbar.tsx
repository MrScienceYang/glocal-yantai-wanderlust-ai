
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, ArrowLeft, User } from 'lucide-react';
import NavbarLogo from './NavbarLogo';
import NavbarNavigation from './NavbarNavigation';
import NavbarUserActions from './NavbarUserActions';
import CitySelector from './CitySelector';
import ThemeToggle from './ThemeToggle';
import APIKeySettings from './APIKeySettings';
import { DailyCheckIn } from './DailyCheckIn';
import UserTypeSelection from './UserTypeSelection';
import { useLocation, Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isAPISettingsOpen, setIsAPISettingsOpen] = useState(false);
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [isUserTypeSelectionOpen, setIsUserTypeSelectionOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // 检查是否在合作伙伴相关页面
  const isPartnerPage = location.pathname.includes('/partner') || 
                       location.pathname.includes('/supply') || 
                       location.pathname.includes('/supplier') ||
                       location.pathname.includes('/cooperation');

  const handleDownloadApp = () => {
    // 这里可以添加PWA安装逻辑或跳转到下载页面
    if ('serviceWorker' in navigator) {
      // PWA安装逻辑
      window.dispatchEvent(new Event('beforeinstallprompt'));
    }
  };

  const handleAPISuccess = () => {
    console.log('API key saved successfully');
  };

  const handleLogoClick = () => {
    navigate('/supply-chain-partner');
  };

  const handleAccountClick = () => {
    // 检查是否已登录合作伙伴账号
    const savedUser = localStorage.getItem('partner-user');
    if (savedUser) {
      // 已登录，跳转到供应商管理页面
      navigate('/supplier-dashboard');
    } else {
      // 未登录，跳转到供应链账号登录页面
      navigate('/partner-login');
    }
  };

  if (isPartnerPage) {
    return (
      <>
        <nav className="bg-black shadow-sm border-b border-gray-800 relative z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* 左侧 Logo 和 Glocal 文字 */}
              <div className="flex items-center space-x-3 cursor-pointer" onClick={handleLogoClick}>
                <div className="w-8 h-8 flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/7cb822ca-c94a-4ca1-9f2e-7ffe6cd2c3d9.png" 
                    alt="Glocal Logo" 
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <span className="text-xl font-bold text-white">
                  Glocal
                </span>
              </div>

              {/* 中间标题 */}
              <div className="flex-1 flex justify-center">
                <h1 className="text-white text-lg font-medium">
                  Glocal合作伙伴管理后台
                </h1>
              </div>

              {/* 右侧操作按钮 */}
              <div className="flex items-center space-x-4">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Link to="/">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    返回Glocal
                  </Link>
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  onClick={handleAccountClick}
                >
                  <User className="h-4 w-4 mr-1" />
                  Glocal合作伙伴账号
                </Button>
              </div>
            </div>
          </div>
        </nav>

        <APIKeySettings 
          isOpen={isAPISettingsOpen} 
          onClose={() => setIsAPISettingsOpen(false)}
          onSuccess={handleAPISuccess}
        />
        <DailyCheckIn 
          isOpen={isCheckInOpen} 
          onClose={() => setIsCheckInOpen(false)} 
        />
        <UserTypeSelection 
          isOpen={isUserTypeSelectionOpen} 
          onClose={() => setIsUserTypeSelectionOpen(false)} 
        />
      </>
    );
  }

  // 原有的普通导航栏逻辑保持不变
  return (
    <>
      <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 relative z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              {/* 移动端下载App按钮 */}
              <Button
                variant="outline"
                size="sm"
                className="md:hidden"
                onClick={handleDownloadApp}
              >
                <Download className="h-4 w-4 mr-1" />
                下载App
              </Button>
              
              <NavbarLogo />
              <NavbarNavigation />
            </div>

            <div className="flex items-center space-x-4">
              <CitySelector />
              <ThemeToggle />
              <NavbarUserActions 
                onAPISettingsOpen={() => setIsAPISettingsOpen(true)}
                onCheckInOpen={() => setIsCheckInOpen(true)}
                onUserTypeSelectionOpen={() => setIsUserTypeSelectionOpen(true)}
              />
            </div>
          </div>
        </div>
      </nav>

      <APIKeySettings 
        isOpen={isAPISettingsOpen} 
        onClose={() => setIsAPISettingsOpen(false)}
        onSuccess={handleAPISuccess}
      />
      <DailyCheckIn 
        isOpen={isCheckInOpen} 
        onClose={() => setIsCheckInOpen(false)} 
      />
      <UserTypeSelection 
        isOpen={isUserTypeSelectionOpen} 
        onClose={() => setIsUserTypeSelectionOpen(false)} 
      />
    </>
  );
};

export default Navbar;
