import React, { useState, useMemo, useEffect } from 'react';
import { ChevronUp, DollarSign, Users, Target, TrendingUp, Rocket } from 'lucide-react';
import type { CustomerLifetimeValue, Play } from '../types';

interface ROIScenario {
  name: 'Breakeven' | 'Conservative' | 'Goal' | 'Aggressive';
  monthlySQL: number;
  totalSQL: number;
  customerConversion: number;
  annualSalesImpact: number;
  gmImpact: number;
  roi: number;
  color?: string;
}

interface ROIAnalysisProps {
  clvData: CustomerLifetimeValue | null;
  selectedLocationsCount: number;
  selectedPlays?: Play[];
}

export function ROIAnalysis({ clvData, selectedLocationsCount, selectedPlays = [] }: ROIAnalysisProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Auto-expand when plays are selected
  useEffect(() => {
    if (selectedPlays.length > 0) {
      setIsExpanded(true);
    }
  }, [selectedPlays]);

  const metrics = useMemo(() => {
    if (!clvData || !selectedPlays.length) return null;

    const totalAudience = selectedPlays.reduce((sum, play) => sum + play.audienceSize, 0);
    const avgConversionRate = clvData.sqlToCustomerRate / 100;
    const monthlyTargetPopulation = Math.round(totalAudience / 3); // Spread over 3 months
    const duration = 3;
    const aggregatePopulation = totalAudience;

    // Calculate weighted average ROI and budget
    const totalBudget = selectedPlays.reduce((sum, play) => sum + play.budget, 0);
    const weightedROI = selectedPlays.reduce((sum, play) => {
      const weight = play.budget / totalBudget;
      return sum + (play.estimatedRoi * weight);
    }, 0);

    // Calculate scenarios based on actual play data
    const baseConversion = Math.round(totalAudience * avgConversionRate);
    const baseSalesImpact = baseConversion * clvData.calculatedValues.annualSales;
    const baseGMImpact = baseSalesImpact * (clvData.grossMargin / 100);

    const scenarios: ROIScenario[] = [
      {
        name: 'Breakeven',
        monthlySQL: Math.round(baseConversion * 0.8 / duration),
        totalSQL: Math.round(baseConversion * 0.8),
        customerConversion: Math.round(baseConversion * 0.8),
        annualSalesImpact: Math.round(baseSalesImpact * 0.8),
        gmImpact: Math.round(baseGMImpact * 0.8),
        roi: 0,
        color: '#94A3B8'
      },
      {
        name: 'Conservative',
        monthlySQL: Math.round(baseConversion * 0.9 / duration),
        totalSQL: Math.round(baseConversion * 0.9),
        customerConversion: Math.round(baseConversion * 0.9),
        annualSalesImpact: Math.round(baseSalesImpact * 0.9),
        gmImpact: Math.round(baseGMImpact * 0.9),
        roi: Math.round(weightedROI * 0.75),
        color: '#10B981'
      },
      {
        name: 'Goal',
        monthlySQL: Math.round(baseConversion / duration),
        totalSQL: baseConversion,
        customerConversion: baseConversion,
        annualSalesImpact: Math.round(baseSalesImpact),
        gmImpact: Math.round(baseGMImpact),
        roi: Math.round(weightedROI),
        color: '#6366F1'
      },
      {
        name: 'Aggressive',
        monthlySQL: Math.round(baseConversion * 1.2 / duration),
        totalSQL: Math.round(baseConversion * 1.2),
        customerConversion: Math.round(baseConversion * 1.2),
        annualSalesImpact: Math.round(baseSalesImpact * 1.2),
        gmImpact: Math.round(baseGMImpact * 1.2),
        roi: Math.round(weightedROI * 1.25),
        color: '#EC4899'
      }
    ];

    return {
      monthlyTargetPopulation,
      duration,
      aggregatePopulation,
      totalBudget,
      weightedROI,
      scenarios
    };
  }, [clvData, selectedPlays]);

  if (!metrics) return null;

  const { monthlyTargetPopulation, duration, aggregatePopulation, totalBudget, scenarios } = metrics;

  const fixedCosts = {
    creative: Math.round(totalBudget * 0.2), // 20% for creative
    email: Math.round(totalBudget * 0.1),    // 10% for email
    dm: Math.round(totalBudget * 0.3),       // 30% for direct marketing
    total: Math.round(totalBudget * 0.6)     // 60% total fixed costs
  };

  const handleLaunchProgram = () => {
    // Here you would implement the program launch logic
    console.log('Launching program with:', {
      plays: selectedPlays,
      metrics,
      scenarios
    });
  };

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur shadow-lg transition-all duration-300 z-20 ${
        selectedPlays.length > 0 ? 'animate-fade-in' : ''
      }`}
      style={{ maxHeight: '90vh', overflowY: 'auto' }}
    >
      <div 
        className="flex items-center justify-between px-6 h-12 cursor-pointer hover:bg-gray-50/50 border-b"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-indigo-600" />
          <h2 className="font-semibold">ROI Analysis</h2>
          {!isExpanded && selectedPlays.length > 0 && (
            <div className="flex items-center gap-4 ml-4 text-sm text-gray-600">
              <span>Target Population: {monthlyTargetPopulation.toLocaleString()}</span>
              <span>•</span>
              <span>Expected ROI: {Math.round(scenarios[1].roi)}-{Math.round(scenarios[3].roi)}%</span>
            </div>
          )}
        </div>
        <ChevronUp className={`h-5 w-5 transition-transform ${isExpanded ? '' : 'rotate-180'}`} />
      </div>

      {isExpanded && (
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-4 gap-6">
            {scenarios.map(scenario => (
              <div 
                key={scenario.name}
                className={`rounded-xl p-4 ${
                  scenario.name === 'Goal' 
                    ? 'bg-indigo-50 border-2 border-indigo-200'
                    : 'bg-gray-50'
                }`}
                style={{
                  borderColor: scenario.color
                }}
              >
                <div className="font-medium text-lg mb-4" style={{ color: scenario.color }}>
                  {scenario.name}
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Monthly SQLs</div>
                    <div className="text-2xl font-semibold">{scenario.monthlySQL}</div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600 mb-1">Customer Conversion</div>
                    <div className="text-2xl font-semibold">{scenario.customerConversion}</div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600 mb-1">Annual Sales Impact</div>
                    <div className="text-2xl font-semibold">
                      ${scenario.annualSalesImpact.toLocaleString()}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600 mb-1">ROI</div>
                    <div className="text-2xl font-semibold" style={{ color: scenario.color }}>
                      {scenario.roi}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-medium text-lg mb-4">Target Population</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Monthly</div>
                  <div className="text-xl font-semibold">
                    {monthlyTargetPopulation.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Duration</div>
                  <div className="text-xl font-semibold">{duration} months</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Aggregate</div>
                  <div className="text-xl font-semibold">
                    {aggregatePopulation.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-medium text-lg mb-4">Fixed Costs (Per Quarter)</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Creative & Content</div>
                  <div className="text-xl font-semibold">
                    ${fixedCosts.creative.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Email & DM</div>
                  <div className="text-xl font-semibold">
                    ${(fixedCosts.email + fixedCosts.dm).toLocaleString()}
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="text-sm text-gray-600">Total Fixed Cost</div>
                  <div className="text-xl font-semibold text-indigo-600">
                    ${fixedCosts.total.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {selectedPlays.length > 0 && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-medium text-lg mb-4">Selected Plays</h3>
                <div className="space-y-3">
                  {selectedPlays.map(play => (
                    <div key={play.id} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{play.name}</div>
                        <div className="text-sm text-gray-600">
                          {play.audienceSize.toLocaleString()} audience • {play.estimatedRoi}% ROI
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">${play.budget.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">budget</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end sticky bottom-6 right-6">
                <button
                  onClick={handleLaunchProgram}
                  className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-lg"
                >
                  <Rocket className="h-5 w-5" />
                  Launch Program
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}