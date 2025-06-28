
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, BarChart3, TrendingUp, Database, Calendar, MapPin, Sparkles, Brain, Zap } from 'lucide-react';

interface OutcomesLandingProps {
  onGetStarted: () => void;
}

const OutcomesLanding = ({ onGetStarted }: OutcomesLandingProps) => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* AI Insights Hero Section */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 rounded-2xl p-8 border border-purple-100">
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">AI Conference Insights</h1>
                  <p className="text-purple-600 font-medium">Real-time intelligence from oncology conferences</p>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/50">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Sparkles className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">ASCO 2025 Preview</h3>
                    <p className="text-sm text-gray-600">AI analysis predicts 40% increase in immunotherapy abstracts, with breakthrough CAR-T cell therapy presentations expected from 15+ pharma companies.</p>
                    <div className="mt-3 text-xs text-green-600 font-medium">🔥 Trending: PD-1/PD-L1 combinations</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/50">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Zap className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">ESMO Impact Analysis</h3>
                    <p className="text-sm text-gray-600">Recent ESMO abstracts show 65% efficacy improvement in solid tumors. AI identifies key biomarkers driving next-generation targeted therapies.</p>
                    <div className="mt-3 text-xs text-blue-600 font-medium">📊 Key Insight: Precision medicine surge</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button 
                onClick={onGetStarted}
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3 text-lg shadow-lg"
              >
                Explore AI Insights
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          {/* Features Section - Left Side */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Premium AI Analysis Platform</h2>
              <p className="text-gray-600">Advanced intelligence for oncology abstract analysis and benchmarking</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-purple-50 rounded-lg shadow-sm p-8 text-center border border-purple-100">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Database className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-purple-800">Abstract Intelligence</h3>
                <p className="text-purple-600">
                  AI-powered analysis of comprehensive clinical abstract data with advanced search and filtering capabilities.
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg shadow-sm p-8 text-center border border-blue-100">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-blue-800">Compare Abstracts</h3>
                <p className="text-blue-600">
                  Side-by-side comparison of abstract outcomes, endpoints, and efficacy data with AI insights.
                </p>
              </div>

              <div className="bg-green-50 rounded-lg shadow-sm p-8 text-center border border-green-100">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-green-800">Trend Analysis</h3>
                <p className="text-green-600">
                  Identify patterns and trends in oncology treatment outcomes with predictive AI analytics.
                </p>
              </div>

              <div className="bg-rose-50 rounded-lg shadow-sm p-8 text-center border border-rose-100">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-rose-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-rose-800">Smart Search</h3>
                <p className="text-rose-600">
                  Natural language queries powered by AI to find relevant abstracts and insights instantly.
                </p>
              </div>
            </div>
          </div>

          {/* Conferences List - Right Side */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-[#1A237E]" />
                Recent Conferences
              </h3>
              
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">ASCO 2025</h4>
                    <span className="text-xs bg-[#1A237E] text-white px-2 py-1 rounded-full">Upcoming</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">American Society of Clinical Oncology</p>
                  <div className="space-y-1 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-2" />
                      May 30 - June 3, 2025
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 mr-2" />
                      Chicago, IL
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">ESMO 2024</h4>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Recent</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">European Society for Medical Oncology</p>
                  <div className="space-y-1 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-2" />
                      September 13-17, 2024
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 mr-2" />
                      Barcelona, Spain
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">ASH 2024</h4>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Recent</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">American Society of Hematology</p>
                  <div className="space-y-1 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-2" />
                      December 7-10, 2024
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 mr-2" />
                      San Diego, CA
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-full mt-4 text-sm text-[#1A237E] hover:text-[#1A237E]/80 font-medium">
                View all conferences →
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gray-50 rounded-lg shadow-sm p-8 border border-gray-100">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-[#1A237E] mb-2">12,847</div>
              <div className="text-gray-600">Clinical Abstracts</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#1A237E] mb-2">25+</div>
              <div className="text-gray-600">Cancer Types</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#1A237E] mb-2">180+</div>
              <div className="text-gray-600">Drug Classes</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#1A237E] mb-2">AI-Powered</div>
              <div className="text-gray-600">Analysis</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutcomesLanding;
