
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const NavbarLogo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
      <div className="w-8 h-8 gradient-ocean rounded-lg flex items-center justify-center">
        <MapPin className="h-5 w-5 text-white" />
      </div>
      <span className="text-2xl font-bold text-gradient bg-gradient-to-r from-ocean-600 to-sunset-500 bg-clip-text text-transparent">
        Glocal
      </span>
    </Link>
  );
};

export default NavbarLogo;
