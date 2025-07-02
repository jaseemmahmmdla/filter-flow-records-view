
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  ArrowLeft, 
  FileText, 
  LayoutGrid, 
  List, 
  Download, 
  Zap, 
  Eye,
  GitCompare
} from 'lucide-react';
import Header from '@/components/Header';
import AbstractComparison from '@/components/AbstractComparison';

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
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');
  const [selectedAbstracts, setSelectedAbstracts] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  console.log('TrialPage render - showComparison:', showComparison, 'selectedAbstracts:', selectedAbstracts);

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

  const handleViewAbstract = (abstractId: string) => {
    console.log('Navigate to abstract:', abstractId);
    // Navigate to abstract detail view
  };

  const handleCompareAbstracts = () => {
    console.log('🔥 COMPARE BUTTON CLICKED! 🔥');
    console.log('Compare button clicked, selected abstracts:', selectedAbstracts);
    console.log('Number of selected abstracts:', selectedAbstracts.length);
    console.log('Current showComparison state:', showComparison);
    
    if (selectedAbstracts.length >= 2) {
      console.log('✅ Setting showComparison to true');
      setShowComparison(true);
      console.log('✅ showComparison should now be true');
    } else {
      console.log('❌ Not enough abstracts selected for comparison');
      alert(`Please select at least 2 abstracts to compare. Currently selected: ${selectedAbstracts.length}`);
    }
  };

  const getSelectedAbstracts = () => {
    const selected = abstracts.filter(abstract => selectedAbstracts.includes(abstract.id));
    console.log('Getting selected abstracts:', selected);
    return selected;
  };

  // Move the console.log outside of JSX
  const selectedAbstractsForComparison = getSelectedAbstracts();
  console.log('About to render AbstractComparison with:', { 
    abstracts: selectedAbstractsForComparison.length, 
    open: showComparison 
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'bg-green-50 text-green-700 border-green-200';
      case 'Presented': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Upcoming': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const CardView = () => (
    <div className="space-y-4">
      {abstracts.map((abstract) => (
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
                  onClick={() => handleViewAbstract(abstract.id)}
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
  );

  const ListView = () => (
    <Card className="bg-white shadow-sm border border-[#ddd] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full results-table">
          <thead className="border-b border-[#ddd] bg-[#F5F8FA]">
            <tr>
              <th className="text-left p-4 text-sm font-semibold text-[#172B4D] font-sans">Select</th>
              <th className="text-left p-4 text-sm font-semibold text-[#172B4D] font-sans">Abstract</th>
              <th className="text-left p-4 text-sm font-semibold text-[#172B4D] font-sans">Conference</th>
              <th className="text-left p-4 text-sm font-semibold text-[#172B4D] font-sans">Type</th>
              <th className="text-left p-4 text-sm font-semibold text-[#172B4D] font-sans">Status</th>
              <th className="text-left p-4 text-sm font-semibold text-[#172B4D] font-sans">Outcomes</th>
              <th className="text-right p-4 text-sm font-semibold text-[#172B4D] font-sans">Actions</th>
            </tr>
          </thead>
          <tbody>
            {abstracts.map((abstract, index) => (
              <tr key={abstract.id} className={`border-b border-[#ddd] hover:bg-[#e9ecef] transition-colors ${index % 2 === 0 ? 'bg-[#f8f9fa]' : 'bg-white'}`}>
                <td className="p-4">
                  <Checkbox
                    checked={selectedAbstracts.includes(abstract.id)}
                    onCheckedChange={() => handleAbstractSelect(abstract.id)}
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#F5F8FA] rounded-lg">
                      <FileText className="w-4 h-4 text-[#172B4D]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#172B4D] font-sans">{abstract.title.substring(0, 60)}...</p>
                      <p className="text-sm text-[#6c757d] mt-1 font-sans">{abstract.abstractNumber}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="font-sans">
                    <p className="text-sm text-[#172B4D]">{abstract.conference}</p>
                    <p className="text-xs text-[#6c757d]">{abstract.presentationDate}</p>
                  </div>
                </td>
                <td className="p-4">
                  <Badge variant="outline" className="border-[#ddd] text-[#172B4D] bg-[#F5F8FA] font-sans">
                    {abstract.presentationType}
                  </Badge>
                </td>
                <td className="p-4">
                  <Badge className={getStatusColor(abstract.status)}>
                    {abstract.status}
                  </Badge>
                </td>
                <td className="p-4">
                  <div className="flex gap-4 text-sm font-sans">
                    <span className="text-[#1A237E] font-bold">ORR: {abstract.outcomes.orr}</span>
                    <span className="text-[#1A237E] font-bold">PFS: {abstract.outcomes.pfs}</span>
                    <span className="text-[#1A237E] font-bold">OS: {abstract.outcomes.os}</span>
                  </div>
                </td>
                <td className="p-4 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewAbstract(abstract.id)}
                    className="hover:bg-[#e9ecef]"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );

  return (
    <div className="flex-1 bg-white font-sans text-[#172B4D]">
      <Header />
      
      {/* Trial Header */}
      <div className="bg-white border-b border-[#ddd] shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 font-sans hover:bg-[#e9ecef] text-[#172B4D]"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </div>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-[#172B4D] mb-2 font-sans">
                {trial.title}
              </h1>
              <div className="flex flex-wrap gap-3 mb-4">
                <Badge variant="outline" className="border-[#ddd] text-[#172B4D] font-sans bg-[#F5F8FA]">
                  {trial.phase}
                </Badge>
                <Badge variant="outline" className="border-[#ddd] text-[#172B4D] font-sans bg-[#F5F8FA]">
                  {trial.indication}
                </Badge>
                <Badge className="bg-green-50 text-green-700 border-green-200 font-sans">
                  {trial.status}
                </Badge>
              </div>
              <div className="text-[#6c757d] space-y-1 font-sans">
                <p><strong className="text-[#172B4D]">Sponsor:</strong> {trial.sponsor}</p>
                <p><strong className="text-[#172B4D]">Start Date:</strong> {new Date(trial.startDate).toLocaleDateString()}</p>
                <p><strong className="text-[#172B4D]">Estimated Completion:</strong> {new Date(trial.estimatedCompletion).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 main-content">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-[#172B4D] mb-2 font-sans">
                Conference Abstracts
              </h2>
              <p className="text-[#6c757d] font-sans">
                Showing 1-{abstracts.length} of {abstracts.length} abstracts
              </p>
            </div>
            <div className="flex gap-3">
              <div className="flex bg-[#f2f2f2] rounded-lg p-1">
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-white shadow-sm text-[#172B4D]' : 'hover:bg-[#e9ecef] text-[#172B4D]'}
                >
                  <List className="w-4 h-4 mr-2" />
                  List
                </Button>
                <Button
                  variant={viewMode === 'card' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('card')}
                  className={viewMode === 'card' ? 'bg-white shadow-sm text-[#172B4D]' : 'hover:bg-[#e9ecef] text-[#172B4D]'}
                >
                  <LayoutGrid className="w-4 h-4 mr-2" />
                  Cards
                </Button>
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
              <Button variant="outline" className="border-[#ddd] hover:border-[#172B4D] hover:bg-[#F5F8FA] text-[#172B4D]">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-6 mb-8">
          <Badge variant="outline" className="px-3 py-2 text-sm border-[#ddd] text-[#172B4D] bg-[#F5F8FA] font-sans">
            <span className="font-semibold">{abstracts.length}</span>
            <span className="ml-1">Total Abstracts</span>
          </Badge>
          <Badge variant="outline" className="px-3 py-2 text-sm border-green-200 text-green-700 bg-green-50 font-sans">
            <span className="font-semibold">{abstracts.filter(a => a.status === 'Published').length}</span>
            <span className="ml-1">Published</span>
          </Badge>
          <Badge variant="outline" className="px-3 py-2 text-sm border-blue-200 text-blue-700 bg-blue-50 font-sans">
            <span className="font-semibold">{abstracts.filter(a => a.presentationType === 'Oral Presentation').length}</span>
            <span className="ml-1">Oral Presentations</span>
          </Badge>
          {selectedAbstracts.length > 0 && (
            <Badge variant="outline" className="px-3 py-2 text-sm border-orange-200 text-orange-700 bg-orange-50 font-sans">
              <span className="font-semibold">{selectedAbstracts.length}</span>
              <span className="ml-1">Selected</span>
            </Badge>
          )}
        </div>

        {/* Abstracts Display */}
        <div className="mb-8">
          {viewMode === 'card' ? <CardView /> : <ListView />}
        </div>
      </div>

      {/* Abstract Comparison Dialog */}
      <AbstractComparison 
        abstracts={selectedAbstractsForComparison}
        open={showComparison}
        onClose={() => {
          console.log('🔥 Closing comparison dialog 🔥');
          setShowComparison(false);
        }}
      />
    </div>
  );
};

export default TrialPage;
