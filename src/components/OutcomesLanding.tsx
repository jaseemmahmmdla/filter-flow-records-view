
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, BarChart3, TrendingUp, Database, Calendar, MapPin, ChevronRight, Clock, ExternalLink } from 'lucide-react';

interface OutcomesLandingProps {
  onGetStarted: () => void;
}

const OutcomesLanding = ({ onGetStarted }: OutcomesLandingProps) => {
  const therapeuticAreas = [
    { name: 'Non-small cell lung cancer', count: '2,847', hot: true },
    { name: 'Breast cancer', count: '1,923', hot: false },
    { name: 'Colorectal cancer', count: '1,456', hot: false },
    { name: 'Multiple myeloma', count: '987', hot: true },
    { name: 'Acute myeloid leukemia', count: '743', hot: false },
    { name: 'Pancreatic cancer', count: '621', hot: true }
  ];

  const hotTargets = [
    { name: 'ADC (Antibody-Drug Conjugates)', count: '456', trend: '+89%' },
    { name: 'Bi-specific antibodies', count: '312', trend: '+156%' },
    { name: 'Claudin 18.2', count: '89', trend: '+234%' },
    { name: 'BCMA', count: '167', trend: '+67%' },
    { name: 'EGFR+', count: '892', trend: '+23%' },
    { name: 'HER2-low', count: '234', trend: '+445%' }
  ];

  const recentConferences = [
    { name: 'ASCO 2025', date: 'May 30 - June 3', location: 'Chicago, IL', status: 'upcoming', abstracts: '6,200+' },
    { name: 'ESMO 2024', date: 'Sep 13-17', location: 'Barcelona', status: 'recent', abstracts: '3,847' },
    { name: 'ASH 2024', date: 'Dec 7-10', location: 'San Diego', status: 'recent', abstracts: '2,156' },
    { name: 'SABCS 2024', date: 'Dec 10-13', location: 'San Antonio', status: 'recent', abstracts: '1,234' }
  ];

  const trialNews = [
    {
      title: 'Keytruda + Chemotherapy Shows 42% Reduction in Death Risk for NSCLC',
      company: 'Merck',
      indication: 'Non-small cell lung cancer',
      timeAgo: '2 hours ago',
      source: 'FDA Press Release',
      type: 'breakthrough',
      summary: 'Phase III KEYNOTE-189 trial demonstrates significant overall survival benefit in first-line treatment.'
    },
    {
      title: 'Enhertu Receives FDA Approval for HER2-Low Breast Cancer',
      company: 'Daiichi Sankyo/AstraZeneca',
      indication: 'Breast cancer',
      timeAgo: '4 hours ago',
      source: 'Company Press Release',
      type: 'approval',
      summary: 'First ADC approved for HER2-low population based on DESTINY-Breast04 results.'
    },
    {
      title: 'Teclistamab Shows 63% ORR in Relapsed/Refractory Multiple Myeloma',
      company: 'Johnson & Johnson',
      indication: 'Multiple myeloma',
      timeAgo: '6 hours ago',
      source: 'New England Journal of Medicine',
      type: 'results',
      summary: 'MajesTEC-1 trial results support BCMA-targeting bispecific approach.'
    },
    {
      title: 'CAR-T Therapy Achieves 94% Complete Response Rate in B-ALL',
      company: 'Novartis',
      indication: 'Acute lymphoblastic leukemia',
      timeAgo: '8 hours ago',
      source: 'Blood Journal',
      type: 'results',
      summary: 'Updated Kymriah data shows durable responses in pediatric and young adult patients.'
    },
    {
      title: 'Claudin 18.2 ADC Demonstrates Promising Activity in Gastric Cancer',
      company: 'Astellas',
      indication: 'Gastric cancer',
      timeAgo: '12 hours ago',
      source: 'Journal of Clinical Oncology',
      type: 'results',
      summary: 'Phase I/II trial shows 45% objective response rate with manageable safety profile.'
    }
  ];

  const getNewsTypeColor = (type: string) => {
    switch (type) {
      case 'breakthrough':
        return 'bg-emerald-100 text-emerald-700';
      case 'approval':
        return 'bg-blue-100 text-blue-700';
      case 'results':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getNewsTypeIcon = (type: string) => {
    switch (type) {
      case 'breakthrough':
        return '🚀';
      case 'approval':
        return '✅';
      case 'results':
        return '📊';
      default:
        return '📰';
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI-Powered Abstract Intelligence</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Navigate through thousands of oncology abstracts with advanced AI insights. Find breakthrough therapies, emerging targets, and clinical outcomes instantly.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Navigation - Left Side */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Conferences */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Calendar className="w-6 h-6 mr-3 text-indigo-600" />
                Recent Conferences
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {recentConferences.map((conf, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer group">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600">{conf.name}</h3>
                      <div className="flex items-center">
                        <span className={`text-xs px-2 py-1 rounded-md ${
                          conf.status === 'upcoming' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          {conf.status === 'upcoming' ? 'Upcoming' : 'Recent'}
                        </span>
                        <ChevronRight className="w-4 h-4 ml-2 text-gray-400 group-hover:text-indigo-600" />
                      </div>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-2" />
                        {conf.date}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-3 h-3 mr-2" />
                        {conf.location}
                      </div>
                      <div className="flex items-center">
                        <Database className="w-3 h-3 mr-2" />
                        {conf.abstracts} abstracts
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Therapeutic Areas */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Search className="w-6 h-6 mr-3 text-emerald-600" />
                Therapeutic Areas
              </h2>
              <div className="grid md:grid-cols-2 gap-3">
                {therapeuticAreas.map((area, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-900 group-hover:text-emerald-600">{area.name}</span>
                      {area.hot && (
                        <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-1 rounded-md">🔥 Hot</span>
                      )}
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-2">{area.count}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hot Targets & Modalities */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="w-6 h-6 mr-3 text-rose-600" />
                Hot Targets & Modalities
              </h2>
              <div className="grid md:grid-cols-2 gap-3">
                {hotTargets.map((target, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-900 group-hover:text-rose-600">{target.name}</span>
                      <span className="ml-2 text-xs bg-rose-100 text-rose-700 px-2 py-1 rounded-md">{target.trend}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-2">{target.count}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-rose-600" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center pt-4">
              <Button 
                onClick={onGetStarted}
                size="lg"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 text-lg"
              >
                Start Exploring with AI
              </Button>
            </div>
          </div>

          {/* Trial News Feed - Right Side */}
          <div className="lg:col-span-1">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center mr-3">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Trial News</h3>
                    <p className="text-sm text-indigo-600">Live updates</p>
                  </div>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {trialNews.map((news, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 border border-slate-200 hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div className={`text-xs px-2 py-1 rounded-md ${getNewsTypeColor(news.type)} flex items-center`}>
                        <span className="mr-1">{getNewsTypeIcon(news.type)}</span>
                        {news.type.toUpperCase()}
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        {news.timeAgo}
                      </div>
                    </div>
                    
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm leading-tight">{news.title}</h4>
                    
                    <div className="space-y-1 text-xs text-gray-600 mb-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{news.company}</span>
                        <span className="text-indigo-600">{news.indication}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        {news.source}
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-600 leading-relaxed">{news.summary}</p>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-indigo-600">47</div>
                    <div className="text-xs text-gray-600">Today's Updates</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-indigo-600">Live</div>
                    <div className="text-xs text-gray-600">Real-time Feed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutcomesLanding;
