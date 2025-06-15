
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Menu, X, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import APIKeySettings from './APIKeySettings';
import { aiService } from '@/services/aiService';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAPISettings, setShowAPISettings] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: '首页', href: '/' },
    { name: 'AI行程', href: '/ai-planning' },
    { name: '本地达人', href: '/local-experts' },
    { name: '特色商城', href: '/shop' },
    { name: '盲盒旅行', href: '/mystery-box' }
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      <nav className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-ocean rounded-lg flex items-center justify-center">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-gradient bg-gradient-to-r from-ocean-600 to-sunset-500 bg-clip-text text-transparent">
                Glocal烟台
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
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
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAPISettings(true)}
                className="flex items-center"
              >
                <Settings className="h-4 w-4 mr-2" />
                AI设置
              </Button>
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
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
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
                <Button className="w-full gradient-ocean text-white">
                  登录/注册
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* API Key Settings Modal */}
      <APIKeySettings
        isOpen={showAPISettings}
        onClose={() => setShowAPISettings(false)}
        onSuccess={() => {}}
      />
    </>
  );
};

export default Navbar;
