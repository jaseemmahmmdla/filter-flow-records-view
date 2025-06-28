
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, BarChart3, TrendingUp, Database, Calendar, MapPin, ChevronRight, Clock, ExternalLink, Zap, MessageCircle, Bot, Sparkles, ArrowRight } from 'lucide-react';

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

  const latestUpdates = [
    {
      title: 'Keytruda + Chemotherapy Shows 42% Reduction in Death Risk for NSCLC',
      company: 'Merck',
      indication: 'Non-small cell lung cancer',
      timeAgo: '2 hours ago',
      source: 'FDA Press Release',
      type: 'breakthrough'
    },
    {
      title: 'Enhertu Receives FDA Approval for HER2-Low Breast Cancer',
      company: 'Daiichi Sankyo/AstraZeneca',
      indication: 'Breast cancer',
      timeAgo: '4 hours ago',
      source: 'Company Press Release',
      type: 'approval'
    },
    {
      title: 'Teclistamab Shows 63% ORR in Relapsed/Refractory Multiple Myeloma',
      company: 'Johnson & Johnson',
      indication: 'Multiple myeloma',
      timeAgo: '6 hours ago',
      source: 'New England Journal of Medicine',
      type: 'results'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Header */}
        <div className="mb-12 text-center border-b border-gray-200 pb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">AI-Powered Abstract Intelligence</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Navigate through thousands of oncology abstracts with advanced AI insights
          </p>
        </div>

        {/* AI Chatbot Section */}
        <div className="mb-12 border border-gray-300 p-8">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 border-2 border-gray-400 flex items-center justify-center mr-4">
                  <Bot className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">AI Research Assistant</h2>
                  <p className="text-gray-600">Powered by advanced AI models</p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6">
                Ask natural language questions about clinical trials, drug mechanisms, patient outcomes, and research trends.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="border border-gray-300 p-4">
                  <MessageCircle className="w-5 h-5 text-gray-600 mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-1">Natural Conversations</h3>
                  <p className="text-sm text-gray-600">Ask complex questions in plain English</p>
                </div>
                <div className="border border-gray-300 p-4">
                  <Database className="w-5 h-5 text-gray-600 mb-2" />
                  <h3 className="font-semibold text-gray-900 mb-1">Deep Knowledge</h3>
                  <p className="text-sm text-gray-600">Trained on thousands of abstracts and trials</p>
                </div>
              </div>

              <Button className="border border-gray-400 bg-white text-gray-900 hover:bg-gray-50">
                Try AI Assistant
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="hidden lg:block ml-8">
              <div className="w-64 h-48 border-2 border-gray-300 p-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Bot className="w-4 h-4 text-gray-600 mt-1" />
                    <div className="border border-gray-200 text-xs p-2 flex-1">
                      Based on recent DESTINY trials...
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="border border-gray-400 text-xs p-2 max-w-[70%]">
                      What about resistance patterns?
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Recent Conferences */}
            <div className="border border-gray-300 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Calendar className="w-5 h-5 mr-3" />
                Recent Conferences
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {recentConferences.map((conf, index) => (
                  <div key={index} className="border border-gray-200 p-4 hover:border-gray-400 cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{conf.name}</h3>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div>{conf.date}</div>
                      <div>{conf.location}</div>
                      <div>{conf.abstracts} abstracts</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Therapeutic Areas */}
            <div className="border border-gray-300 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Search className="w-5 h-5 mr-3" />
                Therapeutic Areas
              </h2>
              <div className="grid md:grid-cols-2 gap-3">
                {therapeuticAreas.map((area, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 hover:border-gray-400 cursor-pointer">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-900">{area.name}</span>
                      {area.hot && (
                        <span className="ml-2 text-xs border border-gray-300 px-2 py-1">Hot</span>
                      )}
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-2">{area.count}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hot Targets */}
            <div className="border border-gray-300 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="w-5 h-5 mr-3" />
                Hot Targets & Modalities
              </h2>
              <div className="grid md:grid-cols-2 gap-3">
                {hotTargets.map((target, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 hover:border-gray-400 cursor-pointer">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-900">{target.name}</span>
                      <span className="ml-2 text-xs border border-gray-300 px-2 py-1">{target.trend}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-2">{target.count}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center pt-4">
              <Button 
                onClick={onGetStarted}
                className="border-2 border-gray-900 bg-white text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-3"
              >
                Start Exploring with AI
              </Button>
            </div>
          </div>

          {/* Latest Updates Feed - Right Side */}
          <div className="lg:col-span-1">
            <div className="border border-gray-300 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 border-2 border-gray-400 flex items-center justify-center mr-3">
                    <Zap className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Latest Updates</h3>
                    <p className="text-sm text-gray-600">Real-time feed</p>
                  </div>
                </div>
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              </div>
              
              <div className="space-y-4">
                {latestUpdates.map((update, index) => (
                  <div key={index} className="border border-gray-200 p-4 hover:border-gray-400 cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-xs border border-gray-300 px-2 py-1">
                        {update.type.toUpperCase()}
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        {update.timeAgo}
                      </div>
                    </div>
                    
                    <h4 className="font-semibold text-gray-900 mb-3 text-sm">{update.title}</h4>
                    
                    <div className="space-y-2 text-xs text-gray-600">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{update.company}</span>
                        <span className="font-medium">{update.indication}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        {update.source}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-gray-900">47</div>
                    <div className="text-xs text-gray-600">Today's Updates</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gray-900">Live</div>
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
