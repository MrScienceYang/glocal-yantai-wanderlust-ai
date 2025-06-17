
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCityContext } from './CityProvider';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Plane, Train, Hotel, Ticket, MapPin } from 'lucide-react';

const NavbarNavigation = () => {
  const location = useLocation();
  const { selectedCountry } = useCityContext();

  const isActive = (href: string) => location.pathname === href;

  const travelOptions = [
    { name: 'AI规划', href: '/ai-planning', icon: MapPin },
    { name: '机票', href: '/flights', icon: Plane },
    { name: '火车票', href: '/trains', icon: Train },
    { name: '酒店', href: '/hotels', icon: Hotel },
    { name: '门票', href: '/tickets', icon: Ticket },
  ];

  return (
    <div className="hidden md:flex items-center space-x-6 flex-1 justify-center mx-8">
      <Link
        to="/"
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
          isActive('/')
            ? 'text-ocean-600 bg-ocean-50'
            : 'text-gray-700 hover:text-ocean-600'
        }`}
      >
        首页
      </Link>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-ocean-600">
              出行
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-[300px] gap-3 p-4">
                {travelOptions.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="flex items-center space-x-3 rounded-md p-3 hover:bg-gray-50 transition-colors"
                  >
                    <item.icon className="h-5 w-5 text-ocean-600" />
                    <span className="text-sm font-medium">{item.name}</span>
                  </Link>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {selectedCountry === '中国' && (
        <>
          <Link
            to="/local-experts"
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
              isActive('/local-experts')
                ? 'text-ocean-600 bg-ocean-50'
                : 'text-gray-700 hover:text-ocean-600'
            }`}
          >
            本地达人
          </Link>
          <Link
            to="/shop"
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
              isActive('/shop')
                ? 'text-ocean-600 bg-ocean-50'
                : 'text-gray-700 hover:text-ocean-600'
            }`}
          >
            特色商城
          </Link>
          <Link
            to="/mystery-box"
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
              isActive('/mystery-box')
                ? 'text-ocean-600 bg-ocean-50'
                : 'text-gray-700 hover:text-ocean-600'
            }`}
          >
            盲盒旅行
          </Link>
        </>
      )}

      <Link
        to="/community"
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
          isActive('/community')
            ? 'text-ocean-600 bg-ocean-50'
            : 'text-gray-700 hover:text-ocean-600'
        }`}
      >
        社区
      </Link>
      <Link
        to="/membership"
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
          isActive('/membership')
            ? 'text-ocean-600 bg-ocean-50'
            : 'text-gray-700 hover:text-ocean-600'
        }`}
      >
        会员
      </Link>
    </div>
  );
};

export default NavbarNavigation;
