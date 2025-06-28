
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, BarChart3, TrendingUp, Database } from 'lucide-react';

interface OutcomesLandingProps {
  onGetStarted: () => void;
}

const OutcomesLanding = ({ onGetStarted }: OutcomesLandingProps) => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white">
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
          <div className="bg-purple-50 rounded-lg shadow-sm p-8 text-center border border-purple-100">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Database className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-purple-800">Trial Database</h3>
            <p className="text-purple-600">
              Access comprehensive clinical trial data with advanced search and filtering capabilities.
            </p>
          </div>

          <div className="bg-blue-50 rounded-lg shadow-sm p-8 text-center border border-blue-100">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-blue-800">Compare Trials</h3>
            <p className="text-blue-600">
              Side-by-side comparison of trial outcomes, endpoints, and efficacy data.
            </p>
          </div>

          <div className="bg-green-50 rounded-lg shadow-sm p-8 text-center border border-green-100">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-green-800">Trend Analysis</h3>
            <p className="text-green-600">
              Identify patterns and trends in oncology treatment outcomes over time.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gray-50 rounded-lg shadow-sm p-8 border border-gray-100">
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
