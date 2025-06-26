
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Activity, Pill, Calendar } from 'lucide-react';

const DashboardStats = () => {
  const stats = [
    {
      label: 'Total Trials',
      value: '2,847',
      change: '+12%',
      positive: true,
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      label: 'Indications',
      value: '42',
      change: '+3',
      positive: true,
      icon: Activity,
      color: 'text-green-600'
    },
    {
      label: 'Drugs/Treatments',
      value: '156',
      change: '+8',
      positive: true,
      icon: Pill,
      color: 'text-purple-600'
    },
    {
      label: 'Recent Conferences',
      value: '12',
      change: 'ASCO 2025',
      positive: true,
      icon: Calendar,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-white shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <p className={`text-sm mt-1 ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </p>
              </div>
              <div className={`${stat.color} opacity-80`}>
                <stat.icon className="h-8 w-8" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
