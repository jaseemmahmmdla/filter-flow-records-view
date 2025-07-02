
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileText, Users, Calendar, MapPin } from 'lucide-react';
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

const AbstractDetail = () => {
  const { abstractId } = useParams();
  const navigate = useNavigate();

  // Mock abstract data - in real app this would come from API
  const abstract: Abstract = {
    id: abstractId || '1',
    title: 'Nivolumab plus ipilimumab versus chemotherapy as first-line treatment for advanced non-small-cell lung cancer with high PD-L1 expression: primary analysis of CheckMate 227 Part 1',
    conference: 'ASCO 2025',
    presentationDate: '2024-06-02',
    location: 'Chicago, IL',
    authors: ['Dr. Sarah Chen', 'Dr. Michael Rodriguez', 'Dr. Emily Watson', 'Dr. James Liu', 'Dr. Anna Kowalski'],
    abstractNumber: 'LBA9000',
    presentationType: 'Oral Presentation',
    keyFindings: [
      'Primary endpoint of overall survival was met with statistical significance (HR 0.77, 95% CI 0.65-0.91, p=0.002)',
      '23% improvement in overall survival compared to chemotherapy alone',
      'Favorable safety profile observed with manageable immune-related adverse events',
      'Biomarker analysis showed enhanced benefit in PD-L1 high expressors',
      'Quality of life measures favored the combination therapy'
    ],
    endpoints: {
      primary: ['Overall Survival (OS)'],
      secondary: ['Progression-Free Survival (PFS)', 'Objective Response Rate (ORR)', 'Duration of Response', 'Safety and Tolerability']
    },
    patientPopulation: {
      total: 847,
      demographics: 'Adults with advanced NSCLC, ECOG performance status 0-1, no prior systemic therapy'
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
    checkboxId: 'CHECKMATE-227',
    patientRatio: '487/500'
  };

  const handleBackClick = () => {
    navigate(-1);
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
    <div className="flex-1 bg-white font-sans text-[#172B4D]" style={{ fontFamily: "'Roboto', sans-serif" }}>
      <Header />
      
      {/* Abstract Header */}
      <div className="bg-white border-b border-[#ddd] shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackClick}
              className="flex items-center gap-2 font-sans hover:bg-[#e9ecef] text-[#172B4D]"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </div>
          
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 bg-[#F5F8FA] rounded-xl flex items-center justify-center flex-shrink-0">
              <FileText className="w-8 h-8 text-[#172B4D]" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-[#172B4D] mb-4 font-sans leading-tight">
                {abstract.title}
              </h1>
              <div className="flex flex-wrap gap-3 mb-4">
                <Badge variant="outline" className="border-[#ddd] text-[#172B4D] font-sans bg-[#F5F8FA]">
                  {abstract.presentationType}
                </Badge>
                <Badge className={getStatusColor(abstract.status)}>
                  {abstract.status}
                </Badge>
                <Badge variant="outline" className="border-[#ddd] text-[#172B4D] font-sans bg-[#F5F8FA]">
                  {abstract.abstractNumber}
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[#6c757d] font-sans">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{abstract.conference} • {abstract.presentationDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{abstract.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{abstract.authors.length} Authors</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Trial Information */}
            <Card className="bg-white shadow-sm border border-[#ddd]">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-[#172B4D] mb-4 font-sans">Trial Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-[#6c757d] mb-1 font-sans uppercase tracking-wide">Trial ID</p>
                    <p className="text-sm text-[#172B4D] font-medium font-sans">{abstract.trialId}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#6c757d] mb-1 font-sans uppercase tracking-wide">Company</p>
                    <p className="text-sm text-[#172B4D] font-sans">{abstract.company}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#6c757d] mb-1 font-sans uppercase tracking-wide">Treatment</p>
                    <p className="text-sm text-[#172B4D] font-sans">{abstract.treatment}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#6c757d] mb-1 font-sans uppercase tracking-wide">Phase</p>
                    <p className="text-sm text-[#172B4D] font-sans">{abstract.phase}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#6c757d] mb-1 font-sans uppercase tracking-wide">Indication</p>
                    <p className="text-sm text-[#172B4D] font-sans">{abstract.indication}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#6c757d] mb-1 font-sans uppercase tracking-wide">Target/Modality</p>
                    <p className="text-sm text-[#172B4D] font-sans">{abstract.targetModality}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Findings */}
            <Card className="bg-white shadow-sm border border-[#ddd]">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-[#172B4D] mb-4 font-sans">Key Findings</h2>
                <ul className="space-y-3">
                  {abstract.keyFindings.map((finding, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-[#1A237E] rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-[#172B4D] font-sans">{finding}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Endpoints */}
            <Card className="bg-white shadow-sm border border-[#ddd]">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-[#172B4D] mb-4 font-sans">Study Endpoints</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-[#6c757d] mb-2 font-sans uppercase tracking-wide">Primary Endpoints</h3>
                    <ul className="space-y-1">
                      {abstract.endpoints.primary.map((endpoint, index) => (
                        <li key={index} className="text-[#172B4D] font-sans">{endpoint}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-[#6c757d] mb-2 font-sans uppercase tracking-wide">Secondary Endpoints</h3>
                    <ul className="space-y-1">
                      {abstract.endpoints.secondary.map((endpoint, index) => (
                        <li key={index} className="text-[#172B4D] font-sans">{endpoint}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Patient Population */}
            <Card className="bg-white shadow-sm border border-[#ddd]">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-[#172B4D] mb-4 font-sans">Patient Population</h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-medium text-[#6c757d] mb-1 font-sans uppercase tracking-wide">Total Patients</p>
                    <p className="text-2xl font-bold text-[#1A237E] font-sans">{abstract.patientPopulation.total}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#6c757d] mb-1 font-sans uppercase tracking-wide">Demographics</p>
                    <p className="text-[#172B4D] font-sans">{abstract.patientPopulation.demographics}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Outcomes */}
            <Card className="bg-white shadow-sm border border-[#ddd]">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-[#172B4D] mb-4 font-sans">Clinical Outcomes</h2>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-[#F5F8FA] rounded-lg">
                    <p className="text-xs font-medium text-[#6c757d] mb-1 font-sans uppercase tracking-wide">ORR</p>
                    <p className="text-2xl font-bold text-[#1A237E] font-sans">{abstract.outcomes.orr}</p>
                  </div>
                  <div className="text-center p-4 bg-[#F5F8FA] rounded-lg">
                    <p className="text-xs font-medium text-[#6c757d] mb-1 font-sans uppercase tracking-wide">PFS</p>
                    <p className="text-2xl font-bold text-[#1A237E] font-sans">{abstract.outcomes.pfs}</p>
                  </div>
                  <div className="text-center p-4 bg-[#F5F8FA] rounded-lg">
                    <p className="text-xs font-medium text-[#6c757d] mb-1 font-sans uppercase tracking-wide">OS</p>
                    <p className="text-2xl font-bold text-[#1A237E] font-sans">{abstract.outcomes.os}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Authors */}
            <Card className="bg-white shadow-sm border border-[#ddd]">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-[#172B4D] mb-4 font-sans">Authors</h2>
                <div className="space-y-2">
                  {abstract.authors.map((author, index) => (
                    <p key={index} className="text-[#172B4D] font-sans">{author}</p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AbstractDetail;
