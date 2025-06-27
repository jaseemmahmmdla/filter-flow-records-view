
import React, { useState } from 'react';
import Header from '@/components/Header';
import FilterPanel from '@/components/FilterPanel';
import TrialDatabase from '@/components/TrialDatabase';
import DashboardStats from '@/components/DashboardStats';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

const Index = () => {
  const [filters, setFilters] = useState({});
  const [activeView, setActiveView] = useState('dashboard');

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
    console.log('Clinical trial filters applied:', newFilters);
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
        <div className="h-[calc(100vh-4rem)]">
          <ResizablePanelGroup direction="horizontal" className="h-full">
            <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
              <FilterPanel onFiltersChange={handleFiltersChange} />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={75}>
              <TrialDatabase filters={filters} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      )}
    </div>
  );
};

export default Index;
