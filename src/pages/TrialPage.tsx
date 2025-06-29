
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, MapPin, Users, FileText, ExternalLink, Eye, MoreHorizontal } from 'lucide-react';
import Header from '@/components/Header';

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
  // Additional fields to match the reference design
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

interface Trial {
  id: string;
  title: string;
  phase: string;
  sponsor: string;
  indication: string;
  status: string;
  startDate: string;
  estimatedCompletion: string;
}

const TrialPage = () => {
  const { trialId } = useParams();
  const navigate = useNavigate();

  // Mock trial data
  const [trial] = useState<Trial>({
    id: trialId || '1',
    title: 'Phase III Study of Novel Immunotherapy in Advanced NSCLC',
    phase: 'Phase III',
    sponsor: 'Global Pharma Inc.',
    indication: 'Non-Small Cell Lung Cancer',
    status: 'Active',
    startDate: '2022-01-15',
    estimatedCompletion: '2025-12-31'
  });

  // Mock abstracts data for this trial - updated to match reference design
  const [abstracts] = useState<Abstract[]>([
    {
      id: '1',
      title: 'Nivolumab plus ipilimumab versus chemotherapy as first-line treatment for advanced non-small-cell lung cancer with high PD-L1 expression: primary...',
      conference: 'ASCO 2025',
      presentationDate: '2024-06-02',
      location: 'Chicago, IL',
      authors: ['Dr. Sarah Chen', 'Dr. Michael Rodriguez', 'Dr. Emily Watson'],
      abstractNumber: 'LBA9000',
      presentationType: 'Oral Presentation',
      keyFindings: [
        'Primary endpoint met with statistical significance',
        '23% improvement in overall survival',
        'Favorable safety profile observed'
      ],
      endpoints: {
        primary: ['Overall Survival'],
        secondary: ['Progression-Free Survival', 'Objective Response Rate']
      },
      patientPopulation: {
        total: 847,
        demographics: 'Adults with advanced NSCLC, ECOG 0-1'
      },
      status: 'Published',
      trialId: 'NCT03539536',
      company: 'Bristol Myers Squibb',
      treatment: 'Nivolumab + Ipilimumab',
      indication: 'NSCLC',
      lineOfTherapy: '1L',
      population: 'IV • Metastatic',
      targetModality: 'PD-1/CTLA-4',
      biomarker: 'PD-L1 ≥50%',
      outcomes: {
        orr: '45.2%',
        pfs: '8.2m',
        os: '21.2m'
      },
      phase: 'Phase 3',
      checkboxId: 'CHECKMATE-123',
      patientRatio: '487/500'
    },
    {
      id: '2',
      title: 'Biomarker Analysis from Phase III Novel Immunotherapy Study in Advanced NSCLC',
      conference: 'ESMO 2024',
      presentationDate: '2024-09-15',
      location: 'Barcelona, Spain',
      authors: ['Dr. James Liu', 'Dr. Sarah Chen', 'Dr. Anna Kowalski'],
      abstractNumber: '1234P',
      presentationType: 'Poster',
      keyFindings: [
        'PD-L1 expression correlates with response',
        'TMB high patients show enhanced benefit',
        'Novel biomarker identified'
      ],
      endpoints: {
        primary: ['Biomarker Correlation'],
        secondary: ['Subgroup Analysis', 'Predictive Modeling']
      },
      patientPopulation: {
        total: 623,
        demographics: 'Subset with available tissue samples'
      },
      status: 'Published',
      trialId: 'NCT03539537',
      company: 'Roche',
      treatment: 'Atezolizumab + Bevacizumab',
      indication: 'NSCLC',
      lineOfTherapy: '2L',
      population: 'III • Locally Advanced',
      targetModality: 'PD-L1/VEGF',
      biomarker: 'TMB-H',
      outcomes: {
        orr: '38.7%',
        pfs: '6.8m',
        os: '18.4m'
      },
      phase: 'Phase 3',
      checkboxId: 'IMpower150',
      patientRatio: '623/650'
    }
  ];

  const handleAbstractClick = (abstractId: string) => {
    // Navigate to abstract detail view
    console.log('Navigate to abstract:', abstractId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'bg-green-50 text-green-700 border-green-200';
      case 'Presented': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Upcoming': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getPresentationTypeColor = (type: string) => {
    switch (type) {
      case 'Oral Presentation': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Poster': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Keynote': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Trial Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </div>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {trial.title}
              </h1>
              <div className="flex flex-wrap gap-3 mb-4">
                <Badge className="bg-gray-100 text-gray-800 border-gray-200">
                  {trial.phase}
                </Badge>
                <Badge className="bg-gray-100 text-gray-800 border-gray-200">
                  {trial.indication}
                </Badge>
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  {trial.status}
                </Badge>
              </div>
              <div className="text-gray-600 space-y-1">
                <p><strong>Sponsor:</strong> {trial.sponsor}</p>
                <p><strong>Start Date:</strong> {new Date(trial.startDate).toLocaleDateString()}</p>
                <p><strong>Estimated Completion:</strong> {new Date(trial.estimatedCompletion).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Abstracts Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Conference Abstracts
            </h2>
            <p className="text-gray-600 mt-1">
              {abstracts.length} abstracts from this trial
            </p>
          </div>
        </div>

        {/* Abstracts Grid - Matching reference design */}
        <div className="grid gap-6">
          {abstracts.map((abstract) => (
            <Card 
              key={abstract.id} 
              className="bg-white shadow-sm border border-slate-200 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleAbstractClick(abstract.id)}
            >
              <div className="p-6">
                {/* Header with icon, title, conference badge, and actions */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <div className="w-6 h-6 bg-slate-800 rounded-sm"></div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 text-lg mb-2 leading-tight">
                      {abstract.title}
                    </h3>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 rounded border-gray-300"
                          onClick={(e) => e.stopPropagation()}
                        />
                        <span className="text-sm text-gray-600">{abstract.checkboxId}</span>
                      </div>
                      
                      <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                        {abstract.phase}
                      </Badge>
                      
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        Active
                      </Badge>
                      
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{abstract.patientRatio}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge className="bg-red-100 text-red-800 border-red-200">
                      {abstract.conference}
                    </Badge>
                    <Button variant="ghost" size="sm" className="p-1">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-1">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Main content grid */}
                <div className="grid grid-cols-3 gap-8">
                  {/* Column 1 */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Trial</p>
                      <p className="font-semibold text-gray-900 underline">{abstract.trialId}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Treatment</p>
                      <p className="font-semibold text-gray-900">{abstract.treatment}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Population</p>
                      <p className="font-semibold text-gray-900">{abstract.population}</p>
                    </div>
                  </div>

                  {/* Column 2 */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Company</p>
                      <p className="font-semibold text-gray-900">{abstract.company}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Indication</p>
                      <p className="font-semibold text-gray-900">{abstract.indication}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Target/Modality</p>
                      <p className="font-semibold text-gray-900">{abstract.targetModality}</p>
                    </div>
                  </div>

                  {/* Column 3 */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Abstract Type</p>
                      <p className="font-semibold text-gray-900">{abstract.presentationType}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Line of Therapy</p>
                      <p className="font-semibold text-gray-900">{abstract.lineOfTherapy}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Biomarker</p>
                      <p className="font-semibold text-gray-900">{abstract.biomarker}</p>
                    </div>
                  </div>
                </div>

                {/* Outcomes row */}
                <div className="flex items-center gap-8 mt-6 pt-4 border-t border-gray-100">
                  <div className="bg-blue-50 px-4 py-2 rounded-lg">
                    <p className="text-sm font-medium text-blue-600 mb-1">ORR</p>
                    <p className="text-lg font-bold text-blue-800">{abstract.outcomes.orr}</p>
                  </div>
                  
                  <div className="bg-green-50 px-4 py-2 rounded-lg">
                    <p className="text-sm font-medium text-green-600 mb-1">PFS</p>
                    <p className="text-lg font-bold text-green-800">{abstract.outcomes.pfs}</p>
                  </div>
                  
                  <div className="bg-purple-50 px-4 py-2 rounded-lg">
                    <p className="text-sm font-medium text-purple-600 mb-1">OS</p>
                    <p className="text-lg font-bold text-purple-800">{abstract.outcomes.os}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrialPage;
