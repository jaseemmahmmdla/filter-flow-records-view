
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2, 
  Download, 
  Star,
  TrendingUp,
  TrendingDown,
  Zap,
  Brain,
  Database,
  BarChart3
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Record {
  id: string;
  name: string;
  type: 'ai-model' | 'dataset' | 'analytics' | 'report';
  status: 'active' | 'pending' | 'completed' | 'archived';
  score: number;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
  author: string;
  avatar?: string;
  description: string;
}

interface RecordsTableProps {
  filters: any;
}

const RecordsTable: React.FC<RecordsTableProps> = ({ filters }) => {
  const [records] = useState<Record[]>([
    {
      id: '1',
      name: 'GPT-4 Fine-tuned Model',
      type: 'ai-model',
      status: 'active',
      score: 94,
      trend: 'up',
      lastUpdated: '2 hours ago',
      author: 'Alex Chen',
      description: 'Advanced language model fine-tuned for customer service'
    },
    {
      id: '2',
      name: 'Customer Sentiment Dataset',
      type: 'dataset',
      status: 'completed',
      score: 87,
      trend: 'stable',
      lastUpdated: '1 day ago',
      author: 'Sarah Wilson',
      description: 'Large-scale sentiment analysis dataset with 100K samples'
    },
    {
      id: '3',
      name: 'Sales Performance Analytics',
      type: 'analytics',
      status: 'pending',
      score: 76,
      trend: 'down',
      lastUpdated: '3 hours ago',
      author: 'Mike Johnson',
      description: 'Real-time sales metrics and performance indicators'
    },
    {
      id: '4',
      name: 'Q4 AI Implementation Report',
      type: 'report',
      status: 'active',
      score: 91,
      trend: 'up',
      lastUpdated: '5 minutes ago',
      author: 'Emily Davis',
      description: 'Comprehensive analysis of AI adoption and ROI metrics'
    },
    {
      id: '5',
      name: 'Image Classification Model',
      type: 'ai-model',
      status: 'archived',
      score: 82,
      trend: 'stable',
      lastUpdated: '2 days ago',
      author: 'David Kim',
      description: 'CNN-based model for medical image classification'
    },
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'ai-model': return <Brain className="w-4 h-4" />;
      case 'dataset': return <Database className="w-4 h-4" />;
      case 'analytics': return <BarChart3 className="w-4 h-4" />;
      case 'report': return <Zap className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-50 text-green-700 border-green-200';
      case 'pending': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'completed': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'archived': return 'bg-gray-50 text-gray-700 border-gray-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <div className="w-4 h-4" />;
    }
  };

  const filteredRecords = records.filter(record => {
    if (filters.search && !record.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.status && record.status !== filters.status) {
      return false;
    }
    if (filters.category) {
      const categoryMap = {
        'ai-models': 'ai-model',
        'datasets': 'dataset',
        'analytics': 'analytics',
        'reports': 'report'
      };
      if (record.type !== categoryMap[filters.category as keyof typeof categoryMap]) {
        return false;
      }
    }
    if (filters.scoreRange && record.score < filters.scoreRange) {
      return false;
    }
    return true;
  });

  return (
    <div className="flex-1 p-6 bg-gray-50">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              AI Data Records
            </h1>
            <p className="text-gray-600">
              Showing {filteredRecords.length} of {records.length} records
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-gray-300 hover:border-blue-500 hover:bg-blue-50">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Zap className="w-4 h-4 mr-2" />
              New Record
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Records', value: records.length, change: '+12%', positive: true },
          { label: 'Active Models', value: records.filter(r => r.status === 'active').length, change: '+8%', positive: true },
          { label: 'Avg Score', value: `${Math.round(records.reduce((acc, r) => acc + r.score, 0) / records.length)}%`, change: '+2.1%', positive: true },
          { label: 'This Month', value: records.filter(r => r.lastUpdated.includes('hours') || r.lastUpdated.includes('minutes')).length, change: '-3%', positive: false }
        ].map((stat, index) => (
          <Card key={index} className="p-6 bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`flex items-center gap-1 text-sm ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                {stat.positive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {stat.change}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Records Table */}
      <Card className="bg-white shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Name</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Type</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Score</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Trend</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Author</th>
                <th className="text-left p-4 text-sm font-semibold text-gray-700">Updated</th>
                <th className="text-right p-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => (
                <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg">
                        {getTypeIcon(record.type)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{record.name}</p>
                        <p className="text-sm text-gray-500 mt-1">{record.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline" className="border-gray-300 text-gray-700">
                      {record.type.replace('-', ' ')}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Badge className={getStatusColor(record.status)}>
                      {record.status}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="w-20">
                      <div className="flex items-center gap-2">
                        <Progress value={record.score} className="h-2" />
                        <span className="text-sm text-gray-700">{record.score}%</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    {getTrendIcon(record.trend)}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs">
                          {record.author.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-700">{record.author}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-gray-500">{record.lastUpdated}</span>
                  </td>
                  <td className="p-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white border-gray-200 shadow-lg">
                        <DropdownMenuItem className="text-gray-700 hover:bg-gray-100">
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-gray-700 hover:bg-gray-100">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-gray-700 hover:bg-gray-100">
                          <Star className="mr-2 h-4 w-4" />
                          Favorite
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 hover:bg-red-50">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default RecordsTable;
