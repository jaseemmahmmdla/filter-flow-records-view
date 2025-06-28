
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Send, User, Bot, Lightbulb } from 'lucide-react';

const AIAssistant = () => {
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary-500 mb-4">AI Research Assistant</h1>
        <p className="text-xl text-neutral-700">
          Ask questions about clinical trials, drug outcomes, and research trends in natural language.
        </p>
      </div>

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
        
        {/* Chat Interface */}
        <div className="flex h-96">
          {/* Suggested Questions - Left Side */}
          <div className="w-1/3 border-r border-neutral-300 p-4 bg-pastel-lavender overflow-y-auto">
            <div className="flex items-center mb-3">
              <Lightbulb className="w-4 h-4 mr-2 text-status-warning" />
              <h3 className="text-sm font-bold text-primary-500">Suggested Questions</h3>
            </div>
            <div className="space-y-4">
              {suggestedQuestions.map((category, index) => (
                <div key={index}>
                  <h4 className="text-xs font-bold text-primary-500 mb-2 flex items-center">
                    <span className="mr-1">{category.icon}</span>
                    {category.category}
                  </h4>
                  <div className="space-y-2">
                    {category.questions.slice(0, 2).map((question, qIndex) => (
                      <button
                        key={qIndex}
                        onClick={() => handleSuggestedQuestion(question)}
                        className="w-full text-left text-xs text-neutral-700 bg-white hover:bg-primary-100 hover:text-primary-500 p-3 rounded-lg border border-neutral-300 hover:border-primary-500 transition-all duration-200 shadow-sm hover:shadow-md"
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
                      : 'bg-pastel-lavender text-neutral-900'
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
    </div>
  );
};

export default AIAssistant;
