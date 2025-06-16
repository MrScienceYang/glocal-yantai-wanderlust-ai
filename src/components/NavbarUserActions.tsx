
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Settings, User, LogIn, LogOut, CalendarCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserProvider';
import { useTranslation } from 'react-i18next';
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

interface NavbarUserActionsProps {
  onAPISettingsOpen: () => void;
  onCheckInOpen: () => void;
  onUserTypeSelectionOpen: () => void;
}

const NavbarUserActions = ({ onAPISettingsOpen, onCheckInOpen, onUserTypeSelectionOpen }: NavbarUserActionsProps) => {
  const navigate = useNavigate();
  const { isLoggedIn, currentUser, logout, toggleVip, points, isVip } = useUser();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleLoginClick = () => {
    onUserTypeSelectionOpen();
  };

  return (
    <div className="hidden md:flex items-center space-x-4 flex-shrink-0">
      {isLoggedIn && currentUser && (
        <>
          <div className="flex items-center space-x-2">
            <Switch id="vip-mode" checked={isVip} onCheckedChange={toggleVip} disabled={currentUser?.isPermanentVip} />
            <Label htmlFor="vip-mode" className="text-sm font-medium text-gray-700 whitespace-nowrap">VIP模式</Label>
          </div>
          <Button variant="outline" size="sm" onClick={onAPISettingsOpen}>
            <Settings className="h-4 w-4 mr-2" />AI设置
          </Button>
          <Button variant="outline" size="sm" onClick={onCheckInOpen}>
            <CalendarCheck className="h-4 w-4 mr-2" />{t('check_in.button_text')}
          </Button>
          
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
        <Button className="gradient-ocean text-white" onClick={handleLoginClick}>
          <LogIn className="h-4 w-4 mr-2" />
          {t('login.title')}
        </Button>
      )}
    </div>
  );
};

export default NavbarUserActions;
