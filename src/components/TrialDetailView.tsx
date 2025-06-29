
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
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-center gap-12">
        {/* Patient Cohort */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 max-w-sm">
          <div className="text-center mb-4">
            <Badge className="bg-[#1A237E] text-white text-lg px-4 py-2">{trial.trialName}</Badge>
          </div>
          <div className="space-y-3">
            <Badge variant="secondary" className="text-xs">Patient Cohort</Badge>
            <p className="font-semibold text-sm">{trial.abstractTitle}</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <Badge variant="secondary" className="text-xs mb-1">Indication</Badge>
                <p className="font-semibold">{trial.indication}</p>
              </div>
              <div>
                <Badge variant="secondary" className="text-xs mb-1">Population</Badge>
                <p className="font-semibold">{trial.population}</p>
              </div>
              <div>
                <Badge variant="secondary" className="text-xs mb-1">Stage</Badge>
                <p className="font-semibold">{trial.stage}</p>
              </div>
              <div>
                <Badge variant="secondary" className="text-xs mb-1">Line of Therapy</Badge>
                <p className="font-semibold">{trial.lineTherapy}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Total Patients */}
        <div className="bg-pink-100 border border-pink-200 rounded-lg px-6 py-4">
          <div className="text-pink-800 font-bold text-lg text-center">
            {trial.enrollment}
          </div>
        </div>

        {/* Treatment Arms */}
        <div className="space-y-4">
          {/* Experimental Arm */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 max-w-sm">
            <div className="text-center mb-3">
              <div className="text-lg font-bold text-[#1A237E] mb-2">{trial.treatment}</div>
              <Badge className="bg-blue-600 text-white text-xs">Experimental</Badge>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-semibold">mOS:</span>
                <span className="text-[#1A237E] font-bold">{trial.os}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">mPFS:</span>
                <span className="text-[#1A237E] font-bold">{trial.pfs}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">ORR:</span>
                <span className="text-[#1A237E] font-bold">{trial.orr}</span>
              </div>
            </div>
          </div>

          {/* Comparator Arm */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 max-w-sm">
            <div className="text-center mb-3">
              <div className="text-lg font-bold text-gray-700 mb-2">Standard Treatment</div>
              <Badge className="bg-gray-600 text-white text-xs">Comparator</Badge>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-semibold">mOS:</span>
                <span className="text-gray-700 font-bold">9.8m</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">mPFS:</span>
                <span className="text-gray-700 font-bold">3.9m</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">ORR:</span>
                <span className="text-gray-700 font-bold">18.1%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ComparisonTable = () => (
    <div className="p-6">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-[#1A237E] text-white">
              <th className="border border-gray-300 p-3 text-center text-lg" colSpan={4}>
                {trial.trialName} Clinical Results
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="border border-gray-300 p-3 bg-gray-100 font-semibold">Trial Arms</th>
              <td className="border border-gray-300 p-3 font-semibold">{trial.treatment}</td>
              <td className="border border-gray-300 p-3 font-semibold">Standard Treatment</td>
              <td className="border border-gray-300 p-3 font-semibold">Standard of Care</td>
            </tr>
            <tr>
              <th className="border border-gray-300 p-3 bg-gray-100 font-semibold">Arm Type</th>
              <td className="border border-gray-300 p-3">
                <Badge className="bg-blue-600 text-white">Experimental</Badge>
              </td>
              <td className="border border-gray-300 p-3">
                <Badge className="bg-gray-600 text-white">Comparator</Badge>
              </td>
              <td className="border border-gray-300 p-3">
                <Badge className="bg-green-600 text-white">Standard of Care</Badge>
              </td>
            </tr>
            <tr>
              <th className="border border-gray-300 p-3 bg-gray-100 font-semibold">Patient Cohort</th>
              <td className="border border-gray-300 p-3" colSpan={2}>{trial.indication} patients</td>
              <td className="border border-gray-300 p-3">Comparable population</td>
            </tr>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 p-3 bg-gray-200 font-semibold" colSpan={4}>
                Efficacy Outcomes
              </th>
            </tr>
            <tr>
              <th className="border border-gray-300 p-3 bg-gray-100 font-semibold">Overall Survival (mOS)</th>
              <td className="border border-gray-300 p-3 font-semibold text-[#1A237E]">{trial.os}</td>
              <td className="border border-gray-300 p-3 font-semibold">9.8 months</td>
              <td className="border border-gray-300 p-3 font-semibold">15.8 months</td>
            </tr>
            <tr>
              <th className="border border-gray-300 p-3 bg-gray-100 font-semibold">Progression-Free Survival (mPFS)</th>
              <td className="border border-gray-300 p-3 font-semibold text-[#1A237E]">{trial.pfs}</td>
              <td className="border border-gray-300 p-3 font-semibold">3.9 months</td>
              <td className="border border-gray-300 p-3 font-semibold">6.7 months</td>
            </tr>
            <tr>
              <th className="border border-gray-300 p-3 bg-gray-100 font-semibold">Objective Response Rate (ORR)</th>
              <td className="border border-gray-300 p-3 font-semibold text-[#1A237E]">{trial.orr}</td>
              <td className="border border-gray-300 p-3 font-semibold">18.1%</td>
              <td className="border border-gray-300 p-3 font-semibold">38%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
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
              <Badge className="bg-pink-100 text-pink-800 mb-2">{trial.trialName}</Badge>
              <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                {trial.abstractTitle}
              </h1>
              <div className="flex flex-wrap gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Conference:</span>
                  <Badge variant="secondary" className="ml-2">{trial.conference}</Badge>
                </div>
                <div>
                  <span className="text-gray-500">Indication:</span>
                  <Badge variant="secondary" className="ml-2">{trial.indication}</Badge>
                </div>
                <div>
                  <span className="text-gray-500">Population:</span>
                  <Badge variant="secondary" className="ml-2">{trial.population}</Badge>
                </div>
                <div>
                  <span className="text-gray-500">Line of Therapy:</span>
                  <Badge variant="secondary" className="ml-2">{trial.lineTherapy}</Badge>
                </div>
                <div>
                  <span className="text-gray-500">Company:</span>
                  <Badge variant="secondary" className="ml-2">{trial.company}</Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card className="bg-[#1A237E] text-white p-4">
              <div className="text-sm text-blue-200 mb-1">mOS</div>
              <div className="text-2xl font-bold">{trial.os}</div>
              <div className="text-xs text-blue-200">95% CI: 9.4-12.3</div>
            </Card>
            <Card className="bg-[#1A237E] text-white p-4">
              <div className="text-sm text-blue-200 mb-1">mPFS</div>
              <div className="text-2xl font-bold">{trial.pfs}</div>
              <div className="text-xs text-blue-200">95% CI: 3.0-4.4</div>
            </Card>
            <Card className="bg-[#1A237E] text-white p-4">
              <div className="text-sm text-blue-200 mb-1">ORR</div>
              <div className="text-2xl font-bold">{trial.orr}</div>
              <div className="text-xs text-blue-200">95% CI: 10.0-18.1</div>
            </Card>
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
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <EChartsBarChart data={chartData.OS} title="Overall Survival" chartId="os-detail" />
                  <EChartsBarChart data={chartData.PFS} title="Progression-Free Survival" chartId="pfs-detail" />
                </div>
                <div className="grid grid-cols-1 gap-6">
                  <EChartsBarChart data={chartData.ORR} title="Objective Response Rate" chartId="orr-detail" />
                </div>
                
                <Card className="bg-[#1A237E] text-white p-6 mt-6">
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
