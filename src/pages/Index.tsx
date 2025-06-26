
import React, { useState } from 'react';
import FilterPanel from '@/components/FilterPanel';
import RecordsTable from '@/components/RecordsTable';

const Index = () => {
  const [filters, setFilters] = useState({});

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
    console.log('Filters applied:', newFilters);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 flex">
      <FilterPanel onFiltersChange={handleFiltersChange} />
      <RecordsTable filters={filters} />
    </div>
  );
};

export default Index;
