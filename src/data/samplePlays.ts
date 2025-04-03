import type { Play } from '../types';
import { PROVOCATION_GOALS } from '../types/index';

export const SAMPLE_PLAYS: Play[] = [
  {
    id: 'play1',
    name: 'High-Value Pro Acquisition',
    description: 'Target and acquire high-value professionals through personalized outreach and incentives',
    riskLevel: 'low',
    estimatedRoi: 180,
    timeline: 12,
    budget: 50000,
    proAttributes: [
      { id: 'revenue', name: 'High Revenue', description: 'Annual revenue > $500k', value: 0.3 },
      { id: 'frequency', name: 'Purchase Frequency', description: 'Orders at least twice per month', value: 0.2 },
      { id: 'loyalty', name: 'Brand Loyalty', description: 'Primarily purchases from a single brand', value: 0.15 },
      { id: 'growth', name: 'Growth Rate', description: 'YoY growth > 20%', value: 0.2 },
      { id: 'digital', name: 'Digital Engagement', description: 'Active on online platforms', value: 0.15 }
    ],
    provocationGoals: ['onboard'],
    audienceSize: 5000,
    recommendedRisk: 40,
    riskImpact: {
      minRoi: 150,
      maxRoi: 250,
      minAudience: 2000,
      maxAudience: 8000
    },
    color: PROVOCATION_GOALS.onboard.color,
    sequence: [
      {
        id: 'p1a1',
        type: 'email',
        name: 'Welcome Email',
        description: 'Initial welcome message with value proposition',
        template: {
          id: 't1',
          name: 'Welcome Template',
          type: 'email',
          subject: 'Welcome to Our Program',
          content: 'Welcome content here'
        },
        delayDays: 0,
        conditions: []
      },
      {
        id: 'p1a2',
        type: 'call',
        name: 'Introduction Call',
        description: 'Personal introduction and needs assessment',
        template: {
          id: 't2',
          name: 'Intro Call Script',
          type: 'call',
          content: 'Call script content here'
        },
        delayDays: 3,
        conditions: [
          { type: 'engagement', value: 'email_opened' }
        ]
      },
      {
        id: 'p1a3',
        type: 'email',
        name: 'Custom Offer',
        description: 'Personalized offer based on call',
        template: {
          id: 't3',
          name: 'Custom Offer Template',
          type: 'email',
          subject: 'Your Custom Offer',
          content: 'Offer content here'
        },
        delayDays: 5,
        conditions: [
          { type: 'response', value: 'call_completed' }
        ]
      }
    ],
    contentTemplates: []
  },
  {
    id: 'play2',
    name: 'Pro Re-Engagement Campaign',
    description: 'Re-engage dormant professionals with targeted incentives and personalized outreach',
    riskLevel: 'medium',
    estimatedRoi: 150,
    timeline: 8,
    budget: 35000,
    proAttributes: [
      { id: 'dormancy', name: 'Dormancy Period', description: 'No purchases in 6+ months', value: 0.4 },
      { id: 'pastValue', name: 'Past Value', description: 'Previous high-value customer', value: 0.3 },
      { id: 'potential', name: 'Growth Potential', description: 'Market opportunity exists', value: 0.3 }
    ],
    provocationGoals: ['reEngage'],
    audienceSize: 3000,
    recommendedRisk: 60,
    riskImpact: {
      minRoi: 120,
      maxRoi: 200,
      minAudience: 1500,
      maxAudience: 5000
    },
    color: PROVOCATION_GOALS.reEngage.color,
    sequence: [
      {
        id: 'p2a1',
        type: 'email',
        name: 'Re-engagement Email',
        description: 'Personalized message highlighting new offerings',
        template: {
          id: 't4',
          name: 'Re-engagement Template',
          type: 'email',
          subject: 'We Miss You!',
          content: 'Re-engagement content here'
        },
        delayDays: 0,
        conditions: []
      },
      {
        id: 'p2a2',
        type: 'sms',
        name: 'Special Offer SMS',
        description: 'Limited time offer via SMS',
        template: {
          id: 't5',
          name: 'SMS Offer Template',
          type: 'sms',
          content: 'SMS content here'
        },
        delayDays: 3,
        conditions: [
          { type: 'engagement', value: 'email_opened' }
        ]
      }
    ],
    contentTemplates: []
  },
  {
    id: 'play3',
    name: 'Pro Loyalty Enhancement',
    description: 'Strengthen relationships with active professionals through exclusive benefits',
    riskLevel: 'low',
    estimatedRoi: 200,
    timeline: 16,
    budget: 45000,
    proAttributes: [
      { id: 'active', name: 'Active Status', description: 'Purchased in last 3 months', value: 0.4 },
      { id: 'spend', name: 'Spend Level', description: 'Above average order value', value: 0.3 },
      { id: 'engagement', name: 'Engagement Level', description: 'Responds to communications', value: 0.3 }
    ],
    provocationGoals: ['engage'],
    audienceSize: 4000,
    recommendedRisk: 30,
    riskImpact: {
      minRoi: 180,
      maxRoi: 250,
      minAudience: 2500,
      maxAudience: 6000
    },
    color: PROVOCATION_GOALS.engage.color,
    sequence: [
      {
        id: 'p3a1',
        type: 'email',
        name: 'Loyalty Program Invitation',
        description: 'Exclusive loyalty program details',
        template: {
          id: 't6',
          name: 'Loyalty Invitation Template',
          type: 'email',
          subject: 'Join Our Elite Pro Program',
          content: 'Loyalty program content here'
        },
        delayDays: 0,
        conditions: []
      },
      {
        id: 'p3a2',
        type: 'call',
        name: 'Program Benefits Call',
        description: 'Detailed explanation of program benefits',
        template: {
          id: 't7',
          name: 'Benefits Call Script',
          type: 'call',
          content: 'Call script content here'
        },
        delayDays: 5,
        conditions: [
          { type: 'engagement', value: 'email_opened' }
        ]
      }
    ],
    contentTemplates: []
  }
];