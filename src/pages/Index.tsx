import React, { useState } from 'react';
import Header from '@/components/Header';
import FilterPanel from '@/components/FilterPanel';
import TrialDatabase from '@/components/TrialDatabase';
import DashboardStats from '@/components/DashboardStats';
import { ResizablePanelGroup, ResizablePanel } from '@/components/ui/resizable';
import { Button } from '@/components/ui/button';
import { PanelLeftOpen, PanelLeftClose } from 'lucide-react';

const Index = () => {
  const [filters, setFilters] = useState({});
  const [activeView, setActiveView] = useState('dashboard');
  const [filterPanelCollapsed, setFilterPanelCollapsed] = useState(false);

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
    console.log('Clinical trial filters applied:', newFilters);
  };

  const toggleFilterPanel = () => {
    setFilterPanelCollapsed(!filterPanelCollapsed);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeView={activeView} setActiveView={setActiveView} />
      
      {activeView === 'dashboard' ? (
        <div className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Oncology Clinical Trial Data Benchmarking Platform
              </h1>
              <p className="text-gray-600">
                Compare clinical trial abstracts, analyze efficacy endpoints, and benchmark oncology treatments
              </p>
            </div>
            
            <DashboardStats />
            
            <div className="mt-8">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Trial Updates</h2>
                <div className="text-gray-500">
                  Latest trials and data will appear here...
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[calc(100vh-4rem)] relative">
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
      )}
    </div>
  );
};

export default Index;
