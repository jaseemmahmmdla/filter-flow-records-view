
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  Search, 
  Filter, 
  X, 
  ChevronDown,
  ChevronLeft,
  Database,
  Brain,
  BarChart3,
  FileText,
  Tags,
  Calendar
} from 'lucide-react';

interface FilterPanelProps {
  onFiltersChange: (filters: any) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onFiltersChange }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    category: '',
    scoreRange: 0,
    abstractType: '',
    tags: [] as string[],
    conference: '',
  });

  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

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

  const handleTagAdd = (tag: string) => {
    if (tag && !filters.tags.includes(tag)) {
      const newTags = [...filters.tags, tag];
      handleFilterChange('tags', newTags);
      setTagInput('');
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    const newTags = filters.tags.filter(tag => tag !== tagToRemove);
    handleFilterChange('tags', newTags);
  };

  const clearFilter = (key: string) => {
    if (key === 'tags') {
      handleFilterChange(key, []);
    } else {
      handleFilterChange(key, key === 'scoreRange' ? 0 : '');
    }
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      search: '',
      status: '',
      category: '',
      scoreRange: 0,
      abstractType: '',
      tags: [],
      conference: '',
    };
    setFilters(clearedFilters);
    setActiveFilters([]);
    onFiltersChange(clearedFilters);
    setTagInput('');
  };

  const recentConferences = [
    { name: 'ASCO 2025', value: 'asco-2025', color: 'bg-blue-500 hover:bg-blue-600 text-white' },
    { name: 'SITC 2025', value: 'sitc-2025', color: 'bg-green-500 hover:bg-green-600 text-white' },
    { name: 'WCLC 2025', value: 'wclc-2025', color: 'bg-purple-500 hover:bg-purple-600 text-white' },
    { name: 'ELCC 2025', value: 'elcc-2025', color: 'bg-orange-500 hover:bg-orange-600 text-white' },
  ];

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

  const abstractTypes = [
    { value: 'poster', label: 'Poster' },
    { value: 'abstract', label: 'Abstract' },
    { value: 'publication', label: 'Publication' },
  ];

  const commonTags = [
    'Immunotherapy',
    'Targeted Therapy',
    'Combination Therapy',
    'Biomarker',
    'First-line',
    'Metastatic',
    'Phase 3',
    'Efficacy',
  ];

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${isOpen ? 'w-80' : 'w-12'} overflow-hidden`}>
        {/* Collapsible Trigger */}
        <div className="p-3 border-b border-gray-200">
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-between hover:bg-gray-100"
            >
              {isOpen && (
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium">Filters</span>
                </div>
              )}
              {!isOpen && <Filter className="w-4 h-4 text-gray-600" />}
              {isOpen ? (
                <ChevronLeft className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-gray-500 transform -rotate-90" />
              )}
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className="h-[calc(100vh-80px)] overflow-y-auto">
          <div className="p-6">
            {/* Header Description */}
            <div className="mb-6">
              <p className="text-sm text-gray-500">Refine your search results</p>
            </div>

            {/* Recent Conferences */}
            <div className="mb-6">
              <Label className="text-sm font-medium text-gray-700 mb-3 block">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Recent Conferences
                </div>
              </Label>
              <div className="grid grid-cols-2 gap-2">
                {recentConferences.map((conference) => (
                  <Button
                    key={conference.value}
                    onClick={() => handleFilterChange('conference', conference.value)}
                    className={`${conference.color} text-xs h-8 px-2 ${
                      filters.conference === conference.value ? 'ring-2 ring-offset-1 ring-gray-400' : ''
                    }`}
                  >
                    {conference.name}
                  </Button>
                ))}
              </div>
            </div>

            <Separator className="my-6 bg-gray-200" />

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
                      className="bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200"
                    >
                      {filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}
                      <button
                        onClick={() => clearFilter(filterKey)}
                        className="ml-1 hover:bg-purple-300 rounded-full"
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

            {/* Abstract Type Filter */}
            <div className="mb-6">
              <Label className="text-sm font-medium text-gray-700 mb-3 block">
                Abstract Type
              </Label>
              <RadioGroup 
                value={filters.abstractType} 
                onValueChange={(value) => handleFilterChange('abstractType', value)}
                className="space-y-2"
              >
                {abstractTypes.map((type) => (
                  <div key={type.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={type.value} id={type.value} />
                    <Label htmlFor={type.value} className="text-sm font-normal cursor-pointer">
                      {type.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Tags Filter */}
            <div className="mb-6">
              <Label className="text-sm font-medium text-gray-700 mb-3 block">
                <div className="flex items-center gap-2">
                  <Tags className="w-4 h-4" />
                  Tags
                </div>
              </Label>
              
              {/* Tag Input */}
              <div className="relative mb-3">
                <Input
                  placeholder="Add tag..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleTagAdd(tagInput.trim());
                    }
                  }}
                  className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                {tagInput && (
                  <Button
                    size="sm"
                    onClick={() => handleTagAdd(tagInput.trim())}
                    className="absolute right-1 top-1 h-8 px-2"
                  >
                    Add
                  </Button>
                )}
              </div>

              {/* Common Tags */}
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-2">Common tags:</p>
                <div className="flex flex-wrap gap-1">
                  {commonTags.map((tag) => (
                    <Button
                      key={tag}
                      variant="outline"
                      size="sm"
                      onClick={() => handleTagAdd(tag)}
                      disabled={filters.tags.includes(tag)}
                      className="h-6 px-2 text-xs"
                    >
                      {tag}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Selected Tags */}
              {filters.tags.length > 0 && (
                <div>
                  <p className="text-xs text-gray-500 mb-2">Selected tags:</p>
                  <div className="flex flex-wrap gap-1">
                    {filters.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-green-100 text-green-700 border-green-200 hover:bg-green-200"
                      >
                        {tag}
                        <button
                          onClick={() => handleTagRemove(tag)}
                          className="ml-1 hover:bg-green-300 rounded-full"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
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
                    handleFilterChange('abstractType', 'publication');
                    handleFilterChange('status', 'completed');
                  }}
                  className="w-full justify-start bg-white border-gray-300 hover:bg-gray-50 hover:border-blue-500"
                >
                  Published Studies
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    handleTagAdd('Immunotherapy');
                    handleFilterChange('abstractType', 'poster');
                  }}
                  className="w-full justify-start bg-white border-gray-300 hover:bg-gray-50 hover:border-blue-500"
                >
                  Immunotherapy Posters
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
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};

export default FilterPanel;
