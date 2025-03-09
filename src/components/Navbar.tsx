import React from 'react';
import { NavLink } from 'react-router-dom';
import { Shield } from 'lucide-react';

interface NavbarProps {
  isScrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled }) => {
  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-blue-600" />
              <span className="font-bold text-xl text-gray-900">AI Safety</span>
            </NavLink>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {[
              ['Home', '/'],
              ['Live Map', '/live-map'],
              ['Tracking History', '/tracking-history'],
              ['Safety Alerts', '/safety-alerts'],
              ['Device Pairing', '/device-pairing'],
              ['Help', '/help'],
              ['Privacy', '/privacy'],
            ].map(([title, url]) => (
              <NavLink
                key={url}
                to={url}
                className={({ isActive }) => `
                  px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${isActive 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }
                `}
              >
                {title}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;