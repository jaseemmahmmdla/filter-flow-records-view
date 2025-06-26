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
  BarChart3,
  LayoutGrid,
  List
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

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

const ITEMS_PER_PAGE = 5;

const RecordsTable: React.FC<RecordsTableProps> = ({ filters }) => {
  const [viewMode, setViewMode] = useState<'card' | 'list'>('list');
  const [currentPage, setCurrentPage] = useState(1);
  
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
    {
      id: '6',
      name: 'Natural Language Processing Pipeline',
      type: 'ai-model',
      status: 'active',
      score: 89,
      trend: 'up',
      lastUpdated: '1 hour ago',
      author: 'Lisa Park',
      description: 'End-to-end NLP pipeline for text analysis'
    },
    {
      id: '7',
      name: 'Financial Data Warehouse',
      type: 'dataset',
      status: 'completed',
      score: 95,
      trend: 'stable',
      lastUpdated: '6 hours ago',
      author: 'Robert Chen',
      description: 'Comprehensive financial dataset with 10M records'
    },
    {
      id: '8',
      name: 'Marketing Campaign Analytics',
      type: 'analytics',
      status: 'pending',
      score: 73,
      trend: 'down',
      lastUpdated: '2 hours ago',
      author: 'Maria Garcia',
      description: 'Multi-channel campaign performance tracking'
    }
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

  const totalPages = Math.ceil(filteredRecords.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedRecords = filteredRecords.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const ActionDropdown = ({ record }: { record: Record }) => (
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
  );

  const CardView = () => (
    <div className="grid gap-4">
      {paginatedRecords.map((record) => (
        <Card key={record.id} className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-50 rounded-xl">
              {getTypeIcon(record.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{record.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{record.description}</p>
                </div>
                <ActionDropdown record={record} />
              </div>
              
              <div className="flex items-center gap-4 mt-4">
                <Badge variant="outline" className="border-gray-300 text-gray-700">
                  {record.type.replace('-', ' ')}
                </Badge>
                <Badge className={getStatusColor(record.status)}>
                  {record.status}
                </Badge>
                <div className="flex items-center gap-2">
                  <Progress value={record.score} className="h-2 w-20" />
                  <span className="text-sm text-gray-700">{record.score}%</span>
                </div>
                {getTrendIcon(record.trend)}
              </div>
              
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-blue-500 text-white text-xs">
                      {record.author.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-700">{record.author}</span>
                </div>
                <span className="text-sm text-gray-500">{record.lastUpdated}</span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const ListView = () => (
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
            {paginatedRecords.map((record) => (
              <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
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
                      <AvatarFallback className="bg-blue-500 text-white text-xs">
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
                  <ActionDropdown record={record} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );

  return (
    <div className="flex-1 p-6 bg-gray-50">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-blue-600 mb-2">
              AI Data Records
            </h1>
            <p className="text-gray-600">
              Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredRecords.length)} of {filteredRecords.length} records
            </p>
          </div>
          <div className="flex gap-3">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}
              >
                <List className="w-4 h-4 mr-2" />
                List
              </Button>
              <Button
                variant={viewMode === 'card' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('card')}
                className={viewMode === 'card' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}
              >
                <LayoutGrid className="w-4 h-4 mr-2" />
                Cards
              </Button>
            </div>
            <Button variant="outline" className="border-gray-300 hover:border-blue-500 hover:bg-blue-50">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
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

      {/* Records Display */}
      <div className="mb-6">
        {viewMode === 'card' ? <CardView /> : <ListView />}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => handlePageChange(page)}
                    isActive={currentPage === page}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext
                  onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default RecordsTable;
