
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface SessionTypeData {
  name: string;
  value: number;
  color: string;
}

interface PieChartSectionProps {
  data: SessionTypeData[];
}

const PieChartSection = ({ data }: PieChartSectionProps) => {
  console.log('🟢 PieChartSection is rendering!');
  console.log('🟢 PieChartSection data received:', data);
  
  if (!data || data.length === 0) {
    console.log('🔴 No data available for pie chart');
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Abstracts by Session Type
        </h2>
        <div className="text-center text-gray-500">No data available</div>
      </div>
    );
  }

  // Create chart config for shadcn/ui chart
  const chartConfig = {
    value: {
      label: "Abstracts",
    },
    ...data.reduce((acc, item, index) => {
      acc[item.name.toLowerCase().replace(/\s+/g, '_')] = {
        label: item.name,
        color: item.color,
      };
      return acc;
    }, {} as any)
  };

  console.log('🟢 Chart config:', chartConfig);
  console.log('🟢 Data is valid, rendering pie chart with height 500px');

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Abstracts by Session Type
      </h2>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Pie Chart */}
        <div className="flex-1">
          <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => {
                    console.log(`🟢 Rendering pie slice ${index}:`, entry);
                    return (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color}
                      />
                    );
                  })}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [value.toLocaleString(), name]}
                  labelFormatter={(label) => `Session Type: ${label}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex-1">
          <div className="space-y-3">
            {data.map((item, index) => (
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
  );
};

export default PieChartSection;
