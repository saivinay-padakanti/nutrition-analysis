import React, { useState } from 'react';
import { UserReportForm } from './components/UserReportForm';
import { MealTracker } from './components/MealTracker';
import { HealthAnalysisDisplay } from './components/HealthAnalysis';
import { Heart } from 'lucide-react';
import type { UserReport, MealEntry, HealthAnalysis } from './types';

// Temporary mock analysis - In production, this would come from your ML backend
const mockAnalysis: HealthAnalysis = {
  nutritionalStatus: {
    category: "Generally Balanced Diet",
    description: "Your diet shows a good balance of major nutrients, but there's room for improvement in specific areas."
  },
  deficiencies: [
    {
      nutrient: "Vitamin D",
      severity: "moderate",
      recommendations: [
        "Spend 15-20 minutes in sunlight daily",
        "Include fatty fish in your diet",
        "Consider vitamin D fortified foods"
      ]
    },
    {
      nutrient: "Iron",
      severity: "low",
      recommendations: [
        "Increase intake of lean red meat",
        "Consume more leafy greens",
        "Pair iron-rich foods with vitamin C sources"
      ]
    }
  ],
  potentialRisks: [
    {
      condition: "Type 2 Diabetes",
      riskLevel: "low",
      preventiveMeasures: [
        "Maintain current balanced diet",
        "Regular exercise",
        "Monitor sugar intake"
      ]
    },
    {
      condition: "Hypertension",
      riskLevel: "moderate",
      preventiveMeasures: [
        "Reduce sodium intake",
        "Increase potassium-rich foods",
        "Regular blood pressure monitoring"
      ]
    }
  ]
};

function App() {
  const [step, setStep] = useState<'report' | 'meals' | 'analysis'>('report');
  const [userReport, setUserReport] = useState<UserReport | null>(null);
  const [analysis, setAnalysis] = useState<HealthAnalysis | null>(null);

  const handleUserReport = (data: UserReport) => {
    setUserReport(data);
    setStep('meals');
  };

  const handleMealSubmit = (meals: MealEntry[]) => {
    // In a real application, you would send the userReport and meals to your backend
    // for analysis. Here we're using mock data.
    setAnalysis(mockAnalysis);
    setStep('analysis');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-emerald-600" />
            <h1 className="text-2xl font-bold text-gray-900">NutriCare</h1>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          {step === 'report' && (
            <UserReportForm onSubmit={handleUserReport} />
          )}
          
          {step === 'meals' && (
            <MealTracker onSubmit={handleMealSubmit} />
          )}
          
          {step === 'analysis' && analysis && (
            <HealthAnalysisDisplay analysis={analysis} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;