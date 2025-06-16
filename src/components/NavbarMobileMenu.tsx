
import React from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { User, LogIn, LogOut, CalendarCheck, Settings } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from './UserProvider';
import { useCityContext } from './CityProvider';
import { useTranslation } from 'react-i18next';
import CitySelector from './CitySelector';

interface NavbarMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onAPISettingsOpen: () => void;
  onCheckInOpen: () => void;
  onUserTypeSelectionOpen: () => void;
}

const NavbarMobileMenu = ({ isOpen, onClose, onAPISettingsOpen, onCheckInOpen, onUserTypeSelectionOpen }: NavbarMobileMenuProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedCountry, updateCity } = useCityContext();
  const { isLoggedIn, currentUser, logout, toggleVip, points, isVip } = useUser();
  const { t } = useTranslation();

  const navigation = [
    { name: '首页', href: '/' },
    { name: 'AI行程', href: '/ai-planning' },
    ...(selectedCountry === '中国' ? [
      { name: '本地达人', href: '/local-experts' },
      { name: '特色商城', href: '/shop' },
      { name: '盲盒旅行', href: '/mystery-box' }
    ] : []),
    { name: '社区', href: '/community' },
    { name: '会员', href: '/membership' }
  ];

  const isActive = (href: string) => location.pathname === href;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleLoginClick = () => {
    onUserTypeSelectionOpen();
  };

  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-white border-t shadow-lg">
      <div className="px-2 pt-2 pb-3 space-y-1">
        <div className="px-3 py-2">
          <CitySelector onCityChange={updateCity} />
        </div>
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
              isActive(item.href)
                ? 'text-ocean-600 bg-ocean-50'
                : 'text-gray-700 hover:text-ocean-600'
            }`}
            onClick={onClose}
          >
            {item.name}
          </Link>
        ))}
        <div className="px-3 py-2 space-y-2">
          {isLoggedIn && (
            <>
              <div className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100">
                <Label htmlFor="vip-mode-mobile" className="text-base font-medium text-gray-700">VIP模式</Label>
                <Switch id="vip-mode-mobile" checked={isVip} onCheckedChange={toggleVip} disabled={currentUser?.isPermanentVip} />
              </div>
              <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => { onCheckInOpen(); onClose(); }}>
                <CalendarCheck className="h-4 w-4 mr-2" />{t('check_in.button_text')}
              </Button>
              <Link to="/profile" onClick={onClose}>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  {currentUser?.username} {t('user_profile.points', { points })}
                </Button>
              </Link>
              <Button onClick={() => { handleLogout(); onClose(); }} variant="destructive" size="sm" className="w-full justify-start">
                <LogOut className="h-4 w-4 mr-2" />{t('login.logout')}
              </Button>
            </>
          )}
          {!isLoggedIn && (
            <Button className="w-full gradient-ocean text-white" onClick={() => { handleLoginClick(); onClose(); }}>
              <LogIn className="h-4 w-4 mr-2" />
              {t('login.title')}
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={() => { onAPISettingsOpen(); onClose(); }} className="w-full justify-start">
            <Settings className="h-4 w-4 mr-2" />AI设置
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NavbarMobileMenu;
