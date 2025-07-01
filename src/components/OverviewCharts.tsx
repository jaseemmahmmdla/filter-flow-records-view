
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

const chartData = [
  {
    drug: 'durvalumab (AstraZeneca)',
    phase1: 3,
    phase2: 6,
    phase3: 40,
    phase4: 7,
    total: 56
  },
  {
    drug: 'atezolizumab (Roche)',
    phase1: 0,
    phase2: 11,
    phase3: 32,
    phase4: 12,
    total: 55
  },
  {
    drug: 'pembrolizumab (Merck)',
    phase1: 1,
    phase2: 6,
    phase3: 37,
    phase4: 5,
    total: 49
  },
  {
    drug: 'adebrelimab (Jiangsu Hengrui Pharmaceutical)',
    phase1: 2,
    phase2: 4,
    phase3: 28,
    phase4: 4,
    total: 38
  },
  {
    drug: 'catequentinib (Advenchen/Chia Tai Tianqing Pharmac...)',
    phase1: 1,
    phase2: 5,
    phase3: 17,
    phase4: 2,
    total: 25
  },
  {
    drug: 'nivolumab (BMS)',
    phase1: 1,
    phase2: 4,
    phase3: 15,
    phase4: 4,
    total: 24
  },
  {
    drug: 'tislelizumab (BeiGene)',
    phase1: 2,
    phase2: 2,
    phase3: 18,
    phase4: 0,
    total: 22
  },
  {
    drug: 'AMG 757 (Amgen/BeiGene)',
    phase1: 1,
    phase2: 6,
    phase3: 8,
    phase4: 3,
    total: 18
  },
  {
    drug: 'Rivoceranib (Elevar Therapeutics/Hansoh Pharma)',
    phase1: 2,
    phase2: 2,
    phase3: 13,
    phase4: 0,
    total: 17
  },
  {
    drug: 'Serplulimab (Shanghai Henlius Biotech)',
    phase1: 1,
    phase2: 2,
    phase3: 11,
    phase4: 2,
    total: 16
  }
];

const chartConfig = {
  phase1: {
    label: 'Phase 1',
    color: '#7dd3fc'
  },
  phase2: {
    label: 'Phase 2',
    color: '#60a5fa'
  },
  phase3: {
    label: 'Phase 3',
    color: '#a3d977'
  },
  phase4: {
    label: 'Phase 4',
    color: '#94a3b8'
  }
};

const CustomBar = ({ data }: { data: any }) => {
  const barHeight = 32;
  const barY = data.y + (data.height - barHeight) / 2;
  
  let currentX = data.x;
  const totalWidth = data.width;
  const total = data.payload.total;
  
  return (
    <g>
      {/* Phase 1 */}
      {data.payload.phase1 > 0 && (
        <>
          <rect
            x={currentX}
            y={barY}
            width={(data.payload.phase1 / total) * totalWidth}
            height={barHeight}
            fill={chartConfig.phase1.color}
          />
          <text
            x={currentX + ((data.payload.phase1 / total) * totalWidth) / 2}
            y={barY + barHeight / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="12"
            fill="white"
            fontWeight="500"
          >
            {data.payload.phase1}
          </text>
        </>
      )}
      
      {/* Phase 2 */}
      {data.payload.phase2 > 0 && (
        <>
          <rect
            x={currentX += (data.payload.phase1 / total) * totalWidth}
            y={barY}
            width={(data.payload.phase2 / total) * totalWidth}
            height={barHeight}
            fill={chartConfig.phase2.color}
          />
          <text
            x={currentX + ((data.payload.phase2 / total) * totalWidth) / 2}
            y={barY + barHeight / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="12"
            fill="white"
            fontWeight="500"
          >
            {data.payload.phase2}
          </text>
        </>
      )}
      
      {/* Phase 3 */}
      {data.payload.phase3 > 0 && (
        <>
          <rect
            x={currentX += (data.payload.phase2 / total) * totalWidth}
            y={barY}
            width={(data.payload.phase3 / total) * totalWidth}
            height={barHeight}
            fill={chartConfig.phase3.color}
          />
          <text
            x={currentX + ((data.payload.phase3 / total) * totalWidth) / 2}
            y={barY + barHeight / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="12"
            fill="white"
            fontWeight="500"
          >
            {data.payload.phase3}
          </text>
        </>
      )}
      
      {/* Phase 4 */}
      {data.payload.phase4 > 0 && (
        <>
          <rect
            x={currentX += (data.payload.phase3 / total) * totalWidth}
            y={barY}
            width={(data.payload.phase4 / total) * totalWidth}
            height={barHeight}
            fill={chartConfig.phase4.color}
          />
          <text
            x={currentX + ((data.payload.phase4 / total) * totalWidth) / 2}
            y={barY + barHeight / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="12"
            fill="white"
            fontWeight="500"
          >
            {data.payload.phase4}
          </text>
        </>
      )}
    </g>
  );
};

const OverviewCharts = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-white shadow-sm border border-slate-200">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-800 font-display">
            Drug Development Pipeline Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[600px] w-full">
            <ResponsiveContainer width="100%" height={600}>
              <BarChart
                data={chartData}
                layout="horizontal"
                margin={{ top: 20, right: 30, left: 280, bottom: 20 }}
                barCategoryGap={8}
              >
                <XAxis 
                  type="number" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                />
                <YAxis 
                  type="category" 
                  dataKey="drug"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#475569', textAnchor: 'end' }}
                  width={270}
                />
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  cursor={{ fill: 'rgba(0,0,0,0.1)' }}
                />
                <Bar 
                  dataKey="total" 
                  fill="transparent"
                  shape={<CustomBar data={undefined} />}
                  radius={4}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
          
          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-slate-100">
            {Object.entries(chartConfig).map(([key, config]) => (
              <div key={key} className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded-sm" 
                  style={{ backgroundColor: config.color }}
                />
                <span className="text-sm text-slate-700 font-medium">
                  {config.label}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewCharts;
