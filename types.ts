export type Language = 'en' | 'pt';

export interface IntakeData {
  purpose: string;
  representation: string;
  jurisdiction: string;
  contractType: string;
  stage: string;
  counterparty: string;
  riskTolerance: string;
  priorities: string;
  timeHorizon: string;
  dueDiligence: boolean;
  additionalInfo: string;
}

export interface AnalysisResponse {
  markdown: string;
  timestamp: string;
}

export enum AppStep {
  WELCOME = 'WELCOME',
  INTAKE = 'INTAKE',
  CONTRACT_INPUT = 'CONTRACT_INPUT',
  ANALYZING = 'ANALYZING',
  RESULTS = 'RESULTS',
}