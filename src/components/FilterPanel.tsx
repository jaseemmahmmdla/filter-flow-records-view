
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Calendar, Filter, Search, X, Zap, Target, TrendingUp } from 'lucide-react';

interface FilterPanelProps {
  onFiltersChange: (filters: any) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onFiltersChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [scoreRange, setScoreRange] = useState([0]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleFilterChange = () => {
    const filters = {
      search: searchTerm,
      status: selectedStatus,
      category: selectedCategory,
      scoreRange: scoreRange[0],
    };
    onFiltersChange(filters);
  };

  const addFilter = (filterName: string) => {
    if (!activeFilters.includes(filterName)) {
      setActiveFilters([...activeFilters, filterName]);
    }
  };

  const removeFilter = (filterName: string) => {
    setActiveFilters(activeFilters.filter(f => f !== filterName));
  };

  React.useEffect(() => {
    handleFilterChange();
  }, [searchTerm, selectedStatus, selectedCategory, scoreRange]);

  return (
    <div className="w-80 min-h-screen p-6 bg-white border-r border-gray-200">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
            <Filter className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Smart Filters
          </h2>
        </div>
        <p className="text-sm text-gray-600">Refine your data with precision</p>
      </div>

      {/* Search */}
      <Card className="p-4 mb-6 border border-gray-200 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-500"
          />
        </div>
      </Card>

      {/* Quick Filters */}
      <div className="mb-6">
        <Label className="text-sm font-semibold text-gray-700 mb-3 block">Quick Filters</Label>
        <div className="grid grid-cols-2 gap-2">
          {['High Priority', 'Recent', 'AI Generated', 'Favorites'].map((filter) => (
            <Button
              key={filter}
              variant={activeFilters.includes(filter) ? "default" : "outline"}
              size="sm"
              onClick={() => activeFilters.includes(filter) ? removeFilter(filter) : addFilter(filter)}
              className="text-xs border-gray-300 hover:border-blue-500 hover:bg-blue-50"
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>

      {/* Status Filter */}
      <Card className="p-4 mb-6 border border-gray-200 shadow-sm">
        <Label className="text-sm font-semibold text-gray-700 mb-3 block flex items-center gap-2">
          <Target className="w-4 h-4" />
          Status
        </Label>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="bg-white border-gray-200 text-gray-900">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-200">
            <SelectItem value="active" className="text-gray-900 hover:bg-gray-100">Active</SelectItem>
            <SelectItem value="pending" className="text-gray-900 hover:bg-gray-100">Pending</SelectItem>
            <SelectItem value="completed" className="text-gray-900 hover:bg-gray-100">Completed</SelectItem>
            <SelectItem value="archived" className="text-gray-900 hover:bg-gray-100">Archived</SelectItem>
          </SelectContent>
        </Select>
      </Card>

      {/* Category Filter */}
      <Card className="p-4 mb-6 border border-gray-200 shadow-sm">
        <Label className="text-sm font-semibold text-gray-700 mb-3 block flex items-center gap-2">
          <Zap className="w-4 h-4" />
          Category
        </Label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="bg-white border-gray-200 text-gray-900">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-200">
            <SelectItem value="ai-models" className="text-gray-900 hover:bg-gray-100">AI Models</SelectItem>
            <SelectItem value="datasets" className="text-gray-900 hover:bg-gray-100">Datasets</SelectItem>
            <SelectItem value="analytics" className="text-gray-900 hover:bg-gray-100">Analytics</SelectItem>
            <SelectItem value="reports" className="text-gray-900 hover:bg-gray-100">Reports</SelectItem>
          </SelectContent>
        </Select>
      </Card>

      {/* Score Range */}
      <Card className="p-4 mb-6 border border-gray-200 shadow-sm">
        <Label className="text-sm font-semibold text-gray-700 mb-3 block flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Performance Score: {scoreRange[0]}%
        </Label>
        <Slider
          value={scoreRange}
          onValueChange={setScoreRange}
          max={100}
          step={1}
          className="py-4"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>0%</span>
          <span>100%</span>
        </div>
      </Card>

      {/* Advanced Filters Toggle */}
      <div className="flex items-center justify-between mb-4">
        <Label className="text-sm font-semibold text-gray-700">Advanced Filters</Label>
        <Switch
          checked={showAdvanced}
          onCheckedChange={setShowAdvanced}
        />
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <Card className="p-4 mb-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <Label className="text-sm font-semibold text-gray-700">Active Filters</Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveFilters([])}
              className="text-xs text-gray-600 hover:text-gray-900"
            >
              Clear All
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter) => (
              <Badge
                key={filter}
                variant="secondary"
                className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
              >
                {filter}
                <X
                  className="w-3 h-3 ml-1 cursor-pointer"
                  onClick={() => removeFilter(filter)}
                />
              </Badge>
            ))}
          </div>
        </Card>
      )}

      {/* Apply Filters Button */}
      <Button
        onClick={handleFilterChange}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2.5"
      >
        Apply Filters
      </Button>
    </div>
  );
};

export default FilterPanel;
