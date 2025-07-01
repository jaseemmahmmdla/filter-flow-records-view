
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, TrendingUp, Calendar, ChevronRight, Clock, ExternalLink, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';

interface OutcomesLandingProps {
  onGetStarted: () => void;
}

const OutcomesLanding = ({ onGetStarted }: OutcomesLandingProps) => {
  const navigate = useNavigate();

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
    { name: 'ASCO 2025', date: 'May 30', status: 'upcoming', abstracts: '6,200+', description: 'Annual Meeting of the American Society of Clinical Oncology' },
    { name: 'ESMO 2024', date: 'Sep 13', status: 'recent', abstracts: '3,847', description: 'European Society for Medical Oncology Congress' },
    { name: 'ASH 2024', date: 'Dec 7', status: 'recent', abstracts: '2,156', description: 'American Society of Hematology Annual Meeting' },
    { name: 'AACR 2025', date: 'Mar 15', status: 'upcoming', abstracts: '4,200+', description: 'American Association for Cancer Research Annual Meeting' }
  ];

  const latestUpdates = [
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
    }
  ];

  const getNewsTypeColor = (type: string) => {
    switch (type) {
      case 'breakthrough':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'approval':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'results':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
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

  const handleSearchSelect = (entity: string, profile: string, trialId?: string) => {
    // If it's a trial search, navigate directly to the trial page
    if (entity === 'trial' && trialId) {
      navigate(`/trial/${trialId}`);
      return;
    }
    
    // For other searches, navigate to trials page with filter
    onGetStarted();
    sessionStorage.setItem('searchSelection', JSON.stringify({ entity, profile }));
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
      <div className="w-full px-6 py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold text-primary-500 mb-6">AI-Powered Abstract Intelligence</h1>
          <p className="text-2xl text-gray-700 max-w-4xl mx-auto mb-10 leading-relaxed">
            Navigate through thousands of oncology abstracts with advanced AI insights. Ask questions in natural language.
          </p>
          
          {/* Search Bar */}
          <div className="mb-8">
            <SearchBar onSelect={handleSearchSelect} />
          </div>
        </div>

        {/* Main Content Layout - 60/40 Split */}
        <div className="grid grid-cols-5 gap-8">
          {/* Left Side - Main Content (60%) */}
          <div className="col-span-3 space-y-8">
            {/* Recent Conferences - Full Width on Top */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center mr-4">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                Recent & Upcoming Conferences
              </h2>
              <div className="grid grid-cols-2 gap-6">
                {recentConferences.map((conf, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-8 hover:bg-gray-100 transition-colors cursor-pointer group">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-bold text-gray-900 group-hover:text-primary-500 text-xl">{conf.name}</h3>
                      <span className={`text-sm px-4 py-2 rounded-full font-medium border ${
                        conf.status === 'upcoming' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-green-50 text-green-700 border-green-200'
                      }`}>
                        {conf.status === 'upcoming' ? 'Upcoming' : 'Recent'}
                      </span>
                    </div>
                    <div className="space-y-4">
                      <div className="text-base text-gray-600 leading-relaxed">{conf.description}</div>
                      <div className="flex items-center justify-between">
                        <div className="text-base text-gray-900 font-semibold">{conf.date}</div>
                        <div className="text-base text-primary-500 font-bold">{conf.abstracts} abstracts</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Section - 50/50 Split: Indications and Hot Targets */}
            <div className="grid grid-cols-2 gap-8">
              {/* Indications */}
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                    <Search className="w-5 h-5 text-white" />
                  </div>
                  Indications
                </h2>
                <div className="space-y-4">
                  {therapeuticAreas.map((area, index) => (
                    <div key={index} className="flex items-center justify-between p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer group">
                      <div className="flex items-center min-w-0 flex-1">
                        <span className="text-base font-medium text-gray-900 group-hover:text-primary-500 truncate">{area.name}</span>
                        {area.hot && (
                          <span className="ml-3 text-sm bg-orange-100 text-orange-600 px-3 py-1.5 rounded-lg flex-shrink-0 border border-orange-200">🔥</span>
                        )}
                      </div>
                      <div className="flex items-center ml-3 flex-shrink-0">
                        <span className="text-sm text-gray-500 mr-4 font-medium">{area.count}</span>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-500" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hot Targets */}
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  Hot Targets & Modalities
                </h2>
                <div className="space-y-4">
                  {hotTargets.map((target, index) => (
                    <div key={index} className="flex items-center justify-between p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer group">
                      <div className="flex items-center min-w-0 flex-1">
                        <span className="text-base font-medium text-gray-900 group-hover:text-purple-600 truncate">{target.name}</span>
                        <span className="ml-3 text-sm bg-purple-100 text-purple-700 px-3 py-1.5 rounded-lg flex-shrink-0 border border-purple-200">{target.trend}</span>
                      </div>
                      <div className="flex items-center ml-3 flex-shrink-0">
                        <span className="text-sm text-gray-500 mr-4 font-medium">{target.count}</span>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Latest Updates (40%) */}
          <div className="col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-sm sticky top-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Latest Updates</h3>
                    <p className="text-base text-gray-600">Real-time feed</p>
                  </div>
                </div>
                <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              
              <div className="space-y-6 max-h-[600px] overflow-y-auto">
                {latestUpdates.map((update, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`text-sm px-4 py-2 rounded-lg border ${getNewsTypeColor(update.type)} flex items-center`}>
                        <span className="mr-2">{getNewsTypeIcon(update.type)}</span>
                        {update.type.toUpperCase()}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        {update.timeAgo}
                      </div>
                    </div>
                    
                    <h4 className="font-bold text-gray-900 mb-4 text-base leading-tight">{update.title}</h4>
                    
                    <div className="space-y-3 text-sm text-gray-700 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-900 text-base">{update.company}</span>
                        <span className="text-primary-500 font-semibold text-base">{update.indication}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {update.source}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 leading-relaxed">{update.summary}</p>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="text-3xl font-bold text-primary-500">47</div>
                    <div className="text-sm text-gray-600 mt-1">Today's Updates</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="text-3xl font-bold text-green-500">Live</div>
                    <div className="text-sm text-gray-600 mt-1">Real-time Feed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-12">
          <Button 
            onClick={onGetStarted}
            size="lg"
            className="bg-primary-500 hover:bg-primary-700 text-white px-10 py-4 text-xl rounded-xl shadow-sm"
          >
            Start Exploring with AI
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OutcomesLanding;
