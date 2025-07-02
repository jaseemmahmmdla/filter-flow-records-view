
import React from 'react';

interface SubHeaderProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const SubHeader = ({ activeView, setActiveView }: SubHeaderProps) => {
  return (
    <div className="w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center space-x-0 h-14">
          <button 
            onClick={() => setActiveView('home')}
            className={`transition-colors duration-200 font-medium px-6 py-4 text-sm border-b-2 ${
              activeView === 'home' 
                ? 'text-gray-900 border-gray-900 bg-gray-50' 
                : 'text-gray-600 hover:text-gray-900 border-transparent hover:bg-gray-50'
            }`}
          >
            Home
          </button>
          <button 
            onClick={() => setActiveView('abstracts')}
            className={`transition-colors duration-200 font-medium px-6 py-4 text-sm border-b-2 ${
              activeView === 'abstracts' 
                ? 'text-gray-900 border-gray-900 bg-gray-50' 
                : 'text-gray-600 hover:text-gray-900 border-transparent hover:bg-gray-50'
            }`}
          >
            Abstracts
          </button>
          <button 
            onClick={() => setActiveView('ai-assistant')}
            className={`transition-colors duration-200 font-medium px-6 py-4 text-sm border-b-2 ${
              activeView === 'ai-assistant' 
                ? 'text-gray-900 border-gray-900 bg-gray-50' 
                : 'text-gray-600 hover:text-gray-900 border-transparent hover:bg-gray-50'
            }`}
          >
            AI Assistant
          </button>
          <button 
            onClick={() => setActiveView('benchmark')}
            className={`transition-colors duration-200 font-medium px-6 py-4 text-sm border-b-2 ${
              activeView === 'benchmark' 
                ? 'text-gray-900 border-gray-900 bg-gray-50' 
                : 'text-gray-600 hover:text-gray-900 border-transparent hover:bg-gray-50'
            }`}
          >
            Benchmark
          </button>
          <button 
            onClick={() => setActiveView('approved-treatments')}
            className={`transition-colors duration-200 font-medium px-6 py-4 text-sm border-b-2 ${
              activeView === 'approved-treatments' 
                ? 'text-gray-900 border-gray-900 bg-gray-50' 
                : 'text-gray-600 hover:text-gray-900 border-transparent hover:bg-gray-50'
            }`}
          >
            Approved Treatments
          </button>
        </nav>
      </div>
    </div>
  );
};

export default SubHeader;
