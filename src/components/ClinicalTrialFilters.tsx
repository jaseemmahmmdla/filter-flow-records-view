
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
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
  FlaskConical,
  Target,
  Pill,
  BarChart3,
  Calendar
} from 'lucide-react';

interface ClinicalTrialFiltersProps {
  onFiltersChange: (filters: any) => void;
}

const ClinicalTrialFilters: React.FC<ClinicalTrialFiltersProps> = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState({
    search: '',
    indication: '',
    phase: '',
    status: '',
    lineTherapy: '',
    company: '',
    conference: '',
    drugs: [] as string[],
    targets: [] as string[],
    modalities: [] as string[],
    endpoints: [] as string[],
  });

  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);

    // Update active filters
    if (value && (Array.isArray(value) ? value.length > 0 : true) && !activeFilters.includes(key)) {
      setActiveFilters([...activeFilters, key]);
    } else if ((!value || (Array.isArray(value) && value.length === 0)) && activeFilters.includes(key)) {
      setActiveFilters(activeFilters.filter(f => f !== key));
    }
  };

  const handleCheckboxChange = (key: string, value: string, checked: boolean) => {
    const currentArray = filters[key as keyof typeof filters] as string[];
    let newArray;
    
    if (checked) {
      newArray = [...currentArray, value];
    } else {
      newArray = currentArray.filter(item => item !== value);
    }
    
    handleFilterChange(key, newArray);
  };

  const clearFilter = (key: string) => {
    const clearedValue = Array.isArray(filters[key as keyof typeof filters]) ? [] : '';
    handleFilterChange(key, clearedValue);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      search: '',
      indication: '',
      phase: '',
      status: '',
      lineTherapy: '',
      company: '',
      conference: '',
      drugs: [],
      targets: [],
      modalities: [],
      endpoints: [],
    };
    setFilters(clearedFilters);
    setActiveFilters([]);
    onFiltersChange(clearedFilters);
  };

  const indications = [
    { value: 'NSCLC', label: 'Non-Small Cell Lung Cancer' },
    { value: 'HCC', label: 'Hepatocellular Carcinoma' },
    { value: 'BC', label: 'Breast Cancer' },
    { value: 'CRC', label: 'Colorectal Cancer' },
    { value: 'GC', label: 'Gastric Cancer' },
    { value: 'PC', label: 'Pancreatic Cancer' },
  ];

  const phases = [
    { value: 'Phase 1', label: 'Phase 1' },
    { value: 'Phase 2', label: 'Phase 2' },
    { value: 'Phase 3', label: 'Phase 3' },
    { value: 'Phase 1/2', label: 'Phase 1/2' },
  ];

  const statuses = [
    { value: 'Active', label: 'Active' },
    { value: 'Recruiting', label: 'Recruiting' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Terminated', label: 'Terminated' },
  ];

  const lineTherapies = [
    { value: '1L', label: '1st Line' },
    { value: '2L', label: '2nd Line' },
    { value: '3L+', label: '3rd Line+' },
    { value: 'Adjuvant', label: 'Adjuvant' },
    { value: 'Neoadjuvant', label: 'Neoadjuvant' },
  ];

  const companies = [
    { value: 'Bristol Myers Squibb', label: 'Bristol Myers Squibb' },
    { value: 'Merck', label: 'Merck' },
    { value: 'AstraZeneca', label: 'AstraZeneca' },
    { value: 'Roche', label: 'Roche' },
    { value: 'Pfizer', label: 'Pfizer' },
    { value: 'Novartis', label: 'Novartis' },
  ];

  const conferences = [
    { value: 'ASCO 2025', label: 'ASCO 2025' },
    { value: 'SITC 2025', label: 'SITC 2025' },
    { value: 'WCLC 2025', label: 'WCLC 2025' },
    { value: 'ESMO 2024', label: 'ESMO 2024' },
  ];

  const drugOptions = [
    'Nivolumab', 'Pembrolizumab', 'Durvalumab', 'Ipilimumab', 'Tremelimumab',
    'Atezolizumab', 'Avelumab', 'Cemiplimab', 'Trastuzumab', 'Bevacizumab'
  ];

  const targetOptions = [
    'PD-1', 'PD-L1', 'CTLA-4', 'EGFR', 'HER2', 'VEGF', 'ALK', 'ROS1', 'BRAF', 'KRAS'
  ];

  const modalityOptions = [
    'mAb', 'ADC', 'Bispecific', 'CAR-T', 'TCR-T', 'Oncolytic Virus', 'Small Molecule', 'Vaccine'
  ];

  const endpointOptions = [
    'OS', 'PFS', 'ORR', 'DOR', 'DCR', 'Safety', 'QoL', 'PK', 'PD'
  ];

  return (
    <div className="w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Filter className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Clinical Trial Filters</h2>
        </div>
        <p className="text-sm text-gray-500">Filter trials by clinical criteria</p>
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
          Search Trials
        </Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            id="search"
            placeholder="Search by trial name, NCT ID..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Separator className="my-6" />

      {/* Basic Filters */}
      <div className="space-y-4 mb-6">
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">Indication</Label>
          <Select onValueChange={(value) => handleFilterChange('indication', value)} value={filters.indication}>
            <SelectTrigger>
              <SelectValue placeholder="Select indication" />
            </SelectTrigger>
            <SelectContent>
              {indications.map((indication) => (
                <SelectItem key={indication.value} value={indication.value}>
                  {indication.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">Phase</Label>
          <Select onValueChange={(value) => handleFilterChange('phase', value)} value={filters.phase}>
            <SelectTrigger>
              <SelectValue placeholder="Select phase" />
            </SelectTrigger>
            <SelectContent>
              {phases.map((phase) => (
                <SelectItem key={phase.value} value={phase.value}>
                  {phase.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">Status</Label>
          <Select onValueChange={(value) => handleFilterChange('status', value)} value={filters.status}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">Line of Therapy</Label>
          <Select onValueChange={(value) => handleFilterChange('lineTherapy', value)} value={filters.lineTherapy}>
            <SelectTrigger>
              <SelectValue placeholder="Select line of therapy" />
            </SelectTrigger>
            <SelectContent>
              {lineTherapies.map((line) => (
                <SelectItem key={line.value} value={line.value}>
                  {line.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">Company</Label>
          <Select onValueChange={(value) => handleFilterChange('company', value)} value={filters.company}>
            <SelectTrigger>
              <SelectValue placeholder="Select company" />
            </SelectTrigger>
            <SelectContent>
              {companies.map((company) => (
                <SelectItem key={company.value} value={company.value}>
                  {company.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-indigo-600" />
            <Label className="text-sm font-medium text-gray-700">Conference</Label>
          </div>
          <Select onValueChange={(value) => handleFilterChange('conference', value)} value={filters.conference}>
            <SelectTrigger>
              <SelectValue placeholder="Select conference" />
            </SelectTrigger>
            <SelectContent>
              {conferences.map((conference) => (
                <SelectItem key={conference.value} value={conference.value}>
                  {conference.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator className="my-6" />

      {/* Advanced Filters */}
      <div className="space-y-6">
        {/* Drugs */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Pill className="w-4 h-4 text-green-600" />
            <Label className="text-sm font-medium text-gray-700">Drugs</Label>
          </div>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {drugOptions.map((drug) => (
              <div key={drug} className="flex items-center space-x-2">
                <Checkbox
                  id={`drug-${drug}`}
                  checked={filters.drugs.includes(drug)}
                  onCheckedChange={(checked) => handleCheckboxChange('drugs', drug, !!checked)}
                />
                <Label htmlFor={`drug-${drug}`} className="text-sm text-gray-700">
                  {drug}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Targets */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-4 h-4 text-red-600" />
            <Label className="text-sm font-medium text-gray-700">Targets</Label>
          </div>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {targetOptions.map((target) => (
              <div key={target} className="flex items-center space-x-2">
                <Checkbox
                  id={`target-${target}`}
                  checked={filters.targets.includes(target)}
                  onCheckedChange={(checked) => handleCheckboxChange('targets', target, !!checked)}
                />
                <Label htmlFor={`target-${target}`} className="text-sm text-gray-700">
                  {target}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Modalities */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <FlaskConical className="w-4 h-4 text-purple-600" />
            <Label className="text-sm font-medium text-gray-700">Modalities</Label>
          </div>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {modalityOptions.map((modality) => (
              <div key={modality} className="flex items-center space-x-2">
                <Checkbox
                  id={`modality-${modality}`}
                  checked={filters.modalities.includes(modality)}
                  onCheckedChange={(checked) => handleCheckboxChange('modalities', modality, !!checked)}
                />
                <Label htmlFor={`modality-${modality}`} className="text-sm text-gray-700">
                  {modality}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Endpoints */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="w-4 h-4 text-blue-600" />
            <Label className="text-sm font-medium text-gray-700">Endpoints</Label>
          </div>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {endpointOptions.map((endpoint) => (
              <div key={endpoint} className="flex items-center space-x-2">
                <Checkbox
                  id={`endpoint-${endpoint}`}
                  checked={filters.endpoints.includes(endpoint)}
                  onCheckedChange={(checked) => handleCheckboxChange('endpoints', endpoint, !!checked)}
                />
                <Label htmlFor={`endpoint-${endpoint}`} className="text-sm text-gray-700">
                  {endpoint}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      {/* Reset Button */}
      <Button
        variant="outline"
        onClick={clearAllFilters}
        className="w-full"
      >
        <X className="w-4 h-4 mr-2" />
        Reset All Filters
      </Button>
    </div>
  );
};

export default ClinicalTrialFilters;
