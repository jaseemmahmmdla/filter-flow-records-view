
import React, { useState } from 'react';
import Header from '@/components/Header';
import FilterPanel from '@/components/FilterPanel';
import RecordsTable from '@/components/RecordsTable';

const Index = () => {
  const [filters, setFilters] = useState({});

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
    console.log('Filters applied:', newFilters);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <div className="flex flex-1">
        <FilterPanel onFiltersChange={handleFiltersChange} />
        <RecordsTable filters={filters} />
      </div>
    </div>
  );
};

export default Index;
