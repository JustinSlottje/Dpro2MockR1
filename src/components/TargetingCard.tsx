import React from 'react';
import { Target } from 'lucide-react';
import type { ProvocationGoal } from '../types/index';
import { PROVOCATION_GOALS } from '../types/index';

interface TargetingCardProps {
  selectedGoals: Set<ProvocationGoal>;
}

export function TargetingCard({ selectedGoals }: TargetingCardProps) {
  return (
    <div className="bg-white/95 backdrop-blur shadow-lg rounded-2xl p-4 pointer-events-auto animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
          <Target className="h-6 w-6 text-violet-600" />
        </div>
        <div>
          <div className="text-sm text-gray-600">Selected Goals</div>
          <div className="font-medium text-lg">
            {selectedGoals.size} goals
          </div>
          <div className="flex flex-wrap gap-1 mt-1">
            {Array.from(selectedGoals).map(goal => (
              <span
                key={goal}
                className="text-xs px-2 py-0.5 bg-violet-50 text-violet-700 rounded-full"
              >
                {PROVOCATION_GOALS[goal].label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}