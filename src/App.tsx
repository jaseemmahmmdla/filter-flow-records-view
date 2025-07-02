
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Index from '@/pages/Index';
import TrialPage from '@/pages/TrialPage';
import ComparisonPage from '@/pages/ComparisonPage';
import AIAssistant from '@/pages/AIAssistant';
import NotFound from '@/pages/NotFound';
import { Toaster } from '@/components/ui/sonner';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/trial/:trialId" element={<TrialPage />} />
            <Route path="/comparison" element={<ComparisonPage />} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
