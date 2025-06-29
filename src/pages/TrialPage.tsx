import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, MapPin, Users, FileText, ExternalLink } from 'lucide-react';
import Header from '@/components/Header';

interface Abstract {
  id: string;
  title: string;
  conference: string;
  presentationDate: string;
  location: string;
  authors: string[];
  abstractNumber: string;
  presentationType: 'Oral' | 'Poster' | 'Keynote';
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

  // Mock abstracts data for this trial
  const [abstracts] = useState<Abstract[]>([
    {
      id: '1',
      title: 'Efficacy and Safety of Novel Immunotherapy in First-Line Advanced NSCLC: Interim Analysis',
      conference: 'ASCO 2024',
      presentationDate: '2024-06-02',
      location: 'Chicago, IL',
      authors: ['Dr. Sarah Chen', 'Dr. Michael Rodriguez', 'Dr. Emily Watson'],
      abstractNumber: 'LBA9000',
      presentationType: 'Oral',
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
      status: 'Published'
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
      status: 'Published'
    },
    {
      id: '3',
      title: 'Quality of Life Outcomes in Phase III Novel Immunotherapy Study',
      conference: 'WCLC 2024',
      presentationDate: '2024-09-09',
      location: 'Singapore',
      authors: ['Dr. Maria Santos', 'Dr. David Kim', 'Dr. Sarah Chen'],
      abstractNumber: 'MA04.02',
      presentationType: 'Oral',
      keyFindings: [
        'Maintained quality of life scores',
        'Reduced treatment-related symptoms',
        'Improved patient-reported outcomes'
      ],
      endpoints: {
        primary: ['EORTC QLQ-C30 Score'],
        secondary: ['Symptom Burden', 'Functional Assessment']
      },
      patientPopulation: {
        total: 789,
        demographics: 'Patients completing QoL assessments'
      },
      status: 'Presented'
    }
  ]);

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
      case 'Oral': return 'bg-purple-50 text-purple-700 border-purple-200';
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

        {/* Abstracts Grid - Using same styling as RecordsTable */}
        <div className="grid gap-4">
          {abstracts.map((abstract) => (
            <Card 
              key={abstract.id} 
              className="bg-white shadow-sm border border-slate-200 hover:shadow-md transition-shadow p-6 cursor-pointer"
              onClick={() => handleAbstractClick(abstract.id)}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <FileText className="w-4 h-4" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-slate-900 text-lg">{abstract.title}</h3>
                      <p className="text-slate-600 text-sm mt-1">{abstract.conference} - {new Date(abstract.presentationDate).toLocaleDateString()}</p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" />
                  </div>
                  
                  <div className="flex items-center gap-4 mt-4">
                    <Badge variant="outline" className="border-slate-300 text-slate-700">
                      {abstract.abstractNumber}
                    </Badge>
                    <Badge className={getStatusColor(abstract.status)}>
                      {abstract.status}
                    </Badge>
                    <Badge className={getPresentationTypeColor(abstract.presentationType)}>
                      {abstract.presentationType}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-slate-700">{abstract.location}</span>
                    </div>
                  </div>
                  
                  {/* Key Findings */}
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Key Findings</h4>
                    <ul className="space-y-1">
                      {abstract.keyFindings.slice(0, 3).map((finding, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                          {finding}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-4 text-sm text-slate-700">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span>{abstract.patientPopulation.total} patients</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="w-4 h-4 text-gray-500" />
                        <span>{abstract.authors.length} authors</span>
                      </div>
                    </div>
                    <span className="text-sm text-slate-500">Updated {abstract.presentationDate}</span>
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
