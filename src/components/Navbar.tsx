import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Menu, X, Settings, User, LogIn, LogOut, CalendarCheck } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import APIKeySettings from './APIKeySettings';
import CitySelector from './CitySelector';
import { useCityContext } from './CityProvider';
import { useUser } from './UserProvider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useTranslation } from 'react-i18next';
import { DailyCheckIn } from './DailyCheckIn';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAPISettings, setShowAPISettings] = useState(false);
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
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
  }

  return (
    <>
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
              {isLoggedIn && currentUser && (
                <>
                  <div className="flex items-center space-x-2">
                    <Switch id="vip-mode" checked={isVip} onCheckedChange={toggleVip} disabled={currentUser?.isPermanentVip} />
                    <Label htmlFor="vip-mode" className="text-sm font-medium text-gray-700 whitespace-nowrap">VIP模式</Label>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setShowAPISettings(true)}><Settings className="h-4 w-4 mr-2" />AI设置</Button>
                  <Button variant="outline" size="sm" onClick={() => setIsCheckInOpen(true)}><CalendarCheck className="h-4 w-4 mr-2" />{t('check_in.button_text')}</Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>{currentUser.username.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                      <DropdownMenuLabel>{currentUser.username}</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem disabled>
                        {
                          currentUser.isPermanentVip ? t('user_profile.permanent_vip') :
                          (isVip && currentUser.membershipExpirationDate ? 
                            t('user_profile.vip_until', { date: currentUser.membershipExpirationDate === 'permanent' ? '∞' : new Date(currentUser.membershipExpirationDate).toLocaleDateString() }) :
                            t('user_profile.standard_user'))
                        }
                      </DropdownMenuItem>
                      <DropdownMenuItem disabled>
                        {t('user_profile.points', { points })}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => navigate('/profile')}>
                          <User className="mr-2 h-4 w-4" />
                          <span>{t('user_profile.profile_link')}</span>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>{t('login.logout')}</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              )}
              {!isLoggedIn && (
                <Link to="/login">
                  <Button className="gradient-ocean text-white">
                    <LogIn className="h-4 w-4 mr-2" />
                    {t('login.title')}
                  </Button>
                </Link>
              )}
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
                {isLoggedIn && (
                  <>
                    <div className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100">
                      <Label htmlFor="vip-mode-mobile" className="text-base font-medium text-gray-700">VIP模式</Label>
                      <Switch id="vip-mode-mobile" checked={isVip} onCheckedChange={toggleVip} disabled={currentUser?.isPermanentVip} />
                    </div>
                    <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => { setIsCheckInOpen(true); setIsMenuOpen(false); }}><CalendarCheck className="h-4 w-4 mr-2" />{t('check_in.button_text')}</Button>
                    <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <User className="h-4 w-4 mr-2" />
                        {currentUser?.username} {t('user_profile.points', { points })}
                      </Button>
                    </Link>
                     <Button onClick={() => { handleLogout(); setIsMenuOpen(false); }} variant="destructive" size="sm" className="w-full justify-start"><LogOut className="h-4 w-4 mr-2" />{t('login.logout')}</Button>
                  </>
                )}
                 {!isLoggedIn && (
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full gradient-ocean text-white">
                      <LogIn className="h-4 w-4 mr-2" />
                      {t('login.title')}
                    </Button>
                  </Link>
                )}
                 <Button variant="outline" size="sm" onClick={() => { setShowAPISettings(true); setIsMenuOpen(false); }} className="w-full justify-start"><Settings className="h-4 w-4 mr-2" />AI设置</Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <APIKeySettings isOpen={showAPISettings} onClose={() => setShowAPISettings(false)} onSuccess={() => {}} />
      {isLoggedIn && <DailyCheckIn isOpen={isCheckInOpen} onClose={() => setIsCheckInOpen(false)} />}
    </>
  );
};

export default Navbar;
