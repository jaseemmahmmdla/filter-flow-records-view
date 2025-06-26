
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, GitCompare, Download, MoreHorizontal, LayoutGrid, List } from 'lucide-react';

interface TrialDatabaseProps {
  filters: any;
}

const TrialDatabase = ({ filters }: TrialDatabaseProps) => {
  const [viewMode, setViewMode] = useState<'card' | 'list'>('list');
  
  const [trials] = useState([
    {
      id: 'NCT03539536',
      trialName: 'CHECKMATE-123',
      company: 'Bristol Myers Squibb',
      companyLogo: 'BMS',
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
      company: 'Merck',
      companyLogo: 'MRK',
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
      company: 'AstraZeneca',
      companyLogo: 'AZN',
      phase: 'Phase 2',
      status: 'Recruiting',
      enrollment: '156/300',
      indication: 'HCC',
      lineTherapy: '1L',
      stage: 'Advanced',
      population: 'Unresectable',
      biomarker: 'Child-Pugh A',
      treatment: 'Durvalumab + Tremelimumab',
      conference: 'ASCO 2024',
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
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'recruiting': return 'bg-yellow-100 text-yellow-800';
      case 'terminated': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'Phase 1': return 'bg-purple-100 text-purple-800';
      case 'Phase 2': return 'bg-orange-100 text-orange-800';
      case 'Phase 3': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const CompanyLogo = ({ company, logo }: { company: string; logo: string }) => (
    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
      {logo}
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
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{trial.trialName}</h3>
                  <p className="text-blue-600 font-mono text-sm">{trial.id}</p>
                  <p className="text-gray-600 text-sm mt-1">{trial.company} • {trial.conference}</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Treatment</p>
                  <p className="font-medium text-gray-900">{trial.treatment}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Indication</p>
                  <p className="font-medium text-gray-900">{trial.indication} • {trial.lineTherapy}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Target/Modality</p>
                  <p className="font-medium text-gray-900">{trial.target} • {trial.modality}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Biomarker</p>
                  <p className="font-medium text-gray-900">{trial.biomarker}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <Badge className={getPhaseColor(trial.phase)}>{trial.phase}</Badge>
                <Badge className={getStatusColor(trial.status)}>{trial.status}</Badge>
                <span className="text-sm text-gray-600">Enrollment: {trial.enrollment}</span>
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
              <th className="text-left p-4 font-medium text-gray-900">Trial</th>
              <th className="text-left p-4 font-medium text-gray-900">Company</th>
              <th className="text-left p-4 font-medium text-gray-900">Phase</th>
              <th className="text-left p-4 font-medium text-gray-900">Status</th>
              <th className="text-left p-4 font-medium text-gray-900">Indication</th>
              <th className="text-left p-4 font-medium text-gray-900">Treatment</th>
              <th className="text-left p-4 font-medium text-gray-900">Target</th>
              <th className="text-left p-4 font-medium text-gray-900">ORR</th>
              <th className="text-left p-4 font-medium text-gray-900">PFS</th>
              <th className="text-left p-4 font-medium text-gray-900">OS</th>
              <th className="text-left p-4 font-medium text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trials.map((trial) => (
              <tr key={trial.id} className="border-b hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <CompanyLogo company={trial.company} logo={trial.companyLogo} />
                    <div>
                      <div className="font-medium text-gray-900">{trial.trialName}</div>
                      <div className="font-mono text-sm text-blue-600">{trial.id}</div>
                      <div className="text-sm text-gray-500">{trial.conference}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm text-gray-900">{trial.company}</td>
                <td className="p-4">
                  <Badge className={getPhaseColor(trial.phase)}>{trial.phase}</Badge>
                </td>
                <td className="p-4">
                  <Badge className={getStatusColor(trial.status)}>{trial.status}</Badge>
                </td>
                <td className="p-4">
                  <div className="text-sm text-gray-900">{trial.indication}</div>
                  <div className="text-xs text-gray-500">{trial.lineTherapy} • {trial.biomarker}</div>
                </td>
                <td className="p-4 text-sm text-gray-900 max-w-48">
                  <div className="truncate">{trial.treatment}</div>
                  <div className="text-xs text-gray-500">{trial.drug} • {trial.modality}</div>
                </td>
                <td className="p-4 text-sm text-gray-900">{trial.target}</td>
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
