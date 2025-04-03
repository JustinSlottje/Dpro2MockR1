import React, { useState, useEffect } from 'react';
import { X, Mail, Phone, MessageSquare, Clock, AlertTriangle, Users, TrendingUp, Sliders, Plus, Trash2, ArrowUp, ArrowDown, Target, Filter, DollarSign, MapPin } from 'lucide-react';
import type { Play, PlayActivity, ContentTemplate, Channel } from '../types';

interface PlayCustomizationModalProps {
  play: Play;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedPlay: Play) => void;
}

const CHANNELS: Channel[] = [
  {
    id: 'email',
    name: 'Email',
    type: 'email',
    costPerContact: 0.05,
    avgConversionRate: 25.0,
    description: 'Personalized email communications',
    benefits: [
      'High deliverability',
      'Rich content support',
      'Automated sequences',
      'Detailed analytics'
    ],
    constraints: [
      'Requires valid email addresses',
      'Subject to spam filters'
    ]
  },
  {
    id: 'sms',
    name: 'SMS',
    type: 'sms',
    costPerContact: 0.10,
    avgConversionRate: 35.0,
    description: 'Direct mobile messaging',
    benefits: [
      'High open rates',
      'Immediate delivery',
      'Direct response capability',
      'Personal touch'
    ],
    constraints: [
      'Character limit',
      'Requires opt-in',
      'Higher cost per message'
    ]
  },
  {
    id: 'voice',
    name: 'Voice',
    type: 'call',
    costPerContact: 5.00,
    avgConversionRate: 45.0,
    description: 'Personal phone conversations',
    benefits: [
      'Highest conversion rate',
      'Real-time feedback',
      'Relationship building',
      'Complex discussion support'
    ],
    constraints: [
      'Resource intensive',
      'Scheduling required',
      'Higher cost per contact'
    ]
  }
];

export function PlayCustomizationModal({ play, isOpen, onClose, onSave }: PlayCustomizationModalProps) {
  const [editedPlay, setEditedPlay] = useState<Play>({ ...play });
  const [riskLevel, setRiskLevel] = useState(play.recommendedRisk);
  const [selectedChannels, setSelectedChannels] = useState<Set<string>>(new Set(['email', 'sms', 'voice']));

  const calculateMetrics = (riskLevel: number, channels: Set<string>) => {
    const { minRoi, maxRoi, minAudience, maxAudience } = play.riskImpact;
    const riskFactor = riskLevel / 100;
    
    // Calculate base metrics with risk adjustment
    const baseAudience = minAudience + (maxAudience - minAudience) * riskFactor;
    
    // Adjust audience segments based on risk level
    const highValueRatio = Math.max(0.3 - (riskFactor * 0.2), 0.1);
    const mediumValueRatio = 0.3 + (riskFactor * 0.2);
    const lowValueRatio = 0.4 + (riskFactor * 0.2);
    
    // Calculate audience segments
    const segments = {
      highValue: Math.round(baseAudience * highValueRatio),
      mediumValue: Math.round(baseAudience * mediumValueRatio),
      lowValue: Math.round(baseAudience * lowValueRatio)
    };

    // Calculate channel impact
    let totalCost = 0;
    let weightedConversion = 0;
    let totalReach = 0;

    channels.forEach(channelId => {
      const channel = CHANNELS.find(c => c.id === channelId);
      if (channel) {
        totalCost += channel.costPerContact * baseAudience;
        weightedConversion += channel.avgConversionRate;
        totalReach += baseAudience * (channel.avgConversionRate / 100);
      }
    });

    // Adjust metrics based on channel combination
    const channelCount = channels.size;
    const channelMultiplier = 1 + (channelCount - 1) * 0.1; // 10% boost per additional channel
    
    return {
      audience: Math.round(baseAudience),
      budget: Math.round(totalCost * channelMultiplier),
      roi: Math.round(minRoi + (maxRoi - minRoi) * riskFactor),
      segments,
      revenue: Math.round(totalReach * 100), // Simplified revenue calculation
      channelMetrics: {
        costImpact: totalCost,
        conversionImpact: weightedConversion / channelCount,
        reachImpact: totalReach
      }
    };
  };

  const metrics = calculateMetrics(riskLevel, selectedChannels);

  const handleChannelToggle = (channelId: string) => {
    const newChannels = new Set(selectedChannels);
    if (newChannels.has(channelId)) {
      newChannels.delete(channelId);
    } else {
      newChannels.add(channelId);
    }
    setSelectedChannels(newChannels);
  };

  const handleSave = () => {
    const updatedPlay = {
      ...editedPlay,
      recommendedRisk: riskLevel,
      budget: metrics.budget,
      audienceSize: metrics.audience,
      estimatedRoi: metrics.roi
    };
    onSave(updatedPlay);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-[calc(100%-4rem)] max-w-7xl max-h-[calc(100vh-4rem)] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-indigo-500 to-indigo-600">
          <h2 className="text-2xl font-semibold text-white">{play.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6 p-6 max-h-[calc(100vh-10rem)] overflow-y-auto">
          <div className="col-span-2 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Communication Channels</h3>
                <div className="text-sm text-gray-500">Select channels to use in this play</div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {CHANNELS.map(channel => {
                  const isSelected = selectedChannels.has(channel.id);
                  const Icon = channel.type === 'email' ? Mail :
                             channel.type === 'sms' ? MessageSquare : Phone;

                  return (
                    <div
                      key={channel.id}
                      className={`border rounded-xl p-4 cursor-pointer transition-colors ${
                        isSelected ? 'border-indigo-500 bg-indigo-50' : 'hover:border-gray-300'
                      }`}
                      onClick={() => handleChannelToggle(channel.id)}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            channel.type === 'email' ? 'bg-blue-100 text-blue-600' :
                            channel.type === 'sms' ? 'bg-green-100 text-green-600' :
                            'bg-purple-100 text-purple-600'
                          }`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="font-medium">{channel.name}</div>
                            <div className="text-sm text-gray-500">{channel.description}</div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <div className="text-sm text-gray-600">Cost per Contact</div>
                          <div className="font-medium">${channel.costPerContact.toFixed(2)}</div>
                        </div>

                        <div>
                          <div className="text-sm text-gray-600">Avg. Conversion</div>
                          <div className="font-medium">{channel.avgConversionRate}%</div>
                        </div>

                        <div>
                          <div className="font-medium mb-2">Benefits</div>
                          <ul className="space-y-1">
                            {channel.benefits.map((benefit, index) => (
                              <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <div className="font-medium mb-2">Constraints</div>
                          <ul className="space-y-1">
                            {channel.constraints.map((constraint, index) => (
                              <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                                {constraint}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Channel Impact Analysis</h3>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Cost Impact</div>
                  <div className="text-2xl font-semibold">${metrics.channelMetrics.costImpact.toLocaleString()}</div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Conversion Impact</div>
                  <div className="text-2xl font-semibold">{metrics.channelMetrics.conversionImpact.toFixed(1)}%</div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Reach Impact</div>
                  <div className="text-2xl font-semibold">{metrics.channelMetrics.reachImpact.toLocaleString()}</div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Play Sequence</h3>
                <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                  Add Activity
                </button>
              </div>

              <div className="space-y-4">
                {editedPlay.sequence.map((activity, index) => {
                  const Icon = activity.type === 'email' ? Mail :
                             activity.type === 'sms' ? MessageSquare : Phone;
                  return (
                    <div key={activity.id} className="border rounded-lg p-4">
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-lg ${
                          activity.type === 'email' ? 'bg-blue-100 text-blue-600' :
                          activity.type === 'sms' ? 'bg-green-100 text-green-600' :
                          'bg-purple-100 text-purple-600'
                        }`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium">{activity.name}</h4>
                              <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <button className="p-1 hover:bg-gray-100 rounded">
                                <ArrowUp className="h-4 w-4" />
                              </button>
                              <button className="p-1 hover:bg-gray-100 rounded">
                                <ArrowDown className="h-4 w-4" />
                              </button>
                              <button className="p-1 hover:bg-red-100 hover:text-red-600 rounded">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>Day {activity.delayDays}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-medium mb-4">Play Metrics</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Total Audience</div>
                  <div className="text-2xl font-semibold">{metrics.audience.toLocaleString()}</div>
                </div>

                <div>
                  <div className="text-sm text-gray-600 mb-1">Expected Revenue</div>
                  <div className="text-2xl font-semibold text-green-600">
                    ${metrics.revenue.toLocaleString()}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-600 mb-1">Required Budget</div>
                  <div className="text-2xl font-semibold">
                    ${metrics.budget.toLocaleString()}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-600 mb-1">Estimated ROI</div>
                  <div className="text-2xl font-semibold text-indigo-600">
                    {metrics.roi}%
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Selected Locations</h3>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">19 locations</span>
                </div>
              </div>
              <div className="text-sm text-gray-600">4 regions</div>
            </div>

            <div className="bg-white rounded-lg border p-6">
              <h3 className="text-lg font-medium mb-4">Risk Analysis</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-gray-600">Risk Tolerance</div>
                    <div className="text-sm font-medium">{riskLevel}%</div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={riskLevel}
                    onChange={(e) => setRiskLevel(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>Conservative</span>
                    <span>Aggressive</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Min ROI</div>
                    <div className="font-medium">120%</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Max ROI</div>
                    <div className="font-medium">200%</div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleSave}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}