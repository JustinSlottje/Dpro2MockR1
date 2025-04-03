import React from 'react';
import { ArrowRight, AlertTriangle, TrendingUp, Clock } from 'lucide-react';
import { Play } from '../types';

interface PlayRecommendationsProps {
  plays: Play[];
  onSelectPlay: (play: Play) => void;
}

export function PlayRecommendations({ plays, onSelectPlay }: PlayRecommendationsProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-semibold mb-6">Recommended Plays</h2>
      
      <div className="space-y-4">
        {plays.map((play) => (
          <div
            key={play.id}
            className="border rounded-lg p-4 hover:border-indigo-500 transition-colors cursor-pointer"
            onClick={() => onSelectPlay(play)}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-medium">{play.name}</h3>
                <p className="text-gray-600 mt-1">{play.description}</p>
              </div>
              <ArrowRight className="text-gray-400" />
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className={`h-5 w-5 ${
                  play.riskLevel === 'low' ? 'text-green-500' :
                  play.riskLevel === 'medium' ? 'text-yellow-500' :
                  'text-red-500'
                }`} />
                <span className="text-sm text-gray-600">
                  {play.riskLevel.charAt(0).toUpperCase() + play.riskLevel.slice(1)} Risk
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-indigo-500" />
                <span className="text-sm text-gray-600">
                  {play.estimatedRoi}% ROI
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {play.timeline} weeks
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}