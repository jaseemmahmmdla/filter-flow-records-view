
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  X, 
  ChevronDown,
  Database,
  Brain,
  BarChart3,
  FileText
} from 'lucide-react';

interface FilterPanelProps {
  onFiltersChange: (filters: any) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    category: '',
    scoreRange: 0,
  });

  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);

    // Update active filters
    if (value && !activeFilters.includes(key)) {
      setActiveFilters([...activeFilters, key]);
    } else if (!value && activeFilters.includes(key)) {
      setActiveFilters(activeFilters.filter(f => f !== key));
    }
  };

  const clearFilter = (key: string) => {
    handleFilterChange(key, key === 'scoreRange' ? 0 : '');
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      search: '',
      status: '',
      category: '',
      scoreRange: 0,
    };
    setFilters(clearedFilters);
    setActiveFilters([]);
    onFiltersChange(clearedFilters);
  };

  const categories = [
    { value: 'ai-models', label: 'AI Models', icon: Brain },
    { value: 'datasets', label: 'Datasets', icon: Database },
    { value: 'analytics', label: 'Analytics', icon: BarChart3 },
    { value: 'reports', label: 'Reports', icon: FileText },
  ];

  const statuses = [
    { value: 'active', label: 'Active' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
    { value: 'archived', label: 'Archived' },
  ];

  return (
    <div className="w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        </div>
        <p className="text-sm text-gray-500">Refine your search results</p>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <Card className="p-4 mb-6 bg-blue-50 border-blue-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-blue-900">Active Filters</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-blue-600 hover:text-blue-800 hover:bg-blue-100 h-auto p-1"
            >
              Clear All
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filterKey) => (
              <Badge
                key={filterKey}
                variant="secondary"
                className="bg-blue-100 text-blue-800 hover:bg-blue-200"
              >
                {filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}
                <button
                  onClick={() => clearFilter(filterKey)}
                  className="ml-1 hover:bg-blue-300 rounded-full"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </Card>
      )}

      {/* Search */}
      <div className="mb-6">
        <Label htmlFor="search" className="text-sm font-medium text-gray-700 mb-2 block">
          Search
        </Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            id="search"
            placeholder="Search records..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="pl-10 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <Separator className="my-6 bg-gray-200" />

      {/* Status Filter */}
      <div className="mb-6">
        <Label className="text-sm font-medium text-gray-700 mb-3 block">
          Status
        </Label>
        <Select onValueChange={(value) => handleFilterChange('status', value)} value={filters.status}>
          <SelectTrigger className="bg-white border-gray-300 focus:border-blue-500">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-200 shadow-lg">
            {statuses.map((status) => (
              <SelectItem key={status.value} value={status.value} className="hover:bg-gray-100">
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <Label className="text-sm font-medium text-gray-700 mb-3 block">
          Category
        </Label>
        <Select onValueChange={(value) => handleFilterChange('category', value)} value={filters.category}>
          <SelectTrigger className="bg-white border-gray-300 focus:border-blue-500">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-200 shadow-lg">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <SelectItem key={category.value} value={category.value} className="hover:bg-gray-100">
                  <div className="flex items-center gap-2">
                    <IconComponent className="w-4 h-4 text-gray-600" />
                    {category.label}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      {/* Score Range */}
      <div className="mb-6">
        <Label className="text-sm font-medium text-gray-700 mb-3 block">
          Minimum Score: {filters.scoreRange}%
        </Label>
        <div className="px-2">
          <Slider
            value={[filters.scoreRange]}
            onValueChange={(value) => handleFilterChange('scoreRange', value[0])}
            max={100}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
      </div>

      <Separator className="my-6 bg-gray-200" />

      {/* Quick Filters */}
      <div className="mb-6">
        <Label className="text-sm font-medium text-gray-700 mb-3 block">
          Quick Filters
        </Label>
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              handleFilterChange('status', 'active');
              handleFilterChange('scoreRange', 80);
            }}
            className="w-full justify-start bg-white border-gray-300 hover:bg-gray-50 hover:border-blue-500"
          >
            High Performance Active
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              handleFilterChange('category', 'ai-models');
              handleFilterChange('status', 'active');
            }}
            className="w-full justify-start bg-white border-gray-300 hover:bg-gray-50 hover:border-blue-500"
          >
            Active AI Models
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleFilterChange('scoreRange', 90)}
            className="w-full justify-start bg-white border-gray-300 hover:bg-gray-50 hover:border-blue-500"
          >
            Top Performers (90%+)
          </Button>
        </div>
      </div>

      {/* Reset Button */}
      <Button
        variant="outline"
        onClick={clearAllFilters}
        className="w-full bg-white border-gray-300 hover:bg-red-50 hover:border-red-500 hover:text-red-600"
      >
        <X className="w-4 h-4 mr-2" />
        Reset All Filters
      </Button>
    </div>
  );
};

export default FilterPanel;
