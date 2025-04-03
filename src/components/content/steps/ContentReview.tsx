import React from 'react';
import { FileText, Target, Variable, CheckCircle2 } from 'lucide-react';
import type { ContentTemplate, Play } from '../../../types';

interface ContentReviewProps {
  contentData: Partial<ContentTemplate>;
  selectedPlays: Play[];
}

export function ContentReview({ contentData, selectedPlays }: ContentReviewProps) {
  return (
    <div className="space-y-8">
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Content Details</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-500">Name</label>
              <div className="mt-1">{contentData.name}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">Type</label>
              <div className="mt-1 capitalize">{contentData.type}</div>
            </div>
            {contentData.type === 'email' && (
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-500">Subject</label>
                <div className="mt-1">{contentData.subject}</div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500">Content</label>
            <div className="mt-1 p-4 bg-white rounded-lg border whitespace-pre-wrap">
              {contentData.content}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Variables</h3>
        <div className="grid grid-cols-2 gap-4">
          {contentData.variables?.map(variable => (
            <div
              key={variable.name}
              className="p-3 bg-white rounded-lg border"
            >
              <div className="flex items-center gap-2">
                <Variable className="h-4 w-4 text-gray-400" />
                <span className="font-medium">{variable.name}</span>
                {variable.required && (
                  <span className="text-red-500 text-sm">*</span>
                )}
              </div>
              <div className="mt-1 text-sm text-gray-600">{variable.description}</div>
              <div className="mt-2 text-xs text-gray-500">Type: {variable.type}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Associated Plays</h3>
        <div className="space-y-3">
          {selectedPlays.map(play => (
            <div
              key={play.id}
              className="flex items-center gap-3 p-3 bg-white rounded-lg border"
            >
              <Target className="h-5 w-5 text-indigo-600" />
              <div>
                <div className="font-medium">{play.name}</div>
                <div className="text-sm text-gray-600">{play.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-green-50 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-green-800">Ready to Create</h3>
            <p className="text-sm text-green-700 mt-1">
              Your content is ready to be created. It will be saved as a draft and sent for review.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}