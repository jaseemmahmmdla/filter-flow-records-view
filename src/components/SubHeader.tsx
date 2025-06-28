
import React from 'react';

interface SubHeaderProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const SubHeader = ({ activeView, setActiveView }: SubHeaderProps) => {
  return (
    <div className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center space-x-8 h-12">
          <button 
            onClick={() => setActiveView('home')}
            className={`transition-colors duration-200 font-medium px-3 py-2 rounded text-sm ${
              activeView === 'home' 
                ? 'text-[#1A237E] bg-blue-50 border-b-2 border-[#1A237E]' 
                : 'text-gray-600 hover:text-[#1A237E]'
            }`}
          >
            Home
          </button>
          <button 
            onClick={() => setActiveView('trials')}
            className={`transition-colors duration-200 font-medium px-3 py-2 rounded text-sm ${
              activeView === 'trials' 
                ? 'text-[#1A237E] bg-blue-50 border-b-2 border-[#1A237E]' 
                : 'text-gray-600 hover:text-[#1A237E]'
            }`}
          >
            Search Trials
          </button>
          <button 
            onClick={() => setActiveView('compare')}
            className={`transition-colors duration-200 font-medium px-3 py-2 rounded text-sm ${
              activeView === 'compare' 
                ? 'text-[#1A237E] bg-blue-50 border-b-2 border-[#1A237E]' 
                : 'text-gray-600 hover:text-[#1A237E]'
            }`}
          >
            Compare
          </button>
          <button 
            onClick={() => setActiveView('trends')}
            className={`transition-colors duration-200 font-medium px-3 py-2 rounded text-sm ${
              activeView === 'trends' 
                ? 'text-[#1A237E] bg-blue-50 border-b-2 border-[#1A237E]' 
                : 'text-gray-600 hover:text-[#1A237E]'
            }`}
          >
            Trends
          </button>
        </nav>
      </div>
    </div>
  );
};

export default SubHeader;
