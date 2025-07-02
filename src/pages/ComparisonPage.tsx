
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { X, ArrowLeft } from 'lucide-react';

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

const ComparisonPage = () => {
  const [abstracts, setAbstracts] = useState<Abstract[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('ComparisonPage: Component mounted');
    
    const loadData = () => {
      try {
        const storedAbstracts = sessionStorage.getItem('comparisonAbstracts');
        console.log('ComparisonPage: Raw sessionStorage data:', storedAbstracts);
        
        if (storedAbstracts) {
          const parsedAbstracts = JSON.parse(storedAbstracts);
          console.log('ComparisonPage: Parsed abstracts:', parsedAbstracts);
          console.log('ComparisonPage: Number of abstracts:', parsedAbstracts.length);
          
          if (Array.isArray(parsedAbstracts) && parsedAbstracts.length > 0) {
            setAbstracts(parsedAbstracts);
            setLoading(false);
            return;
          }
        }
        
        console.log('ComparisonPage: No valid data found, retrying...');
        // Retry after a short delay
        setTimeout(() => {
          const retryStoredAbstracts = sessionStorage.getItem('comparisonAbstracts');
          console.log('ComparisonPage: Retry - raw data:', retryStoredAbstracts);
          
          if (retryStoredAbstracts) {
            try {
              const parsedAbstracts = JSON.parse(retryStoredAbstracts);
              console.log('ComparisonPage: Retry - parsed abstracts:', parsedAbstracts);
              
              if (Array.isArray(parsedAbstracts) && parsedAbstracts.length > 0) {
                setAbstracts(parsedAbstracts);
              }
            } catch (error) {
              console.error('ComparisonPage: Retry - error parsing stored abstracts:', error);
            }
          }
          setLoading(false);
        }, 1000);
        
      } catch (error) {
        console.error('ComparisonPage: Error in loadData:', error);
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  const handleClose = () => {
    window.close();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'bg-green-50 text-green-700 border-green-200';
      case 'Presented': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Upcoming': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Oral Presentation': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Poster': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Keynote': return 'bg-orange-50 text-orange-700 border-orange-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const comparisonFields = [
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'trialId', label: 'Trial ID', type: 'text' },
    { key: 'company', label: 'Company', type: 'text' },
    { key: 'treatment', label: 'Treatment', type: 'text' },
    { key: 'indication', label: 'Indication', type: 'text' },
    { key: 'phase', label: 'Phase', type: 'badge' },
    { key: 'lineOfTherapy', label: 'Line of Therapy', type: 'text' },
    { key: 'population', label: 'Population', type: 'text' },
    { key: 'targetModality', label: 'Target/Modality', type: 'text' },
    { key: 'biomarker', label: 'Biomarker', type: 'text' },
    { key: 'patientRatio', label: 'Patients', type: 'text' },
    { key: 'outcomes', label: 'Outcomes', type: 'outcomes' },
    { key: 'conference', label: 'Conference', type: 'text' },
    { key: 'abstractNumber', label: 'Abstract Number', type: 'text' },
    { key: 'presentationType', label: 'Presentation Type', type: 'presentationType' },
    { key: 'status', label: 'Status', type: 'status' },
    { key: 'presentationDate', label: 'Date', type: 'text' },
    { key: 'location', label: 'Location', type: 'text' },
  ];

  const renderCellContent = (abstract: Abstract, field: any) => {
    const value = abstract[field.key as keyof Abstract];

    switch (field.type) {
      case 'badge':
        return (
          <Badge variant="outline" className="border-slate-300 text-slate-700 bg-slate-50 font-body">
            {value as string}
          </Badge>
        );
      case 'status':
        return (
          <Badge className={getStatusColor(value as string)}>
            {value as string}
          </Badge>
        );
      case 'presentationType':
        return (
          <Badge className={getTypeColor(value as string)}>
            {value as string}
          </Badge>
        );
      case 'outcomes':
        const outcomes = value as Abstract['outcomes'];
        return (
          <div className="space-y-1">
            <div className="text-sm font-medium">ORR: {outcomes.orr}</div>
            <div className="text-sm font-medium">PFS: {outcomes.pfs}</div>
            <div className="text-sm font-medium">OS: {outcomes.os}</div>
          </div>
        );
      case 'text':
      default:
        if (field.key === 'title') {
          return (
            <div className="max-w-xs">
              <p className="text-sm font-medium text-slate-900 line-clamp-3 leading-tight">
                {value as string}
              </p>
            </div>
          );
        }
        return (
          <span className="text-sm text-slate-900 font-body">
            {value as string}
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Loading Comparison...</h1>
          <p className="text-slate-600 mb-4">Please wait while we load your selected abstracts.</p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <Button onClick={handleClose}>Close Window</Button>
        </div>
      </div>
    );
  }

  if (abstracts.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">No Abstracts to Compare</h1>
          <p className="text-slate-600 mb-4">No comparison data was found.</p>
          <Button onClick={handleClose}>Close Window</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-900 font-body">
              Abstract Comparison ({abstracts.length} abstracts)
            </h1>
            <Button variant="ghost" size="sm" onClick={handleClose} className="hover:bg-slate-100">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50 border-b border-slate-200">
                <TableHead className="font-semibold text-slate-700 w-48 sticky left-0 bg-slate-50 z-10 border-r border-slate-200">
                  Field
                </TableHead>
                {abstracts.map((abstract, index) => (
                  <TableHead key={abstract.id} className="font-semibold text-slate-700 min-w-64 text-center">
                    Abstract {index + 1}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisonFields.map((field) => (
                <TableRow key={field.key} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <TableCell className="font-medium text-slate-700 bg-slate-50/50 sticky left-0 z-10 border-r border-slate-200 py-4">
                    {field.label}
                  </TableCell>
                  {abstracts.map((abstract) => (
                    <TableCell key={`${abstract.id}-${field.key}`} className="align-top p-4 text-center">
                      {renderCellContent(abstract, field)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ComparisonPage;
