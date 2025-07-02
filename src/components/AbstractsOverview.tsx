import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { GitCompare, FileText, Eye } from 'lucide-react';
import BarChartsGrid from './BarChartsGrid';
import PieChartSection from './PieChartSection';
import AbstractComparison from './AbstractComparison';

// Mock clinical abstracts data - similar to the one in TrialPage but for clinical data
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

const AbstractsOverview = () => {
  console.log('🔵 AbstractsOverview component is rendering!');
  
  const [selectedAbstracts, setSelectedAbstracts] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const sessionTypeData = [
    { name: 'NSCLC', value: 6, color: '#8B5CF6' },
    { name: 'Breast Cancer', value: 1, color: '#06B6D4' },
    { name: 'RCC', value: 1, color: '#10B981' },
    { name: 'Gastric Cancer', value: 2, color: '#F59E0B' },
    { name: 'HCC', value: 2, color: '#EF4444' },
    { name: 'Prostate Cancer', value: 2, color: '#8B5F65' },
    { name: 'Endometrial Cancer', value: 1, color: '#A855F7' },
    { name: 'SCLC', value: 2, color: '#EC4899' },
    { name: 'Sarcoma', value: 1, color: '#06B6D4' },
    { name: 'Pan-Tumor', value: 1, color: '#84CC16' }
  ];

  console.log('🔵 AbstractsOverview sessionTypeData:', sessionTypeData);
  console.log('🔵 About to render PieChartSection with data length:', sessionTypeData.length);

  const drugsData = [
    { name: 'Pembrolizumab', oral: 2.1, poster: 1.8, mini_oral: 0.3 },
    { name: 'Carboplatin', oral: 1.9, poster: 1.5, mini_oral: 0.4 },
    { name: 'Nivolumab', oral: 1.7, poster: 1.4, mini_oral: 0.2 },
    { name: 'Gemcitabine', oral: 1.5, poster: 1.2, mini_oral: 0.3 },
    { name: 'Trastuzumab', oral: 1.4, poster: 1.1, mini_oral: 0.2 },
    { name: 'Zoledronic acid', oral: 1.3, poster: 1.0, mini_oral: 0.2 },
    { name: 'T-DXd', oral: 1.2, poster: 0.9, mini_oral: 0.1 },
    { name: 'Dato-DXd', oral: 1.1, poster: 0.8, mini_oral: 0.2 },
    { name: 'Durvalumab', oral: 1.0, poster: 0.7, mini_oral: 0.1 },
  ];

  const companiesData = [
    { name: 'Merck', oral: 2.8, poster: 2.2, mini_oral: 0.4 },
    { name: 'Bristol Myers Squibb', oral: 2.5, poster: 2.0, mini_oral: 0.3 },
    { name: 'Eisai/BMS', oral: 2.3, poster: 1.8, mini_oral: 0.2 },
    { name: 'AstraZeneca', oral: 2.1, poster: 1.6, mini_oral: 0.3 },
    { name: 'Genentech', oral: 1.9, poster: 1.4, mini_oral: 0.2 },
    { name: 'Amgen', oral: 1.7, poster: 1.2, mini_oral: 0.1 },
    { name: 'Pfizer', oral: 1.5, poster: 1.0, mini_oral: 0.2 },
    { name: 'GSK', oral: 1.3, poster: 0.8, mini_oral: 0.1 },
    { name: 'Eisai', oral: 1.1, poster: 0.6, mini_oral: 0.1 },
  ];

  const targetsData = [
    { name: 'PD-1', oral: 2.0, poster: 1.5, mini_oral: 0.3 },
    { name: 'PD-L1/CTLA-4', oral: 1.8, poster: 1.3, mini_oral: 0.2 },
    { name: 'TNFG', oral: 1.6, poster: 1.1, mini_oral: 0.2 },
    { name: 'HER2', oral: 1.4, poster: 0.9, mini_oral: 0.1 },
    { name: 'PD-1/CTLA-4', oral: 1.2, poster: 0.7, mini_oral: 0.2 },
    { name: 'VEGF/PD-L1/CTLA-4', oral: 1.0, poster: 0.5, mini_oral: 0.1 },
    { name: 'PD-1/HER2', oral: 0.8, poster: 0.3, mini_oral: 0.1 },
    { name: 'EGFR', oral: 0.6, poster: 0.2, mini_oral: 0.1 },
    { name: 'TGFBR1/L', oral: 0.4, poster: 0.1, mini_oral: 0.05 },
    { name: 'CLDN18.2', oral: 0.2, poster: 0.05, mini_oral: 0.02 },
  ];

  const modalitiesData = [
    { name: 'mAb', oral: 4.5, poster: 3.8, mini_oral: 0.7 },
    { name: 'ADC', oral: 2.2, poster: 1.8, mini_oral: 0.4 },
    { name: 'Small Molecule + mAb', oral: 3.5, poster: 2.9, mini_oral: 0.6 },
    { name: 'Small Molecule', oral: 1.8, poster: 1.4, mini_oral: 0.3 },
    { name: 'mAb + Small Molecule', oral: 2.8, poster: 2.2, mini_oral: 0.5 },
  ];

  const chartConfig = {
    value: {
      label: "Abstracts",
    },
    oral: {
      label: "Oral Presentation",
      color: "#8B5CF6",
    },
    poster: {
      label: "Poster", 
      color: "#06B6D4",
    },
    mini_oral: {
      label: "Mini Oral",
      color: "#10B981",
    },
  };

  const handleAbstractSelect = (abstractId: string) => {
    console.log('Selecting abstract:', abstractId);
    setSelectedAbstracts(prev => {
      const newSelection = prev.includes(abstractId) 
        ? prev.filter(id => id !== abstractId)
        : [...prev, abstractId];
      console.log('New selection:', newSelection);
      return newSelection;
    });
  };

  const handleCompareAbstracts = () => {
    console.log('🔥 COMPARE BUTTON CLICKED! 🔥');
    console.log('Compare button clicked, selected abstracts:', selectedAbstracts);
    console.log('Number of selected abstracts:', selectedAbstracts.length);
    
    if (selectedAbstracts.length >= 2) {
      console.log('✅ Setting showComparison to true');
      setShowComparison(true);
    } else {
      console.log('❌ Not enough abstracts selected for comparison');
      alert(`Please select at least 2 abstracts to compare. Currently selected: ${selectedAbstracts.length}`);
    }
  };

  const getSelectedAbstracts = () => {
    const selected = mockClinicalAbstracts.filter(abstract => selectedAbstracts.includes(abstract.id));
    console.log('Getting selected abstracts:', selected);
    return selected;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'bg-green-50 text-green-700 border-green-200';
      case 'Presented': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Upcoming': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  console.log('🔵 About to render AbstractsOverview JSX with pie chart and bar charts');

  return (
    <div className="bg-white p-6" style={{ fontFamily: "'Roboto', sans-serif" }}>
      <div className="mb-4 p-4 bg-yellow-100 border border-yellow-300 rounded">
        <p className="text-sm">DEBUG: Overview component loaded. Trial distribution data length: {sessionTypeData.length}</p>
        <p className="text-sm">First item: {sessionTypeData[0]?.name} - {sessionTypeData[0]?.value} trials</p>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="clinical">Clinical Data</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="bg-red-100 border border-red-300 rounded p-4 mb-4">
            <p className="text-sm">DEBUG: About to render PieChartSection with trial indication data</p>
          </div>
          
          {/* Pie Chart Section - Shows trial distribution by indication */}
          <PieChartSection data={sessionTypeData} />
          
          {/* Bar Charts Grid */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Insights</h2>
            <BarChartsGrid 
              drugsData={drugsData}
              companiesData={companiesData}
              targetsData={targetsData}
              modalitiesData={modalitiesData}
              sessionTypeData={sessionTypeData}
              chartConfig={chartConfig}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="clinical" className="space-y-6">
          <div className="bg-white">
            {/* Header with Compare button */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-[#172B4D] mb-2 font-sans">
                  Clinical Data Abstracts
                </h2>
                <p className="text-[#6c757d] font-sans">
                  Showing 1-{mockClinicalAbstracts.length} of {mockClinicalAbstracts.length} clinical abstracts
                </p>
              </div>
              <Button 
                variant="outline" 
                className="border-[#ddd] hover:border-[#172B4D] hover:bg-[#F5F8FA] text-[#172B4D]"
                disabled={selectedAbstracts.length < 2}
                onClick={handleCompareAbstracts}
              >
                <GitCompare className="w-4 h-4 mr-2" />
                Compare ({selectedAbstracts.length})
              </Button>
            </div>

            {/* Stats Row */}
            <div className="flex items-center gap-6 mb-8">
              <Badge variant="outline" className="px-3 py-2 text-sm border-[#ddd] text-[#172B4D] bg-[#F5F8FA] font-sans">
                <span className="font-semibold">{mockClinicalAbstracts.length}</span>
                <span className="ml-1">Total Abstracts</span>
              </Badge>
              <Badge variant="outline" className="px-3 py-2 text-sm border-green-200 text-green-700 bg-green-50 font-sans">
                <span className="font-semibold">{mockClinicalAbstracts.filter(a => a.status === 'Published').length}</span>
                <span className="ml-1">Published</span>
              </Badge>
              <Badge variant="outline" className="px-3 py-2 text-sm border-blue-200 text-blue-700 bg-blue-50 font-sans">
                <span className="font-semibold">{mockClinicalAbstracts.filter(a => a.presentationType === 'Oral Presentation').length}</span>
                <span className="ml-1">Oral Presentations</span>
              </Badge>
              {selectedAbstracts.length > 0 && (
                <Badge variant="outline" className="px-3 py-2 text-sm border-orange-200 text-orange-700 bg-orange-50 font-sans">
                  <span className="font-semibold">{selectedAbstracts.length}</span>
                  <span className="ml-1">Selected</span>
                </Badge>
              )}
            </div>

            {/* Clinical Abstracts List */}
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
                        <Checkbox
                          checked={selectedAbstracts.includes(abstract.id)}
                          onCheckedChange={() => handleAbstractSelect(abstract.id)}
                          className="mt-1"
                        />
                        <div className="w-12 h-12 bg-[#F5F8FA] rounded-xl flex items-center justify-center flex-shrink-0">
                          <FileText className="w-6 h-6 text-[#172B4D]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-[#172B4D] text-lg mb-2 leading-tight font-sans">
                            {abstract.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-[#6c757d] font-sans">
                            <span>{abstract.conference}</span>
                            <span>•</span>
                            <span>{abstract.abstractNumber}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Badge variant="outline" className="border-[#ddd] text-[#172B4D] bg-[#F5F8FA] font-sans">
                          {abstract.presentationType}
                        </Badge>
                        <Badge className={getStatusColor(abstract.status)}>
                          {abstract.status}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-2 hover:bg-[#e9ecef]"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
                      <div className="space-y-4">
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
                      </div>

                      <div className="space-y-4">
                        <div>
                          <p className="text-xs font-medium text-[#6c757d] mb-1 font-sans uppercase tracking-wide">Indication</p>
                          <p className="text-sm text-[#172B4D] font-sans">{abstract.indication}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-[#6c757d] mb-1 font-sans uppercase tracking-wide">Line of Therapy</p>
                          <p className="text-sm text-[#172B4D] font-sans">{abstract.lineOfTherapy}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-[#6c757d] mb-1 font-sans uppercase tracking-wide">Population</p>
                          <p className="text-sm text-[#172B4D] font-sans">{abstract.population}</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <p className="text-xs font-medium text-[#6c757d] mb-1 font-sans uppercase tracking-wide">Target/Modality</p>
                          <p className="text-sm text-[#172B4D] font-sans">{abstract.targetModality}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-[#6c757d] mb-1 font-sans uppercase tracking-wide">Biomarker</p>
                          <p className="text-sm text-[#172B4D] font-sans">{abstract.biomarker}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-[#6c757d] mb-1 font-sans uppercase tracking-wide">Phase</p>
                          <p className="text-sm text-[#172B4D] font-sans">{abstract.phase}</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <p className="text-xs font-medium text-[#6c757d] mb-1 font-sans uppercase tracking-wide">Patients</p>
                          <p className="text-sm text-[#172B4D] font-sans">{abstract.patientRatio}</p>
                        </div>
                      </div>
                    </div>

                    {/* Outcomes Row */}
                    <div className="flex items-center justify-start gap-8 pt-4 border-t border-[#ddd]">
                      <div className="text-center">
                        <p className="text-xs font-medium text-[#6c757d] mb-1 font-sans uppercase tracking-wide">ORR</p>
                        <p className="text-lg font-semibold text-[#1A237E] font-sans">{abstract.outcomes.orr}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-medium text-[#6c757d] mb-1 font-sans uppercase tracking-wide">PFS</p>
                        <p className="text-lg font-semibold text-[#1A237E] font-sans">{abstract.outcomes.pfs}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-medium text-[#6c757d] mb-1 font-sans uppercase tracking-wide">OS</p>
                        <p className="text-lg font-semibold text-[#1A237E] font-sans">{abstract.outcomes.os}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Abstract Comparison Dialog */}
      <AbstractComparison 
        abstracts={getSelectedAbstracts()}
        open={showComparison}
        onClose={() => {
          console.log('🔥 Closing comparison dialog 🔥');
          setShowComparison(false);
        }}
      />
    </div>
  );
};

export default AbstractsOverview;
