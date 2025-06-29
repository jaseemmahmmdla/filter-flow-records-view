
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
  ]);

  const handleAbstractClick = (abstractId: string) => {
    // Navigate to abstract detail view
    console.log('Navigate to abstract:', abstractId);
  };

  return (
    <div className="min-h-screen bg-neutral-100 font-body">
      <Header />
      
      {/* Trial Header */}
      <div className="bg-white border-b border-neutral-300">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 font-body"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </div>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-display font-semibold text-neutral-900 mb-2">
                {trial.title}
              </h1>
              <div className="flex flex-wrap gap-3 mb-4">
                <Badge className="bg-neutral-100 text-neutral-700 border-neutral-200 font-body">
                  {trial.phase}
                </Badge>
                <Badge className="bg-neutral-100 text-neutral-700 border-neutral-200 font-body">
                  {trial.indication}
                </Badge>
                <Badge className="bg-status-success/10 text-status-success border-status-success/20 font-body">
                  {trial.status}
                </Badge>
              </div>
              <div className="text-neutral-500 space-y-1 font-body">
                <p><strong className="text-neutral-700">Sponsor:</strong> {trial.sponsor}</p>
                <p><strong className="text-neutral-700">Start Date:</strong> {new Date(trial.startDate).toLocaleDateString()}</p>
                <p><strong className="text-neutral-700">Estimated Completion:</strong> {new Date(trial.estimatedCompletion).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Abstracts Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-display font-semibold text-neutral-900">
              Conference Abstracts
            </h2>
            <p className="text-neutral-500 mt-1 font-body">
              {abstracts.length} abstracts from this trial
            </p>
          </div>
        </div>

        {/* Abstracts Grid */}
        <div className="space-y-4">
          {abstracts.map((abstract) => (
            <Card 
              key={abstract.id} 
              className="bg-white border border-neutral-300 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleAbstractClick(abstract.id)}
            >
              <CardContent className="p-6">
                {/* Header Row */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-primary-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-semibold text-neutral-900 text-lg mb-2 leading-tight">
                        {abstract.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-neutral-500 font-body">
                        <span>{abstract.conference}</span>
                        <span>•</span>
                        <span>{abstract.abstractNumber}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge variant="secondary" className="bg-brand-100 text-brand-700 font-body">
                      {abstract.presentationType}
                    </Badge>
                    <Badge variant="secondary" className="bg-status-success/10 text-status-success font-body">
                      {abstract.status}
                    </Badge>
                  </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
                  {/* Trial Information */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-medium text-neutral-500 mb-1 font-body uppercase tracking-wide">Trial ID</p>
                      <p className="text-sm text-brand-600 font-medium font-body">{abstract.trialId}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-neutral-500 mb-1 font-body uppercase tracking-wide">Company</p>
                      <p className="text-sm text-neutral-900 font-body">{abstract.company}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-neutral-500 mb-1 font-body uppercase tracking-wide">Treatment</p>
                      <p className="text-sm text-neutral-900 font-body">{abstract.treatment}</p>
                    </div>
                  </div>

                  {/* Study Details */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-medium text-neutral-500 mb-1 font-body uppercase tracking-wide">Indication</p>
                      <p className="text-sm text-neutral-900 font-body">{abstract.indication}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-neutral-500 mb-1 font-body uppercase tracking-wide">Line of Therapy</p>
                      <p className="text-sm text-neutral-900 font-body">{abstract.lineOfTherapy}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-neutral-500 mb-1 font-body uppercase tracking-wide">Population</p>
                      <p className="text-sm text-neutral-900 font-body">{abstract.population}</p>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-medium text-neutral-500 mb-1 font-body uppercase tracking-wide">Target/Modality</p>
                      <p className="text-sm text-neutral-900 font-body">{abstract.targetModality}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-neutral-500 mb-1 font-body uppercase tracking-wide">Biomarker</p>
                      <p className="text-sm text-neutral-900 font-body">{abstract.biomarker}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-neutral-500 mb-1 font-body uppercase tracking-wide">Phase</p>
                      <p className="text-sm text-neutral-900 font-body">{abstract.phase}</p>
                    </div>
                  </div>

                  {/* Patients */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-medium text-neutral-500 mb-1 font-body uppercase tracking-wide">Patients</p>
                      <p className="text-sm text-neutral-900 font-body">{abstract.patientRatio}</p>
                    </div>
                  </div>
                </div>

                {/* Outcomes Row */}
                <div className="flex items-center justify-start gap-8 pt-4 border-t border-neutral-200">
                  <div className="text-center">
                    <p className="text-xs font-medium text-neutral-500 mb-1 font-body uppercase tracking-wide">ORR</p>
                    <p className="text-lg font-semibold text-brand-600 font-display">{abstract.outcomes.orr}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-medium text-neutral-500 mb-1 font-body uppercase tracking-wide">PFS</p>
                    <p className="text-lg font-semibold text-status-success font-display">{abstract.outcomes.pfs}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-medium text-neutral-500 mb-1 font-body uppercase tracking-wide">OS</p>
                    <p className="text-lg font-semibold text-accent-500 font-display">{abstract.outcomes.os}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrialPage;
