import type { Feature, Point } from 'geojson';

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
  groupNumber: string;
  groupName: string;
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
}

export interface Play {
  id: string;
  name: string;
  description: string;
  riskLevel: 'low' | 'medium' | 'high';
  estimatedRoi: number;
  timeline: number;
  budget: number;
}

export interface DemographicData {
  ageGroups: Record<string, number>;
  income: Record<string, number>;
  professionalDensity: number;
  marketPenetration: number;
}