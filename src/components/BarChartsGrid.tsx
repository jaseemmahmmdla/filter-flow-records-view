
import React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface ChartData {
  name: string;
  oral: number;
  poster: number;
  mini_oral: number;
}

interface SessionTypeData {
  name: string;
  value: number;
  color: string;
}

interface BarChartsGridProps {
  drugsData: ChartData[];
  companiesData: ChartData[];
  targetsData: ChartData[];
  modalitiesData: ChartData[];
  sessionTypeData: SessionTypeData[];
  chartConfig: any;
}

const BarChartsGrid = ({ 
  drugsData, 
  companiesData, 
  targetsData, 
  modalitiesData, 
  sessionTypeData,
  chartConfig 
}: BarChartsGridProps) => {
  console.log('🟢 BarChartsGrid rendering with sessionTypeData:', sessionTypeData);

  // Create chart config for pie chart
  const pieChartConfig = {
    value: {
      label: "Abstracts",
    },
    ...sessionTypeData.reduce((acc, item, index) => {
      acc[item.name.toLowerCase().replace(/\s+/g, '_')] = {
        label: item.name,
        color: item.color,
      };
      return acc;
    }, {} as any)
  };

  return (
    <div className="space-y-6">
      {/* Pie Chart Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Abstracts by Session Type</h3>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Pie Chart */}
          <div className="flex-1">
            <ChartContainer
              config={pieChartConfig}
              className="mx-auto aspect-square max-h-[400px]"
            >
              <PieChart>
                <Pie
                  data={sessionTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sessionTypeData.map((entry, index) => {
                    console.log(`🟢 Rendering pie slice ${index}:`, entry);
                    return (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color}
                      />
                    );
                  })}
                </Pie>
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                />
              </PieChart>
            </ChartContainer>
          </div>
          
          {/* Legend */}
          <div className="flex-1">
            <div className="space-y-3">
              {sessionTypeData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
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
        </div>
      </div>

      {/* Bar Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
    </div>
  );
};

export default BarChartsGrid;
