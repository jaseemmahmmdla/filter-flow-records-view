import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import SubHeader from '@/components/SubHeader';
import FilterPanel from '@/components/FilterPanel';
import TrialDatabase from '@/components/TrialDatabase';
import TrialDetailView from '@/components/TrialDetailView';
import OutcomesLanding from '@/components/OutcomesLanding';
import AbstractsOverview from '@/components/AbstractsOverview';
import ApprovedTreatments from '@/components/ApprovedTreatments';
import AIAssistant from './AIAssistant';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PanelLeftOpen, PanelLeftClose } from 'lucide-react';

const Index = () => {
  const [filters, setFilters] = useState({});
  const [activeView, setActiveView] = useState('home');
  const [filterPanelCollapsed, setFilterPanelCollapsed] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState('');
  const [selectedTrial, setSelectedTrial] = useState(null);
  const [viewMode, setViewMode] = useState('database'); // 'database', 'detail', or 'overview'

  console.log('Index.tsx - Current state:', { activeView, viewMode, selectedProfile });

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
    console.log('Clinical trial filters applied:', newFilters);
  };

  const toggleFilterPanel = () => {
    setFilterPanelCollapsed(!filterPanelCollapsed);
  };

  const handleGetStarted = () => {
    console.log('handleGetStarted called');
    // Check if there's a search selection in sessionStorage
    const searchSelection = sessionStorage.getItem('searchSelection');
    if (searchSelection) {
      const { entity, profile } = JSON.parse(searchSelection);
      
      // Apply the filter based on the search selection
      const newFilter = { [entity]: profile };
      setFilters(newFilter);
      setSelectedProfile(profile);
      
      // Clear the search selection
      sessionStorage.removeItem('searchSelection');
    }
    
    setActiveView('abstracts');
    setViewMode('overview'); // Start with overview when coming from landing
    console.log('Set activeView to abstracts and viewMode to overview');
  };

  const handleTrialSelect = (trial: any) => {
    setSelectedTrial(trial);
    setViewMode('detail');
  };

  const handleBackToDatabase = () => {
    setSelectedTrial(null);
    setViewMode('database');
  };

  const handleBackToOverview = () => {
    setSelectedTrial(null);
    setViewMode('overview');
  };

  // Check for search selection on component mount
  useEffect(() => {
    const searchSelection = sessionStorage.getItem('searchSelection');
    if (searchSelection && activeView === 'abstracts') {
      const { entity, profile } = JSON.parse(searchSelection);
      const newFilter = { [entity]: profile };
      setFilters(newFilter);
      setSelectedProfile(profile);
      sessionStorage.removeItem('searchSelection');
    }
  }, [activeView]);

  // Mock function to get abstracts count based on filters/selected profile
  const getAbstractsCount = () => {
    // This would normally come from your data source
    // For now, returning a mock number based on the selected profile
    if (selectedProfile) {
      return Math.floor(Math.random() * 500) + 100; // Mock count between 100-600
    }
    return 0;
  };

  const renderSelectedFilters = () => {
    if (!filters || Object.keys(filters).length === 0) {
      return null;
    }
    
    return (
      <div className="flex flex-wrap gap-2">
        {Object.entries(filters).map(([key, value]) => {
          if (value && (Array.isArray(value) ? value.length > 0 : true)) {
            const displayValue = Array.isArray(value) ? value.join(', ') : String(value);
            return (
              <Badge key={key} variant="secondary" className="text-xs">
                {key}: {displayValue}
              </Badge>
            );
          }
          return null;
        })}
      </div>
    );
  };

  console.log('🔵 About to render main JSX - checking activeView and viewMode');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <SubHeader activeView={activeView} setActiveView={setActiveView} />
      
      {activeView === 'home' ? (
        <OutcomesLanding onGetStarted={handleGetStarted} />
      ) : activeView === 'ai-assistant' ? (
        <AIAssistant />
      ) : activeView === 'approved-treatments' ? (
        <ApprovedTreatments />
      ) : activeView === 'abstracts' ? (
        viewMode === 'detail' && selectedTrial ? (
          <TrialDetailView trial={selectedTrial} onBack={handleBackToDatabase} />
        ) : viewMode === 'overview' ? (
          <>
            <div className="h-[calc(100vh-7rem)] relative">
              <ResizablePanelGroup direction="horizontal" className="h-full">
                {!filterPanelCollapsed && (
                  <>
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
                    <ResizableHandle />
                  </>
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
                  
                  {/* Title in the main content area */}
                  <div className="px-6 pt-6 pb-4 bg-white border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h1 className="text-3xl font-bold text-[#1A237E] mb-2">
                          {selectedProfile || 'Abstracts & Overview'}
                        </h1>
                        <div className="flex items-center gap-4">
                          <p className="text-gray-600">
                            {getAbstractsCount()} abstracts
                          </p>
                          {renderSelectedFilters()}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setViewMode('database')}
                        >
                          View Database
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <AbstractsOverview />
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </>
        ) : (
          <div className="h-[calc(100vh-7rem)] relative">
            <ResizablePanelGroup direction="horizontal" className="h-full">
              {!filterPanelCollapsed && (
                <>
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
                  <ResizableHandle />
                </>
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
                
                {/* Title in the main content area */}
                {selectedProfile && (
                  <div className="px-6 pt-6 pb-4 bg-white border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h1 className="text-3xl font-bold text-[#1A237E] mb-2">
                          {selectedProfile}
                        </h1>
                        <div className="flex items-center gap-4">
                          <p className="text-gray-600">
                            {getAbstractsCount()} abstracts
                          </p>
                          {renderSelectedFilters()}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setViewMode('overview')}
                        >
                          View Overview
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                
                <TrialDatabase filters={filters} onTrialSelect={handleTrialSelect} />
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        )
      ) : (
        <div className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {activeView === 'benchmark' ? 'Benchmark Analysis' : 'Analysis'}
              </h1>
              <p className="text-gray-600">
                {activeView === 'benchmark' 
                  ? 'Benchmark clinical trial outcomes and treatments' 
                  : 'Analysis tools and insights'
                }
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-gray-500 text-center py-12">
                {activeView === 'benchmark' 
                  ? 'Benchmark tools will be available here...' 
                  : 'Analysis tools will be available here...'
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
