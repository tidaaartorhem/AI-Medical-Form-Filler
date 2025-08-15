
import React from 'react';
import { LogoIcon } from './icons/Icons';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center space-x-3">
          <LogoIcon className="h-8 w-8 text-brand-600" />
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
            AI Medical Form Filler
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
