
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import APIKeySettings from './APIKeySettings';
import CitySelector from './CitySelector';
import { useCityContext } from './CityProvider';
import { DailyCheckIn } from './DailyCheckIn';
import UserTypeSelection from './UserTypeSelection';
import NavbarLogo from './NavbarLogo';
import NavbarNavigation from './NavbarNavigation';
import NavbarUserActions from './NavbarUserActions';
import NavbarMobileMenu from './NavbarMobileMenu';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAPISettings, setShowAPISettings] = useState(false);
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [showUserTypeSelection, setShowUserTypeSelection] = useState(false);
  const { updateCity } = useCityContext();

  return (
    <>
      <nav className="bg-white/95 backdrop-blur-md shadow-sm fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <NavbarLogo />

            {/* City Selector */}
            <div className="hidden md:flex flex-shrink-0">
              <CitySelector onCityChange={updateCity} />
            </div>

            <NavbarNavigation />

            <NavbarUserActions 
              onAPISettingsOpen={() => setShowAPISettings(true)}
              onCheckInOpen={() => setIsCheckInOpen(true)}
              onUserTypeSelectionOpen={() => setShowUserTypeSelection(true)}
            />

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

        <NavbarMobileMenu 
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          onAPISettingsOpen={() => setShowAPISettings(true)}
          onCheckInOpen={() => setIsCheckInOpen(true)}
          onUserTypeSelectionOpen={() => setShowUserTypeSelection(true)}
        />
      </nav>

      <APIKeySettings isOpen={showAPISettings} onClose={() => setShowAPISettings(false)} onSuccess={() => {}} />
      <DailyCheckIn isOpen={isCheckInOpen} onClose={() => setIsCheckInOpen(false)} />
      <UserTypeSelection isOpen={showUserTypeSelection} onClose={() => setShowUserTypeSelection(false)} />
    </>
  );
};

export default Navbar;
