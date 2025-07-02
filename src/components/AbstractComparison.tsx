import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, TrendingUp, Clock, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

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

  const OutcomeBadge = ({ value, color }: { value: string; color: string }) => (
    <Badge className={`${color} text-lg py-2 px-4 font-bold`}>
      {value}
    </Badge>
  );

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
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900">
              Trial Comparison
            </h3>
            
            <div className="rounded-xl border border-gray-200 overflow-hidden shadow-lg bg-white">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-gray-50 to-slate-50">
                    <TableHead className="font-bold text-gray-900 w-40">Attribute</TableHead>
                    {abstracts.map((abstract, index) => (
                      <TableHead key={abstract.id} className="font-bold text-gray-700 text-center min-w-64">
                        <div className="space-y-1">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
                            Abstract {index + 1}
                          </Badge>
                          <div className="text-sm font-normal text-gray-600">{abstract.trialId}</div>
                        </div>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-700">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-emerald-600" />
                        ORR
                      </div>
                    </TableCell>
                    {abstracts.map((abstract) => (
                      <TableCell key={`${abstract.id}-orr`} className="text-center">
                        <OutcomeBadge 
                          value={abstract.outcomes.orr} 
                          color="bg-emerald-100 text-emerald-800 border-emerald-300" 
                        />
                      </TableCell>
                    ))}
                  </TableRow>

                  <TableRow className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-700">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-blue-600" />
                        PFS
                      </div>
                    </TableCell>
                    {abstracts.map((abstract) => (
                      <TableCell key={`${abstract.id}-pfs`} className="text-center">
                        <OutcomeBadge 
                          value={abstract.outcomes.pfs} 
                          color="bg-blue-100 text-blue-800 border-blue-300" 
                        />
                      </TableCell>
                    ))}
                  </TableRow>

                  <TableRow className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-700">
                      <div className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-purple-600" />
                        OS
                      </div>
                    </TableCell>
                    {abstracts.map((abstract) => (
                      <TableCell key={`${abstract.id}-os`} className="text-center">
                        <OutcomeBadge 
                          value={abstract.outcomes.os} 
                          color="bg-purple-100 text-purple-800 border-purple-300" 
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                  
                  <TableRow className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-700">Title</TableCell>
                    {abstracts.map((abstract) => (
                      <TableCell key={`${abstract.id}-title`} className="text-sm">
                        {abstract.title}
                      </TableCell>
                    ))}
                  </TableRow>
                  
                  <TableRow className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-700">Company</TableCell>
                    {abstracts.map((abstract) => (
                      <TableCell key={`${abstract.id}-company`}>
                        <Badge variant="outline" className="bg-gray-50">
                          {abstract.company}
                        </Badge>
                      </TableCell>
                    ))}
                  </TableRow>

                  <TableRow className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-700">Phase</TableCell>
                    {abstracts.map((abstract) => (
                      <TableCell key={`${abstract.id}-phase`}>
                        <Badge className="bg-blue-100 text-blue-800 border-blue-300">
                          {abstract.phase}
                        </Badge>
                      </TableCell>
                    ))}
                  </TableRow>

                  <TableRow className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-700">Patients</TableCell>
                    {abstracts.map((abstract) => (
                      <TableCell key={`${abstract.id}-patients`} className="font-medium">
                        {abstract.patientRatio}
                      </TableCell>
                    ))}
                  </TableRow>

                  <TableRow className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-700">Indication</TableCell>
                    {abstracts.map((abstract) => (
                      <TableCell key={`${abstract.id}-indication`} className="text-sm">
                        {abstract.indication}
                      </TableCell>
                    ))}
                  </TableRow>

                  <TableRow className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-700">Population</TableCell>
                    {abstracts.map((abstract) => (
                      <TableCell key={`${abstract.id}-population`} className="text-sm">
                        {abstract.population}
                      </TableCell>
                    ))}
                  </TableRow>

                  <TableRow className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-700">Biomarker</TableCell>
                    {abstracts.map((abstract) => (
                      <TableCell key={`${abstract.id}-biomarker`} className="text-sm">
                        {abstract.biomarker}
                      </TableCell>
                    ))}
                  </TableRow>

                  <TableRow className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-700">Conference</TableCell>
                    {abstracts.map((abstract) => (
                      <TableCell key={`${abstract.id}-conference`} className="text-sm">
                        {abstract.conference}
                      </TableCell>
                    ))}
                  </TableRow>

                  <TableRow className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-700">Status</TableCell>
                    {abstracts.map((abstract) => (
                      <TableCell key={`${abstract.id}-status`}>
                        <Badge className={getStatusColor(abstract.status)}>
                          {abstract.status}
                        </Badge>
                      </TableCell>
                    ))}
                  </TableRow>

                  <TableRow className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-700">Presentation Type</TableCell>
                    {abstracts.map((abstract) => (
                      <TableCell key={`${abstract.id}-type`}>
                        <Badge className={getTypeColor(abstract.presentationType)}>
                          {abstract.presentationType}
                        </Badge>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AbstractComparison;
