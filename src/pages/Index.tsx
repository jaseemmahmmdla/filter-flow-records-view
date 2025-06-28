
import React, { useState } from 'react';
import Header from '@/components/Header';
import SubHeader from '@/components/SubHeader';
import FilterPanel from '@/components/FilterPanel';
import TrialDatabase from '@/components/TrialDatabase';
import OutcomesLanding from '@/components/OutcomesLanding';
import AIAssistant from './AIAssistant';
import { ResizablePanelGroup, ResizablePanel } from '@/components/ui/resizable';
import { Button } from '@/components/ui/button';
import { PanelLeftOpen, PanelLeftClose } from 'lucide-react';

const Index = () => {
  const [filters, setFilters] = useState({});
  const [activeView, setActiveView] = useState('home');
  const [filterPanelCollapsed, setFilterPanelCollapsed] = useState(false);

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
    console.log('Clinical trial filters applied:', newFilters);
  };

  const toggleFilterPanel = () => {
    setFilterPanelCollapsed(!filterPanelCollapsed);
  };

  const handleGetStarted = () => {
    setActiveView('trials');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <SubHeader activeView={activeView} setActiveView={setActiveView} />
      
      {activeView === 'home' ? (
        <OutcomesLanding onGetStarted={handleGetStarted} />
      ) : activeView === 'ai-assistant' ? (
        <AIAssistant />
      ) : activeView === 'trials' ? (
        <div className="h-[calc(100vh-7rem)] relative">
          <ResizablePanelGroup direction="horizontal" className="h-full">
            {!filterPanelCollapsed && (
              <ResizablePanel 
                defaultSize={18} 
                minSize={15} 
                maxSize={35}
                className="relative"
              >
                <FilterPanel onFiltersChange={handleFiltersChange} />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleFilterPanel}
                  className="absolute top-4 -right-6 z-10 bg-white shadow-md border-l-0 rounded-l-none"
                >
                  <PanelLeftClose className="w-4 h-4" />
                </Button>
              </ResizablePanel>
            )}
            
            <ResizablePanel defaultSize={filterPanelCollapsed ? 100 : 82} className="relative">
              {filterPanelCollapsed && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleFilterPanel}
                  className="absolute top-4 left-4 z-10 bg-white shadow-md"
                >
                  <PanelLeftOpen className="w-4 h-4" />
                </Button>
              )}
              <TrialDatabase filters={filters} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      ) : (
        <div className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {activeView === 'compare' ? 'Compare Trials' : 'Trends Analysis'}
              </h1>
              <p className="text-gray-600">
                {activeView === 'compare' 
                  ? 'Compare clinical trial outcomes side by side' 
                  : 'Analyze trends in oncology treatment outcomes'
                }
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-gray-500 text-center py-12">
                {activeView === 'compare' 
                  ? 'Comparison tools will be available here...' 
                  : 'Trend analysis tools will be available here...'
                }
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
