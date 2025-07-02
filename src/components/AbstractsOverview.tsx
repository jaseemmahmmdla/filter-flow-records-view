
import React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AbstractsOverview = () => {
  console.log('AbstractsOverview component is rendering');
  
  const sessionTypeData = [
    { name: 'Oral Presentations', value: 3247, color: '#8B5CF6' },
    { name: 'Poster Sessions', value: 8934, color: '#06B6D4' },
    { name: 'Clinical Trials', value: 2156, color: '#10B981' },
    { name: 'Educational Sessions', value: 1543, color: '#F59E0B' },
    { name: 'Symposiums', value: 987, color: '#EF4444' },
    { name: 'Workshops', value: 634, color: '#8B5F65' }
  ];

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

  console.log('Session type data for donut chart:', sessionTypeData);

  return (
    <div className="bg-white p-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="clinical-data">Clinical Data</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          {/* Donut Chart - First item in Overview tab */}
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Abstracts by Session Type
            </h2>
            
            <div className="h-96 mb-4">
              <ChartContainer config={chartConfig} className="h-full w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sessionTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={140}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {sessionTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip 
                      content={<ChartTooltipContent />}
                      formatter={(value, name) => [
                        `${value.toLocaleString()} abstracts`,
                        name
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {sessionTypeData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm font-medium text-gray-900">{item.name}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bar Charts Grid */}
          <div className="grid grid-cols-2 gap-6">
            {/* Top 10 Drugs */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Top 10 Drugs by Session Type</h3>
              <div className="h-80">
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={drugsData} layout="horizontal" margin={{ left: 80 }}>
                      <XAxis type="number" domain={[0, 3]} />
                      <YAxis dataKey="name" type="category" width={80} fontSize={10} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="oral" stackId="a" fill="#8B5CF6" />
                      <Bar dataKey="poster" stackId="a" fill="#06B6D4" />
                      <Bar dataKey="mini_oral" stackId="a" fill="#10B981" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>

            {/* Top 10 Companies */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Top 10 Companies by Session Type</h3>
              <div className="h-80">
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={companiesData} layout="horizontal" margin={{ left: 80 }}>
                      <XAxis type="number" domain={[0, 3]} />
                      <YAxis dataKey="name" type="category" width={80} fontSize={10} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="oral" stackId="a" fill="#8B5CF6" />
                      <Bar dataKey="poster" stackId="a" fill="#06B6D4" />
                      <Bar dataKey="mini_oral" stackId="a" fill="#10B981" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>

            {/* Top 10 Targets */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Top 10 Targets by Session Type</h3>
              <div className="h-80">
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={targetsData} layout="horizontal" margin={{ left: 80 }}>
                      <XAxis type="number" domain={[0, 2.5]} />
                      <YAxis dataKey="name" type="category" width={80} fontSize={10} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="oral" stackId="a" fill="#8B5CF6" />
                      <Bar dataKey="poster" stackId="a" fill="#06B6D4" />
                      <Bar dataKey="mini_oral" stackId="a" fill="#10B981" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>

            {/* Top 10 Modalities */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Top 10 Modalities by Session Type</h3>
              <div className="h-80">
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={modalitiesData} layout="horizontal" margin={{ left: 80 }}>
                      <XAxis type="number" domain={[0, 5]} />
                      <YAxis dataKey="name" type="category" width={80} fontSize={10} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="oral" stackId="a" fill="#8B5CF6" />
                      <Bar dataKey="poster" stackId="a" fill="#06B6D4" />
                      <Bar dataKey="mini_oral" stackId="a" fill="#10B981" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="clinical-data" className="space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="text-gray-500 text-center py-12">
              Clinical data details will be available here...
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AbstractsOverview;
