import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, GitCompare, Download, MoreHorizontal, LayoutGrid, List, User } from 'lucide-react';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TrialDatabaseProps {
  filters: any;
}

const ITEMS_PER_PAGE = 5;

const TrialDatabase = ({ filters }: TrialDatabaseProps) => {
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');
  const [currentPage, setCurrentPage] = useState(1);
  
  const [trials] = useState([
    {
      id: 'NCT03539536',
      trialName: 'CHECKMATE-123',
      abstractTitle: 'Nivolumab plus ipilimumab versus chemotherapy as first-line treatment for advanced non-small-cell lung cancer with high PD-L1 expression: primary analysis of CHECKMATE-123',
      company: 'Bristol Myers Squibb',
      companyLogo: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=100&h=100&fit=crop&crop=center',
      phase: 'Phase 3',
      status: 'Active',
      enrollment: '487/500',
      indication: 'NSCLC',
      lineTherapy: '1L',
      stage: 'IV',
      population: 'Metastatic',
      biomarker: 'PD-L1 ≥50%',
      treatment: 'Nivolumab + Ipilimumab',
      conference: 'ASCO 2025',
      orr: '45.2%',
      pfs: '8.2m',
      os: '21.2m',
      target: 'PD-1/CTLA-4',
      modality: 'mAb',
      drug: 'Nivolumab',
      abstractType: 'Oral Presentation'
    },
    {
      id: 'NCT04567890',
      trialName: 'KEYNOTE-456',
      abstractTitle: 'Pembrolizumab plus chemotherapy versus chemotherapy alone as first-line treatment in patients with advanced non-small-cell lung cancer: final overall survival analysis of KEYNOTE-456',
      company: 'Merck',
      companyLogo: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=100&h=100&fit=crop&crop=center',
      phase: 'Phase 3',
      status: 'Completed',
      enrollment: '423/450',
      indication: 'NSCLC',
      lineTherapy: '1L',
      stage: 'IV',
      population: 'Metastatic',
      biomarker: 'All comers',
      treatment: 'Pembrolizumab + Chemotherapy',
      conference: 'ESMO 2024',
      orr: '41.7%',
      pfs: '7.1m',
      os: '18.9m',
      target: 'PD-1',
      modality: 'mAb',
      drug: 'Pembrolizumab',
      abstractType: 'Poster'
    },
    {
      id: 'NCT05123456',
      trialName: 'HIMALAYA-2',
      abstractTitle: 'Durvalumab plus tremelimumab versus sorafenib as first-line treatment for unresectable hepatocellular carcinoma: updated results from HIMALAYA-2',
      company: 'AstraZeneca',
      companyLogo: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=100&h=100&fit=crop&crop=center',
      phase: 'Phase 2',
      status: 'Recruiting',
      enrollment: '156/300',
      indication: 'HCC',
      lineTherapy: '1L',
      stage: 'Advanced',
      population: 'Unresectable',
      biomarker: 'Child-Pugh A',
      treatment: 'Durvalumab + Tremelimumab',
      conference: 'SITC 2025',
      orr: '28.3%',
      pfs: '5.6m',
      os: 'NR',
      target: 'PD-L1/CTLA-4',
      modality: 'mAb',
      drug: 'Durvalumab',
      abstractType: 'Oral Presentation'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'recruiting': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'terminated': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'Phase 1': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Phase 2': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Phase 3': return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getConferenceColor = (conference: string) => {
    switch (conference) {
      case 'ASCO 2025': return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'ESMO 2024': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'SITC 2025': return 'bg-teal-100 text-teal-800 border-teal-200';
      case 'WCLC 2025': return 'bg-violet-100 text-violet-800 border-violet-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getLineTherapyColor = (line: string) => {
    switch (line) {
      case '1L': return 'bg-green-100 text-green-800 border-green-200';
      case '2L': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case '3L+': return 'bg-red-100 text-red-800 border-red-200';
      case 'Adjuvant': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Neoadjuvant': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getModalityColor = (modality: string) => {
    switch (modality) {
      case 'mAb': return 'bg-sky-100 text-sky-800 border-sky-200';
      case 'ADC': return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'Bispecific': return 'bg-lime-100 text-lime-800 border-lime-200';
      case 'Small Molecule': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAbstractTypeColor = (type: string) => {
    switch (type) {
      case 'Oral Presentation': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Poster': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Mini Oral': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const totalPages = Math.ceil(trials.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTrials = trials.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    console.log('Changing to page:', page);
    setCurrentPage(page);
    // Scroll to top when page changes
    document.querySelector('.main-content')?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const CompanyLogo = ({ company, logo }: { company: string; logo: string }) => (
    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
      <img 
        src={logo} 
        alt={`${company} logo`}
        className="w-full h-full object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          target.nextElementSibling?.classList.remove('hidden');
        }}
      />
      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm hidden">
        {company.split(' ').map(word => word[0]).join('').slice(0, 3)}
      </div>
    </div>
  );

  const CardView = () => (
    <div className="grid gap-6">
      {paginatedTrials.map((trial) => (
        <Card key={trial.id} className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow p-6">
          <div className="flex items-start gap-4">
            <CompanyLogo company={trial.company} logo={trial.companyLogo} />
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0 pr-4">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <h3 className="text-xl font-medium text-gray-900 mb-3 line-clamp-2 leading-relaxed" title={trial.abstractTitle}>
                          {trial.abstractTitle}
                        </h3>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-md">
                        <p>{trial.abstractTitle}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <div className="flex items-center gap-3 flex-wrap">
                    <Badge className="bg-slate-100 text-slate-800 border-slate-200 border text-xs font-medium">{trial.trialName}</Badge>
                    <Badge className={`${getPhaseColor(trial.phase)} border text-xs`}>{trial.phase}</Badge>
                    <Badge className={`${getStatusColor(trial.status)} border text-xs`}>{trial.status}</Badge>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <User className="h-4 w-4" />
                      <span>{trial.enrollment}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                  <Badge className={`${getConferenceColor(trial.conference)} border text-xs`}>
                    {trial.conference}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4 mt-4">
                <div>
                  <p className="text-sm text-gray-500">Trial</p>
                  <a 
                    href={`https://clinicaltrials.gov/ct2/show/${trial.id}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-900 hover:text-blue-600 underline font-medium"
                  >
                    {trial.id}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Company</p>
                  <p className="font-medium text-gray-900">{trial.company}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Abstract Type</p>
                  <p className="font-medium text-gray-900">{trial.abstractType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Treatment</p>
                  <p className="font-medium text-gray-900">{trial.treatment}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Indication</p>
                  <p className="font-medium text-gray-900">{trial.indication}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Line of Therapy</p>
                  <p className="font-medium text-gray-900">{trial.lineTherapy}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Population</p>
                  <p className="font-medium text-gray-900">{trial.stage} • {trial.population}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Target/Modality</p>
                  <p className="font-medium text-gray-900">{trial.target}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Biomarker</p>
                  <p className="font-medium text-gray-900">{trial.biomarker}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-6">
                  <div className="text-center bg-blue-50 px-3 py-2 rounded-lg">
                    <p className="text-sm text-blue-600 font-medium">ORR</p>
                    <p className="font-semibold text-blue-900">{trial.orr}</p>
                  </div>
                  <div className="text-center bg-green-50 px-3 py-2 rounded-lg">
                    <p className="text-sm text-green-600 font-medium">PFS</p>
                    <p className="font-semibold text-green-900">{trial.pfs}</p>
                  </div>
                  <div className="text-center bg-purple-50 px-3 py-2 rounded-lg">
                    <p className="text-sm text-purple-600 font-medium">OS</p>
                    <p className="font-semibold text-purple-900">{trial.os}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const ListView = () => (
    <div className="w-full overflow-hidden">
      <Card className="shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[200px]">Trial</TableHead>
                <TableHead className="min-w-[300px] max-w-[400px]">Abstract Title</TableHead>
                <TableHead className="min-w-[120px]">Company</TableHead>
                <TableHead className="min-w-[100px]">Phase</TableHead>
                <TableHead className="min-w-[100px]">Status</TableHead>
                <TableHead className="min-w-[120px]">Indication</TableHead>
                <TableHead className="min-w-[180px]">Treatment</TableHead>
                <TableHead className="min-w-[120px]">Target</TableHead>
                <TableHead className="min-w-[120px]">Conference</TableHead>
                <TableHead className="min-w-[80px]">ORR</TableHead>
                <TableHead className="min-w-[80px]">PFS</TableHead>
                <TableHead className="min-w-[80px]">OS</TableHead>
                <TableHead className="min-w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTrials.map((trial) => (
                <TableRow key={trial.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <CompanyLogo company={trial.company} logo={trial.companyLogo} />
                      <div>
                        <div className="font-medium text-gray-900">{trial.trialName}</div>
                        <a 
                          href={`https://clinicaltrials.gov/ct2/show/${trial.id}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-gray-900 hover:text-blue-600 underline"
                        >
                          {trial.id}
                        </a>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[400px]">
                    <div className="line-clamp-2 text-sm text-gray-900" title={trial.abstractTitle}>
                      {trial.abstractTitle}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-900">{trial.company}</TableCell>
                  <TableCell>
                    <Badge className={`${getPhaseColor(trial.phase)} border text-xs`}>{trial.phase}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(trial.status)} border text-xs`}>{trial.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-900">{trial.indication}</div>
                    <div className="flex gap-1 mt-1">
                      <Badge className={`${getLineTherapyColor(trial.lineTherapy)} border text-xs`}>{trial.lineTherapy}</Badge>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[180px]">
                    <div className="truncate text-sm text-gray-900">{trial.treatment}</div>
                    <div className="flex gap-1 mt-1">
                      <Badge className={`${getModalityColor(trial.modality)} border text-xs`}>{trial.modality}</Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-900">{trial.target}</TableCell>
                  <TableCell>
                    <Badge className={`${getConferenceColor(trial.conference)} border text-xs`}>{trial.conference}</Badge>
                  </TableCell>
                  <TableCell className="text-sm font-medium text-gray-900">{trial.orr}</TableCell>
                  <TableCell className="text-sm font-medium text-gray-900">{trial.pfs}</TableCell>
                  <TableCell className="text-sm font-medium text-gray-900">{trial.os}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );

  const OverviewContent = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Trials</h3>
          <p className="text-3xl font-bold text-blue-600">{trials.length}</p>
          <p className="text-sm text-gray-500 mt-1">Active clinical trials</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Completed Trials</h3>
          <p className="text-3xl font-bold text-green-600">
            {trials.filter(t => t.status === 'Completed').length}
          </p>
          <p className="text-sm text-gray-500 mt-1">Trials with results</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Trials</h3>
          <p className="text-3xl font-bold text-orange-600">
            {trials.filter(t => t.status === 'Active' || t.status === 'Recruiting').length}
          </p>
          <p className="text-sm text-gray-500 mt-1">Ongoing recruitment</p>
        </Card>
      </div>
      
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Trial Distribution by Phase</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['Phase 1', 'Phase 2', 'Phase 3'].map(phase => {
            const count = trials.filter(t => t.phase === phase).length;
            const percentage = Math.round((count / trials.length) * 100);
            return (
              <div key={phase} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{phase}</p>
                  <p className="text-sm text-gray-500">{count} trials</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">{percentage}%</p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <p className="text-gray-700">Most trials are focused on NSCLC (Non-Small Cell Lung Cancer) treatment</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <p className="text-gray-700">PD-1/PD-L1 inhibitors remain the most common treatment approach</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
            <p className="text-gray-700">First-line therapy trials show promising efficacy outcomes</p>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderSelectedFilters = () => {
    if (!filters || Object.keys(filters).length === 0) {
      return <p className="text-gray-600 mt-1">No filters applied</p>;
    }
    
    return (
      <div className="flex flex-wrap gap-2 mt-2">
        {Object.entries(filters).map(([key, value]) => {
          if (value && (Array.isArray(value) ? value.length > 0 : true)) {
            const displayValue = Array.isArray(value) ? value.join(', ') : String(value);
            return (
              <Badge key={key} variant="secondary" className="text-xs">
                {key}: {displayValue}
              </Badge>
            );
          }
          return null;
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-6 main-content">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Kognitic Outcomes</h1>
                {renderSelectedFilters()}
              </div>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <div className="w-full border-b border-gray-200 mb-6">
                <div className="border-b border-gray-200">
                  <TabsList className="inline-flex h-12 items-center justify-start rounded-none bg-transparent p-0">
                    <TabsTrigger 
                      value="overview"
                      className="inline-flex items-center justify-center whitespace-nowrap border-b-2 border-transparent px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent rounded-none bg-transparent shadow-none"
                    >
                      Overview
                    </TabsTrigger>
                    <TabsTrigger 
                      value="clinical-data"
                      className="inline-flex items-center justify-center whitespace-nowrap border-b-2 border-transparent px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent rounded-none bg-transparent shadow-none"
                    >
                      Clinical Data
                    </TabsTrigger>
                  </TabsList>
                </div>
              </div>
              
              <TabsContent value="overview" className="space-y-6">
                <OverviewContent />
              </TabsContent>
              
              <TabsContent value="clinical-data" className="space-y-4">
                <div className="flex justify-end space-x-3 mb-4">
                  <div className="inline-flex items-center bg-gray-100 rounded-xl p-1 gap-1 h-9">
                    <button
                      onClick={() => setViewMode('list')}
                      className={`inline-flex items-center px-2 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 h-7 ${
                        viewMode === 'list'
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('card')}
                      className={`inline-flex items-center px-2 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 h-7 ${
                        viewMode === 'card'
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
                      }`}
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                  </div>
                  <Button variant="outline" size="sm" className="h-9">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm" className="h-9">
                    <GitCompare className="h-4 w-4 mr-2" />
                    Compare Selected
                  </Button>
                </div>

                <div className="space-y-6">
                  {viewMode === 'card' ? <CardView /> : <ListView />}
                </div>

                {/* Pagination - Always visible for debugging */}
                <div className="flex justify-center py-8 border-t border-gray-100 bg-white">
                  <div className="flex flex-col items-center gap-4">
                    <p className="text-sm text-gray-500">
                      Page {currentPage} of {totalPages} ({trials.length} total items)
                    </p>
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                          />
                        </PaginationItem>
                        
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => handlePageChange(page)}
                              isActive={currentPage === page}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        
                        <PaginationItem>
                          <PaginationNext
                            onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default TrialDatabase;
