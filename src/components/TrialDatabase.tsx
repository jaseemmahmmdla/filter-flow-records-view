import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, GitCompare, Download, MoreHorizontal, LayoutGrid, List, User } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface TrialDatabaseProps {
  filters: any;
}

const TrialDatabase = ({ filters }: TrialDatabaseProps) => {
  const [viewMode, setViewMode] = useState<'card' | 'list'>('list');
  
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
      drug: 'Nivolumab'
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
      drug: 'Pembrolizumab'
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
      drug: 'Durvalumab'
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

  const CompanyLogo = ({ company, logo }: { company: string; logo: string }) => (
    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
      <img 
        src={logo} 
        alt={`${company} logo`}
        className="w-full h-full object-cover"
        onError={(e) => {
          // Fallback to text if image fails to load
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
      {trials.map((trial) => (
        <Card key={trial.id} className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow p-6">
          <div className="flex items-start gap-4">
            <CompanyLogo company={trial.company} logo={trial.companyLogo} />
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0 pr-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-lg">{trial.trialName}</h3>
                      <p className="text-blue-600 font-mono text-sm">{trial.id}</p>
                      
                      {/* Row with phase, status, enrollment, and company */}
                      <div className="flex items-center gap-3 mt-2 flex-wrap">
                        <Badge className={`${getPhaseColor(trial.phase)} border text-xs`}>{trial.phase}</Badge>
                        <Badge className={`${getStatusColor(trial.status)} border text-xs`}>{trial.status}</Badge>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <User className="h-4 w-4" />
                          <span>{trial.enrollment}</span>
                        </div>
                        <span className="text-sm text-gray-600">{trial.company}</span>
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
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <p className="text-gray-700 text-base mt-2 line-clamp-2 font-medium leading-relaxed" title={trial.abstractTitle}>
                          {trial.abstractTitle}
                        </p>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-md">
                        <p>{trial.abstractTitle}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
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
                  <div className="flex items-center gap-2">
                    <Badge className={`${getLineTherapyColor(trial.lineTherapy)} border text-xs`}>{trial.lineTherapy}</Badge>
                    <Badge className={`${getModalityColor(trial.modality)} border text-xs`}>{trial.modality}</Badge>
                  </div>
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
                  <div className="text-center">
                    <p className="text-sm text-gray-500">ORR</p>
                    <p className="font-semibold text-gray-900">{trial.orr}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">PFS</p>
                    <p className="font-semibold text-gray-900">{trial.pfs}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">OS</p>
                    <p className="font-semibold text-gray-900">{trial.os}</p>
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
    <Card className="shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-4 font-medium text-gray-900 min-w-[200px]">Trial</th>
              <th className="text-left p-4 font-medium text-gray-900 min-w-[400px]">Abstract Title</th>
              <th className="text-left p-4 font-medium text-gray-900">Company</th>
              <th className="text-left p-4 font-medium text-gray-900">Phase</th>
              <th className="text-left p-4 font-medium text-gray-900">Status</th>
              <th className="text-left p-4 font-medium text-gray-900">Indication</th>
              <th className="text-left p-4 font-medium text-gray-900">Treatment</th>
              <th className="text-left p-4 font-medium text-gray-900">Target</th>
              <th className="text-left p-4 font-medium text-gray-900">Conference</th>
              <th className="text-left p-4 font-medium text-gray-900">ORR</th>
              <th className="text-left p-4 font-medium text-gray-900">PFS</th>
              <th className="text-left p-4 font-medium text-gray-900">OS</th>
              <th className="text-left p-4 font-medium text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trials.map((trial) => (
              <tr key={trial.id} className="border-b hover:bg-gray-50">
                <td className="p-4 min-w-[200px]">
                  <div className="flex items-center gap-3">
                    <CompanyLogo company={trial.company} logo={trial.companyLogo} />
                    <div>
                      <div className="font-medium text-gray-900">{trial.trialName}</div>
                      <div className="font-mono text-sm text-blue-600">{trial.id}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm text-gray-900 min-w-[400px] max-w-[500px]">
                  <div className="line-clamp-2" title={trial.abstractTitle}>
                    {trial.abstractTitle}
                  </div>
                </td>
                <td className="p-4 text-sm text-gray-900">{trial.company}</td>
                <td className="p-4">
                  <Badge className={`${getPhaseColor(trial.phase)} border text-xs`}>{trial.phase}</Badge>
                </td>
                <td className="p-4">
                  <Badge className={`${getStatusColor(trial.status)} border text-xs`}>{trial.status}</Badge>
                </td>
                <td className="p-4">
                  <div className="text-sm text-gray-900">{trial.indication}</div>
                  <div className="flex gap-1 mt-1">
                    <Badge className={`${getLineTherapyColor(trial.lineTherapy)} border text-xs`}>{trial.lineTherapy}</Badge>
                  </div>
                </td>
                <td className="p-4 text-sm text-gray-900 max-w-48">
                  <div className="truncate">{trial.treatment}</div>
                  <div className="flex gap-1 mt-1">
                    <Badge className={`${getModalityColor(trial.modality)} border text-xs`}>{trial.modality}</Badge>
                  </div>
                </td>
                <td className="p-4 text-sm text-gray-900">{trial.target}</td>
                <td className="p-4">
                  <Badge className={`${getConferenceColor(trial.conference)} border text-xs`}>{trial.conference}</Badge>
                </td>
                <td className="p-4 text-sm font-medium text-gray-900">{trial.orr}</td>
                <td className="p-4 text-sm font-medium text-gray-900">{trial.pfs}</td>
                <td className="p-4 text-sm font-medium text-gray-900">{trial.os}</td>
                <td className="p-4">
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );

  return (
    <div className="flex-1 bg-white">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Clinical Trial Database</h1>
            <p className="text-gray-600 mt-1">{trials.length} trials found</p>
          </div>
          <div className="flex space-x-3">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}
              >
                <List className="w-4 h-4 mr-2" />
                List
              </Button>
              <Button
                variant={viewMode === 'card' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('card')}
                className={viewMode === 'card' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}
              >
                <LayoutGrid className="w-4 h-4 mr-2" />
                Cards
              </Button>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <GitCompare className="h-4 w-4 mr-2" />
              Compare Selected
            </Button>
          </div>
        </div>

        {viewMode === 'card' ? <CardView /> : <ListView />}
      </div>
    </div>
  );
};

export default TrialDatabase;
