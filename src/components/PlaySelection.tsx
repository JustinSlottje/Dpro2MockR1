import React, { useState } from 'react';
import { Lightbulb, AlertTriangle, TrendingUp, Clock, Users, CheckCircle2 } from 'lucide-react';
import type { Play } from '../types';
import { PlayCustomizationModal } from './PlayCustomizationModal';

interface PlaySelectionProps {
  plays: Play[];
  onPlaySelect: (plays: Play[], riskSettings: Map<string, number>) => void;
}

export function PlaySelection({ plays, onPlaySelect }: PlaySelectionProps) {
  const [selectedPlay, setSelectedPlay] = useState<Play | null>(null);
  const [confirmedPlays, setConfirmedPlays] = useState<Set<string>>(new Set());
  const [selectedPlaysData, setSelectedPlaysData] = useState<Map<string, Play>>(new Map());
  const [isExpanded, setIsExpanded] = useState(true);

  const handlePlayConfirm = (updatedPlay: Play) => {
    setConfirmedPlays(prev => new Set([...prev, updatedPlay.id]));
    setSelectedPlaysData(prev => new Map(prev).set(updatedPlay.id, updatedPlay));
    setSelectedPlay(null);

    // Update parent with all confirmed plays including the newly updated one
    const allConfirmedPlays = Array.from(confirmedPlays).map(id => 
      selectedPlaysData.get(id) || plays.find(p => p.id === id)
    ).filter((p): p is Play => p !== undefined);
    allConfirmedPlays.push(updatedPlay);
    onPlaySelect(allConfirmedPlays, new Map());
  };

  const handleConfirmSelection = () => {
    const selectedPlays = Array.from(confirmedPlays).map(id => 
      selectedPlaysData.get(id) || plays.find(p => p.id === id)
    ).filter((p): p is Play => p !== undefined);
    
    onPlaySelect(selectedPlays, new Map());
    setIsExpanded(false);
  };

  if (!isExpanded) {
    return (
      <div className="p-4 cursor-pointer hover:bg-gray-50" onClick={() => setIsExpanded(true)}>
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-indigo-600" />
          <h2 className="text-lg font-semibold">Step 5: Select Plays</h2>
          <span className="text-sm text-gray-600 ml-2">
            ({confirmedPlays.size} plays selected)
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-indigo-600" />
        <h2 className="text-lg font-semibold">Step 5: Select Plays</h2>
      </div>

      <div className="space-y-4">
        <p className="text-gray-600">
          Choose one or more recommended plays and customize them to match your needs.
        </p>

        <div className="space-y-4">
          {plays.map((play) => {
            const isConfirmed = confirmedPlays.has(play.id);
            const confirmedPlay = selectedPlaysData.get(play.id) || play;

            return (
              <div
                key={play.id}
                className="border rounded-lg p-4 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium">{play.name}</h3>
                    <p className="text-gray-600 mt-1">{play.description}</p>
                  </div>
                  {isConfirmed && (
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  )}
                </div>

                <div className="grid grid-cols-4 gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-500" />
                    <span className="text-sm text-gray-600">
                      {confirmedPlay.audienceSize.toLocaleString()} Pros
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    <span className="text-sm text-gray-600">
                      {confirmedPlay.estimatedRoi}% ROI
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {confirmedPlay.timeline} weeks
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    <span className="text-sm text-gray-600">
                      ${confirmedPlay.budget.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => setSelectedPlay(isConfirmed ? confirmedPlay : play)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    {isConfirmed ? 'Edit Play' : 'Select Play'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between items-center pt-4 border-t mt-8">
          <div className="text-sm text-gray-600">
            {confirmedPlays.size} plays selected
          </div>
          <button
            onClick={handleConfirmSelection}
            disabled={confirmedPlays.size === 0}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              confirmedPlays.size > 0
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Confirm Selection
          </button>
        </div>
      </div>

      {selectedPlay && (
        <PlayCustomizationModal
          play={selectedPlay}
          isOpen={true}
          onClose={() => setSelectedPlay(null)}
          onSave={handlePlayConfirm}
        />
      )}
    </div>
  );
}