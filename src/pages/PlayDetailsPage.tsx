import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { PlayDetailsTabs } from '../components/PlayDetailsTabs';
import { PathExplorationChart } from '../components/PathExplorationChart';
import { VoiceOfCustomer } from '../components/VoiceOfCustomer';
import { AudienceTab } from '../components/AudienceTab';
import { ContentTab } from '../components/ContentTab';
import { ExecutionsTab } from '../components/ExecutionsTab';
import { ReportingTab } from '../components/ReportingTab';
import { SAMPLE_PLAYS } from '../data/samplePlays';
import type { ContentTemplate } from '../types';

interface PlayDetailsPageProps {
  playId: string;
  onBack: () => void;
}

export function PlayDetailsPage({ playId, onBack }: PlayDetailsPageProps) {
  const [activeTab, setActiveTab] = useState('main');
  const play = SAMPLE_PLAYS.find(p => p.id === playId);

  if (!play) {
    return (
      <div className="p-8">
        <div className="text-red-600">Play not found</div>
      </div>
    );
  }

  const handleContentAssign = (activityId: string, template: ContentTemplate) => {
    // Update play sequence with assigned content
    const updatedPlay = {
      ...play,
      sequence: play.sequence.map(activity =>
        activity.id === activityId
          ? { ...activity, template }
          : activity
      )
    };
    // Here you would update the play in your state management system
    console.log('Updated play:', updatedPlay);
  };

  const handleNodeClick = (nodeId: string) => {
    console.log('Node clicked:', nodeId);
  };

  // Generate dynamic path data based on play sequence and user progress
  const generatePathData = () => {
    const initialAudience = play.audienceSize;
    const emailDeliveryRate = 0.97; // 97% email delivery rate
    const emailOpenRate = 0.45; // 45% open rate
    const emailClickRate = 0.15; // 15% click rate
    const callAnswerRate = 0.35; // 35% call answer rate
    const smsDeliveryRate = 0.98; // 98% SMS delivery rate
    const smsResponseRate = 0.25; // 25% SMS response rate
    const followupEmailRate = 0.40; // 40% followup email engagement
    const finalCallRate = 0.30; // 30% final call success rate

    // Calculate initial email metrics
    const emailDelivered = Math.round(initialAudience * emailDeliveryRate);
    const emailOpened = Math.round(emailDelivered * emailOpenRate);
    const emailClicked = Math.round(emailOpened * emailClickRate);

    // Split audience between call and SMS
    const callGroup = Math.round(emailClicked * 0.6); // 60% get calls
    const smsGroup = emailClicked - callGroup; // 40% get SMS

    // Calculate call branch metrics
    const callsAnswered = Math.round(callGroup * callAnswerRate);
    const callsConverted = Math.round(callsAnswered * 0.4);

    // Calculate SMS branch metrics
    const smsDelivered = Math.round(smsGroup * smsDeliveryRate);
    const smsResponded = Math.round(smsDelivered * smsResponseRate);

    // Calculate followup metrics
    const followupEmailOpened = Math.round(smsResponded * followupEmailRate);
    const finalCallsAnswered = Math.round(followupEmailOpened * finalCallRate);

    return {
      id: 'root',
      type: 'audience' as const,
      label: 'All Targets',
      count: initialAudience,
      metrics: {
        total: initialAudience,
        converted: emailClicked,
        dropped: initialAudience - emailClicked
      },
      children: [
        {
          id: 'email1',
          type: 'email' as const,
          label: 'Welcome Email',
          count: emailDelivered,
          metrics: {
            total: emailDelivered,
            delivered: emailDelivered,
            opened: emailOpened,
            clicked: emailClicked,
            converted: emailClicked,
            dropped: emailDelivered - emailClicked
          },
          children: [
            // Call Branch
            {
              id: 'call1',
              type: 'call' as const,
              label: 'Follow-up Call (60%)',
              count: callGroup,
              metrics: {
                total: callGroup,
                delivered: callGroup,
                responded: callsAnswered,
                converted: callsConverted,
                dropped: callGroup - callsConverted
              },
              children: []
            },
            // SMS Branch
            {
              id: 'sms1',
              type: 'sms' as const,
              label: 'Special Offer SMS (40%)',
              count: smsGroup,
              metrics: {
                total: smsGroup,
                delivered: smsDelivered,
                responded: smsResponded,
                converted: smsResponded,
                dropped: smsGroup - smsResponded
              },
              children: [
                {
                  id: 'email2',
                  type: 'email' as const,
                  label: 'Follow-up Email',
                  count: smsResponded,
                  metrics: {
                    total: smsResponded,
                    delivered: smsResponded,
                    opened: followupEmailOpened,
                    converted: followupEmailOpened,
                    dropped: smsResponded - followupEmailOpened
                  },
                  children: [
                    {
                      id: 'call2',
                      type: 'call' as const,
                      label: 'Final Call',
                      count: followupEmailOpened,
                      metrics: {
                        total: followupEmailOpened,
                        delivered: followupEmailOpened,
                        responded: finalCallsAnswered,
                        converted: finalCallsAnswered,
                        dropped: followupEmailOpened - finalCallsAnswered
                      },
                      children: []
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    };
  };

  const renderMainTab = () => (
    <div className="space-y-8 p-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h2 className="text-lg font-medium">Path Exploration</h2>
        </div>
        <PathExplorationChart data={generatePathData()} onNodeClick={handleNodeClick} />
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h2 className="text-lg font-medium">Voice of Customer</h2>
        </div>
        <VoiceOfCustomer />
      </div>
    </div>
  );

  const renderAudienceTab = () => (
    <AudienceTab
      play={play}
      onAudienceUpdate={(size) => console.log('Audience size updated:', size)}
    />
  );

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="p-6 border-b bg-white">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-semibold">{play.name}</h1>
        </div>
      </div>
      
      <PlayDetailsTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 overflow-auto">
        {activeTab === 'main' && renderMainTab()}
        {activeTab === 'audience' && renderAudienceTab()}
        {activeTab === 'content' && (
          <ContentTab
            play={play}
            onContentAssign={handleContentAssign}
          />
        )}
        {activeTab === 'executions' && <ExecutionsTab />}
        {activeTab === 'reporting' && <ReportingTab />}
      </div>
    </div>
  );
}