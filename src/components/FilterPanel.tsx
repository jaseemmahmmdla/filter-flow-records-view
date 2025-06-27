
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
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { 
  Search, 
  Filter, 
  X, 
  Calendar,
  Plus,
  Minus
} from 'lucide-react';

interface FilterCondition {
  field: string;
  operator: 'include' | 'exclude';
  values: string[];
  logic: 'and' | 'or';
}

interface FilterPanelProps {
  onFiltersChange: (filters: any) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onFiltersChange }) => {
  const [recentConference, setRecentConference] = useState('');
  const [filterConditions, setFilterConditions] = useState<FilterCondition[]>([]);
  const [trialIdentifier, setTrialIdentifier] = useState('');

  const filterOptions = {
    conference: ['ASCO 2025', 'SITC 2025', 'WCLC 2025', 'ELCC 2025', 'ESMO 2024', 'ASH 2024'],
    abstractType: ['Oral Presentation', 'Poster', 'Mini Oral', 'Publication', 'Abstract'],
    endpoint: ['ORR', 'PFS', 'OS', 'DFS', 'DCR', 'Safety', 'QoL'],
    indication: ['NSCLC', 'HCC', 'Melanoma', 'Breast Cancer', 'Prostate Cancer', 'Renal Cell Carcinoma'],
    population: ['Metastatic', 'Advanced', 'Locally Advanced', 'Resectable', 'Unresectable'],
    stage: ['I', 'II', 'III', 'IV', 'IIIa', 'IIIb', 'IVa', 'IVb'],
    lineTherapy: ['1L', '2L', '3L+', 'Adjuvant', 'Neoadjuvant', 'Maintenance'],
    biomarker: ['PD-L1 ≥50%', 'PD-L1 1-49%', 'PD-L1 <1%', 'EGFR+', 'ALK+', 'ROS1+', 'KRAS G12C', 'All comers'],
    company: ['Bristol Myers Squibb', 'Merck', 'AstraZeneca', 'Roche', 'Pfizer', 'Novartis', 'GSK'],
    drug: ['Nivolumab', 'Pembrolizumab', 'Durvalumab', 'Atezolizumab', 'Ipilimumab', 'Tremelimumab'],
    target: ['PD-1', 'PD-L1', 'CTLA-4', 'PD-1/CTLA-4', 'PD-L1/CTLA-4', 'EGFR', 'ALK', 'VEGF'],
    modality: ['mAb', 'ADC', 'Bispecific', 'Small Molecule', 'CAR-T', 'Vaccine'],
    trialPhase: ['Phase 1', 'Phase 1/2', 'Phase 2', 'Phase 2/3', 'Phase 3', 'Phase 4'],
    trialStatus: ['Active', 'Recruiting', 'Completed', 'Terminated', 'Suspended', 'Withdrawn']
  };

  const recentConferences = [
    { name: 'ASCO 2025', value: 'asco-2025', color: 'bg-rose-100 text-rose-800 border-rose-200 hover:bg-rose-200' },
    { name: 'SITC 2025', value: 'sitc-2025', color: 'bg-teal-100 text-teal-800 border-teal-200 hover:bg-teal-200' },
    { name: 'WCLC 2025', value: 'wclc-2025', color: 'bg-violet-100 text-violet-800 border-violet-200 hover:bg-violet-200' },
    { name: 'ELCC 2025', value: 'elcc-2025', color: 'bg-indigo-100 text-indigo-800 border-indigo-200 hover:bg-indigo-200' },
  ];

  const addFilterCondition = () => {
    const newCondition: FilterCondition = {
      field: '',
      operator: 'include',
      values: [],
      logic: 'and'
    };
    setFilterConditions([...filterConditions, newCondition]);
  };

  const updateFilterCondition = (index: number, updates: Partial<FilterCondition>) => {
    const updatedConditions = filterConditions.map((condition, i) => 
      i === index ? { ...condition, ...updates } : condition
    );
    setFilterConditions(updatedConditions);
    emitFilters(updatedConditions);
  };

  const removeFilterCondition = (index: number) => {
    const updatedConditions = filterConditions.filter((_, i) => i !== index);
    setFilterConditions(updatedConditions);
    emitFilters(updatedConditions);
  };

  const toggleValue = (conditionIndex: number, value: string) => {
    const condition = filterConditions[conditionIndex];
    const newValues = condition.values.includes(value)
      ? condition.values.filter(v => v !== value)
      : [...condition.values, value];
    
    updateFilterCondition(conditionIndex, { values: newValues });
  };

  const selectAllValues = (conditionIndex: number) => {
    const condition = filterConditions[conditionIndex];
    if (condition.field && filterOptions[condition.field as keyof typeof filterOptions]) {
      updateFilterCondition(conditionIndex, { 
        values: filterOptions[condition.field as keyof typeof filterOptions] 
      });
    }
  };

  const clearValues = (conditionIndex: number) => {
    updateFilterCondition(conditionIndex, { values: [] });
  };

  const emitFilters = (conditions: FilterCondition[]) => {
    const filters = {
      recentConference,
      trialIdentifier,
      conditions
    };
    onFiltersChange(filters);
  };

  const handleRecentConferenceChange = (value: string) => {
    setRecentConference(value);
    emitFilters(filterConditions);
  };

  const handleTrialIdentifierChange = (value: string) => {
    setTrialIdentifier(value);
    emitFilters(filterConditions);
  };

  const clearAllFilters = () => {
    setRecentConference('');
    setTrialIdentifier('');
    setFilterConditions([]);
    onFiltersChange({});
  };

  const getFieldDisplayName = (field: string) => {
    const displayNames: Record<string, string> = {
      conference: 'Conference',
      abstractType: 'Abstract Type',
      endpoint: 'Endpoint',
      indication: 'Indication',
      population: 'Population',
      stage: 'Stage',
      lineTherapy: 'Line of Therapy',
      biomarker: 'Biomarker',
      company: 'Company',
      drug: 'Drug',
      target: 'Target',
      modality: 'Modality',
      trialPhase: 'Trial Phase',
      trialStatus: 'Trial Status'
    };
    return displayNames[field] || field;
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 shadow-sm flex flex-col h-full">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-6">
          <Filter className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        </div>

        {/* Recent Conferences */}
        <div className="mb-6">
          <Label className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Recent Conferences
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {recentConferences.map((conference) => (
              <Button
                key={conference.value}
                variant="outline"
                onClick={() => handleRecentConferenceChange(conference.value)}
                className={`justify-start ${conference.color} text-xs h-8 px-3 transition-colors ${
                  recentConference === conference.value ? 'ring-2 ring-offset-1 ring-gray-400' : ''
                }`}
              >
                {conference.name}
              </Button>
            ))}
          </div>
        </div>

        <Separator className="my-6" />

        {/* Trial Identifier Search */}
        <div className="mb-6">
          <Label htmlFor="trial-identifier" className="text-sm font-medium text-gray-700 mb-2 block">
            Trial ID
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              id="trial-identifier"
              placeholder="e.g., NCT03539536"
              value={trialIdentifier}
              onChange={(e) => handleTrialIdentifierChange(e.target.value)}
              className="pl-10 bg-white border-gray-300"
            />
          </div>
        </div>

        <Separator className="my-6" />

        {/* Filter Actions */}
        <div className="flex gap-2 mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={addFilterCondition}
            className="flex-1"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Filter
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={clearAllFilters}
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Filter Conditions */}
      <div className="flex-1 overflow-y-auto p-6">
        {filterConditions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Filter className="w-8 h-8 mx-auto mb-3 text-gray-300" />
            <p className="text-sm">No filters configured</p>
            <p className="text-xs mt-1">Add filters to refine your search</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filterConditions.map((condition, index) => (
              <Card key={index} className="p-4 border border-gray-200">
                <div className="space-y-4">
                  {/* Logic Operator */}
                  {index > 0 && (
                    <div className="pb-2">
                      <ToggleGroup
                        type="single"
                        value={condition.logic}
                        onValueChange={(value) => value && updateFilterCondition(index, { logic: value as 'and' | 'or' })}
                        className="justify-start"
                      >
                        <ToggleGroupItem value="and" className="text-xs">AND</ToggleGroupItem>
                        <ToggleGroupItem value="or" className="text-xs">OR</ToggleGroupItem>
                      </ToggleGroup>
                    </div>
                  )}

                  {/* Field Selection */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">Field</Label>
                    <Select
                      value={condition.field}
                      onValueChange={(value) => updateFilterCondition(index, { field: value, values: [] })}
                    >
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Select field" />
                      </SelectTrigger>
                      <SelectContent className="bg-white max-h-60">
                        {Object.keys(filterOptions).map((field) => (
                          <SelectItem key={field} value={field}>
                            {getFieldDisplayName(field)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Include/Exclude Toggle */}
                  <div className="flex items-center justify-between">
                    <ToggleGroup
                      type="single"
                      value={condition.operator}
                      onValueChange={(value) => value && updateFilterCondition(index, { operator: value as 'include' | 'exclude' })}
                    >
                      <ToggleGroupItem value="include" className="text-xs bg-green-50">Include</ToggleGroupItem>
                      <ToggleGroupItem value="exclude" className="text-xs bg-red-50">Exclude</ToggleGroupItem>
                    </ToggleGroup>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFilterCondition(index)}
                      className="h-8 w-8 p-0 text-gray-400 hover:text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Value Selection */}
                  {condition.field && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label className="text-sm font-medium text-gray-700">Values</Label>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => selectAllValues(index)}
                            className="h-6 px-2 text-xs text-blue-600"
                          >
                            All
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => clearValues(index)}
                            className="h-6 px-2 text-xs text-gray-600"
                          >
                            Clear
                          </Button>
                        </div>
                      </div>
                      
                      <div className="max-h-32 overflow-y-auto border border-gray-200 rounded-md p-2 space-y-2 bg-gray-50">
                        {filterOptions[condition.field as keyof typeof filterOptions]?.map((option) => (
                          <div key={option} className="flex items-center space-x-2">
                            <Checkbox
                              id={`${index}-${option}`}
                              checked={condition.values.includes(option)}
                              onCheckedChange={() => toggleValue(index, option)}
                              className="border-gray-300"
                            />
                            <Label 
                              htmlFor={`${index}-${option}`} 
                              className="text-sm cursor-pointer flex-1 text-gray-700"
                            >
                              {option}
                            </Label>
                          </div>
                        ))}
                      </div>

                      {/* Selected Values */}
                      {condition.values.length > 0 && (
                        <div className="mt-3 p-2 bg-white border border-gray-200 rounded-md">
                          <p className="text-xs font-medium text-gray-700 mb-2">
                            Selected ({condition.values.length}):
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {condition.values.slice(0, 3).map((value) => (
                              <Badge
                                key={value}
                                variant="secondary"
                                className={`text-xs px-2 py-1 ${
                                  condition.operator === 'include' 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'bg-red-100 text-red-700'
                                }`}
                              >
                                {condition.operator === 'exclude' && <Minus className="w-2 h-2 mr-1" />}
                                {value}
                              </Badge>
                            ))}
                            {condition.values.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{condition.values.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
