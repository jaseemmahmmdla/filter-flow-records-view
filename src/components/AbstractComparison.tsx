
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
      case 'Published': return 'bg-green-50 text-green-700 border-green-200';
      case 'Presented': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Upcoming': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Oral Presentation': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Poster': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Keynote': return 'bg-orange-50 text-orange-700 border-orange-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const comparisonFields = [
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'trialId', label: 'Trial ID', type: 'text' },
    { key: 'company', label: 'Company', type: 'text' },
    { key: 'treatment', label: 'Treatment', type: 'text' },
    { key: 'indication', label: 'Indication', type: 'text' },
    { key: 'phase', label: 'Phase', type: 'badge' },
    { key: 'lineOfTherapy', label: 'Line of Therapy', type: 'text' },
    { key: 'population', label: 'Population', type: 'text' },
    { key: 'targetModality', label: 'Target/Modality', type: 'text' },
    { key: 'biomarker', label: 'Biomarker', type: 'text' },
    { key: 'patientRatio', label: 'Patients', type: 'text' },
    { key: 'outcomes', label: 'Outcomes', type: 'outcomes' },
    { key: 'conference', label: 'Conference', type: 'text' },
    { key: 'abstractNumber', label: 'Abstract Number', type: 'text' },
    { key: 'presentationType', label: 'Presentation Type', type: 'presentationType' },
    { key: 'status', label: 'Status', type: 'status' },
    { key: 'presentationDate', label: 'Date', type: 'text' },
    { key: 'location', label: 'Location', type: 'text' },
  ];

  const renderCellContent = (abstract: Abstract, field: any) => {
    const value = abstract[field.key as keyof Abstract];

    switch (field.type) {
      case 'badge':
        return (
          <Badge variant="outline" className="border-slate-300 text-slate-700 bg-slate-50 font-body">
            {value as string}
          </Badge>
        );
      case 'status':
        return (
          <Badge className={getStatusColor(value as string)}>
            {value as string}
          </Badge>
        );
      case 'presentationType':
        return (
          <Badge className={getTypeColor(value as string)}>
            {value as string}
          </Badge>
        );
      case 'outcomes':
        const outcomes = value as Abstract['outcomes'];
        return (
          <div className="space-y-1">
            <div className="text-sm font-medium">ORR: {outcomes.orr}</div>
            <div className="text-sm font-medium">PFS: {outcomes.pfs}</div>
            <div className="text-sm font-medium">OS: {outcomes.os}</div>
          </div>
        );
      case 'text':
      default:
        if (field.key === 'title') {
          return (
            <div className="max-w-xs">
              <p className="text-sm font-medium text-slate-900 line-clamp-3 leading-tight">
                {value as string}
              </p>
            </div>
          );
        }
        return (
          <span className="text-sm text-slate-900 font-body">
            {value as string}
          </span>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden bg-white">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-slate-200">
          <DialogTitle className="text-2xl font-bold text-slate-900 font-body">
            Abstract Comparison ({abstracts.length} abstracts)
          </DialogTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-slate-100">
            <X className="w-4 h-4" />
          </Button>
        </DialogHeader>
        
        <div className="overflow-auto max-h-[calc(90vh-8rem)]">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50 border-b border-slate-200">
                <TableHead className="font-semibold text-slate-700 w-48 sticky left-0 bg-slate-50 z-10 border-r border-slate-200">
                  Field
                </TableHead>
                {abstracts.map((abstract, index) => (
                  <TableHead key={abstract.id} className="font-semibold text-slate-700 min-w-64 text-center">
                    Abstract {index + 1}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisonFields.map((field) => (
                <TableRow key={field.key} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <TableCell className="font-medium text-slate-700 bg-slate-50/50 sticky left-0 z-10 border-r border-slate-200 py-4">
                    {field.label}
                  </TableCell>
                  {abstracts.map((abstract) => (
                    <TableCell key={`${abstract.id}-${field.key}`} className="align-top p-4 text-center">
                      {renderCellContent(abstract, field)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AbstractComparison;
