
import React, { useState } from 'react';
import { Search, User, ShoppingCart, Menu, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-gradient">
              Glocal烟台
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#" className="text-gray-900 hover:text-ocean-600 px-3 py-2 text-sm font-medium transition-colors">
                智能行程
              </a>
              <a href="#" className="text-gray-900 hover:text-ocean-600 px-3 py-2 text-sm font-medium transition-colors">
                本地达人
              </a>
              <a href="#" className="text-gray-900 hover:text-ocean-600 px-3 py-2 text-sm font-medium transition-colors">
                特色商城
              </a>
              <a href="#" className="text-gray-900 hover:text-ocean-600 px-3 py-2 text-sm font-medium transition-colors">
                盲盒旅行
              </a>
              <a href="#" className="text-gray-900 hover:text-ocean-600 px-3 py-2 text-sm font-medium transition-colors">
                社区
              </a>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="sm">
              登录
            </Button>
            <Button size="sm" className="gradient-ocean text-white">
              注册
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            <a href="#" className="text-gray-900 hover:text-ocean-600 block px-3 py-2 text-base font-medium">
              智能行程
            </a>
            <a href="#" className="text-gray-900 hover:text-ocean-600 block px-3 py-2 text-base font-medium">
              本地达人
            </a>
            <a href="#" className="text-gray-900 hover:text-ocean-600 block px-3 py-2 text-base font-medium">
              特色商城
            </a>
            <a href="#" className="text-gray-900 hover:text-ocean-600 block px-3 py-2 text-base font-medium">
              盲盒旅行
            </a>
            <a href="#" className="text-gray-900 hover:text-ocean-600 block px-3 py-2 text-base font-medium">
              社区
            </a>
            <div className="flex space-x-2 px-3 py-2">
              <Button variant="outline" size="sm" className="flex-1">
                登录
              </Button>
              <Button size="sm" className="flex-1 gradient-ocean text-white">
                注册
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
