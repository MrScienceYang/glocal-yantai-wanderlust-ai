
import React from 'react';
import { Link } from 'react-router-dom';

const NavbarLogo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
      <div className="w-8 h-8 flex items-center justify-center">
        <img 
          src="/lovable-uploads/9ea3528e-5994-48c3-a5bd-2121e5906725.png" 
          alt="Glocal Logo" 
          className="w-8 h-8 object-contain"
        />
      </div>
      <span className="text-2xl font-bold text-gradient bg-gradient-to-r from-ocean-600 to-sunset-500 bg-clip-text text-transparent">
        Glocal
      </span>
    </Link>
  );
};

export default NavbarLogo;
