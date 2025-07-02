
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

  const OutcomeMetric = ({ value, label, icon: Icon, color }: { 
    value: string; 
    label: string; 
    icon: any; 
    color: string; 
  }) => (
    <div className={`${color} rounded-2xl p-6 text-center border-2 shadow-sm hover:shadow-md transition-all duration-200`}>
      <div className="flex items-center justify-center mb-3">
        <Icon className="w-6 h-6 text-current opacity-80" />
      </div>
      <div className="text-2xl font-bold mb-2">{value}</div>
      <div className="text-sm font-semibold uppercase tracking-wider opacity-80">{label}</div>
    </div>
  );

  const DetailRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
      <span className="text-sm font-medium text-gray-600 min-w-32">{label}</span>
      <div className="flex-1 text-right">{children}</div>
    </div>
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
        
        <div className="overflow-auto max-h-[calc(95vh-8rem)] space-y-8">
          {/* Outcomes Comparison - Main Focus */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900">
              <Target className="w-6 h-6 text-blue-600" />
              Primary Outcomes Comparison
            </h3>
            
            <div className="grid gap-6" style={{ gridTemplateColumns: `200px repeat(${abstracts.length}, 1fr)` }}>
              {/* Column Headers */}
              <div className="font-bold text-lg text-gray-700">Trial</div>
              {abstracts.map((abstract, index) => (
                <div key={abstract.id} className="text-center">
                  <Badge variant="outline" className="mb-2 bg-blue-50 text-blue-700 border-blue-300">
                    Abstract {index + 1}
                  </Badge>
                  <div className="text-sm font-medium text-gray-600 truncate">{abstract.trialId}</div>
                </div>
              ))}

              {/* ORR Row */}
              <div className="font-semibold text-gray-700 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                ORR
              </div>
              {abstracts.map((abstract) => (
                <OutcomeMetric
                  key={`${abstract.id}-orr`}
                  value={abstract.outcomes.orr}
                  label="Overall Response"
                  icon={TrendingUp}
                  color="bg-emerald-50 text-emerald-800 border-emerald-200"
                />
              ))}

              {/* PFS Row */}
              <div className="font-semibold text-gray-700 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                PFS
              </div>
              {abstracts.map((abstract) => (
                <OutcomeMetric
                  key={`${abstract.id}-pfs`}
                  value={abstract.outcomes.pfs}
                  label="Progression Free"
                  icon={Clock}
                  color="bg-blue-50 text-blue-800 border-blue-200"
                />
              ))}

              {/* OS Row */}
              <div className="font-semibold text-gray-700 flex items-center gap-2">
                <Target className="w-4 h-4 text-purple-600" />
                OS
              </div>
              {abstracts.map((abstract) => (
                <OutcomeMetric
                  key={`${abstract.id}-os`}
                  value={abstract.outcomes.os}
                  label="Overall Survival"
                  icon={Target}
                  color="bg-purple-50 text-purple-800 border-purple-200"
                />
              ))}
            </div>
          </div>

          {/* Trial Details Cards */}
          <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${abstracts.length}, 1fr)` }}>
            {abstracts.map((abstract, index) => (
              <Card key={abstract.id} className="shadow-lg border-0 bg-white hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="bg-slate-100 text-slate-700 border-slate-300">
                      Abstract {index + 1}
                    </Badge>
                    <Badge className={getStatusColor(abstract.status)}>
                      {abstract.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight">{abstract.title}</CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Core Trial Info */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 space-y-3">
                    <h4 className="font-semibold text-blue-900 mb-3">Trial Information</h4>
                    <DetailRow label="Trial ID">
                      <Badge variant="outline" className="bg-white">{abstract.trialId}</Badge>
                    </DetailRow>
                    <DetailRow label="Company">
                      <span className="font-medium">{abstract.company}</span>
                    </DetailRow>
                    <DetailRow label="Treatment">
                      <span className="font-medium">{abstract.treatment}</span>
                    </DetailRow>
                    <DetailRow label="Phase">
                      <Badge className="bg-blue-100 text-blue-800 border-blue-300">{abstract.phase}</Badge>
                    </DetailRow>
                    <DetailRow label="Patients">
                      <span className="font-medium">{abstract.patientRatio}</span>
                    </DetailRow>
                  </div>

                  {/* Conference Details */}
                  <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-4 space-y-3">
                    <h4 className="font-semibold text-gray-900 mb-3">Conference Details</h4>
                    <DetailRow label="Conference">
                      <span className="font-medium">{abstract.conference}</span>
                    </DetailRow>
                    <DetailRow label="Type">
                      <Badge className={getTypeColor(abstract.presentationType)}>
                        {abstract.presentationType}
                      </Badge>
                    </DetailRow>
                    <DetailRow label="Date">
                      <span>{abstract.presentationDate}</span>
                    </DetailRow>
                    <DetailRow label="Abstract #">
                      <Badge variant="outline">{abstract.abstractNumber}</Badge>
                    </DetailRow>
                  </div>

                  {/* Additional Details */}
                  <div className="space-y-2 text-sm">
                    <DetailRow label="Indication">
                      <span>{abstract.indication}</span>
                    </DetailRow>
                    <DetailRow label="Population">
                      <span>{abstract.population}</span>
                    </DetailRow>
                    <DetailRow label="Biomarker">
                      <span>{abstract.biomarker}</span>
                    </DetailRow>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AbstractComparison;
