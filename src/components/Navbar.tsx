import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Menu, X, Settings, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import APIKeySettings from './APIKeySettings';
import CitySelector from './CitySelector';
import { useCityContext } from './CityProvider';
import { useUser } from './UserProvider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAPISettings, setShowAPISettings] = useState(false);
  const location = useLocation();
  const { selectedCountry, updateCity } = useCityContext();
  const { isVip, toggleVip } = useUser();

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

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-sm fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-8 h-8 gradient-ocean rounded-lg flex items-center justify-center">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-gradient bg-gradient-to-r from-ocean-600 to-sunset-500 bg-clip-text text-transparent">
              Glocal
            </span>
          </Link>

          {/* City Selector */}
          <div className="hidden md:flex flex-shrink-0">
            <CitySelector onCityChange={updateCity} />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 flex-1 justify-center mx-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive(item.href)
                    ? 'text-ocean-600 bg-ocean-50'
                    : 'text-gray-700 hover:text-ocean-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4 flex-shrink-0">
            <div className="flex items-center space-x-2">
              <Switch id="vip-mode" checked={isVip} onCheckedChange={toggleVip} />
              <Label htmlFor="vip-mode" className="text-sm font-medium text-gray-700 whitespace-nowrap">VIP模式</Label>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAPISettings(true)}
              className="flex items-center"
            >
              <Settings className="h-4 w-4 mr-2" />
              AI设置
            </Button>
            <Link to="/profile">
              <Button variant="outline" size="sm" className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                个人中心
              </Button>
            </Link>
            <Button className="gradient-ocean text-white">
              登录/注册
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
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
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-3 py-2 space-y-2">
              <div className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100">
                <Label htmlFor="vip-mode-mobile" className="text-base font-medium text-gray-700">VIP模式</Label>
                <Switch id="vip-mode-mobile" checked={isVip} onCheckedChange={toggleVip} />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowAPISettings(true);
                  setIsMenuOpen(false);
                }}
                className="w-full justify-start"
              >
                <Settings className="h-4 w-4 mr-2" />
                AI设置
              </Button>
              <Link to="/profile">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  个人中心
                </Button>
              </Link>
              <Button className="w-full gradient-ocean text-white">
                登录/注册
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* API Key Settings Modal */}
      <APIKeySettings
        isOpen={showAPISettings}
        onClose={() => setShowAPISettings(false)}
        onSuccess={() => {}}
      />
    </nav>
  );
};

export default Navbar;
