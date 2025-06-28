
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
      message: 'Hello! I\'m your Kogntic AI research assistant. I can help you explore clinical trials, drug outcomes, and research trends. What would you like to know?',
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
        return 'bg-status-success/10 text-status-success border-status-success/20';
      case 'approval':
        return 'bg-status-info/10 text-status-info border-status-info/20';
      case 'results':
        return 'bg-accent-300/10 text-accent-500 border-accent-300/20';
      default:
        return 'bg-neutral-100 text-neutral-700 border-neutral-300';
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
    <div className="min-h-[calc(100vh-4rem)] bg-neutral-100">
      <div className="w-full px-6 py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">AI-Powered Abstract Intelligence</h1>
          <p className="text-xl text-neutral-700 max-w-3xl mx-auto">
            Navigate through thousands of oncology abstracts with advanced AI insights. Ask questions in natural language.
          </p>
        </div>

        <div className="grid grid-cols-10 gap-6">
          {/* Left Side - AI Chat Interface (70%) */}
          <div className="col-span-7 space-y-6">
            {/* Chat Interface */}
            <div className="bg-white border border-neutral-300 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-primary-500 p-4">
                <div className="flex items-center text-white">
                  <Bot className="w-6 h-6 mr-3" />
                  <div>
                    <h2 className="text-xl font-bold">Kogntic AI Assistant</h2>
                    <p className="text-primary-100 text-sm">Powered by advanced AI models</p>
                  </div>
                  <div className="ml-auto w-2 h-2 bg-status-success rounded-full animate-pulse"></div>
                </div>
              </div>
              
              {/* Chat Content with Suggested Questions on Left */}
              <div className="flex h-80">
                {/* Suggested Questions - Left Side */}
                <div className="w-1/3 border-r border-neutral-300 p-4 bg-neutral-100 overflow-y-auto">
                  <div className="flex items-center mb-3">
                    <Lightbulb className="w-4 h-4 mr-2 text-status-warning" />
                    <h3 className="text-sm font-semibold text-neutral-900">Suggested Questions</h3>
                  </div>
                  <div className="space-y-4">
                    {suggestedQuestions.map((category, index) => (
                      <div key={index}>
                        <h4 className="text-xs font-medium text-neutral-700 mb-2 flex items-center">
                          <span className="mr-1">{category.icon}</span>
                          {category.category}
                        </h4>
                        <div className="space-y-2">
                          {category.questions.slice(0, 2).map((question, qIndex) => (
                            <button
                              key={qIndex}
                              onClick={() => handleSuggestedQuestion(question)}
                              className="w-full text-left text-xs text-neutral-700 bg-white hover:bg-pastel-indigo hover:text-primary-500 p-3 rounded-lg border border-neutral-300 hover:border-primary-500 transition-all duration-200 shadow-sm hover:shadow-md"
                            >
                              {question}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Chat History - Right Side */}
                <div className="flex-1 flex flex-col">
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {chatHistory.map((chat, index) => (
                      <div key={index} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-lg ${
                          chat.type === 'user' 
                            ? 'bg-primary-500 text-white' 
                            : 'bg-neutral-100 text-neutral-900'
                        }`}>
                          <div className="flex items-start space-x-2">
                            {chat.type === 'bot' && <Bot className="w-4 h-4 mt-0.5 text-primary-500" />}
                            {chat.type === 'user' && <User className="w-4 h-4 mt-0.5" />}
                            <div className="text-sm">{chat.message}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Chat Input */}
                  <div className="border-t border-neutral-300 p-4">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Ask about clinical trials, outcomes, or trends..."
                        className="flex-1 border border-neutral-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      <Button onClick={handleSendMessage} className="bg-primary-500 hover:bg-primary-700">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Indications */}
            <div className="bg-white border border-neutral-300 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-neutral-900 mb-4 flex items-center">
                <Search className="w-5 h-5 mr-2 text-status-success" />
                Indications
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {therapeuticAreas.map((area, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-neutral-100 rounded-lg hover:bg-pastel-blue transition-colors cursor-pointer group">
                    <div className="flex items-center min-w-0 flex-1">
                      <span className="text-sm font-medium text-neutral-900 group-hover:text-primary-500 truncate">{area.name}</span>
                      {area.hot && (
                        <span className="ml-2 text-xs bg-accent-100 text-accent-500 px-2 py-1 rounded-md flex-shrink-0">🔥</span>
                      )}
                    </div>
                    <div className="flex items-center ml-2 flex-shrink-0">
                      <span className="text-xs text-neutral-500 mr-2">{area.count}</span>
                      <ChevronRight className="w-3 h-3 text-neutral-500 group-hover:text-primary-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hot Targets */}
            <div className="bg-white border border-neutral-300 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-neutral-900 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-accent-500" />
                Hot Targets & Modalities
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {hotTargets.map((target, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-neutral-100 rounded-lg hover:bg-pastel-pink transition-colors cursor-pointer group">
                    <div className="flex items-center min-w-0 flex-1">
                      <span className="text-sm font-medium text-neutral-900 group-hover:text-accent-500 truncate">{target.name}</span>
                      <span className="ml-2 text-xs bg-accent-100 text-accent-500 px-2 py-1 rounded-md flex-shrink-0">{target.trend}</span>
                    </div>
                    <div className="flex items-center ml-2 flex-shrink-0">
                      <span className="text-xs text-neutral-500 mr-2">{target.count}</span>
                      <ChevronRight className="w-3 h-3 text-neutral-500 group-hover:text-accent-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Conferences and News (30%) */}
          <div className="col-span-3 space-y-6">
            {/* Recent Conferences - Compact */}
            <div className="bg-white border border-neutral-300 rounded-xl p-4 shadow-sm">
              <h2 className="text-lg font-bold text-neutral-900 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-primary-500" />
                Recent Conferences
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {recentConferences.map((conf, index) => (
                  <div key={index} className="bg-neutral-100 rounded-lg p-3 hover:bg-pastel-indigo transition-colors cursor-pointer group">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-neutral-900 group-hover:text-primary-500 text-xs">{conf.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-md ${
                        conf.status === 'upcoming' ? 'bg-status-info/10 text-status-info' : 'bg-status-success/10 text-status-success'
                      }`}>
                        {conf.status === 'upcoming' ? 'Upcoming' : 'Recent'}
                      </span>
                    </div>
                    <div className="space-y-1 text-xs text-neutral-500">
                      <div className="text-neutral-900">{conf.date}</div>
                      <div className="text-primary-500 font-medium">{conf.abstracts} abstracts</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Latest Updates Feed */}
            <div className="bg-white border border-neutral-300 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center mr-3">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900">Latest Updates</h3>
                    <p className="text-sm text-primary-500">Real-time feed</p>
                  </div>
                </div>
                <div className="w-2 h-2 bg-status-success rounded-full animate-pulse"></div>
              </div>
              
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {latestUpdates.map((update, index) => (
                  <div key={index} className="border border-neutral-300 rounded-lg p-4 hover:border-primary-500 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`text-xs px-2 py-1 rounded-md border ${getNewsTypeColor(update.type)} flex items-center`}>
                        <span className="mr-1">{getNewsTypeIcon(update.type)}</span>
                        {update.type.toUpperCase()}
                      </div>
                      <div className="flex items-center text-xs text-neutral-500">
                        <Clock className="w-3 h-3 mr-1" />
                        {update.timeAgo}
                      </div>
                    </div>
                    
                    <h4 className="font-semibold text-neutral-900 mb-3 text-sm leading-tight">{update.title}</h4>
                    
                    <div className="space-y-2 text-xs text-neutral-700 mb-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{update.company}</span>
                        <span className="text-primary-500 font-medium">{update.indication}</span>
                      </div>
                      <div className="flex items-center text-neutral-500">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        {update.source}
                      </div>
                    </div>
                    
                    <p className="text-xs text-neutral-700 leading-relaxed">{update.summary}</p>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-6 pt-6 border-t border-neutral-300">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary-500">47</div>
                    <div className="text-xs text-neutral-700">Today's Updates</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary-500">Live</div>
                    <div className="text-xs text-neutral-700">Real-time Feed</div>
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
            className="bg-primary-500 hover:bg-primary-700 text-white px-8 py-3 text-lg"
          >
            Start Exploring with AI
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OutcomesLanding;
