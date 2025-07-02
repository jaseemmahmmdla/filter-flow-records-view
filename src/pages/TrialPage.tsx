import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

// Mock clinical abstracts data - similar to the one in AbstractsOverview but for trials
const mockClinicalAbstracts = [
  {
    id: '1',
    title: 'Nivolumab plus ipilimumab versus chemotherapy as first-line treatment for advanced non-small-cell lung cancer with high PD-L1 expression',
    conference: 'ASCO 2025',
    presentationDate: '2024-06-02',
    location: 'Chicago, IL',
    authors: ['Dr. Sarah Chen', 'Dr. Michael Rodriguez', 'Dr. Emily Watson'],
    abstractNumber: 'LBA9000',
    presentationType: 'Oral Presentation' as const,
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
    status: 'Published' as const,
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
    title: 'Atezolizumab plus bevacizumab and chemotherapy for advanced NSCLC patients',
    conference: 'ESMO 2024',
    presentationDate: '2024-09-15',
    location: 'Barcelona, Spain',
    authors: ['Dr. James Liu', 'Dr. Sarah Chen', 'Dr. Anna Kowalski'],
    abstractNumber: '1234P',
    presentationType: 'Poster' as const,
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
    status: 'Published' as const,
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
  },
  {
    id: '3',
    title: 'Pembrolizumab monotherapy in advanced NSCLC with PD-L1 expression ≥1%',
    conference: 'WCLC 2024',
    presentationDate: '2024-11-10',
    location: 'Singapore',
    authors: ['Dr. Maria Rodriguez', 'Dr. Chen Wei', 'Dr. Anna Smith'],
    abstractNumber: 'OA12.03',
    presentationType: 'Oral Presentation' as const,
    keyFindings: [
      'Sustained clinical benefit observed',
      'Manageable safety profile',
      'Quality of life maintained'
    ],
    endpoints: {
      primary: ['Overall Survival'],
      secondary: ['Progression-Free Survival', 'Safety']
    },
    patientPopulation: {
      total: 754,
      demographics: 'Treatment-naive advanced NSCLC patients'
    },
    status: 'Presented' as const,
    trialId: 'NCT02409342',
    company: 'Merck',
    treatment: 'Pembrolizumab',
    indication: 'NSCLC',
    lineOfTherapy: '1L',
    population: 'IV • Metastatic',
    targetModality: 'PD-1',
    biomarker: 'PD-L1 ≥1%',
    outcomes: {
      orr: '41.8%',
      pfs: '7.1m',
      os: '20.4m'
    },
    phase: 'Phase 3',
    checkboxId: 'KEYNOTE-024',
    patientRatio: '754/800'
  }
];

const TrialPage = () => {
  const { trialId } = useParams<{ trialId: string }>();
  const navigate = useNavigate();
  const [trial, setTrial] = useState(null);

  useEffect(() => {
    // Mock trial data loading based on trialId
    // Replace this with your actual data fetching logic
    const mockTrial = {
      id: trialId,
      name: `Trial ${trialId}`,
      description: 'This is a mock trial description.',
      // Add more mock data as needed
    };
    setTrial(mockTrial);
  }, [trialId]);

  if (!trial) {
    return <div>Loading trial data...</div>;
  }

  const handleViewAbstract = (abstractId: string) => {
    console.log('Navigate to abstract:', abstractId);
    // Navigate to the abstracts view with clinical data tab and abstract detail
    navigate(`/?activeView=abstracts&viewMode=detail&abstractId=${abstractId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'bg-green-50 text-green-700 border-green-200';
      case 'Presented': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Upcoming': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Trial Detail View</h1>
      <h2 className="text-xl font-semibold mb-2">{trial.name}</h2>
      <p className="mb-4">{trial.description}</p>

      <h3 className="text-lg font-semibold mt-6 mb-3">Related Clinical Abstracts</h3>
      <div className="space-y-4">
        {mockClinicalAbstracts.map((abstract) => (
          <Card
            key={abstract.id}
            className="bg-white shadow-sm border border-[#ddd] hover:shadow-md transition-shadow"
          >
            <CardContent className="p-6">
              {/* Header Row with Checkbox */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#F5F8FA] rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-file-text w-6 h-6 text-[#172B4D]"
                    >
                      <path d="M14.5 2H6A2 2 0 0 0 4 4v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" x2="8" y1="13" y2="13" />
                      <line x1="16" x2="8" y1="17" y2="17" />
                      <path d="M10 9H8" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#172B4D] text-lg mb-2 leading-tight">
                      {abstract.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-[#6c757d]">
                      <span>{abstract.conference}</span>
                      <span>•</span>
                      <span>{abstract.abstractNumber}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Badge variant="outline" className="border-[#ddd] text-[#172B4D] bg-[#F5F8FA]">
                    {abstract.presentationType}
                  </Badge>
                  <Badge className={getStatusColor(abstract.status)}>
                    {abstract.status}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2 hover:bg-[#e9ecef]"
                    onClick={() => handleViewAbstract(abstract.id)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-medium text-[#6c757d] mb-1 uppercase tracking-wide">Trial ID</p>
                    <p className="text-sm text-[#172B4D] font-medium">{abstract.trialId}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#6c757d] mb-1 uppercase tracking-wide">Company</p>
                    <p className="text-sm text-[#172B4D]">{abstract.company}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#6c757d] mb-1 uppercase tracking-wide">Treatment</p>
                    <p className="text-sm text-[#172B4D]">{abstract.treatment}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-medium text-[#6c757d] mb-1 uppercase tracking-wide">Indication</p>
                    <p className="text-sm text-[#172B4D]">{abstract.indication}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#6c757d] mb-1 uppercase tracking-wide">Line of Therapy</p>
                    <p className="text-sm text-[#172B4D]">{abstract.lineOfTherapy}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#6c757d] mb-1 uppercase tracking-wide">Population</p>
                    <p className="text-sm text-[#172B4D]">{abstract.population}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-medium text-[#6c757d] mb-1 uppercase tracking-wide">Target/Modality</p>
                    <p className="text-sm text-[#172B4D]">{abstract.targetModality}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#6c757d] mb-1 uppercase tracking-wide">Biomarker</p>
                    <p className="text-sm text-[#172B4D]">{abstract.biomarker}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#6c757d] mb-1 uppercase tracking-wide">Phase</p>
                    <p className="text-sm text-[#172B4D]">{abstract.phase}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-medium text-[#6c757d] mb-1 uppercase tracking-wide">Patients</p>
                    <p className="text-sm text-[#172B4D]">{abstract.patientRatio}</p>
                  </div>
                </div>
              </div>

              {/* Outcomes Row */}
              <div className="flex items-center justify-start gap-8 pt-4 border-t border-[#ddd]">
                <div className="text-center">
                  <p className="text-xs font-medium text-[#6c757d] mb-1 uppercase tracking-wide">ORR</p>
                  <p className="text-lg font-semibold text-[#1A237E]">{abstract.outcomes.orr}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium text-[#6c757d] mb-1 uppercase tracking-wide">PFS</p>
                  <p className="text-lg font-semibold text-[#1A237E]">{abstract.outcomes.pfs}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium text-[#6c757d] mb-1 uppercase tracking-wide">OS</p>
                  <p className="text-lg font-semibold text-[#1A237E]">{abstract.outcomes.os}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TrialPage;
