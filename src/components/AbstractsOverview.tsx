
import React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AbstractsOverview = () => {
  const sessionTypeData = [
    { name: 'Oral Presentations', value: 3247, color: '#8B5CF6' },
    { name: 'Poster Sessions', value: 8934, color: '#06B6D4' },
    { name: 'Clinical Trials', value: 2156, color: '#10B981' },
    { name: 'Educational Sessions', value: 1543, color: '#F59E0B' },
    { name: 'Symposiums', value: 987, color: '#EF4444' },
    { name: 'Workshops', value: 634, color: '#8B5F65' }
  ];

  const chartConfig = {
    value: {
      label: "Abstracts",
    },
    oral: {
      label: "Oral Presentations",
      color: "#8B5CF6",
    },
    poster: {
      label: "Poster Sessions", 
      color: "#06B6D4",
    },
    clinical: {
      label: "Clinical Trials",
      color: "#10B981",
    },
    educational: {
      label: "Educational Sessions",
      color: "#F59E0B",
    },
    symposium: {
      label: "Symposiums",
      color: "#EF4444",
    },
    workshop: {
      label: "Workshops",
      color: "#8B5F65",
    }
  };

  return (
    <div className="bg-white p-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="abstracts">Abstracts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
              </div>
              Abstracts by Session Type
            </h2>
            <div className="h-96">
              <ChartContainer config={chartConfig} className="h-full w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sessionTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={140}
                      paddingAngle={3}
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
            <div className="grid grid-cols-2 gap-4 mt-6">
              {sessionTypeData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center">
                    <div 
                      className="w-4 h-4 rounded-full mr-3"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm font-medium text-gray-900">{item.name}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="abstracts" className="space-y-6">
          <div className="bg-white rounded-lg p-6">
            <p className="text-gray-600">Abstracts list will be displayed here...</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AbstractsOverview;
