import React, { useState, useEffect } from 'react';
import { FileText, Target, Settings, AlertTriangle, CheckCircle2, Sparkles, X } from 'lucide-react';
import type { ContentTemplate, ContentType, Play, ProvocationGoal } from '../../types/index';
import { PROVOCATION_GOALS } from '../../types/index';
import { SelectContentType } from './steps/SelectContentType';
import { SelectPlays } from './steps/SelectPlays';
import { ContentEditor } from './steps/ContentEditor';
import { ContentReview } from './steps/ContentReview';

interface CreateContentStepperProps {
  onClose: () => void;
  onSave: (template: ContentTemplate) => void;
  plays: Play[];
  missingContent?: {
    playId: string;
    type: ContentType;
    description: string;
  }[];
}

interface Step {
  id: string;
  title: string;
  icon: React.ElementType;
  component: React.ComponentType<any>;
}

export function CreateContentStepper({ onClose, onSave, plays, missingContent }: CreateContentStepperProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [contentType, setContentType] = useState<ContentType | null>(null);
  const [selectedPlays, setSelectedPlays] = useState<Play[]>([]);
  const [contentData, setContentData] = useState<Partial<ContentTemplate>>({
    status: 'draft',
    version: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    approvalHistory: [],
    variables: []
  });

  // Determine required content based on selected plays
  const requiredContent = plays.reduce<{
    type: ContentType;
    playName: string;
    provocationGoal: ProvocationGoal;
  }[]>((acc, play) => {
    // Add required content types based on play sequence
    play.sequence.forEach(activity => {
      if (!play.contentTemplates.some(template => template.type === activity.type)) {
        acc.push({
          type: activity.type,
          playName: play.name,
          provocationGoal: play.provocationGoals[0]
        });
      }
    });
    return acc;
  }, []);

  const steps: Step[] = [
    {
      id: 'type',
      title: 'Select Type',
      icon: FileText,
      component: SelectContentType
    },
    {
      id: 'plays',
      title: 'Select Plays',
      icon: Target,
      component: SelectPlays
    },
    {
      id: 'content',
      title: 'Create Content',
      icon: Settings,
      component: ContentEditor
    },
    {
      id: 'review',
      title: 'Review',
      icon: CheckCircle2,
      component: ContentReview
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    if (contentData) {
      onSave({
        ...contentData as ContentTemplate,
        requiredPlays: selectedPlays.map(play => play.id),
        updatedAt: new Date()
      });
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[calc(100vh-4rem)] flex flex-col">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Create Content</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-8 relative">
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200">
              <div
                className="absolute h-full bg-indigo-600 transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>

            <div className="relative flex justify-between">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                const isCompleted = index < currentStep;
                const isCurrent = index === currentStep;

                return (
                  <div
                    key={step.id}
                    className={`flex flex-col items-center ${
                      index <= currentStep ? 'text-indigo-600' : 'text-gray-400'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isCompleted
                          ? 'bg-indigo-600 text-white'
                          : isCurrent
                          ? 'bg-white border-2 border-indigo-600'
                          : 'bg-white border-2 border-gray-200'
                      }`}
                    >
                      <StepIcon className="h-4 w-4" />
                    </div>
                    <div className="mt-2 text-sm font-medium">{step.title}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {missingContent && missingContent.length > 0 && currentStep === 0 && (
            <div className="mb-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <h3 className="font-medium text-amber-800">Missing Required Content</h3>
                  <div className="mt-2 space-y-2">
                    {missingContent.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm text-amber-700"
                      >
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                        <span>{item.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {requiredContent.length > 0 && currentStep === 0 && (
            <div className="mb-6 bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-indigo-500 mt-0.5" />
                <div>
                  <h3 className="font-medium text-indigo-800">Recommended Content</h3>
                  <div className="mt-2 space-y-2">
                    {requiredContent.map((item, index) => {
                      const goal = PROVOCATION_GOALS[item.provocationGoal];
                      return (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm text-indigo-700"
                        >
                          <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                          <span>
                            {item.type.charAt(0).toUpperCase() + item.type.slice(1)} for{' '}
                            {item.playName} ({goal.label})
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          <CurrentStepComponent
            contentType={contentType}
            onTypeSelect={setContentType}
            plays={plays}
            selectedPlays={selectedPlays}
            onPlaysSelect={setSelectedPlays}
            contentData={contentData}
            onContentChange={setContentData}
            requiredContent={requiredContent}
          />
        </div>

        <div className="p-6 border-t bg-gray-50">
          <div className="flex justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentStep === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Back
            </button>
            <button
              onClick={currentStep === steps.length - 1 ? handleFinish : handleNext}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              {currentStep === steps.length - 1 ? 'Create Content' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}