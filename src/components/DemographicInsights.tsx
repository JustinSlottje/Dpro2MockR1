import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DemographicData } from '../types';

interface DemographicInsightsProps {
  data: DemographicData;
}

export function DemographicInsights({ data }: DemographicInsightsProps) {
  const ageData = Object.entries(data.ageGroups).map(([range, value]) => ({
    range,
    value
  }));

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold mb-6">Demographic Insights</h2>
      
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-4">Age Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-500">Professional Density</h4>
            <p className="text-2xl font-semibold mt-1">{data.professionalDensity.toFixed(2)}%</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-500">Market Penetration</h4>
            <p className="text-2xl font-semibold mt-1">{data.marketPenetration.toFixed(2)}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}