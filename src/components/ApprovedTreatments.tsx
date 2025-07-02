
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Pill, Building2, FileText } from 'lucide-react';

const ApprovedTreatments = () => {
  // Mock data for approved treatments
  const mockTreatments = [
    {
      id: 1,
      name: "Pembrolizumab",
      brandName: "Keytruda",
      company: "Merck & Co.",
      approvalDate: "2023-09-15",
      indication: "Non-small cell lung cancer",
      mechanism: "PD-1 inhibitor",
      status: "Recently Approved"
    },
    {
      id: 2,
      name: "Trastuzumab deruxtecan",
      brandName: "Enhertu",
      company: "Daiichi Sankyo",
      approvalDate: "2023-08-11",
      indication: "HER2-positive breast cancer",
      mechanism: "Antibody-drug conjugate",
      status: "Recently Approved"
    },
    {
      id: 3,
      name: "Nivolumab",
      brandName: "Opdivo",
      company: "Bristol Myers Squibb",
      approvalDate: "2023-07-20",
      indication: "Melanoma",
      mechanism: "PD-1 inhibitor",
      status: "Recently Approved"
    },
    {
      id: 4,
      name: "CAR-T Cell Therapy",
      brandName: "Kymriah",
      company: "Novartis",
      approvalDate: "2023-06-30",
      indication: "B-cell acute lymphoblastic leukemia",
      mechanism: "Chimeric antigen receptor T-cell therapy",
      status: "Recently Approved"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1A237E] mb-2">Approved Treatments</h1>
        <p className="text-gray-600">
          Recently approved oncology treatments and therapies
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockTreatments.map((treatment) => (
          <Card key={treatment.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <CardTitle className="text-lg font-semibold text-[#1A237E]">
                    {treatment.name}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-500">
                    {treatment.brandName}
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {treatment.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Building2 className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">{treatment.company}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">
                    Approved: {new Date(treatment.approvalDate).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Pill className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">{treatment.mechanism}</span>
                </div>
                
                <div className="flex items-start gap-2 text-sm">
                  <FileText className="w-4 h-4 text-gray-500 mt-0.5" />
                  <span className="text-gray-700">{treatment.indication}</span>
                </div>
              </div>
              
              <div className="pt-2">
                <Button variant="outline" size="sm" className="w-full">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <Button>Load More Treatments</Button>
      </div>
    </div>
  );
};

export default ApprovedTreatments;
