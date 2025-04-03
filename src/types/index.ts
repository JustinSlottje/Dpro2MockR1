import type { Feature } from 'geojson';

export interface Company {
  id: string;
  name: string;
  logo?: string;
  type: 'distributor' | 'manufacturer';
  verticals: string[];
  description?: string;
  website?: string;
}

export interface CustomerLifetimeValue {
  averageOrderValue: number;
  orderFrequency: number;
  annualChurnRate: number;
  grossMargin: number;
  sqlToCustomerRate: number;
  calculatedValues: {
    annualSales: number;
    customerLifespan: number;
    lifetimeValue: number;
  };
}

export interface Territory {
  id: string;
  name: string;
  boundaries: Feature;
  metrics: {
    proCount: number;
    marketSize: number;
    potentialRevenue: number;
  };
}

export interface Location {
  id: string;
  group_number: string;
  group_name: string;
  manager: string;
  name: string;
  address: string;
  address2: string | null;
  city: string;
  state: string;
  zipcode: string;
  phone: string;
  fax: string;
  region: string;
  coordinates?: [number, number];
  selected?: boolean;
}

export interface Play {
  id: string;
  name: string;
  description: string;
  riskLevel: 'low' | 'medium' | 'high';
  estimatedRoi: number;
  timeline: number;
  budget: number;
  proAttributes: ProAttribute[];
  provocationGoals: ProvocationGoal[];
  audienceSize: number;
  recommendedRisk: number;
  riskImpact: {
    minRoi: number;
    maxRoi: number;
    minAudience: number;
    maxAudience: number;
  };
  sequence: PlayActivity[];
  contentTemplates: ContentTemplate[];
  color?: {
    primary: string;
    secondary: string;
  };
  channelMetrics: Record<string, ChannelMetrics>;
  audienceSegments: {
    highValue: number;
    mediumValue: number;
    lowValue: number;
  };
}

export interface ProAttribute {
  id: string;
  name: string;
  description: string;
  value: number;
}

export interface DemographicData {
  ageGroups: Record<string, number>;
  income: Record<string, number>;
  professionalDensity: number;
  marketPenetration: number;
}

export type ProvocationGoal = 'onboard' | 'engage' | 'reEngage' | 'winback';

export const COMPANY_VERTICALS = [
  'HVAC',
  'Plumbing',
  'Electrical',
  'Building Products',
  'Decking',
  'Roofing',
  'Tools',
  'Safety Equipment'
] as const;

export const PROVOCATION_GOALS: Record<ProvocationGoal, {
  label: string;
  description: string;
  color: {
    primary: string;
    secondary: string;
  };
}> = {
  onboard: {
    label: 'Onboard',
    description: 'Acquire and activate new professional customers',
    color: {
      primary: '#4F46E5',
      secondary: '#818CF8'
    }
  },
  engage: {
    label: 'Engage',
    description: 'Deepen relationships with active customers',
    color: {
      primary: '#059669',
      secondary: '#34D399'
    }
  },
  reEngage: {
    label: 'Re-engage',
    description: 'Reconnect with at-risk or dormant customers',
    color: {
      primary: '#B45309',
      secondary: '#FBBF24'
    }
  },
  winback: {
    label: 'Winback',
    description: 'Recover previously lost customers',
    color: {
      primary: '#DC2626',
      secondary: '#F87171'
    }
  }
};

export interface PlayActivity {
  id: string;
  type: 'email' | 'sms' | 'call';
  name: string;
  description: string;
  template?: ContentTemplate;
  delayDays: number;
  conditions: Array<{
    type: string;
    value: string;
  }>;
  metrics?: {
    reach: number;
    cost: number;
    conversion: number;
  };
  segmentDistribution?: {
    highValue: number;
    mediumValue: number;
    lowValue: number;
  };
}

export interface ContentTemplate {
  id: string;
  name: string;
  type: ContentType;
  subject?: string;
  content: string;
  status: ContentStatus;
  version: number;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  thumbnail?: string;
  approvalHistory: ApprovalHistoryItem[];
  requiredPlays: string[];
  tags: string[];
  variables: ContentVariable[];
}

export type ContentType = 'email' | 'sms' | 'call' | 'digital' | 'social' | 'print';
export type ContentStatus = 'draft' | 'pending_review' | 'approved' | 'rejected' | 'archived';

export interface ApprovalHistoryItem {
  id: string;
  status: ContentStatus;
  comment: string;
  reviewer: string;
  timestamp: Date;
}

export interface ContentVariable {
  name: string;
  type: 'text' | 'number' | 'date' | 'boolean';
  description: string;
  required: boolean;
  defaultValue?: string;
}

export interface Channel {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'call' | 'digital' | 'social' | 'print';
  costPerContact: number;
  avgConversionRate: number;
  description: string;
  benefits: string[];
  constraints: string[];
}

export interface ChannelMetrics {
  enabled: boolean;
  costImpact: number;
  conversionImpact: number;
  reachImpact: number;
}