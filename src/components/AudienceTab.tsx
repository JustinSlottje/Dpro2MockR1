import React, { useState } from 'react';
import { Users, AlertCircle, Filter, Brain, TrendingUp, Target, Database, Pencil, X } from 'lucide-react';
import type { Play } from '../types';

interface AudienceTabProps {
  play: Play;
  onAudienceUpdate: (newSize: number) => void;
}

interface DataInsight {
  field: string;
  coverage: number;
  quality: number;
  description: string;
}

interface AudienceSegment {
  name: string;
  size: number;
  criteria: string[];
  conversion: number;
}

export function AudienceTab({ play, onAudienceUpdate }: AudienceTabProps) {
  const [selectedCriteria, setSelectedCriteria] = useState<Set<string>>(new Set());
  const [editingSegment, setEditingSegment] = useState<string | null>(null);
  const [segmentGoal, setSegmentGoal] = useState('');

  const dataInsights: DataInsight[] = [
    {
      field: 'Company Information',
      coverage: 95,
      quality: 88,
      description: 'Basic company details including size, revenue, and industry'
    },
    {
      field: 'Contact Data',
      coverage: 82,
      quality: 76,
      description: 'Professional contact information and roles'
    },
    {
      field: 'Purchase History',
      coverage: 68,
      quality: 92,
      description: 'Historical transaction data and product preferences'
    },
    {
      field: 'Digital Engagement',
      coverage: 45,
      quality: 85,
      description: 'Website visits, email interactions, and online behavior'
    }
  ];

  const segments: AudienceSegment[] = [
    {
      name: 'High-Value Decision Makers',
      size: 2500,
      criteria: [
        'Annual revenue > $1M',
        'Purchase frequency > 2x/month',
        'Decision maker role',
        'Active in last 30 days'
      ],
      conversion: 8.5
    },
    {
      name: 'Growing Mid-Market',
      size: 1500,
      criteria: [
        'Revenue growth > 20% YoY',
        'Employee count 50-200',
        'Multiple product categories',
        'High engagement score'
      ],
      conversion: 6.2
    },
    {
      name: 'Enterprise Prospects',
      size: 1000,
      criteria: [
        'Enterprise company size',
        'Multiple locations',
        'Product fit score > 80',
        'Budget authority confirmed'
      ],
      conversion: 4.8
    }
  ];

  const handleCriteriaToggle = (criterion: string) => {
    const newSelected = new Set(selectedCriteria);
    if (newSelected.has(criterion)) {
      newSelected.delete(criterion);
    } else {
      newSelected.add(criterion);
    }
    setSelectedCriteria(newSelected);
    
    // Update audience size based on selected criteria
    const newSize = Math.round(play.audienceSize * (0.7 + (Math.random() * 0.3)));
    onAudienceUpdate(newSize);
  };

  const handleEditSegment = (segmentName: string) => {
    setEditingSegment(segmentName);
    const segment = segments.find(s => s.name === segmentName);
    if (segment) {
      setSegmentGoal(`Optimize ${segment.name.toLowerCase()} segment to increase conversion rate from ${segment.conversion}% by focusing on high-engagement prospects with demonstrated purchase intent.`);
    }
  };

  const handleSaveSegment = () => {
    // Here you would implement the logic to save the segment changes
    setEditingSegment(null);
    setSegmentGoal('');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Data Quality Insights */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <Database className="h-5 w-5 text-indigo-600" />
          <h3 className="text-lg font-medium">Data Quality Insights</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {dataInsights.map((insight, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium">{insight.field}</div>
                <div className="text-sm text-gray-500">
                  {insight.coverage}% coverage
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: `${insight.quality}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{insight.description}</span>
                  <span className={`font-medium ${
                    insight.quality >= 80 ? 'text-green-600' :
                    insight.quality >= 60 ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {insight.quality}% quality
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Audience Segments */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <Users className="h-5 w-5 text-indigo-600" />
          <h3 className="text-lg font-medium">Audience Segments</h3>
        </div>
        <div className="space-y-4">
          {segments.map((segment, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium">{segment.name}</h4>
                  <div className="text-sm text-gray-500 mt-1">
                    {segment.size.toLocaleString()} professionals
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-green-600">
                    <TrendingUp className="h-4 w-4" />
                    <span className="font-medium">{segment.conversion}% conv.</span>
                  </div>
                  <button
                    onClick={() => handleEditSegment(segment.name)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Pencil className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {editingSegment === segment.name ? (
                <div className="mt-4 space-y-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Segment Goal
                    </label>
                    <textarea
                      value={segmentGoal}
                      onChange={(e) => setSegmentGoal(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      rows={3}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setEditingSegment(null)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveSegment}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {segment.criteria.map((criterion, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm"
                    >
                      {criterion}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Missing Data Alert */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-800">Missing Data Identified</h4>
            <p className="text-sm text-yellow-700 mt-1">
              The following data points would improve audience targeting accuracy:
            </p>
            <ul className="mt-2 space-y-1 text-sm text-yellow-700">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
                Budget authority confirmation for 35% of contacts
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
                Product interest signals for emerging categories
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
                Recent engagement data for offline channels
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}