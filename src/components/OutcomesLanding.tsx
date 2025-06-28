
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, BarChart3, TrendingUp, Database } from 'lucide-react';

interface OutcomesLandingProps {
  onGetStarted: () => void;
}

const OutcomesLanding = ({ onGetStarted }: OutcomesLandingProps) => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Clinical Trial Outcomes
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Analyze and benchmark oncology clinical trial data with powerful filtering, 
            comparison tools, and trend analysis to make informed decisions.
          </p>
          <Button 
            onClick={onGetStarted}
            size="lg"
            className="bg-[#1A237E] hover:bg-[#1A237E]/90 text-white px-8 py-3 text-lg"
          >
            Get Started
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Database className="w-8 h-8 text-[#1A237E]" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Trial Database</h3>
            <p className="text-gray-600">
              Access comprehensive clinical trial data with advanced search and filtering capabilities.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-[#1A237E]" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Compare Trials</h3>
            <p className="text-gray-600">
              Side-by-side comparison of trial outcomes, endpoints, and efficacy data.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-[#1A237E]" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Trend Analysis</h3>
            <p className="text-gray-600">
              Identify patterns and trends in oncology treatment outcomes over time.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-[#1A237E] mb-2">2,847</div>
              <div className="text-gray-600">Clinical Trials</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#1A237E] mb-2">15+</div>
              <div className="text-gray-600">Cancer Types</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#1A237E] mb-2">127</div>
              <div className="text-gray-600">Drug Classes</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#1A237E] mb-2">98%</div>
              <div className="text-gray-600">Data Accuracy</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutcomesLanding;
