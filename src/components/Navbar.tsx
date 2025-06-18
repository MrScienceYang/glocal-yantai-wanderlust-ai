
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import NavbarLogo from './NavbarLogo';
import NavbarNavigation from './NavbarNavigation';
import NavbarUserActions from './NavbarUserActions';
import CitySelector from './CitySelector';
import ThemeToggle from './ThemeToggle';
import APIKeySettings from './APIKeySettings';
import { DailyCheckIn } from './DailyCheckIn';
import UserTypeSelection from './UserTypeSelection';

const Navbar = () => {
  const [isAPISettingsOpen, setIsAPISettingsOpen] = useState(false);
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [isUserTypeSelectionOpen, setIsUserTypeSelectionOpen] = useState(false);

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
