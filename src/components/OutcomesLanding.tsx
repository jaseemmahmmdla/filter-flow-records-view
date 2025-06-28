
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, BarChart3, TrendingUp, Database, Calendar, MapPin, ChevronRight, Clock, ExternalLink, Zap, MessageCircle, Bot, Sparkles, ArrowRight, Send, User, Lightbulb } from 'lucide-react';

interface OutcomesLandingProps {
  onGetStarted: () => void;
}

const OutcomesLanding = ({ onGetStarted }: OutcomesLandingProps) => {
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      type: 'bot',
      message: 'Hello! I\'m your AI research assistant. I can help you explore clinical trials, drug outcomes, and research trends. What would you like to know?',
      timestamp: new Date()
    }
  ]);

  const suggestedQuestions = [
    {
      category: 'Drug Discovery',
      icon: '🔬',
      questions: [
        'What are the latest ADC trials for HER2-low breast cancer?',
        'Compare CAR-T outcomes in multiple myeloma vs ALL',
        'Show me EGFR inhibitor resistance mechanisms',
        'Latest KRAS G12C inhibitor trial results'
      ]
    },
    {
      category: 'Clinical Outcomes',
      icon: '📊',
      questions: [
        'Survival rates for immunotherapy combinations in NSCLC',
        'Biomarker-driven treatment responses in melanoma',
        'Real-world evidence for Keytruda + chemotherapy',
        'Adverse events comparison across PD-1 inhibitors'
      ]
    },
    {
      category: 'Market Trends',
      icon: '📈',
      questions: [
        'Emerging targets in oncology 2024-2025',
        'BiTE therapy development pipeline',
        'Claudin 18.2 targeting landscape',
        'Next-generation ADC technologies'
      ]
    },
    {
      category: 'Conference Insights',
      icon: '🎯',
      questions: [
        'ASCO 2024 breakthrough presentations',
        'ESMO highlights in precision medicine',
        'ASH late-breaking abstracts summary',
        'Regulatory trends from recent conferences'
      ]
    }
  ];

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
    { name: 'ASCO 2025', date: 'May 30', status: 'upcoming', abstracts: '6,200+' },
    { name: 'ESMO 2024', date: 'Sep 13', status: 'recent', abstracts: '3,847' },
    { name: 'ASH 2024', date: 'Dec 7', status: 'recent', abstracts: '2,156' },
    { name: 'AACR 2025', date: 'Mar 15', status: 'upcoming', abstracts: '4,200+' }
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

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    
    const newMessage = {
      type: 'user',
      message: chatMessage,
      timestamp: new Date()
    };
    
    setChatHistory([...chatHistory, newMessage]);
    setChatMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        type: 'bot',
        message: 'I\'m analyzing your question and searching through our clinical database. This would be where I provide detailed insights based on the latest research data...',
        timestamp: new Date()
      };
      setChatHistory(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleSuggestedQuestion = (question: string) => {
    setChatMessage(question);
  };

  const getNewsTypeColor = (type: string) => {
    switch (type) {
      case 'breakthrough':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
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

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white">
      <div className="w-full px-6 py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI-Powered Abstract Intelligence</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Navigate through thousands of oncology abstracts with advanced AI insights. Ask questions in natural language.
          </p>
        </div>

        <div className="grid grid-cols-10 gap-6">
          {/* Left Side - AI Chat Interface (70%) */}
          <div className="col-span-7 space-y-6">
            {/* Chat Interface */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4">
                <div className="flex items-center text-white">
                  <Bot className="w-6 h-6 mr-3" />
                  <div>
                    <h2 className="text-xl font-bold">AI Research Assistant</h2>
                    <p className="text-indigo-200 text-sm">Powered by advanced AI models</p>
                  </div>
                  <div className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              </div>
              
              {/* Chat History */}
              <div className="h-64 overflow-y-auto p-4 space-y-4">
                {chatHistory.map((chat, index) => (
                  <div key={index} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-lg ${
                      chat.type === 'user' 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <div className="flex items-start space-x-2">
                        {chat.type === 'bot' && <Bot className="w-4 h-4 mt-0.5 text-indigo-600" />}
                        {chat.type === 'user' && <User className="w-4 h-4 mt-0.5" />}
                        <div className="text-sm">{chat.message}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Suggested Questions */}
              <div className="border-t border-gray-200 p-4 bg-gray-50">
                <div className="flex items-center mb-3">
                  <Lightbulb className="w-4 h-4 mr-2 text-yellow-600" />
                  <h3 className="text-sm font-semibold text-gray-900">Suggested Questions</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {suggestedQuestions.map((category, index) => (
                    <div key={index}>
                      <h4 className="text-xs font-medium text-gray-700 mb-2 flex items-center">
                        <span className="mr-1">{category.icon}</span>
                        {category.category}
                      </h4>
                      <div className="space-y-1">
                        {category.questions.slice(0, 2).map((question, qIndex) => (
                          <button
                            key={qIndex}
                            onClick={() => handleSuggestedQuestion(question)}
                            className="w-full text-left text-xs text-gray-600 hover:text-indigo-600 hover:bg-white p-2 rounded-md transition-colors"
                          >
                            {question}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Chat Input */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask about clinical trials, outcomes, or trends..."
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <Button onClick={handleSendMessage} className="bg-indigo-600 hover:bg-indigo-700">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Therapeutic Areas */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Search className="w-5 h-5 mr-2 text-emerald-600" />
                Therapeutic Areas
              </h2>
              <div className="space-y-2">
                {therapeuticAreas.map((area, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900 group-hover:text-emerald-600">{area.name}</span>
                      {area.hot && (
                        <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-1 rounded-md">🔥</span>
                      )}
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500 mr-2">{area.count}</span>
                      <ChevronRight className="w-3 h-3 text-gray-400 group-hover:text-emerald-600" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hot Targets */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-rose-600" />
                Hot Targets & Modalities
              </h2>
              <div className="space-y-2">
                {hotTargets.map((target, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900 group-hover:text-rose-600">{target.name}</span>
                      <span className="ml-2 text-xs bg-rose-100 text-rose-700 px-2 py-1 rounded-md">{target.trend}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500 mr-2">{target.count}</span>
                      <ChevronRight className="w-3 h-3 text-gray-400 group-hover:text-rose-600" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Conferences and News (30%) */}
          <div className="col-span-3 space-y-6">
            {/* Recent Conferences - Compact */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-indigo-600" />
                Recent Conferences
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {recentConferences.map((conf, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors cursor-pointer group">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 text-xs">{conf.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-md ${
                        conf.status === 'upcoming' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {conf.status === 'upcoming' ? 'Upcoming' : 'Recent'}
                      </span>
                    </div>
                    <div className="space-y-1 text-xs text-gray-600">
                      <div className="text-gray-900">{conf.date}</div>
                      <div className="text-indigo-600 font-medium">{conf.abstracts} abstracts</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Latest Updates Feed */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center mr-3">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Latest Updates</h3>
                    <p className="text-sm text-indigo-600">Real-time feed</p>
                  </div>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {latestUpdates.map((update, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`text-xs px-2 py-1 rounded-md border ${getNewsTypeColor(update.type)} flex items-center`}>
                        <span className="mr-1">{getNewsTypeIcon(update.type)}</span>
                        {update.type.toUpperCase()}
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        {update.timeAgo}
                      </div>
                    </div>
                    
                    <h4 className="font-semibold text-gray-900 mb-3 text-sm leading-tight">{update.title}</h4>
                    
                    <div className="space-y-2 text-xs text-gray-600 mb-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{update.company}</span>
                        <span className="text-indigo-600 font-medium">{update.indication}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        {update.source}
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-600 leading-relaxed">{update.summary}</p>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-6 pt-6 border-t border-gray-200">
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

        {/* CTA */}
        <div className="text-center pt-8">
          <Button 
            onClick={onGetStarted}
            size="lg"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 text-lg"
          >
            Start Exploring with AI
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OutcomesLanding;
