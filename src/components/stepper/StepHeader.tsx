import React from 'react';
import { ChevronDown } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface StepHeaderProps {
  icon: LucideIcon;
  title: string;
  isExpanded: boolean;
  isCompleted: boolean;
  completedContent?: React.ReactNode;
  onClick?: () => void;
}

export function StepHeader({
  icon: Icon,
  title,
  isExpanded,
  isCompleted,
  onClick
}: StepHeaderProps) {
  const isClickable = onClick && (isCompleted || !isExpanded);

  return (
    <div 
      className={`p-4 ${isClickable ? 'cursor-pointer hover:bg-gray-50' : ''} border-b`}
      onClick={isClickable ? onClick : undefined}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-indigo-600" />
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        {(isCompleted || !isExpanded) && (
          <ChevronDown className={`h-5 w-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        )}
      </div>
    </div>
  );
}