
import React from 'react';
import { Search, Bell, User } from 'lucide-react';

interface HeaderProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const Header = ({ activeView, setActiveView }: HeaderProps) => {
  return (
    <header className="w-full bg-[#1A237E] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img 
              src="/uploaded-files/image_1735228593436_708542.png" 
              alt="Logo" 
              className="h-10 w-auto"
            />
            <div className="ml-4 text-white">
              <h1 className="text-lg font-semibold">Clinical Trial Outcomes</h1>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => setActiveView('home')}
              className={`transition-colors duration-200 font-medium px-3 py-2 rounded ${
                activeView === 'home' 
                  ? 'text-white bg-white/20' 
                  : 'text-[#e8eff3] hover:text-white'
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => setActiveView('trials')}
              className={`transition-colors duration-200 font-medium px-3 py-2 rounded ${
                activeView === 'trials' 
                  ? 'text-white bg-white/20' 
                  : 'text-[#e8eff3] hover:text-white'
              }`}
            >
              Search Trials
            </button>
            <button 
              onClick={() => setActiveView('compare')}
              className={`transition-colors duration-200 font-medium px-3 py-2 rounded ${
                activeView === 'compare' 
                  ? 'text-white bg-white/20' 
                  : 'text-[#e8eff3] hover:text-white'
              }`}
            >
              Compare
            </button>
            <button 
              onClick={() => setActiveView('trends')}
              className={`transition-colors duration-200 font-medium px-3 py-2 rounded ${
                activeView === 'trends' 
                  ? 'text-white bg-white/20' 
                  : 'text-[#e8eff3] hover:text-white'
              }`}
            >
              Trends
            </button>
          </nav>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="h-5 w-5 text-[#e8eff3] hover:text-white cursor-pointer" />
            </div>
            <Bell className="h-5 w-5 text-[#e8eff3] hover:text-white cursor-pointer" />
            <div className="w-8 h-8 bg-[#e8eff3] rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-[#1A237E]" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
