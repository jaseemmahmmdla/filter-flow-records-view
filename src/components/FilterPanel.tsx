
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
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
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { 
  Search, 
  Filter, 
  X, 
  ChevronDown,
  ChevronUp,
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
  const [isExpanded, setIsExpanded] = useState(false);
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
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="p-6">
        {/* Always visible row with Recent Conferences and Trial Identifier */}
        <div className="flex items-center gap-8 mb-4">
          {/* Recent Conferences */}
          <div className="flex items-center gap-4">
            <Label className="text-sm font-medium text-gray-700 whitespace-nowrap">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Recent Conferences
              </div>
            </Label>
            <div className="flex gap-2">
              {recentConferences.map((conference) => (
                <Button
                  key={conference.value}
                  variant="outline"
                  onClick={() => handleRecentConferenceChange(conference.value)}
                  className={`${conference.color} border text-xs h-8 px-3 transition-colors ${
                    recentConference === conference.value ? 'ring-2 ring-offset-1 ring-gray-400' : ''
                  }`}
                >
                  {conference.name}
                </Button>
              ))}
            </div>
          </div>

          <Separator orientation="vertical" className="h-8" />

          {/* Trial Identifier Search */}
          <div className="flex items-center gap-4">
            <Label htmlFor="trial-identifier" className="text-sm font-medium text-gray-700 whitespace-nowrap">
              Trial ID
            </Label>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="trial-identifier"
                placeholder="e.g., NCT03539536"
                value={trialIdentifier}
                onChange={(e) => handleTrialIdentifierChange(e.target.value)}
                className="pl-10 h-8 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <Separator orientation="vertical" className="h-8" />

          {/* Expand/Collapse Toggle */}
          <div className="flex items-center gap-4 ml-auto">
            <span className="text-sm text-gray-600">
              {filterConditions.length} filter{filterConditions.length !== 1 ? 's' : ''} applied
            </span>
            <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
              <CollapsibleTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Advanced Filters
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 ml-2" />
                  ) : (
                    <ChevronDown className="w-4 h-4 ml-2" />
                  )}
                </Button>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  {/* Header Section */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Advanced Filter Builder</h3>
                      <p className="text-sm text-gray-500 mt-1">Build complex queries with multiple conditions</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={addFilterCondition}
                        className="h-9 px-4"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Filter
                      </Button>
                      <Button
                        variant="outline"
                        onClick={clearAllFilters}
                        className="h-9 px-4 text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Reset All
                      </Button>
                    </div>
                  </div>

                  {/* Filter Conditions */}
                  {filterConditions.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                      <div className="max-w-sm mx-auto">
                        <Filter className="w-8 h-8 mx-auto mb-4 text-gray-400" />
                        <h4 className="text-lg font-medium text-gray-900 mb-2">No filters configured</h4>
                        <p className="text-sm text-gray-500 mb-4">
                          Create advanced filters to refine your clinical trial search with complex conditions
                        </p>
                        <Button
                          variant="outline"
                          onClick={addFilterCondition}
                          className="h-9 px-4"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Your First Filter
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filterConditions.map((condition, index) => (
                        <Card key={index} className="p-6 border border-gray-200 shadow-sm">
                          <div className="space-y-5">
                            {/* Logic Operator (except for first condition) */}
                            {index > 0 && (
                              <div className="flex items-center gap-3 pb-2">
                                <span className="text-sm font-medium text-gray-700">Logic:</span>
                                <ToggleGroup
                                  type="single"
                                  value={condition.logic}
                                  onValueChange={(value) => value && updateFilterCondition(index, { logic: value as 'and' | 'or' })}
                                  className="h-9"
                                >
                                  <ToggleGroupItem 
                                    value="and" 
                                    className="px-4 py-2 text-sm font-medium data-[state=on]:bg-blue-100 data-[state=on]:text-blue-800"
                                  >
                                    AND
                                  </ToggleGroupItem>
                                  <ToggleGroupItem 
                                    value="or" 
                                    className="px-4 py-2 text-sm font-medium data-[state=on]:bg-purple-100 data-[state=on]:text-purple-800"
                                  >
                                    OR
                                  </ToggleGroupItem>
                                </ToggleGroup>
                              </div>
                            )}

                            {/* Field Selection Row */}
                            <div className="flex items-center gap-4">
                              <div className="flex-1">
                                <Label className="text-sm font-medium text-gray-700 mb-2 block">Field</Label>
                                <Select
                                  value={condition.field}
                                  onValueChange={(value) => updateFilterCondition(index, { field: value, values: [] })}
                                >
                                  <SelectTrigger className="bg-white border-gray-300 h-10">
                                    <SelectValue placeholder="Select field to filter by" />
                                  </SelectTrigger>
                                  <SelectContent className="bg-white border-gray-200 shadow-lg max-h-60">
                                    {Object.keys(filterOptions).map((field) => (
                                      <SelectItem key={field} value={field} className="hover:bg-gray-100 py-2">
                                        {getFieldDisplayName(field)}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="w-32">
                                <Label className="text-sm font-medium text-gray-700 mb-2 block">Condition</Label>
                                <ToggleGroup
                                  type="single"
                                  value={condition.operator}
                                  onValueChange={(value) => value && updateFilterCondition(index, { operator: value as 'include' | 'exclude' })}
                                  className="h-10 w-full"
                                >
                                  <ToggleGroupItem 
                                    value="include" 
                                    className="flex-1 text-sm bg-green-50 data-[state=on]:bg-green-100 data-[state=on]:text-green-800 border-green-200"
                                  >
                                    Include
                                  </ToggleGroupItem>
                                  <ToggleGroupItem 
                                    value="exclude" 
                                    className="flex-1 text-sm bg-red-50 data-[state=on]:bg-red-100 data-[state=on]:text-red-800 border-red-200"
                                  >
                                    Exclude
                                  </ToggleGroupItem>
                                </ToggleGroup>
                              </div>

                              <div className="pt-6">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFilterCondition(index)}
                                  className="h-10 w-10 p-0 text-gray-400 hover:text-red-600 hover:bg-red-50"
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>

                            {/* Value Selection */}
                            {condition.field && (
                              <div>
                                <div className="flex items-center justify-between mb-3">
                                  <Label className="text-sm font-medium text-gray-700">Values</Label>
                                  <div className="flex gap-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => selectAllValues(index)}
                                      className="h-7 px-3 text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                                    >
                                      Select All
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => clearValues(index)}
                                      className="h-7 px-3 text-xs text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                                    >
                                      Clear
                                    </Button>
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-4 bg-gray-50">
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

                                {/* Selected Values Display */}
                                {condition.values.length > 0 && (
                                  <div className="mt-4 p-3 bg-white border border-gray-200 rounded-lg">
                                    <p className="text-sm font-medium text-gray-700 mb-2">
                                      Selected ({condition.values.length}):
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                      {condition.values.map((value) => (
                                        <Badge
                                          key={value}
                                          variant="secondary"
                                          className={`text-xs px-2 py-1 ${
                                            condition.operator === 'include' 
                                              ? 'bg-green-100 text-green-700 border-green-200' 
                                              : 'bg-red-100 text-red-700 border-red-200'
                                          }`}
                                        >
                                          {condition.operator === 'exclude' && <Minus className="w-3 h-3 mr-1" />}
                                          {value}
                                          <button
                                            onClick={() => toggleValue(index, value)}
                                            className="ml-2 hover:bg-black hover:bg-opacity-10 rounded-full p-0.5"
                                          >
                                            <X className="w-3 h-3" />
                                          </button>
                                        </Badge>
                                      ))}
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
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
