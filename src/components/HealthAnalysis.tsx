import React from 'react';
import { Activity, AlertTriangle, Leaf } from 'lucide-react';
import type { HealthAnalysis } from '../types';
import { clsx } from 'clsx';

export function HealthAnalysisDisplay({ analysis }: { analysis: HealthAnalysis }) {
  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center gap-2 text-2xl font-semibold text-emerald-700 mb-4">
          <Leaf className="h-8 w-8" />
          <h2>Nutritional Status</h2>
        </div>
        <div className="p-4 bg-emerald-50 rounded-md">
          <h3 className="text-lg font-medium text-emerald-800">{analysis.nutritionalStatus.category}</h3>
          <p className="mt-2 text-emerald-600">{analysis.nutritionalStatus.description}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center gap-2 text-2xl font-semibold text-amber-700 mb-4">
          <AlertTriangle className="h-8 w-8" />
          <h2>Nutrient Deficiencies</h2>
        </div>
        <div className="space-y-4">
          {analysis.deficiencies.map((deficiency, index) => (
            <div key={index} className="border-l-4 border-amber-500 pl-4">
              <h3 className="text-lg font-medium text-gray-900">{deficiency.nutrient}</h3>
              <div className="mt-1">
                <span className={clsx(
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  {
                    'bg-yellow-100 text-yellow-800': deficiency.severity === 'low',
                    'bg-orange-100 text-orange-800': deficiency.severity === 'moderate',
                    'bg-red-100 text-red-800': deficiency.severity === 'severe',
                  }
                )}>
                  {deficiency.severity} severity
                </span>
              </div>
              <ul className="mt-2 list-disc list-inside text-sm text-gray-600">
                {deficiency.recommendations.map((rec, recIndex) => (
                  <li key={recIndex}>{rec}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center gap-2 text-2xl font-semibold text-blue-700 mb-4">
          <Activity className="h-8 w-8" />
          <h2>Health Risks</h2>
        </div>
        <div className="space-y-4">
          {analysis.potentialRisks.map((risk, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-lg font-medium text-gray-900">{risk.condition}</h3>
              <div className="mt-1">
                <span className={clsx(
                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                  {
                    'bg-blue-100 text-blue-800': risk.riskLevel === 'low',
                    'bg-purple-100 text-purple-800': risk.riskLevel === 'moderate',
                    'bg-red-100 text-red-800': risk.riskLevel === 'high',
                  }
                )}>
                  {risk.riskLevel} risk
                </span>
              </div>
              <ul className="mt-2 list-disc list-inside text-sm text-gray-600">
                {risk.preventiveMeasures.map((measure, measureIndex) => (
                  <li key={measureIndex}>{measure}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}