import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

interface SearchOption {
  entity: string;
  profile: string;
  category: string;
  icon?: string;
}

interface SearchBarProps {
  onSelect: (entity: string, profile: string) => void;
}

const SearchBar = ({ onSelect }: SearchBarProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const searchOptions: SearchOption[] = [
    // Conferences
    { entity: 'conference', profile: 'ASCO 2025', category: 'Conferences', icon: '📅' },
    { entity: 'conference', profile: 'ESMO 2024', category: 'Conferences', icon: '📅' },
    { entity: 'conference', profile: 'ASH 2024', category: 'Conferences', icon: '📅' },
    { entity: 'conference', profile: 'AACR 2025', category: 'Conferences', icon: '📅' },
    { entity: 'conference', profile: 'SITC 2025', category: 'Conferences', icon: '📅' },
    { entity: 'conference', profile: 'WCLC 2025', category: 'Conferences', icon: '📅' },
    { entity: 'conference', profile: 'ELCC 2025', category: 'Conferences', icon: '📅' },
    
    // Indications
    { entity: 'indication', profile: 'Non-small cell lung cancer', category: 'Indications', icon: '🎯' },
    { entity: 'indication', profile: 'Breast cancer', category: 'Indications', icon: '🎯' },
    { entity: 'indication', profile: 'Colorectal cancer', category: 'Indications', icon: '🎯' },
    { entity: 'indication', profile: 'Multiple myeloma', category: 'Indications', icon: '🎯' },
    { entity: 'indication', profile: 'Acute myeloid leukemia', category: 'Indications', icon: '🎯' },
    { entity: 'indication', profile: 'Pancreatic cancer', category: 'Indications', icon: '🎯' },
    
    // Companies
    { entity: 'company', profile: 'Merck', category: 'Companies', icon: '🏢' },
    { entity: 'company', profile: 'Pfizer', category: 'Companies', icon: '🏢' },
    { entity: 'company', profile: 'Bristol Myers Squibb', category: 'Companies', icon: '🏢' },
    { entity: 'company', profile: 'Roche', category: 'Companies', icon: '🏢' },
    { entity: 'company', profile: 'Novartis', category: 'Companies', icon: '🏢' },
    { entity: 'company', profile: 'Johnson & Johnson', category: 'Companies', icon: '🏢' },
    { entity: 'company', profile: 'AstraZeneca', category: 'Companies', icon: '🏢' },
    { entity: 'company', profile: 'Daiichi Sankyo', category: 'Companies', icon: '🏢' },
    
    // Targets
    { entity: 'target', profile: 'PD-1', category: 'Targets', icon: '🔬' },
    { entity: 'target', profile: 'HER2', category: 'Targets', icon: '🔬' },
    { entity: 'target', profile: 'EGFR', category: 'Targets', icon: '🔬' },
    { entity: 'target', profile: 'BCMA', category: 'Targets', icon: '🔬' },
    { entity: 'target', profile: 'Claudin 18.2', category: 'Targets', icon: '🔬' },
    { entity: 'target', profile: 'KRAS G12C', category: 'Targets', icon: '🔬' },
    
    // Modalities
    { entity: 'modality', profile: 'ADC (Antibody-Drug Conjugates)', category: 'Modalities', icon: '💊' },
    { entity: 'modality', profile: 'Bi-specific antibodies', category: 'Modalities', icon: '💊' },
    { entity: 'modality', profile: 'CAR-T therapy', category: 'Modalities', icon: '💊' },
    { entity: 'modality', profile: 'Immunotherapy', category: 'Modalities', icon: '💊' },
    { entity: 'modality', profile: 'Targeted therapy', category: 'Modalities', icon: '💊' },
    
    // Drugs
    { entity: 'drug', profile: 'Keytruda', category: 'Drugs', icon: '💉' },
    { entity: 'drug', profile: 'Enhertu', category: 'Drugs', icon: '💉' },
    { entity: 'drug', profile: 'Teclistamab', category: 'Drugs', icon: '💉' },
    { entity: 'drug', profile: 'Kymriah', category: 'Drugs', icon: '💉' },
    { entity: 'drug', profile: 'Opdivo', category: 'Drugs', icon: '💉' },
    { entity: 'drug', profile: 'Herceptin', category: 'Drugs', icon: '💉' },
  ];

  const filteredOptions = searchOptions.filter(option =>
    option.profile.toLowerCase().includes(searchQuery.toLowerCase()) ||
    option.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedOptions = filteredOptions.reduce((acc, option) => {
    if (!acc[option.category]) {
      acc[option.category] = [];
    }
    acc[option.category].push(option);
    return acc;
  }, {} as Record<string, SearchOption[]>);

  const handleSelect = (option: SearchOption) => {
    setValue(option.profile);
    setOpen(false);
    onSelect(option.entity, option.profile);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full h-14 justify-between text-left font-normal bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-gray-400 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center flex-1">
              <Search className="w-5 h-5 text-gray-500 mr-3" />
              <span className={value ? "text-gray-900" : "text-gray-500"}>
                {value || "Search conferences, indications, companies, targets, modalities, and drugs..."}
              </span>
            </div>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 text-gray-400" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 z-50 border border-gray-200 shadow-lg" style={{ width: 'var(--radix-popover-trigger-width)' }}>
          <Command>
            <CommandInput 
              placeholder="Search..." 
              value={searchQuery}
              onValueChange={setSearchQuery}
              className="border-0"
            />
            <CommandList className="max-h-80">
              <CommandEmpty>No results found.</CommandEmpty>
              {Object.entries(groupedOptions).map(([category, options]) => (
                <CommandGroup key={category} heading={category}>
                  {options.map((option) => (
                    <CommandItem
                      key={`${option.entity}-${option.profile}`}
                      value={option.profile}
                      onSelect={() => handleSelect(option)}
                      className="cursor-pointer hover:bg-gray-50 data-[selected=true]:bg-gray-100"
                    >
                      <span className="mr-3 text-sm">{option.icon}</span>
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">{option.profile}</span>
                        <span className="text-xs text-gray-500 capitalize">{option.entity}</span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SearchBar;
