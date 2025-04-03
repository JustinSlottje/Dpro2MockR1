import React from 'react';
import { Target, CheckCircle2 } from 'lucide-react';
import type { Play } from '../../../types/index';
import { PROVOCATION_GOALS } from '../../../types/index';

interface SelectPlaysProps {
  plays: Play[];
  selectedPlays: Play[];
  onPlaysSelect: (plays: Play[]) => void;
}

export function SelectPlays({ plays, selectedPlays, onPlaysSelect }: SelectPlaysProps) {
  const handlePlayToggle = (play: Play) => {
    const isSelected = selectedPlays.some(p => p.id === play.id);
    if (isSelected) {
      onPlaysSelect(selectedPlays.filter(p => p.id !== play.id));
    } else {
      onPlaysSelect([...selectedPlays, play]);
    }
  };

  return (
    <div className="space-y-4">
      {plays.map(play => {
        const isSelected = selectedPlays.some(p => p.id === play.id);
        const goal = PROVOCATION_GOALS[play.provocationGoals[0]];

        return (
          <div
            key={play.id}
            className={`p-4 rounded-lg border-2 transition-colors cursor-pointer ${
              isSelected ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => handlePlayToggle(play)}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium">{play.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{play.description}</p>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Target className="h-4 w-4" />
                    <span>{play.audienceSize.toLocaleString()} audience</span>
                  </div>
                  <div
                    className="px-2 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: `${goal.color.secondary}20`,
                      color: goal.color.primary
                    }}
                  >
                    {goal.label}
                  </div>
                </div>
              </div>
              <div className={`p-2 rounded-full transition-colors ${
                isSelected ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-400'
              }`}>
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}