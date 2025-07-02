import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Eye, Calendar, MapPin, Users } from 'lucide-react';
import Header from '@/components/Header';

interface Trial {
  id: string;
  title: string;
  status: 'Recruiting' | 'Completed' | 'Active' | 'Not yet recruiting';
  phase: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  sponsor: string;
  enrollment: number;
  abstracts: Abstract[];
}

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
}

const TrialPage = () => {
  const { trialId } = useParams();
  const navigate = useNavigate();

  // Mock trial data - in real app this would come from API
  const trial: Trial = {
    id: trialId || '1',
    title: 'A Study of Nivolumab in Combination With Ipilimumab or Nivolumab Alone Versus Chemotherapy in Participants With Advanced or Metastatic Gastric, Esophageal, or Gastroesophageal Junction Cancer',
    status: 'Recruiting',
    phase: 'Phase 3',
    startDate: '2017-08-22',
    endDate: '2023-12-31',
    location: 'Multiple Locations Worldwide',
    description: 'This is a Phase 3, randomized, open-label study evaluating nivolumab in combination with ipilimumab or nivolumab alone versus chemotherapy in participants with advanced or metastatic gastric, esophageal, or gastroesophageal junction cancer.',
    sponsor: 'Bristol-Myers Squibb',
    enrollment: 1500,
    abstracts: [
      {
        id: '1',
        title: 'Nivolumab plus ipilimumab versus chemotherapy as first-line treatment for advanced gastric cancer',
        conference: 'ASCO 2023',
        presentationDate: '2023-06-02',
        location: 'Chicago, IL',
        authors: ['Dr. Sarah Chen', 'Dr. Michael Rodriguez', 'Dr. Emily Watson'],
        abstractNumber: 'LBA4000',
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
          demographics: 'Adults with advanced gastric cancer, ECOG 0-1'
        },
        status: 'Published'
      },
      {
        id: '2',
        title: 'Efficacy of nivolumab in combination with chemotherapy for advanced esophageal cancer',
        conference: 'ESMO 2022',
        presentationDate: '2022-09-15',
        location: 'Paris, France',
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
        status: 'Published'
      },
      {
        id: '3',
        title: 'Safety and tolerability of nivolumab monotherapy in gastroesophageal junction cancer',
        conference: 'WCLC 2021',
        presentationDate: '2021-11-10',
        location: 'Virtual',
        authors: ['Dr. Maria Rodriguez', 'Dr. Chen Wei', 'Dr. Anna Smith'],
        abstractNumber: 'OA12.03',
        presentationType: 'Oral Presentation',
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
          demographics: 'Treatment-naive advanced GEJ cancer patients'
        },
        status: 'Presented'
      }
    ]
  };

  const mockAbstracts = trial.abstracts;

  const handleViewAbstract = (abstractId: string) => {
    navigate(`/abstract/${abstractId}`);
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
      
      {/* Trial Header */}
      <div className="bg-white border-b border-[#ddd] shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-[#172B4D] mb-4 font-sans leading-tight">
            {trial.title}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[#6c757d] font-sans">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{trial.startDate} - {trial.endDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{trial.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{trial.enrollment} Enrolled</span>
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
                    <p className="text-xs font-medium text-[#6c757d] mb-1 font-sans uppercase tracking-wide">Status</p>
                    <p className="text-sm text-[#172B4D] font-medium font-sans">{trial.status}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#6c757d] mb-1 font-sans uppercase tracking-wide">Phase</p>
                    <p className="text-sm text-[#172B4D] font-sans">{trial.phase}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#6c757d] mb-1 font-sans uppercase tracking-wide">Sponsor</p>
                    <p className="text-sm text-[#172B4D] font-sans">{trial.sponsor}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card className="bg-white shadow-sm border border-[#ddd]">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-[#172B4D] mb-4 font-sans">Description</h2>
                <p className="text-[#172B4D] font-sans">{trial.description}</p>
              </CardContent>
            </Card>

            {/* Abstracts Section */}
            <div className="space-y-4">
              {mockAbstracts.map((abstract) => (
                <div key={abstract.id} className="bg-white border border-[#ddd] rounded-lg p-4 hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-[#F5F8FA] rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-[#172B4D]" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-[#172B4D] mb-1 font-sans">{abstract.title}</h4>
                        <div className="flex items-center gap-2 text-sm text-[#6c757d] font-sans">
                          <span>{abstract.conference}</span>
                          <span>•</span>
                          <span>{abstract.abstractNumber}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="border-[#ddd] text-[#172B4D] bg-[#F5F8FA] font-sans">
                        {abstract.presentationType}
                      </Badge>
                      <Badge className={getStatusColor(abstract.status)}>
                        {abstract.status}
                      </Badge>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewAbstract(abstract.id)}
                        className="hover:bg-[#e9ecef]"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="text-sm text-[#6c757d] font-sans">
                    <p><strong>Authors:</strong> {abstract.authors.join(', ')}</p>
                    <p><strong>Key Findings:</strong> {abstract.keyFindings[0]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Placeholder Content */}
            <Card className="bg-white shadow-sm border border-[#ddd]">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-[#172B4D] mb-4 font-sans">Additional Information</h2>
                <p className="text-[#172B4D] font-sans">More details about the trial can be found here.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrialPage;
