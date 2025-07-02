import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter, 
  Download, 
  BarChart3, 
  TrendingUp, 
  Users, 
  Target,
  Calendar,
  MapPin,
  Building2,
  Pill,
  FlaskConical,
  Eye
} from 'lucide-react';
import PieChartSection from './PieChartSection';

interface Trial {
  id: string;
  title: string;
  status: string;
  phase: string;
  studyType: string;
  location: string;
  conditions: string[];
  sponsor: string;
  startDate: string;
  completionDate: string;
  enrollment: number;
  description: string;
  eligibility: string;
  contact: string;
  url: string;
  ages: string;
  gender: string;
  inclusionCriteria: string;
  exclusionCriteria: string;
  primaryPurpose: string;
  masking: string;
  allocation: string;
  interventionModel: string;
  numberOfArms: number;
  numberOfSites: number;
  acronym: string;
  contactBackup: string;
  responsibleParty: string;
  overallStatus: string;
  whyStopped: string;
  briefSummary: string;
  detailedDescription: string;
  studyDesign: string;
  outcomes: string;
  keywords: string[];
  interventions: string[];
}

interface TrialDatabaseProps {
  filters: any;
  onTrialSelect: (trial: Trial) => void;
}

const mockTrials: Trial[] = [
  {
    id: '1',
    title: 'A Study of Pembrolizumab in Participants With Advanced Solid Tumors',
    status: 'Recruiting',
    phase: 'Phase 2',
    studyType: 'Interventional',
    location: 'New York, NY',
    conditions: ['Advanced Solid Tumors'],
    sponsor: 'Merck Sharp & Dohme Corp.',
    startDate: '2023-01-15',
    completionDate: '2024-12-31',
    enrollment: 150,
    description: 'This study is evaluating the safety and efficacy of pembrolizumab in participants with advanced solid tumors.',
    eligibility: 'Participants with advanced solid tumors who have failed standard therapy.',
    contact: 'John Doe, MD',
    url: 'https://example.com/trial/1',
    ages: '18+',
    gender: 'All',
    inclusionCriteria: 'Advanced solid tumors, failed standard therapy',
    exclusionCriteria: 'Prior immunotherapy, significant comorbidities',
    primaryPurpose: 'Treatment',
    masking: 'None (Open Label)',
    allocation: 'Randomized',
    interventionModel: 'Parallel Assignment',
    numberOfArms: 2,
    numberOfSites: 10,
    acronym: 'MK-3475',
    contactBackup: 'Jane Smith, RN',
    responsibleParty: 'Merck',
    overallStatus: 'Active, not recruiting',
    whyStopped: 'N/A',
    briefSummary: 'Evaluating pembrolizumab in advanced solid tumors.',
    detailedDescription: 'A detailed study of pembrolizumab\'s effects.',
    studyDesign: 'Randomized, open label',
    outcomes: 'Overall survival, progression-free survival',
    keywords: ['Pembrolizumab', 'Solid Tumors', 'Immunotherapy'],
    interventions: ['Pembrolizumab'],
  },
  {
    id: '2',
    title: 'Trial of Nivolumab in Metastatic Non-Small Cell Lung Cancer',
    status: 'Completed',
    phase: 'Phase 3',
    studyType: 'Interventional',
    location: 'Los Angeles, CA',
    conditions: ['Metastatic Non-Small Cell Lung Cancer (NSCLC)'],
    sponsor: 'Bristol-Myers Squibb',
    startDate: '2022-05-20',
    completionDate: '2023-11-15',
    enrollment: 300,
    description: 'This study is assessing the efficacy and safety of nivolumab in patients with metastatic NSCLC.',
    eligibility: 'Patients with metastatic NSCLC who have progressed on or after platinum-based chemotherapy.',
    contact: 'Alice Johnson, MD',
    url: 'https://example.com/trial/2',
    ages: '18+',
    gender: 'All',
    inclusionCriteria: 'Metastatic NSCLC, progression after platinum therapy',
    exclusionCriteria: 'Prior immunotherapy, EGFR or ALK mutations',
    primaryPurpose: 'Treatment',
    masking: 'Double Blind',
    allocation: 'Randomized',
    interventionModel: 'Parallel Assignment',
    numberOfArms: 2,
    numberOfSites: 15,
    acronym: 'CheckMate 057',
    contactBackup: 'Bob Williams, RN',
    responsibleParty: 'Bristol-Myers Squibb',
    overallStatus: 'Completed',
    whyStopped: 'N/A',
    briefSummary: 'Assessing nivolumab in metastatic NSCLC.',
    detailedDescription: 'A comprehensive study of nivolumab\'s effects on NSCLC.',
    studyDesign: 'Randomized, double-blind',
    outcomes: 'Overall survival, progression-free survival',
    keywords: ['Nivolumab', 'NSCLC', 'Lung Cancer'],
    interventions: ['Nivolumab'],
  },
  {
    id: '3',
    title: 'Study of Atezolizumab in Advanced Urothelial Carcinoma',
    status: 'Active, not recruiting',
    phase: 'Phase 3',
    studyType: 'Interventional',
    location: 'San Francisco, CA',
    conditions: ['Advanced Urothelial Carcinoma'],
    sponsor: 'Genentech, Inc.',
    startDate: '2021-11-01',
    completionDate: '2024-06-30',
    enrollment: 450,
    description: 'This study is investigating the efficacy and safety of atezolizumab in patients with advanced urothelial carcinoma.',
    eligibility: 'Patients with advanced urothelial carcinoma who are ineligible for cisplatin-based chemotherapy.',
    contact: 'Eve Brown, MD',
    url: 'https://example.com/trial/3',
    ages: '18+',
    gender: 'All',
    inclusionCriteria: 'Advanced urothelial carcinoma, cisplatin-ineligible',
    exclusionCriteria: 'Prior immunotherapy, significant comorbidities',
    primaryPurpose: 'Treatment',
    masking: 'Open Label',
    allocation: 'Non-Randomized',
    interventionModel: 'Single Group Assignment',
    numberOfArms: 1,
    numberOfSites: 20,
    acronym: 'IMvigor210',
    contactBackup: 'Charlie Green, RN',
    responsibleParty: 'Genentech',
    overallStatus: 'Active, not recruiting',
    whyStopped: 'N/A',
    briefSummary: 'Investigating atezolizumab in advanced urothelial carcinoma.',
    detailedDescription: 'A detailed study of atezolizumab\'s effects on urothelial carcinoma.',
    studyDesign: 'Non-randomized, open label',
    outcomes: 'Objective response rate, overall survival',
    keywords: ['Atezolizumab', 'Urothelial Carcinoma', 'Bladder Cancer'],
    interventions: ['Atezolizumab'],
  },
  {
    id: '4',
    title: 'Clinical Trial of Olaparib in Metastatic Breast Cancer',
    status: 'Recruiting',
    phase: 'Phase 3',
    studyType: 'Interventional',
    location: 'Chicago, IL',
    conditions: ['Metastatic Breast Cancer'],
    sponsor: 'AstraZeneca',
    startDate: '2022-09-10',
    completionDate: '2025-03-31',
    enrollment: 250,
    description: 'This study is evaluating the efficacy and safety of olaparib in patients with metastatic breast cancer and BRCA mutations.',
    eligibility: 'Patients with metastatic breast cancer and BRCA1/2 mutations.',
    contact: 'Grace White, MD',
    url: 'https://example.com/trial/4',
    ages: '18+',
    gender: 'Female',
    inclusionCriteria: 'Metastatic breast cancer, BRCA1/2 mutations',
    exclusionCriteria: 'Prior PARP inhibitor therapy, significant comorbidities',
    primaryPurpose: 'Treatment',
    masking: 'Double Blind',
    allocation: 'Randomized',
    interventionModel: 'Parallel Assignment',
    numberOfArms: 2,
    numberOfSites: 12,
    acronym: 'OlympiAD',
    contactBackup: 'Harry Black, RN',
    responsibleParty: 'AstraZeneca',
    overallStatus: 'Active, recruiting',
    whyStopped: 'N/A',
    briefSummary: 'Evaluating olaparib in metastatic breast cancer with BRCA mutations.',
    detailedDescription: 'A detailed study of olaparib\'s effects on breast cancer.',
    studyDesign: 'Randomized, double-blind',
    outcomes: 'Progression-free survival, overall survival',
    keywords: ['Olaparib', 'Breast Cancer', 'BRCA Mutation'],
    interventions: ['Olaparib'],
  },
  {
    id: '5',
    title: 'A Study of Ipilimumab in Participants With Advanced Melanoma',
    status: 'Completed',
    phase: 'Phase 3',
    studyType: 'Interventional',
    location: 'Miami, FL',
    conditions: ['Advanced Melanoma'],
    sponsor: 'Bristol-Myers Squibb',
    startDate: '2021-07-01',
    completionDate: '2023-12-31',
    enrollment: 180,
    description: 'This study is assessing the efficacy and safety of ipilimumab in patients with advanced melanoma.',
    eligibility: 'Patients with advanced melanoma who have not received prior systemic therapy.',
    contact: 'Ivy Blue, MD',
    url: 'https://example.com/trial/5',
    ages: '18+',
    gender: 'All',
    inclusionCriteria: 'Advanced melanoma, no prior systemic therapy',
    exclusionCriteria: 'Prior immunotherapy, brain metastases',
    primaryPurpose: 'Treatment',
    masking: 'Open Label',
    allocation: 'Randomized',
    interventionModel: 'Parallel Assignment',
    numberOfArms: 2,
    numberOfSites: 8,
    acronym: 'MDX-010',
    contactBackup: 'Jack Indigo, RN',
    responsibleParty: 'Bristol-Myers Squibb',
    overallStatus: 'Completed',
    whyStopped: 'N/A',
    briefSummary: 'Assessing ipilimumab in advanced melanoma.',
    detailedDescription: 'A comprehensive study of ipilimumab\'s effects on melanoma.',
    studyDesign: 'Randomized, open label',
    outcomes: 'Overall survival, progression-free survival',
    keywords: ['Ipilimumab', 'Melanoma', 'Skin Cancer'],
    interventions: ['Ipilimumab'],
  },
  {
    id: '6',
    title: 'Trial of Bevacizumab in Recurrent Glioblastoma',
    status: 'Recruiting',
    phase: 'Phase 2',
    studyType: 'Interventional',
    location: 'Houston, TX',
    conditions: ['Recurrent Glioblastoma'],
    sponsor: 'Genentech, Inc.',
    startDate: '2023-03-15',
    completionDate: '2024-09-30',
    enrollment: 120,
    description: 'This study is evaluating the efficacy and safety of bevacizumab in patients with recurrent glioblastoma.',
    eligibility: 'Patients with recurrent glioblastoma who have progressed after initial therapy.',
    contact: 'Kelly Violet, MD',
    url: 'https://example.com/trial/6',
    ages: '18+',
    gender: 'All',
    inclusionCriteria: 'Recurrent glioblastoma, progression after initial therapy',
    exclusionCriteria: 'Prior bevacizumab therapy, significant comorbidities',
    primaryPurpose: 'Treatment',
    masking: 'Open Label',
    allocation: 'Non-Randomized',
    interventionModel: 'Single Group Assignment',
    numberOfArms: 1,
    numberOfSites: 6,
    acronym: 'AVF3708g',
    contactBackup: 'Leo Orange, RN',
    responsibleParty: 'Genentech',
    overallStatus: 'Active, recruiting',
    whyStopped: 'N/A',
    briefSummary: 'Evaluating bevacizumab in recurrent glioblastoma.',
    detailedDescription: 'A detailed study of bevacizumab\'s effects on glioblastoma.',
    studyDesign: 'Non-randomized, open label',
    outcomes: 'Progression-free survival, overall survival',
    keywords: ['Bevacizumab', 'Glioblastoma', 'Brain Cancer'],
    interventions: ['Bevacizumab'],
  },
  {
    id: '7',
    title: 'Study of Durvalumab in Unresectable Stage III NSCLC',
    status: 'Completed',
    phase: 'Phase 3',
    studyType: 'Interventional',
    location: 'Seattle, WA',
    conditions: ['Unresectable Stage III Non-Small Cell Lung Cancer (NSCLC)'],
    sponsor: 'AstraZeneca',
    startDate: '2020-11-01',
    completionDate: '2022-12-31',
    enrollment: 700,
    description: 'This study is assessing the efficacy and safety of durvalumab in patients with unresectable Stage III NSCLC.',
    eligibility: 'Patients with unresectable Stage III NSCLC who have not progressed after platinum-based chemoradiation.',
    contact: 'Molly Yellow, MD',
    url: 'https://example.com/trial/7',
    ages: '18+',
    gender: 'All',
    inclusionCriteria: 'Unresectable Stage III NSCLC, no progression after chemoradiation',
    exclusionCriteria: 'Prior immunotherapy, EGFR or ALK mutations',
    primaryPurpose: 'Treatment',
    masking: 'Double Blind',
    allocation: 'Randomized',
    interventionModel: 'Parallel Assignment',
    numberOfArms: 2,
    numberOfSites: 25,
    acronym: 'PACIFIC',
    contactBackup: 'Ned Teal, RN',
    responsibleParty: 'AstraZeneca',
    overallStatus: 'Completed',
    whyStopped: 'N/A',
    briefSummary: 'Assessing durvalumab in unresectable Stage III NSCLC.',
    detailedDescription: 'A comprehensive study of durvalumab\'s effects on NSCLC.',
    studyDesign: 'Randomized, double-blind',
    outcomes: 'Overall survival, progression-free survival',
    keywords: ['Durvalumab', 'NSCLC', 'Lung Cancer'],
    interventions: ['Durvalumab'],
  },
  {
    id: '8',
    title: 'Clinical Trial of Enzalutamide in Metastatic Prostate Cancer',
    status: 'Recruiting',
    phase: 'Phase 3',
    studyType: 'Interventional',
    location: 'Atlanta, GA',
    conditions: ['Metastatic Prostate Cancer'],
    sponsor: 'Astellas Pharma Inc.',
    startDate: '2022-06-01',
    completionDate: '2025-06-30',
    enrollment: 1400,
    description: 'This study is evaluating the efficacy and safety of enzalutamide in patients with metastatic castration-resistant prostate cancer.',
    eligibility: 'Patients with metastatic castration-resistant prostate cancer who have not received prior chemotherapy.',
    contact: 'Olivia Gray, MD',
    url: 'https://example.com/trial/8',
    ages: '18+',
    gender: 'Male',
    inclusionCriteria: 'Metastatic castration-resistant prostate cancer, no prior chemotherapy',
    exclusionCriteria: 'Prior enzalutamide therapy, significant comorbidities',
    primaryPurpose: 'Treatment',
    masking: 'Double Blind',
    allocation: 'Randomized',
    interventionModel: 'Parallel Assignment',
    numberOfArms: 2,
    numberOfSites: 30,
    acronym: 'AFFIRM',
    contactBackup: 'Peter Silver, RN',
    responsibleParty: 'Astellas',
    overallStatus: 'Active, recruiting',
    whyStopped: 'N/A',
    briefSummary: 'Evaluating enzalutamide in metastatic prostate cancer.',
    detailedDescription: 'A detailed study of enzalutamide\'s effects on prostate cancer.',
    studyDesign: 'Randomized, double-blind',
    outcomes: 'Overall survival, radiographic progression-free survival',
    keywords: ['Enzalutamide', 'Prostate Cancer', 'Castration-Resistant'],
    interventions: ['Enzalutamide'],
  },
  {
    id: '9',
    title: 'A Study of Trastuzumab in Participants With HER2-Positive Breast Cancer',
    status: 'Completed',
    phase: 'Phase 3',
    studyType: 'Interventional',
    location: 'Dallas, TX',
    conditions: ['HER2-Positive Breast Cancer'],
    sponsor: 'Genentech, Inc.',
    startDate: '2021-02-01',
    completionDate: '2023-03-31',
    enrollment: 450,
    description: 'This study is assessing the efficacy and safety of trastuzumab in patients with HER2-positive breast cancer.',
    eligibility: 'Patients with HER2-positive breast cancer who have not received prior trastuzumab therapy.',
    contact: 'Quinn Bronze, MD',
    url: 'https://example.com/trial/9',
    ages: '18+',
    gender: 'Female',
    inclusionCriteria: 'HER2-positive breast cancer, no prior trastuzumab',
    exclusionCriteria: 'Significant cardiac comorbidities',
    primaryPurpose: 'Treatment',
    masking: 'Open Label',
    allocation: 'Randomized',
    interventionModel: 'Parallel Assignment',
    numberOfArms: 2,
    numberOfSites: 18,
    acronym: 'HERA',
    contactBackup: 'Rachel Copper, RN',
    responsibleParty: 'Genentech',
    overallStatus: 'Completed',
    whyStopped: 'N/A',
    briefSummary: 'Assessing trastuzumab in HER2-positive breast cancer.',
    detailedDescription: 'A comprehensive study of trastuzumab\'s effects on breast cancer.',
    studyDesign: 'Randomized, open label',
    outcomes: 'Disease-free survival, overall survival',
    keywords: ['Trastuzumab', 'Breast Cancer', 'HER2-Positive'],
    interventions: ['Trastuzumab'],
  },
  {
    id: '10',
    title: 'Trial of Pembrolizumab in Advanced Gastric Cancer',
    status: 'Recruiting',
    phase: 'Phase 3',
    studyType: 'Interventional',
    location: 'Boston, MA',
    conditions: ['Advanced Gastric Cancer'],
    sponsor: 'Merck Sharp & Dohme Corp.',
    startDate: '2023-01-01',
    completionDate: '2025-12-31',
    enrollment: 600,
    description: 'This study is evaluating the efficacy and safety of pembrolizumab in patients with advanced gastric cancer.',
    eligibility: 'Patients with advanced gastric cancer who have progressed on or after first-line chemotherapy.',
    contact: 'Sarah Gold, MD',
    url: 'https://example.com/trial/10',
    ages: '18+',
    gender: 'All',
    inclusionCriteria: 'Advanced gastric cancer, progression after first-line chemotherapy',
    exclusionCriteria: 'Prior immunotherapy, significant comorbidities',
    primaryPurpose: 'Treatment',
    masking: 'Double Blind',
    allocation: 'Randomized',
    interventionModel: 'Parallel Assignment',
    numberOfArms: 2,
    numberOfSites: 22,
    acronym: 'KEYNOTE-062',
    contactBackup: 'Tom Silver, RN',
    responsibleParty: 'Merck',
    overallStatus: 'Active, recruiting',
    whyStopped: 'N/A',
    briefSummary: 'Evaluating pembrolizumab in advanced gastric cancer.',
    detailedDescription: 'A detailed study of pembrolizumab\'s effects on gastric cancer.',
    studyDesign: 'Randomized, double-blind',
    outcomes: 'Overall survival, progression-free survival',
    keywords: ['Pembrolizumab', 'Gastric Cancer', 'Stomach Cancer'],
    interventions: ['Pembrolizumab'],
  },
];

const TrialDatabase = ({ filters, onTrialSelect }: TrialDatabaseProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredTrials = useMemo(() => {
    return mockTrials.filter(trial => {
      const searchTermLower = searchTerm.toLowerCase();
      const matchesSearch =
        trial.title.toLowerCase().includes(searchTermLower) ||
        trial.description.toLowerCase().includes(searchTermLower) ||
        trial.conditions.some(condition => condition.toLowerCase().includes(searchTermLower)) ||
        trial.keywords.some(keyword => keyword.toLowerCase().includes(searchTermLower)) ||
        trial.interventions.some(intervention => intervention.toLowerCase().includes(searchTermLower));

      const matchesFilters = Object.entries(filters).every(([key, value]) => {
        if (!value) return true;

        if (key === 'status') {
          return trial.status === value;
        }

        if (key === 'phase') {
          return trial.phase === value;
        }

        if (key === 'studyType') {
          return trial.studyType === value;
        }

        if (key === 'location') {
          return trial.location === value;
        }

        if (key === 'conditions') {
          if (Array.isArray(value)) {
            return value.every(filterValue =>
              trial.conditions.some(condition =>
                condition.toLowerCase().includes(filterValue.toLowerCase())
              )
            );
          } else {
            return trial.conditions.some(condition =>
              condition.toLowerCase().includes(value.toLowerCase())
            );
          }
        }

        return true;
      });

      return matchesSearch && matchesFilters;
    });
  }, [searchTerm, filters]);

  const totalTrials = filteredTrials.length;
  const recruitingTrials = filteredTrials.filter(trial => trial.status === 'Recruiting').length;
  const completedTrials = filteredTrials.filter(trial => trial.status === 'Completed').length;

  // Trial distribution data for pie chart
  const trialDistributionData = [
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

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Pie Chart Section - Now visible in database view */}
      <div className="p-6 bg-gray-50">
        <PieChartSection data={trialDistributionData} />
      </div>

      {/* Search and Filter Section */}
      <div className="px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Input
              type="text"
              placeholder="Search trials..."
              className="w-64 mr-4"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" /> Filter
            </Button>
          </div>
          <Button variant="secondary">
            <Download className="w-4 h-4 mr-2" /> Export Data
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 py-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Total Trials <BarChart3 className="w-4 h-4" />
            </CardTitle>
            <CardDescription>Total number of trials</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTrials}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recruiting <TrendingUp className="w-4 h-4" />
            </CardTitle>
            <CardDescription>Currently recruiting trials</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recruitingTrials}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Completed <Users className="w-4 h-4" />
            </CardTitle>
            <CardDescription>Trials that have been completed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTrials}</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content with Tabs */}
      <div className="flex-1 overflow-y-auto">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="px-6">
            <TabsTrigger value="all" onClick={() => setActiveTab('all')}>All Trials</TabsTrigger>
            <TabsTrigger value="recruiting" onClick={() => setActiveTab('recruiting')}>Recruiting</TabsTrigger>
            <TabsTrigger value="completed" onClick={() => setActiveTab('completed')}>Completed</TabsTrigger>
          </TabsList>
          <div className="space-y-4 p-6">
            <TabsContent value="all" className="space-y-4">
              {filteredTrials.map(trial => (
                <Card key={trial.id} className="border">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">{trial.title}</CardTitle>
                    <CardDescription>
                      <Badge variant="secondary">{trial.status}</Badge>
                      <Badge variant="outline" className="ml-2">{trial.phase}</Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Condition</p>
                        <p className="text-gray-900">{trial.conditions.join(', ')}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Location</p>
                        <p className="text-gray-900">{trial.location}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Sponsor</p>
                        <p className="text-gray-900">{trial.sponsor}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Enrollment</p>
                        <p className="text-gray-900">{trial.enrollment}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Description</p>
                      <p className="text-gray-900">{trial.description}</p>
                    </div>
                    <Button onClick={() => onTrialSelect(trial)}>View Details</Button>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="recruiting" className="space-y-4">
              {filteredTrials.filter(trial => trial.status === 'Recruiting').map(trial => (
                <Card key={trial.id} className="border">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">{trial.title}</CardTitle>
                    <CardDescription>
                      <Badge variant="secondary">{trial.status}</Badge>
                      <Badge variant="outline" className="ml-2">{trial.phase}</Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Condition</p>
                        <p className="text-gray-900">{trial.conditions.join(', ')}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Location</p>
                        <p className="text-gray-900">{trial.location}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Sponsor</p>
                        <p className="text-gray-900">{trial.sponsor}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Enrollment</p>
                        <p className="text-gray-900">{trial.enrollment}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Description</p>
                      <p className="text-gray-900">{trial.description}</p>
                    </div>
                    <Button onClick={() => onTrialSelect(trial)}>View Details</Button>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="completed" className="space-y-4">
              {filteredTrials.filter(trial => trial.status === 'Completed').map(trial => (
                <Card key={trial.id} className="border">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">{trial.title}</CardTitle>
                    <CardDescription>
                      <Badge variant="secondary">{trial.status}</Badge>
                      <Badge variant="outline" className="ml-2">{trial.phase}</Badge>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Condition</p>
                        <p className="text-gray-900">{trial.conditions.join(', ')}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Location</p>
                        <p className="text-gray-900">{trial.location}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Sponsor</p>
                        <p className="text-gray-900">{trial.sponsor}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700">Enrollment</p>
                        <p className="text-gray-900">{trial.enrollment}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Description</p>
                      <p className="text-gray-900">{trial.description}</p>
                    </div>
                    <Button onClick={() => onTrialSelect(trial)}>View Details</Button>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default TrialDatabase;
