import React from 'react';
import { Users, Target, FileText, BarChart2, PlayCircle } from 'lucide-react';

interface PlayDetailsTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function PlayDetailsTabs({ activeTab, onTabChange }: PlayDetailsTabsProps) {
  const tabs = [
    { id: 'main', label: 'Main', icon: Target },
    { id: 'audience', label: 'Audience', icon: Users },
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'executions', label: 'Executions', icon: PlayCircle },
    { id: 'reporting', label: 'Reporting', icon: BarChart2 }
  ];

  return (
    <div className="border-b bg-white">
      <div className="flex">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors relative ${
              activeTab === tab.id
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <tab.icon className="h-5 w-5" />
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}