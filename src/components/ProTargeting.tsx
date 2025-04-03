import React, { useState } from 'react';
import { Target } from 'lucide-react';
import type { ProvocationGoal } from '../types/index';
import { PROVOCATION_GOALS } from '../types/index';

interface ProTargetingProps {
  selectedGoals: Set<ProvocationGoal>;
  onGoalsChange: (goals: Set<ProvocationGoal>) => void;
  onConfirm: () => void;
}

export function ProTargeting({ selectedGoals, onGoalsChange, onConfirm }: ProTargetingProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleGoalToggle = (goal: ProvocationGoal) => {
    const newGoals = new Set(selectedGoals);
    if (newGoals.has(goal)) {
      newGoals.delete(goal);
    } else {
      newGoals.add(goal);
    }
    onGoalsChange(newGoals);
  };

  const handleConfirmClick = () => {
    if (selectedGoals.size > 0) {
      setIsExpanded(false);
      onConfirm();
    }
  };

  return (
    <div className="border-b">
      <div 
        className={`p-4 ${!isExpanded && selectedGoals.size > 0 ? 'cursor-pointer hover:bg-gray-50' : ''}`}
        onClick={() => selectedGoals.size > 0 && !isExpanded && setIsExpanded(true)}
      >
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-indigo-600" />
          <h2 className="text-lg font-semibold">Step 4: Pro Targeting</h2>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 space-y-6">
          <p className="text-gray-600">
            Select one or more business goals to identify the most effective plays for your target professionals.
          </p>

          <div className="grid grid-cols-2 gap-4">
            {(Object.entries(PROVOCATION_GOALS) as [ProvocationGoal, { label: string; description: string }][]).map(([goal, { label, description }]) => (
              <button
                key={goal}
                onClick={() => handleGoalToggle(goal)}
                className={`p-4 rounded-lg border-2 transition-colors text-left ${
                  selectedGoals.has(goal)
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <h3 className="font-medium text-lg">{label}</h3>
                <p className="text-gray-600 text-sm mt-1">{description}</p>
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center pt-4 border-t mt-8">
            <div className="text-sm text-gray-600">
              {selectedGoals.size} goals selected
            </div>
            <button
              onClick={handleConfirmClick}
              disabled={selectedGoals.size === 0}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedGoals.size > 0
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              View Recommended Plays
            </button>
          </div>
        </div>
      )}
    </div>
  );
}