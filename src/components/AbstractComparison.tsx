import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
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

  const getTrialsTitle = () => {
    if (abstracts.length === 2) {
      return `${abstracts[0].trialId} vs. ${abstracts[1].trialId}`;
    }
    return `Trial Comparison (${abstracts.length} trials)`;
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-hidden bg-white font-sans">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-6 border-b border-[#ddd]">
          <div>
            <DialogTitle className="text-3xl font-bold text-[#172B4D] font-sans">
              Abstract Comparison
            </DialogTitle>
            <DialogDescription className="text-[#6c757d] font-sans mt-2">
              Compare clinical trial abstracts side by side to analyze key differences and similarities.
            </DialogDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-[#e9ecef] rounded-full">
            <X className="w-5 h-5" />
          </Button>
        </DialogHeader>
        
        <div className="overflow-auto max-h-[calc(95vh-8rem)] main-content">
          <table className="comparison-table w-full border-collapse border-spacing-0 border-0 overflow-hidden mt-5 font-sans">
            <thead>
              <tr>
                <th colSpan={abstracts.length + 1} className="table-header bg-[#1A237E] text-white text-center text-xl font-bold py-4 px-4">
                  {getTrialsTitle()}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="bg-[#F5F8FA] text-[#333] font-bold py-3 px-4 text-left border border-[#ddd]">Trial arms</th>
                {abstracts.map((abstract) => (
                  <td key={`${abstract.id}-treatment`} className="py-3 px-4 text-center font-bold text-[#172B4D] border border-[#ddd]">
                    <b>{abstract.treatment}</b>
                  </td>
                ))}
              </tr>

              <tr className="hover:bg-[#e9ecef]">
                <th className="bg-[#F5F8FA] text-[#333] font-bold py-3 px-4 text-left border border-[#ddd]">Arm type</th>
                {abstracts.map((abstract, index) => (
                  <td key={`${abstract.id}-arm-type`} className="py-3 px-4 text-center border border-[#ddd]">
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

              <tr className="hover:bg-[#e9ecef]">
                <th className="bg-[#F5F8FA] text-[#333] font-bold py-3 px-4 text-left border border-[#ddd]">Patient Cohort</th>
                {abstracts.map((abstract) => (
                  <td key={`${abstract.id}-population`} className="py-3 px-4 text-sm text-[#172B4D] border border-[#ddd]">
                    {abstract.population}
                  </td>
                ))}
              </tr>

              <tr className="hover:bg-[#e9ecef]">
                <th className="bg-[#F5F8FA] text-[#333] font-bold py-3 px-4 text-left border border-[#ddd]">Evaluable patients per Cohort</th>
                {abstracts.map((abstract) => (
                  <td key={`${abstract.id}-patients`} className="py-3 px-4 text-center font-medium text-[#172B4D] border border-[#ddd]">
                    {abstract.patientRatio}
                  </td>
                ))}
              </tr>

              <tr className="group-header">
                <th colSpan={abstracts.length + 1} className="bg-[#e9ecef] text-[#495057] font-bold py-3 px-4 text-left border border-[#ddd]">
                  Efficacy Outcomes
                </th>
              </tr>

              <tr className="hover:bg-[#e9ecef]">
                <th className="bg-[#F5F8FA] text-[#333] font-bold py-3 px-4 text-left border border-[#ddd]">Overall Survival (OS)</th>
                {abstracts.map((abstract) => (
                  <td key={`${abstract.id}-os`} className="py-3 px-4 text-center border border-[#ddd]">
                    <span className="value font-bold text-[#1A237E]">
                      {abstract.outcomes.os}
                    </span>
                  </td>
                ))}
              </tr>

              <tr className="hover:bg-[#e9ecef]">
                <th className="bg-[#F5F8FA] text-[#333] font-bold py-3 px-4 text-left border border-[#ddd]">Progression-Free Survival (PFS)</th>
                {abstracts.map((abstract) => (
                  <td key={`${abstract.id}-pfs`} className="py-3 px-4 text-center border border-[#ddd]">
                    <span className="value font-bold text-[#1A237E]">
                      {abstract.outcomes.pfs}
                    </span>
                  </td>
                ))}
              </tr>

              <tr className="hover:bg-[#e9ecef]">
                <th className="bg-[#F5F8FA] text-[#333] font-bold py-3 px-4 text-left border border-[#ddd]">Objective Response Rate (ORR)</th>
                {abstracts.map((abstract) => (
                  <td key={`${abstract.id}-orr`} className="py-3 px-4 text-center border border-[#ddd]">
                    <span className="value font-bold text-[#1A237E]">
                      {abstract.outcomes.orr}
                    </span>
                  </td>
                ))}
              </tr>

              <tr className="group-header">
                <th colSpan={abstracts.length + 1} className="bg-[#e9ecef] text-[#495057] font-bold py-3 px-4 text-left border border-[#ddd]">
                  Trial Details
                </th>
              </tr>

              <tr className="hover:bg-[#e9ecef]">
                <th className="bg-[#F5F8FA] text-[#333] font-bold py-3 px-4 text-left border border-[#ddd]">Title</th>
                {abstracts.map((abstract) => (
                  <td key={`${abstract.id}-title`} className="py-3 px-4 text-sm text-[#172B4D] border border-[#ddd]">
                    {abstract.title}
                  </td>
                ))}
              </tr>

              <tr className="hover:bg-[#e9ecef]">
                <th className="bg-[#F5F8FA] text-[#333] font-bold py-3 px-4 text-left border border-[#ddd]">Company</th>
                {abstracts.map((abstract) => (
                  <td key={`${abstract.id}-company`} className="py-3 px-4 text-center border border-[#ddd]">
                    <span className="bg-[#F5F8FA] text-[#172B4D] px-2 py-1 rounded text-sm border border-[#ddd]">
                      {abstract.company}
                    </span>
                  </td>
                ))}
              </tr>

              <tr className="hover:bg-[#e9ecef]">
                <th className="bg-[#F5F8FA] text-[#333] font-bold py-3 px-4 text-left border border-[#ddd]">Phase</th>
                {abstracts.map((abstract) => (
                  <td key={`${abstract.id}-phase`} className="py-3 px-4 text-center border border-[#ddd]">
                    <span className="bg-blue-50 text-blue-700 border-blue-200 px-2 py-1 rounded text-sm border">
                      {abstract.phase}
                    </span>
                  </td>
                ))}
              </tr>

              <tr className="hover:bg-[#e9ecef]">
                <th className="bg-[#F5F8FA] text-[#333] font-bold py-3 px-4 text-left border border-[#ddd]">Conference</th>
                {abstracts.map((abstract) => (
                  <td key={`${abstract.id}-conference`} className="py-3 px-4 text-sm text-[#172B4D] border border-[#ddd]">
                    {abstract.conference}
                  </td>
                ))}
              </tr>

              <tr className="hover:bg-[#e9ecef]">
                <th className="bg-[#F5F8FA] text-[#333] font-bold py-3 px-4 text-left border border-[#ddd]">Status</th>
                {abstracts.map((abstract) => (
                  <td key={`${abstract.id}-status`} className="py-3 px-4 text-center border border-[#ddd]">
                    <span className={`px-2 py-1 rounded text-sm border ${
                      abstract.status === 'Published' ? 'bg-green-50 text-green-700 border-green-200' :
                      abstract.status === 'Presented' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      'bg-yellow-50 text-yellow-700 border-yellow-200'
                    }`}>
                      {abstract.status}
                    </span>
                  </td>
                ))}
              </tr>

              <tr className="hover:bg-[#e9ecef]">
                <th className="bg-[#F5F8FA] text-[#333] font-bold py-3 px-4 text-left border border-[#ddd]">Presentation Type</th>
                {abstracts.map((abstract) => (
                  <td key={`${abstract.id}-type`} className="py-3 px-4 text-center border border-[#ddd]">
                    <span className={`px-2 py-1 rounded text-sm border ${
                      abstract.presentationType === 'Oral Presentation' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                      abstract.presentationType === 'Poster' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' :
                      'bg-orange-50 text-orange-700 border-orange-200'
                    }`}>
                      {abstract.presentationType}
                    </span>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AbstractComparison;
