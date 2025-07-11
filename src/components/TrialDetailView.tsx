
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Download, GitCompare, Code, ExternalLink } from 'lucide-react';
import * as echarts from 'echarts';

interface TrialDetailViewProps {
  trial: any;
  onBack: () => void;
}

const TrialDetailView = ({ trial, onBack }: TrialDetailViewProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  const chartData = {
    OS: {
      experimental: { value: parseFloat(trial.os?.replace('m', '') || '0'), ci: [9.4, 12.3] },
      comparator: { value: 9.8, ci: [8.1, 10.6] },
      soc: { value: 15.8, ci: [13.9, 19.7] },
      unit: 'months'
    },
    PFS: {
      experimental: { value: parseFloat(trial.pfs?.replace('m', '') || '0'), ci: [3.0, 4.4] },
      comparator: { value: 3.9, ci: [3.1, 4.2] },
      soc: { value: 6.7, ci: [5.6, 8.0] },
      unit: 'months'
    },
    ORR: {
      experimental: { value: parseFloat(trial.orr?.replace('%', '') || '0'), ci: [10.0, 18.1] },
      comparator: { value: 18.1, ci: [13.9, 22.9] },
      soc: { value: 38, ci: [33, 43] },
      unit: '%'
    }
  };

  const EChartsBarChart = ({ data, title, chartId }: { data: any, title: string, chartId: string }) => {
    const chartRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      if (!chartRef.current) return;

      const chart = echarts.init(chartRef.current);
      
      const seriesData = [
        {
          name: trial.treatment,
          type: 'bar',
          barWidth: 40,
          barGap: 1,
          data: [{
            value: data.experimental.value,
            itemStyle: { color: '#3f51b5' }
          }],
          label: {
            show: true,
            position: 'top',
            formatter: function(params: any) {
              return params.value + ' ' + data.unit + '\n(95% CI: ' + data.experimental.ci[0] + '-' + data.experimental.ci[1] + ')';
            },
            fontSize: 11,
            fontWeight: 'bold',
            color: '#333'
          }
        },
        {
          name: 'Comparator',
          type: 'bar',
          barWidth: 40,
          data: [{
            value: data.comparator.value,
            itemStyle: { color: '#78909c' }
          }],
          label: {
            show: true,
            position: 'top',
            formatter: function(params: any) {
              return params.value + ' ' + data.unit + '\n(95% CI: ' + data.comparator.ci[0] + '-' + data.comparator.ci[1] + ')';
            },
            fontSize: 11,
            fontWeight: 'bold',
            color: '#333'
          }
        }
      ];

      if (data.soc) {
        seriesData.push({
          name: 'Standard of Care',
          type: 'bar',
          barWidth: 40,
          data: [{
            value: data.soc.value,
            itemStyle: { color: '#4caf50' }
          }],
          label: {
            show: true,
            position: 'top',
            formatter: function(params: any) {
              return params.value + ' ' + data.unit + '\n(95% CI: ' + data.soc.ci[0] + '-' + data.soc.ci[1] + ')';
            },
            fontSize: 11,
            fontWeight: 'bold',
            color: '#333'
          }
        });
      }

      const option = {
        color: ['#3f51b5', '#78909c', '#4caf50'],
        title: {
          text: title,
          left: 'center',
          textAlign: 'center',
          textStyle: {
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontSize: 12,
            fontWeight: 'bold',
            color: '#333'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: function(params: any) {
            const param = params[0];
            const ciData = param.seriesName === trial.treatment ? data.experimental.ci :
                          param.seriesName === 'Comparator' ? data.comparator.ci :
                          data.soc?.ci || [0, 0];
            return `${param.seriesName}<br/>${param.value} ${data.unit}<br/>95% CI: ${ciData[0]}-${ciData[1]}`;
          },
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderColor: '#ccc',
          borderWidth: 1,
          textStyle: {
            color: '#333',
            fontSize: 12
          }
        },
        legend: {
          data: seriesData.map(s => s.name),
          bottom: 0,
          textStyle: { 
            fontSize: 10,
            color: '#333'
          },
          itemGap: 20
        },
        xAxis: {
          type: 'category',
          data: [''],
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: { show: false }
        },
        yAxis: {
          type: 'value',
          name: data.unit,
          nameLocation: 'middle',
          nameGap: 40,
          nameTextStyle: {
            color: '#666',
            fontSize: 12
          },
          axisLine: { 
            show: true,
            lineStyle: { color: '#e0e0e0' }
          },
          axisTick: { show: false },
          splitLine: { 
            show: true,
            lineStyle: { 
              color: '#f0f0f0',
              type: 'solid'
            }
          },
          axisLabel: {
            color: '#666',
            fontSize: 11
          }
        },
        grid: {
          left: '15%',
          right: '10%',
          top: '15%',
          bottom: '25%',
          containLabel: false
        },
        series: seriesData
      };

      chart.setOption(option);

      const handleResize = () => chart.resize();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chart.dispose();
      };
    }, [data, title, trial.treatment]);

    return <div ref={chartRef} className="w-full h-80" />;
  };

  const SchematicView = () => (
    <div className="p-8">
      <div className="relative flex items-center justify-center gap-12 min-h-[400px]">
        {/* Connection lines */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Main horizontal line from Patient Cohort to Total Enrollment */}
          <div className="absolute top-1/2 left-[22%] w-[18%] h-0.5 bg-gray-300 transform -translate-y-1/2"></div>
          
          {/* Main horizontal line from Total Enrollment to split point */}
          <div className="absolute top-1/2 left-[47%] w-[18%] h-0.5 bg-gray-300 transform -translate-y-1/2"></div>
          
          {/* Vertical line at split point */}
          <div className="absolute top-[35%] left-[65%] w-0.5 h-[30%] bg-gray-300"></div>
          
          {/* Upper horizontal line to experimental arm */}
          <div className="absolute top-[35%] left-[65%] w-[10%] h-0.5 bg-gray-300"></div>
          
          {/* Lower horizontal line to comparator arm */}
          <div className="absolute top-[65%] left-[65%] w-[10%] h-0.5 bg-gray-300"></div>
        </div>

        {/* Patient Eligibility/Cohort - Left */}
        <div className="bg-white rounded-xl p-6 w-80 shadow-sm z-10">
          <div className="text-center mb-6">
            <Badge className="bg-gray-100 text-primary text-base px-4 py-2 mb-3">{trial.trialName}</Badge>
            <div className="text-sm font-medium text-gray-500 mb-2">Patient Cohort</div>
          </div>
          <div className="space-y-4 text-sm">
            <p className="font-medium text-center text-gray-900">{trial.abstractTitle}</p>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Indication:</span>
                <Badge className="bg-gray-100 text-primary">{trial.indication}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Population:</span>
                <Badge className="bg-gray-100 text-primary">{trial.population}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Stage:</span>
                <Badge className="bg-gray-100 text-primary">{trial.stage}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Line of Therapy:</span>
                <Badge className="bg-gray-100 text-primary">{trial.lineTherapy}</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Total Enrollment - Center */}
        <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl px-8 py-6 shadow-sm z-10">
          <div className="text-pink-700 font-bold text-3xl text-center">
            n={trial.enrollment}
          </div>
          <div className="text-pink-600 text-sm text-center mt-1 whitespace-nowrap">
            Total Enrolled
          </div>
        </div>

        {/* Treatment Arms Container - Right */}
        <div className="flex flex-col gap-8 z-10">
          {/* Experimental Arm */}
          <div className="bg-white rounded-xl p-6 w-80 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="text-lg font-semibold text-gray-900">{trial.treatment}</div>
              <Badge className="bg-gray-100 text-primary">Experimental</Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">mOS:</span>
                  <span className="text-primary font-semibold">{trial.os}</span>
                </div>
                <div className="text-xs text-gray-400">(95% CI: 9.4-12.3)</div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">mPFS:</span>
                  <span className="text-primary font-semibold">{trial.pfs}</span>
                </div>
                <div className="text-xs text-gray-400">(95% CI: 3.0-4.4)</div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">ORR:</span>
                  <span className="text-primary font-semibold">{trial.orr}</span>
                </div>
                <div className="text-xs text-gray-400">(95% CI: 10.0-18.1)</div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Tx related:</span>
                  <span className="text-primary font-semibold">6.8%</span>
                </div>
                <div className="text-xs text-gray-400">discontinuation</div>
              </div>
            </div>
          </div>

          {/* Comparator Arm */}
          <div className="bg-white rounded-xl p-6 w-80 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="text-lg font-semibold text-gray-900">docetaxel</div>
              <Badge className="bg-gray-100 text-primary">Comparator</Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">mOS:</span>
                  <span className="text-gray-700 font-semibold">9.8 months</span>
                </div>
                <div className="text-xs text-gray-400">(95% CI: 8.1-10.6)</div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">mPFS:</span>
                  <span className="text-gray-700 font-semibold">3.9 months</span>
                </div>
                <div className="text-xs text-gray-400">(95% CI: 3.1-4.2)</div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">ORR:</span>
                  <span className="text-gray-700 font-semibold">18.1%</span>
                </div>
                <div className="text-xs text-gray-400">(95% CI: 13.9-22.9)</div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Tx related:</span>
                  <span className="text-gray-700 font-semibold">14.2%</span>
                </div>
                <div className="text-xs text-gray-400">discontinuation</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ComparisonTable = () => (
    <div className="p-8">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="bg-primary text-white p-4 text-center">
          <h3 className="text-lg font-semibold">{trial.trialName} Clinical Results</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <tbody>
              <tr>
                <th className="p-4 bg-gray-50 font-medium text-left text-gray-700">Trial Arms</th>
                <td className="p-4 font-medium">{trial.treatment}</td>
                <td className="p-4 font-medium">Standard Treatment</td>
                <td className="p-4 font-medium">Standard of Care</td>
              </tr>
              <tr>
                <th className="p-4 bg-gray-50 font-medium text-left text-gray-700">Arm Type</th>
                <td className="p-4">
                  <Badge className="bg-gray-100 text-primary">Experimental</Badge>
                </td>
                <td className="p-4">
                  <Badge className="bg-gray-100 text-primary">Comparator</Badge>
                </td>
                <td className="p-4">
                  <Badge className="bg-gray-100 text-primary">Standard of Care</Badge>
                </td>
              </tr>
              <tr>
                <th className="p-4 bg-gray-50 font-medium text-left text-gray-700">Patient Cohort</th>
                <td className="p-4" colSpan={2}>{trial.indication} patients</td>
                <td className="p-4">Comparable population</td>
              </tr>
              <tr className="bg-gray-25">
                <th className="p-4 bg-gray-100 font-medium text-left text-gray-700" colSpan={4}>
                  Efficacy Outcomes
                </th>
              </tr>
              <tr>
                <th className="p-4 bg-gray-50 font-medium text-left text-gray-700">Overall Survival (mOS)</th>
                <td className="p-4 font-semibold text-primary">{trial.os}</td>
                <td className="p-4 font-semibold">9.8 months</td>
                <td className="p-4 font-semibold">15.8 months</td>
              </tr>
              <tr>
                <th className="p-4 bg-gray-50 font-medium text-left text-gray-700">Progression-Free Survival (mPFS)</th>
                <td className="p-4 font-semibold text-primary">{trial.pfs}</td>
                <td className="p-4 font-semibold">3.9 months</td>
                <td className="p-4 font-semibold">6.7 months</td>
              </tr>
              <tr>
                <th className="p-4 bg-gray-50 font-medium text-left text-gray-700">Objective Response Rate (ORR)</th>
                <td className="p-4 font-semibold text-primary">{trial.orr}</td>
                <td className="p-4 font-semibold">18.1%</td>
                <td className="p-4 font-semibold">38%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Trials
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <GitCompare className="w-4 h-4" />
                Compare with Trials
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <GitCompare className="w-4 h-4" />
                Compare with SoC
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Code className="w-4 h-4" />
                Open Source
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export to PDF
              </Button>
            </div>
          </div>

          {/* Trial Header */}
          <div className="flex items-start gap-4 mb-6">
            <img 
              src={trial.companyLogo} 
              alt={`${trial.company} logo`}
              className="w-16 h-16 rounded-lg object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <div className="flex-1">
              <Badge className="bg-gray-100 text-primary mb-2">{trial.trialName}</Badge>
              <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                {trial.abstractTitle}
              </h1>
              <div className="flex flex-wrap gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Conference:</span>
                  <Badge className="bg-gray-100 text-primary ml-2">{trial.conference}</Badge>
                </div>
                <div>
                  <span className="text-gray-500">Indication:</span>
                  <Badge className="bg-gray-100 text-primary ml-2">{trial.indication}</Badge>
                </div>
                <div>
                  <span className="text-gray-500">Population:</span>
                  <Badge className="bg-gray-100 text-primary ml-2">{trial.population}</Badge>
                </div>
                <div>
                  <span className="text-gray-500">Line of Therapy:</span>
                  <Badge className="bg-gray-100 text-primary ml-2">{trial.lineTherapy}</Badge>
                </div>
                <div>
                  <span className="text-gray-500">Company:</span>
                  <Badge className="bg-gray-100 text-primary ml-2">{trial.company}</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-100 rounded-lg p-4 shadow-sm">
              <div className="text-sm text-gray-500 mb-1 font-medium">mOS</div>
              <div className="text-2xl font-bold text-primary mb-1">{trial.os}</div>
              <div className="text-xs text-gray-400">95% CI: 9.4-12.3</div>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 shadow-sm">
              <div className="text-sm text-gray-500 mb-1 font-medium">mPFS</div>
              <div className="text-2xl font-bold text-primary mb-1">{trial.pfs}</div>
              <div className="text-xs text-gray-400">95% CI: 3.0-4.4</div>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 shadow-sm">
              <div className="text-sm text-gray-500 mb-1 font-medium">ORR</div>
              <div className="text-2xl font-bold text-primary mb-1">{trial.orr}</div>
              <div className="text-xs text-gray-400">95% CI: 10.0-18.1</div>
            </div>
          </div>

          {/* Trial ID Link */}
          <div className="text-sm text-gray-600">
            <span>Trial ID: </span>
            <a 
              href={`https://clinicaltrials.gov/ct2/show/${trial.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline flex items-center gap-1 inline-flex"
            >
              {trial.id}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white">
        <div className="px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-transparent border-b border-gray-200 rounded-none h-12">
              <TabsTrigger 
                value="overview" 
                className="border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent rounded-none"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="schematic" 
                className="border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent rounded-none"
              >
                Schematic View
              </TabsTrigger>
              <TabsTrigger 
                value="table" 
                className="border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent rounded-none"
              >
                Table View
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-0">
              <div className="p-6">
                <div className="grid grid-cols-3 gap-6 mb-6">
                  <EChartsBarChart data={chartData.OS} title="Overall Survival" chartId="os-detail" />
                  <EChartsBarChart data={chartData.PFS} title="Progression-Free Survival" chartId="pfs-detail" />
                  <EChartsBarChart data={chartData.ORR} title="Objective Response Rate" chartId="orr-detail" />
                </div>
                
                <Card className="bg-primary text-white p-6 mt-6">
                  <div className="text-sm text-blue-200 font-semibold mb-2">Conclusion</div>
                  <p className="text-white leading-relaxed">
                    Although statistical significance was not met, {trial.treatment} showed numerical improvement in OS vs standard treatment. 
                    Results were consistent across all major subgroups including histology. Clinically meaningful improvement in OS was noted 
                    in patients without response to prior immunotherapy. {trial.treatment} was better tolerated than standard treatment; 
                    observed safety was consistent with the known profile.
                  </p>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="schematic" className="mt-0">
              <SchematicView />
            </TabsContent>
            
            <TabsContent value="table" className="mt-0">
              <ComparisonTable />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default TrialDetailView;
