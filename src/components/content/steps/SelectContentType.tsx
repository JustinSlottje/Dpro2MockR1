import React from 'react';
import { Mail, MessageSquare, Phone, Monitor, Share2, Printer } from 'lucide-react';
import type { ContentType } from '../../../types';

interface SelectContentTypeProps {
  contentType: ContentType | null;
  onTypeSelect: (type: ContentType) => void;
  requiredContent: {
    type: ContentType;
    playName: string;
    provocationGoal: string;
  }[];
}

export function SelectContentType({ contentType, onTypeSelect, requiredContent }: SelectContentTypeProps) {
  const contentTypes = [
    { type: 'email', label: 'Email', icon: Mail, description: 'Create email templates for campaigns' },
    { type: 'sms', label: 'SMS', icon: MessageSquare, description: 'Create SMS message templates' },
    { type: 'call', label: 'Call Script', icon: Phone, description: 'Create phone call scripts' },
    { type: 'digital', label: 'Digital', icon: Monitor, description: 'Create digital ad content' },
    { type: 'social', label: 'Social', icon: Share2, description: 'Create social media content' },
    { type: 'print', label: 'Print', icon: Printer, description: 'Create print materials' }
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {contentTypes.map(({ type, label, icon: Icon, description }) => {
        const isRequired = requiredContent.some(content => content.type === type);
        const isSelected = contentType === type;

        return (
          <button
            key={type}
            onClick={() => onTypeSelect(type)}
            className={`p-4 rounded-xl border-2 text-left transition-colors ${
              isSelected
                ? 'border-indigo-500 bg-indigo-50'
                : isRequired
                ? 'border-amber-200 bg-amber-50 hover:border-amber-300'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className={`p-2 rounded-lg w-fit ${
              isSelected
                ? 'bg-indigo-100 text-indigo-600'
                : isRequired
                ? 'bg-amber-100 text-amber-600'
                : 'bg-gray-100 text-gray-600'
            }`}>
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="font-medium mt-4">{label}</h3>
            <p className="text-sm text-gray-600 mt-1">{description}</p>
            {isRequired && (
              <div className="mt-3 text-xs font-medium text-amber-600">
                Required by {requiredContent.filter(c => c.type === type).length} plays
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}