
import React, { useState } from 'react';
import Header from '@/components/Header';
import SubHeader from '@/components/SubHeader';
import DashboardStats from '@/components/DashboardStats';
import TrialDatabase from '@/components/TrialDatabase';
import FilterPanel from '@/components/FilterPanel';
import RecordsTable from '@/components/RecordsTable';
import OverviewCharts from '@/components/OverviewCharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    category: '',
    scoreRange: 0
  });

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <SubHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2 font-display">
            Clinical Trial Intelligence Platform
          </h1>
          <p className="text-lg text-slate-600 font-body">
            Comprehensive analysis and insights for clinical trial data
          </p>
        </div>

        <DashboardStats />

        <div className="mt-12">
          <Tabs defaultValue="database" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-white border border-slate-200 rounded-lg p-1">
              <TabsTrigger 
                value="database" 
                className="data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900 text-slate-600 font-medium"
              >
                Trial Database
              </TabsTrigger>
              <TabsTrigger 
                value="records" 
                className="data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900 text-slate-600 font-medium"
              >
                AI Records
              </TabsTrigger>
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900 text-slate-600 font-medium"
              >
                Overview Charts
              </TabsTrigger>
              <TabsTrigger 
                value="analytics" 
                className="data-[state=active]:bg-slate-100 data-[state=active]:text-slate-900 text-slate-600 font-medium"
              >
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="database" className="mt-8">
              <div className="flex gap-8">
                <div className="w-80 flex-shrink-0">
                  <FilterPanel onFiltersChange={handleFiltersChange} />
                </div>
                <div className="flex-1">
                  <TrialDatabase filters={filters} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="records" className="mt-8">
              <div className="flex gap-8">
                <div className="w-80 flex-shrink-0">
                  <FilterPanel onFiltersChange={handleFiltersChange} />
                </div>
                <RecordsTable filters={filters} />
              </div>
            </TabsContent>

            <TabsContent value="overview" className="mt-8">
              <OverviewCharts />
            </TabsContent>

            <TabsContent value="analytics" className="mt-8">
              <div className="text-center py-16 text-slate-500">
                <p className="text-lg">Analytics dashboard coming soon...</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Index;
