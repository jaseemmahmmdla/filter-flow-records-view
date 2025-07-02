
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Abstract {
  id: string;
  title: string;
  conference: string;
  presentationDate: string;
  location: string;
  authors: string[];
  abstractNumber: string;
  presentationType: 'Oral Presentation' | 'Poster' | 'Keynote';
  keyFindings: string[];
  endpoints: {
    primary: string[];
    secondary: string[];
  };
  patientPopulation: {
    total: number;
    demographics: string;
  };
  status: 'Published' | 'Presented' | 'Upcoming';
  trialId: string;
  company: string;
  treatment: string;
  indication: string;
  lineOfTherapy: string;
  population: string;
  targetModality: string;
  biomarker: string;
  outcomes: {
    orr: string;
    pfs: string;
    os: string;
  };
  phase: string;
  checkboxId: string;
  patientRatio: string;
}

interface AbstractComparisonProps {
  abstracts: Abstract[];
  open: boolean;
  onClose: () => void;
}

const AbstractComparison = ({ abstracts, open, onClose }: AbstractComparisonProps) => {
  console.log('AbstractComparison rendered with:', { abstracts: abstracts.length, open });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Presented': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Upcoming': return 'bg-amber-100 text-amber-800 border-amber-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Oral Presentation': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Poster': return 'bg-indigo-100 text-indigo-800 border-indigo-300';
      case 'Keynote': return 'bg-orange-100 text-orange-800 border-orange-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getTrialsTitle = () => {
    if (abstracts.length === 2) {
      return `${abstracts[0].trialId} vs. ${abstracts[1].trialId}`;
    }
    return `Trial Comparison (${abstracts.length} trials)`;
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-hidden bg-gradient-to-br from-slate-50 to-white">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-6 border-b border-gray-200">
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Abstract Comparison
          </DialogTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </Button>
        </DialogHeader>
        
        <div className="overflow-auto max-h-[calc(95vh-8rem)]">
          <div className="rounded-xl border border-gray-200 overflow-hidden shadow-lg bg-white">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th colSpan={abstracts.length + 1} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl font-bold py-4 px-6 text-center">
                    {getTrialsTitle()}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <th className="bg-gray-50 text-gray-900 font-semibold py-3 px-4 text-left border-r border-gray-200">
                    Trial Arms
                  </th>
                  {abstracts.map((abstract) => (
                    <td key={`${abstract.id}-treatment`} className="py-3 px-4 text-center font-semibold text-gray-900 border-r border-gray-200 last:border-r-0">
                      {abstract.treatment}
                    </td>
                  ))}
                </tr>

                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <th className="bg-gray-50 text-gray-900 font-semibold py-3 px-4 text-left border-r border-gray-200">
                    Arm Type
                  </th>
                  {abstracts.map((abstract, index) => (
                    <td key={`${abstract.id}-arm-type`} className="py-3 px-4 text-center border-r border-gray-200 last:border-r-0">
                      <span 
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white"
                        style={{
                          background: index === 0 ? '#3f51b5' : index === 1 ? '#78909c' : '#4caf50'
                        }}
                      >
                        {index === 0 ? 'Experimental' : index === 1 ? 'Comparator' : 'Standard of Care'}
                      </span>
                    </td>
                  ))}
                </tr>

                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <th className="bg-gray-50 text-gray-900 font-semibold py-3 px-4 text-left border-r border-gray-200">
                    Patient Cohort
                  </th>
                  {abstracts.map((abstract) => (
                    <td key={`${abstract.id}-population`} className="py-3 px-4 text-sm text-gray-700 border-r border-gray-200 last:border-r-0">
                      {abstract.population}
                    </td>
                  ))}
                </tr>

                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <th className="bg-gray-50 text-gray-900 font-semibold py-3 px-4 text-left border-r border-gray-200">
                    Evaluable Patients
                  </th>
                  {abstracts.map((abstract) => (
                    <td key={`${abstract.id}-patients`} className="py-3 px-4 text-center font-medium text-gray-900 border-r border-gray-200 last:border-r-0">
                      {abstract.patientRatio}
                    </td>
                  ))}
                </tr>

                <tr className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                  <th colSpan={abstracts.length + 1} className="text-blue-900 font-bold py-3 px-4 text-left text-lg">
                    Efficacy Outcomes
                  </th>
                </tr>

                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <th className="bg-gray-50 text-gray-900 font-semibold py-3 px-4 text-left border-r border-gray-200">
                    Overall Survival (OS)
                  </th>
                  {abstracts.map((abstract) => (
                    <td key={`${abstract.id}-os`} className="py-3 px-4 text-center border-r border-gray-200 last:border-r-0">
                      <Badge className="bg-purple-100 text-purple-800 border-purple-300 text-lg py-2 px-4 font-bold">
                        {abstract.outcomes.os}
                      </Badge>
                    </td>
                  ))}
                </tr>

                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <th className="bg-gray-50 text-gray-900 font-semibold py-3 px-4 text-left border-r border-gray-200">
                    Progression-Free Survival (PFS)
                  </th>
                  {abstracts.map((abstract) => (
                    <td key={`${abstract.id}-pfs`} className="py-3 px-4 text-center border-r border-gray-200 last:border-r-0">
                      <Badge className="bg-blue-100 text-blue-800 border-blue-300 text-lg py-2 px-4 font-bold">
                        {abstract.outcomes.pfs}
                      </Badge>
                    </td>
                  ))}
                </tr>

                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <th className="bg-gray-50 text-gray-900 font-semibold py-3 px-4 text-left border-r border-gray-200">
                    Objective Response Rate (ORR)
                  </th>
                  {abstracts.map((abstract) => (
                    <td key={`${abstract.id}-orr`} className="py-3 px-4 text-center border-r border-gray-200 last:border-r-0">
                      <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300 text-lg py-2 px-4 font-bold">
                        {abstract.outcomes.orr}
                      </Badge>
                    </td>
                  ))}
                </tr>

                <tr className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-200">
                  <th colSpan={abstracts.length + 1} className="text-green-900 font-bold py-3 px-4 text-left text-lg">
                    Trial Details
                  </th>
                </tr>

                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <th className="bg-gray-50 text-gray-900 font-semibold py-3 px-4 text-left border-r border-gray-200">
                    Title
                  </th>
                  {abstracts.map((abstract) => (
                    <td key={`${abstract.id}-title`} className="py-3 px-4 text-sm text-gray-700 border-r border-gray-200 last:border-r-0">
                      {abstract.title}
                    </td>
                  ))}
                </tr>

                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <th className="bg-gray-50 text-gray-900 font-semibold py-3 px-4 text-left border-r border-gray-200">
                    Company
                  </th>
                  {abstracts.map((abstract) => (
                    <td key={`${abstract.id}-company`} className="py-3 px-4 text-center border-r border-gray-200 last:border-r-0">
                      <Badge variant="outline" className="bg-gray-50">
                        {abstract.company}
                      </Badge>
                    </td>
                  ))}
                </tr>

                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <th className="bg-gray-50 text-gray-900 font-semibold py-3 px-4 text-left border-r border-gray-200">
                    Phase
                  </th>
                  {abstracts.map((abstract) => (
                    <td key={`${abstract.id}-phase`} className="py-3 px-4 text-center border-r border-gray-200 last:border-r-0">
                      <Badge className="bg-blue-100 text-blue-800 border-blue-300">
                        {abstract.phase}
                      </Badge>
                    </td>
                  ))}
                </tr>

                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <th className="bg-gray-50 text-gray-900 font-semibold py-3 px-4 text-left border-r border-gray-200">
                    Conference
                  </th>
                  {abstracts.map((abstract) => (
                    <td key={`${abstract.id}-conference`} className="py-3 px-4 text-sm text-gray-700 border-r border-gray-200 last:border-r-0">
                      {abstract.conference}
                    </td>
                  ))}
                </tr>

                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <th className="bg-gray-50 text-gray-900 font-semibold py-3 px-4 text-left border-r border-gray-200">
                    Status
                  </th>
                  {abstracts.map((abstract) => (
                    <td key={`${abstract.id}-status`} className="py-3 px-4 text-center border-r border-gray-200 last:border-r-0">
                      <Badge className={getStatusColor(abstract.status)}>
                        {abstract.status}
                      </Badge>
                    </td>
                  ))}
                </tr>

                <tr className="hover:bg-gray-50">
                  <th className="bg-gray-50 text-gray-900 font-semibold py-3 px-4 text-left border-r border-gray-200">
                    Presentation Type
                  </th>
                  {abstracts.map((abstract) => (
                    <td key={`${abstract.id}-type`} className="py-3 px-4 text-center border-r border-gray-200 last:border-r-0">
                      <Badge className={getTypeColor(abstract.presentationType)}>
                        {abstract.presentationType}
                      </Badge>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AbstractComparison;
