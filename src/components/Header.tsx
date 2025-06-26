
import React from 'react';

const Header = () => {
  return (
    <header className="w-full bg-[#1A237E] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-display font-semibold text-white">
              Dashboard
            </h1>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-[#e8eff3] hover:text-white transition-colors duration-200 font-medium">
              Overview
            </a>
            <a href="#" className="text-[#e8eff3] hover:text-white transition-colors duration-200 font-medium">
              Analytics
            </a>
            <a href="#" className="text-[#e8eff3] hover:text-white transition-colors duration-200 font-medium">
              Reports
            </a>
            <a href="#" className="text-[#e8eff3] hover:text-white transition-colors duration-200 font-medium">
              Settings
            </a>
          </nav>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-[#e8eff3] rounded-full flex items-center justify-center">
              <span className="text-[#1A237E] font-medium text-sm">U</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
