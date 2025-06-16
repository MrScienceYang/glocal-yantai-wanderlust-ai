
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCityContext } from './CityProvider';

const NavbarNavigation = () => {
  const location = useLocation();
  const { selectedCountry } = useCityContext();

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
  );
};

export default NavbarNavigation;
