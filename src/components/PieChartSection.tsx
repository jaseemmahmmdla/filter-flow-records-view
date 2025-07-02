
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

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
  console.log('🟢 Data length:', data?.length);
  console.log('🟢 First item:', data?.[0]);
  
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

  console.log('🟢 Data is valid, rendering pie chart');

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Abstracts by Session Type
      </h2>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Pie Chart */}
        <div className="flex-1">
          <div className="w-full h-96 border-2 border-blue-500 rounded-lg bg-gray-50">
            <p className="text-center text-blue-600 font-bold p-4">PIE CHART CONTAINER - You should see the chart below:</p>
            <ResponsiveContainer width="100%" height="90%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
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
                  formatter={(value: number, name: string) => [
                    `${value.toLocaleString()} abstracts`,
                    name
                  ]}
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
