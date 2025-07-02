
import React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface ChartData {
  name: string;
  oral: number;
  poster: number;
  mini_oral: number;
}

interface BarChartsGridProps {
  drugsData: ChartData[];
  companiesData: ChartData[];
  targetsData: ChartData[];
  modalitiesData: ChartData[];
  chartConfig: any;
}

const BarChartsGrid = ({ 
  drugsData, 
  companiesData, 
  targetsData, 
  modalitiesData, 
  chartConfig 
}: BarChartsGridProps) => {
  return (
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
  );
};

export default BarChartsGrid;
