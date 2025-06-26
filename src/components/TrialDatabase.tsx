
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Compare, Download, MoreHorizontal } from 'lucide-react';

interface TrialDatabaseProps {
  filters: any;
}

const TrialDatabase = ({ filters }: TrialDatabaseProps) => {
  const [trials] = useState([
    {
      id: 'NCT03539536',
      trialName: 'CHECKMATE-123',
      company: 'Bristol Myers Squibb',
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
      os: '21.2m'
    },
    {
      id: 'NCT04567890',
      trialName: 'KEYNOTE-456',
      company: 'Merck',
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
      os: '18.9m'
    },
    {
      id: 'NCT05123456',
      trialName: 'HIMALAYA-2',
      company: 'AstraZeneca',
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
      os: 'NR'
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

  return (
    <div className="flex-1 bg-white">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Clinical Trial Database</h1>
            <p className="text-gray-600 mt-1">{trials.length} trials found</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Compare className="h-4 w-4 mr-2" />
              Compare Selected
            </Button>
          </div>
        </div>

        <Card className="shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-900">Trial ID</th>
                  <th className="text-left p-4 font-medium text-gray-900">Trial Name</th>
                  <th className="text-left p-4 font-medium text-gray-900">Company</th>
                  <th className="text-left p-4 font-medium text-gray-900">Phase</th>
                  <th className="text-left p-4 font-medium text-gray-900">Status</th>
                  <th className="text-left p-4 font-medium text-gray-900">Indication</th>
                  <th className="text-left p-4 font-medium text-gray-900">Treatment</th>
                  <th className="text-left p-4 font-medium text-gray-900">ORR</th>
                  <th className="text-left p-4 font-medium text-gray-900">PFS</th>
                  <th className="text-left p-4 font-medium text-gray-900">OS</th>
                  <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {trials.map((trial, index) => (
                  <tr key={trial.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="font-mono text-sm text-blue-600">{trial.id}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-gray-900">{trial.trialName}</div>
                      <div className="text-sm text-gray-500">{trial.conference}</div>
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
      </div>
    </div>
  );
};

export default TrialDatabase;
