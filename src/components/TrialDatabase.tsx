import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, GitCompare, Download, MoreHorizontal, LayoutGrid, List, User, Grid3X3, TrendingUp, TrendingDown, Activity, Clock, Target, Award } from 'lucide-react';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { ScrollArea } from '@/components/ui/scroll-area';
import * as echarts from 'echarts';

interface TrialDatabaseProps {
  filters: any;
}

const ITEMS_PER_PAGE = 5;

const MetricsCards = ({ trialsCount }: { trialsCount: number }) => (
  <div className="flex items-center gap-6 mb-6">
    <div className="text-sm text-gray-700">
      <span className="font-bold">{trialsCount}</span>
      <span className="ml-1">Abstracts</span>
    </div>
    <div className="text-sm text-gray-700">
      <span className="font-bold">{trialsCount}</span>
      <span className="ml-1">Trials</span>
    </div>
  </div>
);

const EChartsBarChart = ({ data, title, chartId }: { data: any[], title: string, chartId: string }) => {
  const chartRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!chartRef.current || !data.length) return;

    const chart = echarts.init(chartRef.current);
    
    const categories = data.map(item => item.name);
    const oralData = data.map(item => item['Oral Presentation'] || 0);
    const posterData = data.map(item => item['Poster'] || 0);
    const miniOralData = data.map(item => item['Mini Oral'] || 0);

    const option = {
      title: {
        text: title,
        left: 'center',
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          color: '#1f2937'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['Oral Presentation', 'Poster', 'Mini Oral'],
        top: 30,
        itemGap: 20
      },
      grid: {
        left: '15%',
        right: '4%',
        bottom: '3%',
        top: '15%',
        containLabel: true
      },
      yAxis: {
        type: 'category',
        data: categories,
        axisLabel: {
          fontSize: 10
        }
      },
      xAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Oral Presentation',
          type: 'bar',
          data: oralData,
          color: '#6366f1' // indigo
        },
        {
          name: 'Poster',
          type: 'bar',
          data: posterData,
          color: '#d946ef' // fuchsia
        },
        {
          name: 'Mini Oral',
          type: 'bar',
          data: miniOralData,
          color: '#8b5cf6' // purple (mix of indigo and fuchsia)
        }
      ]
    };

    chart.setOption(option);

    const handleResize = () => {
      chart.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, [data, title]);

  return <div ref={chartRef} style={{ width: '100%', height: '320px' }} />;
};

const MetricCard = ({ title, value, change, icon: Icon, trend }: {
  title: string;
  value: string | number;
  change?: string;
  icon: any;
  trend?: 'up' | 'down' | 'neutral';
}) => (
  <Card className="p-4 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <p className="text-sm text-gray-600 font-medium">{title}</p>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <div className={`flex items-center gap-1 text-sm ${
              trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'
            }`}>
              {trend === 'up' && <TrendingUp className="h-3 w-3" />}
              {trend === 'down' && <TrendingDown className="h-3 w-3" />}
              <span>{change}</span>
            </div>
          )}
        </div>
      </div>
      <div className="p-2 bg-blue-50 rounded-lg">
        <Icon className="h-5 w-5 text-blue-600" />
      </div>
    </div>
  </Card>
);

const SuccessRateChart = ({ trials }: { trials: any[] }) => {
  const chartRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);
    
    const phaseData = {
      'Phase 1': { total: 0, active: 0, completed: 0 },
      'Phase 2': { total: 0, active: 0, completed: 0 },
      'Phase 3': { total: 0, active: 0, completed: 0 }
    };

    trials.forEach(trial => {
      if (phaseData[trial.phase]) {
        phaseData[trial.phase].total++;
        if (trial.status === 'Active' || trial.status === 'Recruiting') {
          phaseData[trial.phase].active++;
        } else if (trial.status === 'Completed') {
          phaseData[trial.phase].completed++;
        }
      }
    });

    const phases = Object.keys(phaseData);
    const successRates = phases.map(phase => {
      const data = phaseData[phase];
      return data.total > 0 ? ((data.completed / data.total) * 100).toFixed(1) : 0;
    });

    const option = {
      title: {
        text: 'Success Rate by Phase',
        left: 'center',
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          color: '#1f2937'
        }
      },
      tooltip: {
        trigger: 'axis',
        formatter: '{b}: {c}% completion rate'
      },
      xAxis: {
        type: 'category',
        data: phases
      },
      yAxis: {
        type: 'value',
        max: 100,
        axisLabel: {
          formatter: '{value}%'
        }
      },
      series: [{
        type: 'bar',
        data: successRates,
        itemStyle: {
          color: function(params) {
            const colors = ['#f59e0b', '#10b981', '#3b82f6'];
            return colors[params.dataIndex];
          }
        },
        label: {
          show: true,
          position: 'top',
          formatter: '{c}%'
        }
      }]
    };

    chart.setOption(option);

    const handleResize = () => {
      chart.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, [trials]);

  return <div ref={chartRef} style={{ width: '100%', height: '300px' }} />;
};

const OverviewContent = ({ trials }: { trials: any[] }) => {
  const processTopDrugs = () => {
    const drugCounts: { [key: string]: { [key: string]: number } } = {};
    
    trials.forEach(trial => {
      const drug = trial.drug;
      const sessionType = trial.abstractType;
      
      if (!drugCounts[drug]) {
        drugCounts[drug] = { 'Oral Presentation': 0, 'Poster': 0, 'Mini Oral': 0 };
      }
      drugCounts[drug][sessionType] = (drugCounts[drug][sessionType] || 0) + 1;
    });
    
    return Object.entries(drugCounts)
      .map(([drug, counts]) => ({
        name: drug,
        'Oral Presentation': counts['Oral Presentation'] || 0,
        'Poster': counts['Poster'] || 0,
        'Mini Oral': counts['Mini Oral'] || 0,
        total: Object.values(counts).reduce((a, b) => a + b, 0)
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 10);
  };

  const processTopCompanies = () => {
    const companyCounts: { [key: string]: { [key: string]: number } } = {};
    
    trials.forEach(trial => {
      const company = trial.company;
      const sessionType = trial.abstractType;
      
      if (!companyCounts[company]) {
        companyCounts[company] = { 'Oral Presentation': 0, 'Poster': 0, 'Mini Oral': 0 };
      }
      companyCounts[company][sessionType] = (companyCounts[company][sessionType] || 0) + 1;
    });
    
    return Object.entries(companyCounts)
      .map(([company, counts]) => ({
        name: company,
        'Oral Presentation': counts['Oral Presentation'] || 0,
        'Poster': counts['Poster'] || 0,
        'Mini Oral': counts['Mini Oral'] || 0,
        total: Object.values(counts).reduce((a, b) => a + b, 0)
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 10);
  };

  const processTopTargets = () => {
    const targetCounts: { [key: string]: { [key: string]: number } } = {};
    
    trials.forEach(trial => {
      const target = trial.target;
      const sessionType = trial.abstractType;
      
      if (!targetCounts[target]) {
        targetCounts[target] = { 'Oral Presentation': 0, 'Poster': 0, 'Mini Oral': 0 };
      }
      targetCounts[target][sessionType] = (targetCounts[target][sessionType] || 0) + 1;
    });
    
    return Object.entries(targetCounts)
      .map(([target, counts]) => ({
        name: target,
        'Oral Presentation': counts['Oral Presentation'] || 0,
        'Poster': counts['Poster'] || 0,
        'Mini Oral': counts['Mini Oral'] || 0,
        total: Object.values(counts).reduce((a, b) => a + b, 0)
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 10);
  };

  const processTopModalities = () => {
    const modalityCounts: { [key: string]: { [key: string]: number } } = {};
    
    trials.forEach(trial => {
      const modality = trial.modality;
      const sessionType = trial.abstractType;
      
      if (!modalityCounts[modality]) {
        modalityCounts[modality] = { 'Oral Presentation': 0, 'Poster': 0, 'Mini Oral': 0 };
      }
      modalityCounts[modality][sessionType] = (modalityCounts[modality][sessionType] || 0) + 1;
    });
    
    return Object.entries(modalityCounts)
      .map(([modality, counts]) => ({
        name: modality,
        'Oral Presentation': counts['Oral Presentation'] || 0,
        'Poster': counts['Poster'] || 0,
        'Mini Oral': counts['Mini Oral'] || 0,
        total: Object.values(counts).reduce((a, b) => a + b, 0)
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 10);
  };

  const topDrugs = processTopDrugs();
  const topCompanies = processTopCompanies();
  const topTargets = processTopTargets();
  const topModalities = processTopModalities();

  // Calculate metrics for the overview
  const activeTrials = trials.filter(t => t.status === 'Active' || t.status === 'Recruiting').length;
  const completedTrials = trials.filter(t => t.status === 'Completed').length;
  const phase3Trials = trials.filter(t => t.phase === 'Phase 3').length;
  const avgEnrollment = Math.round(trials.reduce((acc, trial) => {
    const enrollmentParts = trial.enrollment.split('/');
    const enrolled = parseInt(enrollmentParts[0]) || 0;
    return acc + enrolled;
  }, 0) / trials.length);

  // Generate dynamic insights based on data
  const generateInsights = () => {
    const insights = [];
    
    // Top indication insight
    const indicationCounts = trials.reduce((acc: Record<string, number>, trial) => {
      acc[trial.indication] = (acc[trial.indication] || 0) + 1;
      return acc;
    }, {});
    const topIndication = Object.entries(indicationCounts).sort((a, b) => (b[1] as number) - (a[1] as number))[0];
    
    // Top target insight
    const topTarget = topTargets[0];
    
    // Phase distribution insight
    const phase3Percentage = Math.round((phase3Trials / trials.length) * 100);
    
    insights.push({
      icon: 'target',
      color: 'blue',
      text: `${topIndication[0]} leads with ${topIndication[1]} trials (${Math.round((topIndication[1] as number)/trials.length*100)}% of portfolio)`
    });
    
    insights.push({
      icon: 'trending-up',
      color: 'green', 
      text: `${topTarget.name} is the most targeted pathway with ${topTarget.total} abstracts across all sessions`
    });
    
    insights.push({
      icon: 'activity',
      color: 'purple',
      text: `${phase3Percentage}% of trials are in Phase 3, indicating strong late-stage portfolio`
    });
    
    // Success rate insight
    const successRate = Math.round((completedTrials / trials.length) * 100);
    insights.push({
      icon: 'award',
      color: 'orange',
      text: `${successRate}% completion rate demonstrates strong execution capabilities`
    });

    return insights;
  };

  const dynamicInsights = generateInsights();

  return (
    <div className="space-y-6">
      {/* Enhanced Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard
          title="Active Trials"
          value={activeTrials}
          change="+12%"
          icon={Activity}
          trend="up"
        />
        <MetricCard
          title="Completed Trials"
          value={completedTrials}
          change="+8%"
          icon={Award}
          trend="up"
        />
        <MetricCard
          title="Phase 3 Trials"
          value={phase3Trials}
          change="23%"
          icon={Target}
          trend="neutral"
        />
        <MetricCard
          title="Avg Enrollment"
          value={avgEnrollment}
          change="+5%"
          icon={User}
          trend="up"
        />
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        {/* Charts Section - Left Side - Responsive */}
        <div className="flex-1 space-y-6 min-w-0">
          {/* Success Rate Chart */}
          <Card className="p-6">
            <SuccessRateChart trials={trials} />
          </Card>

          {/* Main Charts Grid - Responsive */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 min-w-0">
              <EChartsBarChart 
                data={topDrugs} 
                title="Top 10 Drugs by Session Type" 
                chartId="drugs-chart"
              />
            </Card>

            <Card className="p-6 min-w-0">
              <EChartsBarChart 
                data={topCompanies} 
                title="Top 10 Companies by Session Type" 
                chartId="companies-chart"
              />
            </Card>

            <Card className="p-6 min-w-0">
              <EChartsBarChart 
                data={topTargets} 
                title="Top 10 Targets by Session Type" 
                chartId="targets-chart"
              />
            </Card>

            <Card className="p-6 min-w-0">
              <EChartsBarChart 
                data={topModalities} 
                title="Top 10 Modalities by Session Type" 
                chartId="modalities-chart"
              />
            </Card>
          </div>
        </div>

        {/* Enhanced Key Insights Section - Right Side - Responsive */}
        <div className="w-full xl:w-96 xl:flex-shrink-0">
          <div className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Key Insights</h3>
              </div>
              <div className="space-y-4">
                {dynamicInsights.map((insight, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      insight.color === 'blue' ? 'bg-blue-500' :
                      insight.color === 'green' ? 'bg-green-500' :
                      insight.color === 'purple' ? 'bg-purple-500' :
                      insight.color === 'orange' ? 'bg-orange-500' :
                      'bg-gray-500'
                    }`}></div>
                    <p className="text-sm text-gray-700 leading-relaxed">{insight.text}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Market Intelligence Card */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Market Trends</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                  <span className="text-sm text-gray-700">ADC Modality</span>
                  <Badge className="bg-green-100 text-green-800 text-xs">Rising +45%</Badge>
                </div>
                <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                  <span className="text-sm text-gray-700">NSCLC Focus</span>
                  <Badge className="bg-blue-100 text-blue-800 text-xs">Dominant 38%</Badge>
                </div>
                <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
                  <span className="text-sm text-gray-700">1L Therapy</span>
                  <Badge className="bg-orange-100 text-orange-800 text-xs">Growing +28%</Badge>
                </div>
              </div>
            </Card>

            {/* Quick Actions Card */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Export Overview Report
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <GitCompare className="h-4 w-4 mr-2" />
                  Compare Top Performers
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Clock className="h-4 w-4 mr-2" />
                  Set Trend Alerts
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

const PaginationControls = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
}) => (
  <div className="flex justify-center py-8 border-t border-gray-100 bg-white">
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-gray-500">
        Page {currentPage} of {totalPages} ({totalItems} total items)
      </p>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
          </PaginationItem>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => onPageChange(page)}
                isActive={currentPage === page}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          
          <PaginationItem>
            <PaginationNext
              onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  </div>
);

const TrialDatabase = ({ filters }: TrialDatabaseProps) => {
  const [viewMode, setViewMode] = useState<'card' | 'list' | 'grid'>('card');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTrials, setSelectedTrials] = useState<string[]>([]);
  
  const [trials] = useState([
    {
      id: 'NCT03539536',
      trialName: 'CHECKMATE-123',
      abstractTitle: 'Nivolumab plus ipilimumab versus chemotherapy as first-line treatment for advanced non-small-cell lung cancer with high PD-L1 expression: primary analysis of CHECKMATE-123',
      company: 'Bristol Myers Squibb',
      companyLogo: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=100&h=100&fit=crop&crop=center',
      phase: 'Phase 3',
      status: 'Active',
      enrollment: '487/500',
      indication: 'NSCLC',
      lineTherapy: '1L',
      stage: 'IV',
      population: 'Metastatic',
      biomarker: 'PD-L1 ≥50%',
      treatment: 'Nivolumab + Ipilimumab',
      conference: 'ASCO 2025',
      orr: '45.2%',
      pfs: '8.2m',
      os: '21.2m',
      target: 'PD-1/CTLA-4',
      modality: 'mAb',
      drug: 'Nivolumab',
      abstractType: 'Oral Presentation'
    },
    {
      id: 'NCT04567890',
      trialName: 'KEYNOTE-456',
      abstractTitle: 'Pembrolizumab plus chemotherapy versus chemotherapy alone as first-line treatment in patients with advanced non-small-cell lung cancer: final overall survival analysis of KEYNOTE-456',
      company: 'Merck',
      companyLogo: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=100&h=100&fit=crop&crop=center',
      phase: 'Phase 3',
      status: 'Completed',
      enrollment: '423/450',
      indication: 'NSCLC',
      lineTherapy: '1L',
      stage: 'IV',
      population: 'Metastatic',
      biomarker: 'All comers',
      treatment: 'Pembrolizumab + Chemotherapy',
      conference: 'ESMO 2024',
      orr: '41.7%',
      pfs: '7.1m',
      os: '18.9m',
      target: 'PD-1',
      modality: 'mAb',
      drug: 'Pembrolizumab',
      abstractType: 'Poster'
    },
    {
      id: 'NCT05123456',
      trialName: 'HIMALAYA-2',
      abstractTitle: 'Durvalumab plus tremelimumab versus sorafenib as first-line treatment for unresectable hepatocellular carcinoma: updated results from HIMALAYA-2',
      company: 'AstraZeneca',
      companyLogo: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=100&h=100&fit=crop&crop=center',
      phase: 'Phase 2',
      status: 'Recruiting',
      enrollment: '156/300',
      indication: 'HCC',
      lineTherapy: '1L',
      stage: 'Advanced',
      population: 'Unresectable',
      biomarker: 'Child-Pugh A',
      treatment: 'Durvalumab + Tremelimumab',
      conference: 'SITC 2025',
      orr: '28.3%',
      pfs: '5.6m',
      os: 'NR',
      target: 'PD-L1/CTLA-4',
      modality: 'mAb',
      drug: 'Durvalumab',
      abstractType: 'Oral Presentation'
    },
    {
      id: 'NCT04789123',
      trialName: 'TROPION-PanTumor01',
      abstractTitle: 'Datopotamab deruxtecan (Dato-DXd) in patients with advanced or metastatic non-small cell lung cancer: updated results from TROPION-PanTumor01',
      company: 'Daiichi Sankyo',
      companyLogo: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop&crop=center',
      phase: 'Phase 1',
      status: 'Active',
      enrollment: '89/120',
      indication: 'NSCLC',
      lineTherapy: '2L',
      stage: 'IV',
      population: 'Metastatic',
      biomarker: 'TROP2+',
      treatment: 'Datopotamab deruxtecan',
      conference: 'WCLC 2025',
      orr: '36.4%',
      pfs: '6.8m',
      os: '15.4m',
      target: 'TROP2',
      modality: 'ADC',
      drug: 'Dato-DXd',
      abstractType: 'Poster'
    },
    {
      id: 'NCT03654321',
      trialName: 'DESTINY-Breast12',
      abstractTitle: 'Trastuzumab deruxtecan versus trastuzumab emtansine for patients with HER2-positive metastatic breast cancer: primary results of DESTINY-Breast12',
      company: 'Daiichi Sankyo',
      companyLogo: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop&crop=center',
      phase: 'Phase 3',
      status: 'Completed',
      enrollment: '524/524',
      indication: 'Breast Cancer',
      lineTherapy: '2L',
      stage: 'IV',
      population: 'Metastatic',
      biomarker: 'HER2+',
      treatment: 'Trastuzumab deruxtecan',
      conference: 'SABCS 2024',
      orr: '79.7%',
      pfs: '28.8m',
      os: 'NR',
      target: 'HER2',
      modality: 'ADC',
      drug: 'T-DXd',
      abstractType: 'Oral Presentation'
    },
    {
      id: 'NCT05234567',
      trialName: 'COSMIC-313',
      abstractTitle: 'Cabozantinib plus nivolumab and ipilimumab versus sunitinib for patients with previously untreated advanced renal cell carcinoma: final analysis of COSMIC-313',
      company: 'Exelixis',
      companyLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop&crop=center',
      phase: 'Phase 3',
      status: 'Active',
      enrollment: '855/855',
      indication: 'RCC',
      lineTherapy: '1L',
      stage: 'Advanced',
      population: 'Metastatic',
      biomarker: 'IMDC intermediate/poor risk',
      treatment: 'Cabozantinib + Nivolumab + Ipilimumab',
      conference: 'GU ASCO 2025',
      orr: '43.2%',
      pfs: '15.7m',
      os: '46.6m',
      target: 'VEGFR/PD-1/CTLA-4',
      modality: 'Small Molecule + mAb',
      drug: 'Cabozantinib',
      abstractType: 'Oral Presentation'
    },
    {
      id: 'NCT04456789',
      trialName: 'KEYNOTE-789',
      abstractTitle: 'Pembrolizumab plus trastuzumab and chemotherapy versus placebo plus trastuzumab and chemotherapy for HER2-positive advanced gastric cancer: KEYNOTE-789',
      company: 'Merck',
      companyLogo: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=100&h=100&fit=crop&crop=center',
      phase: 'Phase 3',
      status: 'Completed',
      enrollment: '692/692',
      indication: 'Gastric Cancer',
      lineTherapy: '1L',
      stage: 'Advanced',
      population: 'Metastatic',
      biomarker: 'HER2+',
      treatment: 'Pembrolizumab + Trastuzumab + Chemotherapy',
      conference: 'ESMO GI 2024',
      orr: '51.3%',
      pfs: '10.0m',
      os: '20.0m',
      target: 'PD-1/HER2',
      modality: 'mAb',
      drug: 'Pembrolizumab',
      abstractType: 'Poster'
    },
    {
      id: 'NCT03789456',
      trialName: 'FLAURA2',
      abstractTitle: 'Osimertinib plus chemotherapy versus osimertinib alone as first-line treatment for EGFR-mutated advanced NSCLC: FLAURA2 primary analysis',
      company: 'AstraZeneca',
      companyLogo: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=100&h=100&fit=crop&crop=center',
      phase: 'Phase 3',
      status: 'Active',
      enrollment: '557/557',
      indication: 'NSCLC',
      lineTherapy: '1L',
      stage: 'IV',
      population: 'Metastatic',
      biomarker: 'EGFR Ex19del/L858R',
      treatment: 'Osimertinib + Chemotherapy',
      conference: 'WCLC 2024',
      orr: '83.0%',
      pfs: '25.5m',
      os: 'NR',
      target: 'EGFR',
      modality: 'Small Molecule',
      drug: 'Osimertinib',
      abstractType: 'Oral Presentation'
    },
    {
      id: 'NCT04567123',
      trialName: 'CITYSCAPE',
      abstractTitle: 'Tiragolumab plus atezolizumab and chemotherapy versus placebo plus atezolizumab and chemotherapy in PD-L1-selected NSCLC: CITYSCAPE primary analysis',
      company: 'Genentech',
      companyLogo: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=100&h=100&fit=crop&crop=center',
      phase: 'Phase 3',
      status: 'Terminated',
      enrollment: '534/800',
      indication: 'NSCLC',
      lineTherapy: '1L',
      stage: 'IV',
      population: 'Metastatic',
      biomarker: 'PD-L1 ≥50%',
      treatment: 'Tiragolumab + Atezolizumab + Chemotherapy',
      conference: 'WCLC 2024',
      orr: '38.8%',
      pfs: '5.9m',
      os: '18.5m',
      target: 'TIGIT/PD-L1',
      modality: 'mAb',
      drug: 'Tiragolumab',
      abstractType: 'Poster'
    },
    {
      id: 'NCT04890234',
      trialName: 'STELLAR-304',
      abstractTitle: 'Zolbetuximab plus mFOLFOX6 versus placebo plus mFOLFOX6 in patients with CLDN18.2-positive, HER2-negative, locally advanced unresectable or metastatic gastric or gastroesophageal junction adenocarcinoma: STELLAR-304',
      company: 'Astellas',
      companyLogo: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=100&h=100&fit=crop&crop=center',
      phase: 'Phase 3',
      status: 'Completed',
      enrollment: '565/565',
      indication: 'Gastric Cancer',
      lineTherapy: '1L',
      stage: 'Advanced',
      population: 'Metastatic',
      biomarker: 'CLDN18.2+',
      treatment: 'Zolbetuximab + mFOLFOX6',
      conference: 'ESMO GI 2025',
      orr: '41.3%',
      pfs: '8.9m',
      os: '14.6m',
      target: 'CLDN18.2',
      modality: 'mAb',
      drug: 'Zolbetuximab',
      abstractType: 'Oral Presentation'
    },
    {
      id: 'NCT05345678',
      trialName: 'TALAPRO-2',
      abstractTitle: 'Talazoparib plus enzalutamide versus placebo plus enzalutamide in men with first-line metastatic castration-resistant prostate cancer: TALAPRO-2 final analysis',
      company: 'Pfizer',
      companyLogo: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=100&h=100&fit=crop&crop=center',
      phase: 'Phase 3',
      status: 'Completed',
      enrollment: '805/805',
      indication: 'Prostate Cancer',
      lineTherapy: '1L',
      stage: 'Metastatic',
      population: 'Castration-resistant',
      biomarker: 'HRR mutations',
      treatment: 'Talazoparib + Enzalutamide',
      conference: 'GU ASCO 2024',
      orr: 'N/A',
      pfs: '27.9m',
      os: 'NR',
      target: 'PARP/AR',
      modality: 'Small Molecule',
      drug: 'Talazoparib',
      abstractType: 'Oral Presentation'
    },
    {
      id: 'NCT04123789',
      trialName: 'RUBY',
      abstractTitle: 'Dostarlimab plus carboplatin-paclitaxel versus placebo plus carboplatin-paclitaxel in patients with recurrent or primary advanced endometrial cancer: RUBY primary analysis',
      company: 'GSK',
      companyLogo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=100&h=100&fit=crop&crop=center',
      phase: 'Phase 3',
      status: 'Active',
      enrollment: '494/494',
      indication: 'Endometrial Cancer',
      lineTherapy: '1L',
      stage: 'Advanced',
      population: 'Recurrent',
      biomarker: 'dMMR and pMMR',
      treatment: 'Dostarlimab + Carboplatin-Paclitaxel',
      conference: 'ESMO 2024',
      orr: '71.5%',
      pfs: '16.4m',
      os: 'NR',
      target: 'PD-1',
      modality: 'mAb',
      drug: 'Dostarlimab',
      abstractType: 'Oral Presentation'
    },
    {
      id: 'NCT04678901',
      trialName: 'LEAP-012',
      abstractTitle: 'Lenvatinib plus pembrolizumab versus lenvatinib plus placebo as first-line treatment for advanced hepatocellular carcinoma: LEAP-012 primary analysis',
      company: 'Eisai',
      companyLogo: 'https://images.unsplash.com/photo-1607703703520-bb638e84caf2?w=100&h=100&fit=crop&crop=center',
      phase: 'Phase 3',
      status: 'Active',
      enrollment: '794/794',
      indication: 'HCC',
      lineTherapy: '1L',
      stage: 'Advanced',
      population: 'Unresectable',
      biomarker: 'Child-Pugh A',
      treatment: 'Lenvatinib + Pembrolizumab',
      conference: 'ASCO GI 2025',
      orr: '36.0%',
      pfs: '8.6m',
      os: '21.2m',
      target: 'VEGFR/PD-1',
      modality: 'Small Molecule + mAb',
      drug: 'Lenvatinib',
      abstractType: 'Oral Presentation'
    },
    {
      id: 'NCT05456123',
      trialName: 'TROPION-Lung01',
      abstractTitle: 'Datopotamab deruxtecan versus docetaxel in patients with advanced non-small-cell lung cancer previously treated with platinum-based chemotherapy and a PD-(L)1 inhibitor: TROPION-Lung01',
      company: 'Daiichi Sankyo',
      companyLogo: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop&crop=center',
      phase: 'Phase 3',
      status: 'Active',
      enrollment: '604/604',
      indication: 'NSCLC',
      lineTherapy: '3L+',
      stage: 'IV',
      population: 'Metastatic',
      biomarker: 'TROP2+',
      treatment: 'Datopotamab deruxtecan',
      conference: 'WCLC 2024',
      orr: '26.4%',
      pfs: '4.4m',
      os: '12.9m',
      target: 'TROP2',
      modality: 'ADC',
      drug: 'Dato-DXd',
      abstractType: 'Oral Presentation'
    },
    {
      id: 'NCT04234567',
      trialName: 'CAPSTONE-1',
      abstractTitle: 'Adebrelimab or placebo plus carboplatin and etoposide as first-line treatment for extensive-stage small-cell lung cancer: CAPSTONE-1 primary analysis',
      company: 'Hengrui Medicine',
      companyLogo: 'https://images.unsplash.com/photo-1576089172869-4f5f6f315620?w=100&h=100&fit=crop&crop=center',
      phase: 'Phase 3',
      status: 'Completed',
      enrollment: '462/462',
      indication: 'SCLC',
      lineTherapy: '1L',
      stage: 'Extensive',
      population: 'Metastatic',
      biomarker: 'All comers',
      treatment: 'Adebrelimab + Carboplatin + Etoposide',
      conference: 'WCLC 2024',
      orr: '72.3%',
      pfs: '5.8m',
      os: '15.3m',
      target: 'PD-L1',
      modality: 'mAb',
      drug: 'Adebrelimab',
      abstractType: 'Poster'
    },
    {
      id: 'NCT04789012',
      trialName: 'EVOKE-01',
      abstractTitle: 'Evofosfamide plus pembrolizumab versus pembrolizumab alone in patients with advanced soft tissue sarcoma: EVOKE-01 primary analysis',
      company: 'Merck',
      companyLogo: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=100&h=100&fit=crop&crop=center',
      phase: 'Phase 2',
      status: 'Recruiting',
      enrollment: '178/225',
      indication: 'Sarcoma',
      lineTherapy: '2L',
      stage: 'Advanced',
      population: 'Metastatic',
      biomarker: 'PD-L1 ≥1%',
      treatment: 'Evofosfamide + Pembrolizumab',
      conference: 'CTOS 2024',
      orr: '18.7%',
      pfs: '4.1m',
      os: '11.2m',
      target: 'PD-1',
      modality: 'Small Molecule + mAb',
      drug: 'Evofosfamide',
      abstractType: 'Poster'
    },
    {
      id: 'NCT05567890',
      trialName: 'KEYNOTE-B15',
      abstractTitle: 'Pembrolizumab plus olaparib versus abiraterone or enzalutamide for metastatic castration-resistant prostate cancer: KEYNOTE-B15 interim analysis',
      company: 'Merck',
      companyLogo: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=100&h=100&fit=crop&crop=center',
      phase: 'Phase 3',
      status: 'Recruiting',
      enrollment: '312/500',
      indication: 'Prostate Cancer',
      lineTherapy: '1L',
      stage: 'Metastatic',
      population: 'Castration-resistant',
      biomarker: 'HRR mutations',
      treatment: 'Pembrolizumab + Olaparib',
      conference: 'GU ASCO 2025',
      orr: 'N/A',
      pfs: '8.1m',
      os: 'NR',
      target: 'PD-1/PARP',
      modality: 'mAb + Small Molecule',
      drug: 'Pembrolizumab',
      abstractType: 'Mini Oral'
    },
    {
      id: 'NCT04345123',
      trialName: 'HUDSON',
      abstractTitle: 'Durvalumab alone or in combination with tremelimumab versus standard of care in patients with relapsed small-cell lung cancer: HUDSON cohort analysis',
      company: 'AstraZeneca',
      companyLogo: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=100&h=100&fit=crop&crop=center',
      phase: 'Phase 2',
      status: 'Active',
      enrollment: '267/300',
      indication: 'SCLC',
      lineTherapy: '2L',
      stage: 'Extensive',
      population: 'Relapsed',
      biomarker: 'All comers',
      treatment: 'Durvalumab ± Tremelimumab',
      conference: 'WCLC 2024',
      orr: '13.2%',
      pfs: '2.6m',
      os: '8.8m',
      target: 'PD-L1/CTLA-4',
      modality: 'mAb',
      drug: 'Durvalumab',
      abstractType: 'Poster'
    },
    {
      id: 'NCT05678234',
      trialName: 'CONTACT-01',
      abstractTitle: 'Cabozantinib plus atezolizumab versus sorafenib in patients with advanced hepatocellular carcinoma: CONTACT-01 final overall survival analysis',
      company: 'Exelixis',
      companyLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop&crop=center',
      phase: 'Phase 3',
      status: 'Completed',
      enrollment: '651/651',
      indication: 'HCC',
      lineTherapy: '1L',
      stage: 'Advanced',
      population: 'Unresectable',
      biomarker: 'Child-Pugh A',
      treatment: 'Cabozantinib + Atezolizumab',
      conference: 'ASCO GI 2024',
      orr: '11.0%',
      pfs: '6.8m',
      os: '15.4m',
      target: 'VEGFR/PD-L1',
      modality: 'Small Molecule + mAb',
      drug: 'Cabozantinib',
      abstractType: 'Oral Presentation'
    },
    {
      id: 'NCT04890567',
      trialName: 'DESTINY-PanTumor02',
      abstractTitle: 'Trastuzumab deruxtecan in patients with HER2-expressing solid tumors: updated results from DESTINY-PanTumor02',
      company: 'Daiichi Sankyo',
      companyLogo: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop&crop=center',
      phase: 'Phase 2',
      status: 'Active',
      enrollment: '267/300',
      indication: 'Pan-Tumor',
      lineTherapy: '2L',
      stage: 'Advanced',
      population: 'Metastatic',
      biomarker: 'HER2+',
      treatment: 'Trastuzumab deruxtecan',
      conference: 'ASCO 2024',
      orr: '37.1%',
      pfs: '5.4m',
      os: '11.3m',
      target: 'HER2',
      modality: 'ADC',
      drug: 'T-DXd',
      abstractType: 'Poster'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'recruiting': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'terminated': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'Phase 1': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Phase 2': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Phase 3': return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getConferenceColor = (conference: string) => {
    switch (conference) {
      case 'ASCO 2025': return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'ESMO 2024': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'SITC 2025': return 'bg-teal-100 text-teal-800 border-teal-200';
      case 'WCLC 2025': return 'bg-violet-100 text-violet-800 border-violet-200';
      case 'WCLC 2024': return 'bg-violet-100 text-violet-800 border-violet-200';
      case 'SABCS 2024': return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'GU ASCO 2025': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'GU ASCO 2024': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'ESMO GI 2024': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'ESMO GI 2025': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'ASCO GI 2025': return 'bg-lime-100 text-lime-800 border-lime-200';
      case 'ASCO GI 2024': return 'bg-lime-100 text-lime-800 border-lime-200';
      case 'CTOS 2024': return 'bg-slate-100 text-slate-800 border-slate-200';
      case 'ASCO 2024': return 'bg-rose-100 text-rose-800 border-rose-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getLineTherapyColor = (line: string) => {
    switch (line) {
      case '1L': return 'bg-green-100 text-green-800 border-green-200';
      case '2L': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case '3L+': return 'bg-red-100 text-red-800 border-red-200';
      case 'Adjuvant': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Neoadjuvant': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getModalityColor = (modality: string) => {
    switch (modality) {
      case 'mAb': return 'bg-sky-100 text-sky-800 border-sky-200';
      case 'ADC': return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'Bispecific': return 'bg-lime-100 text-lime-800 border-lime-200';
      case 'Small Molecule': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Small Molecule + mAb': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'mAb + Small Molecule': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAbstractTypeColor = (type: string) => {
    switch (type) {
      case 'Oral Presentation': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Poster': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Mini Oral': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const totalPages = Math.ceil(trials.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTrials = trials.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    console.log('Changing to page:', page);
    setCurrentPage(page);
    // Scroll to top when page changes
    document.querySelector('.main-content')?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const handleTrialSelection = (trialId: string, checked: boolean) => {
    if (checked) {
      setSelectedTrials(prev => [...prev, trialId]);
    } else {
      setSelectedTrials(prev => prev.filter(id => id !== trialId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTrials(paginatedTrials.map(trial => trial.id));
    } else {
      setSelectedTrials([]);
    }
  };

  const isAllSelected = paginatedTrials.length > 0 && paginatedTrials.every(trial => selectedTrials.includes(trial.id));
  const isSomeSelected = selectedTrials.length > 0 && !isAllSelected;

  const CompanyLogo = ({ company, logo }: { company: string; logo: string }) => (
    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
      <img 
        src={logo} 
        alt={`${company} logo`}
        className="w-full h-full object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          target.nextElementSibling?.classList.remove('hidden');
        }}
      />
      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm hidden">
        {company.split(' ').map(word => word[0]).join('').slice(0, 3)}
      </div>
    </div>
  );

  const CardView = () => (
    <div className="grid gap-6">
      {paginatedTrials.map((trial) => (
        <Card key={trial.id} className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow p-6">
          <div className="flex items-start gap-4">
            <CompanyLogo company={trial.company} logo={trial.companyLogo} />
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0 pr-4">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <h3 className="text-xl font-medium text-gray-900 line-clamp-2 leading-relaxed mb-3" title={trial.abstractTitle}>
                          {trial.abstractTitle}
                        </h3>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-md">
                        <p>{trial.abstractTitle}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={selectedTrials.includes(trial.id)}
                        onCheckedChange={(checked) => handleTrialSelection(trial.id, checked as boolean)}
                      />
                      <Badge className="bg-slate-100 text-slate-800 border-slate-200 border text-xs font-medium">{trial.trialName}</Badge>
                    </div>
                    <Badge className={`${getPhaseColor(trial.phase)} border text-xs`}>{trial.phase}</Badge>
                    <Badge className={`${getStatusColor(trial.status)} border text-xs`}>{trial.status}</Badge>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <User className="h-4 w-4" />
                      <span>{trial.enrollment}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                  <Badge className={`${getConferenceColor(trial.conference)} border text-xs`}>
                    {trial.conference}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4 mt-4">
                <div>
                  <p className="text-sm text-gray-500">Trial</p>
                  <a 
                    href={`https://clinicaltrials.gov/ct2/show/${trial.id}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-900 hover:text-blue-600 underline font-medium"
                  >
                    {trial.id}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Company</p>
                  <p className="font-medium text-gray-900">{trial.company}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Abstract Type</p>
                  <p className="font-medium text-gray-900">{trial.abstractType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Treatment</p>
                  <p className="font-medium text-gray-900">{trial.treatment}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Indication</p>
                  <p className="font-medium text-gray-900">{trial.indication}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Line of Therapy</p>
                  <p className="font-medium text-gray-900">{trial.lineTherapy}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Population</p>
                  <p className="font-medium text-gray-900">{trial.stage} • {trial.population}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Target/Modality</p>
                  <p className="font-medium text-gray-900">{trial.target}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Biomarker</p>
                  <p className="font-medium text-gray-900">{trial.biomarker}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-6">
                  <div className="text-center bg-blue-50 px-3 py-2 rounded-lg">
                    <p className="text-sm text-blue-600 font-medium">ORR</p>
                    <p className="font-semibold text-blue-900">{trial.orr}</p>
                  </div>
                  <div className="text-center bg-green-50 px-3 py-2 rounded-lg">
                    <p className="text-sm text-green-600 font-medium">PFS</p>
                    <p className="font-semibold text-green-900">{trial.pfs}</p>
                  </div>
                  <div className="text-center bg-purple-50 px-3 py-2 rounded-lg">
                    <p className="text-sm text-purple-600 font-medium">OS</p>
                    <p className="font-semibold text-purple-900">{trial.os}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const ListView = () => (
    <div className="w-full overflow-hidden">
      <Card className="shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead className="min-w-[200px]">Trial</TableHead>
                <TableHead className="min-w-[300px] max-w-[400px]">Abstract Title</TableHead>
                <TableHead className="min-w-[120px]">Company</TableHead>
                <TableHead className="min-w-[100px]">Phase</TableHead>
                <TableHead className="min-w-[100px]">Status</TableHead>
                <TableHead className="min-w-[120px]">Indication</TableHead>
                <TableHead className="min-w-[180px]">Treatment</TableHead>
                <TableHead className="min-w-[120px]">Target</TableHead>
                <TableHead className="min-w-[120px]">Conference</TableHead>
                <TableHead className="min-w-[80px]">ORR</TableHead>
                <TableHead className="min-w-[80px]">PFS</TableHead>
                <TableHead className="min-w-[80px]">OS</TableHead>
                <TableHead className="min-w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTrials.map((trial) => (
                <TableRow key={trial.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedTrials.includes(trial.id)}
                      onCheckedChange={(checked) => handleTrialSelection(trial.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <CompanyLogo company={trial.company} logo={trial.companyLogo} />
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="font-medium text-gray-900">{trial.trialName}</div>
                        </div>
                        <a 
                          href={`https://clinicaltrials.gov/ct2/show/${trial.id}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-gray-900 hover:text-blue-600 underline"
                        >
                          {trial.id}
                        </a>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[400px]">
                    <div className="line-clamp-2 text-sm text-gray-900" title={trial.abstractTitle}>
                      {trial.abstractTitle}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-900">{trial.company}</TableCell>
                  <TableCell>
                    <Badge className={`${getPhaseColor(trial.phase)} border text-xs`}>{trial.phase}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(trial.status)} border text-xs`}>{trial.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-900">{trial.indication}</div>
                    <div className="flex gap-1 mt-1">
                      <Badge className={`${getLineTherapyColor(trial.lineTherapy)} border text-xs`}>{trial.lineTherapy}</Badge>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[180px]">
                    <div className="truncate text-sm text-gray-900">{trial.treatment}</div>
                    <div className="flex gap-1 mt-1">
                      <Badge className={`${getModalityColor(trial.modality)} border text-xs`}>{trial.modality}</Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-900">{trial.target}</TableCell>
                  <TableCell>
                    <Badge className={`${getConferenceColor(trial.conference)} border text-xs`}>{trial.conference}</Badge>
                  </TableCell>
                  <TableCell className="text-sm font-medium text-gray-900">{trial.orr}</TableCell>
                  <TableCell className="text-sm font-medium text-gray-900">{trial.pfs}</TableCell>
                  <TableCell className="text-sm font-medium text-gray-900">{trial.os}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );

  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {paginatedTrials.map((trial) => (
        <Card key={trial.id} className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow p-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CompanyLogo company={trial.company} logo={trial.companyLogo} />
              <div className="flex-1 min-w-0">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <h3 className="text-lg font-medium text-gray-900 line-clamp-3 leading-snug mb-2" title={trial.abstractTitle}>
                        {trial.abstractTitle}
                      </h3>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-md">
                      <p>{trial.abstractTitle}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={selectedTrials.includes(trial.id)}
                  onCheckedChange={(checked) => handleTrialSelection(trial.id, checked as boolean)}
                />
                <Badge className="bg-slate-100 text-slate-800 border-slate-200 border text-xs font-medium">{trial.trialName}</Badge>
                <Badge className={`${getConferenceColor(trial.conference)} border text-xs`}>{trial.conference}</Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3 pt-2 border-t border-gray-100">
              <div>
                <p className="text-xs text-gray-500 font-medium mb-1">Enrollment</p>
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3 text-gray-500" />
                  <p className="text-sm font-medium text-gray-900">{trial.enrollment}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium mb-1">Indication</p>
                <p className="text-sm font-medium text-gray-900">{trial.indication}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium mb-1">Drug</p>
                <p className="text-sm font-medium text-gray-900">{trial.drug}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100">
              <div className="text-center bg-blue-50 px-2 py-1.5 rounded">
                <p className="text-xs text-blue-600 font-medium">ORR</p>
                <p className="text-sm font-semibold text-blue-900">{trial.orr}</p>
              </div>
              <div className="text-center bg-green-50 px-2 py-1.5 rounded">
                <p className="text-xs text-green-600 font-medium">PFS</p>
                <p className="text-sm font-semibold text-green-900">{trial.pfs}</p>
              </div>
              <div className="text-center bg-purple-50 px-2 py-1.5 rounded">
                <p className="text-xs text-purple-600 font-medium">OS</p>
                <p className="text-sm font-semibold text-purple-900">{trial.os}</p>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderSelectedFilters = () => {
    if (!filters || Object.keys(filters).length === 0) {
      return <p className="text-gray-600 mt-1">No filters applied</p>;
    }
    
    return (
      <div className="flex flex-wrap gap-2 mt-2">
        {Object.entries(filters).map(([key, value]) => {
          if (value && (Array.isArray(value) ? value.length > 0 : true)) {
            const displayValue = Array.isArray(value) ? value.join(', ') : String(value);
            return (
              <Badge key={key} variant="secondary" className="text-xs">
                {key}: {displayValue}
              </Badge>
            );
          }
          return null;
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-6 main-content">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Kognitic Outcomes</h1>
                {renderSelectedFilters()}
              </div>
            </div>

            {/* Results Metrics at the top - applies to both tabs */}
            <MetricsCards trialsCount={trials.length} />

            <Tabs defaultValue="overview" className="w-full">
              <div className="w-full border-b border-gray-200 mb-6">
                <div className="border-b border-gray-200">
                  <TabsList className="inline-flex h-12 items-center justify-start rounded-none bg-transparent p-0">
                    <TabsTrigger 
                      value="overview"
                      className="inline-flex items-center justify-center whitespace-nowrap border-b-2 border-transparent px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent rounded-none bg-transparent shadow-none"
                    >
                      Overview
                    </TabsTrigger>
                    <TabsTrigger 
                      value="clinical-data"
                      className="inline-flex items-center justify-center whitespace-nowrap border-b-2 border-transparent px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent rounded-none bg-transparent shadow-none"
                    >
                      Clinical Data
                    </TabsTrigger>
                  </TabsList>
                </div>
              </div>
              
              <TabsContent value="overview" className="space-y-6">
                <OverviewContent trials={trials} />
              </TabsContent>
              
              <TabsContent value="clinical-data" className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-4">
                    {selectedTrials.length > 0 && (
                      <p className="text-sm text-gray-600">
                        {selectedTrials.length} trial{selectedTrials.length !== 1 ? 's' : ''} selected
                      </p>
                    )}
                  </div>
                  <div className="flex space-x-3">
                    <div className="inline-flex items-center bg-gray-100 rounded-xl p-1 gap-1 h-9">
                      <button
                        onClick={() => setViewMode('card')}
                        className={`inline-flex items-center px-2 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 h-7 ${
                          viewMode === 'card'
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
                        }`}
                      >
                        <LayoutGrid className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`inline-flex items-center px-2 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 h-7 ${
                          viewMode === 'grid'
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
                        }`}
                      >
                        <Grid3X3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`inline-flex items-center px-2 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 h-7 ${
                          viewMode === 'list'
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-white/60'
                        }`}
                      >
                        <List className="w-4 h-4" />
                      </button>
                    </div>
                    <Button variant="outline" size="sm" className="h-9">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-9"
                      disabled={selectedTrials.length === 0}
                    >
                      <GitCompare className="h-4 w-4 mr-2" />
                      Compare Selected ({selectedTrials.length})
                    </Button>
                  </div>
                </div>

                <div className="space-y-6">
                  {viewMode === 'card' ? <CardView /> : viewMode === 'list' ? <ListView /> : <GridView />}
                </div>

                <PaginationControls
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  totalItems={trials.length}
                />
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default TrialDatabase;
