export type InputType = 'text' | 'url' | 'image' | 'video' | 'headline';

export interface AnalysisResult {
  verdict: 'REAL' | 'FAKE' | 'UNCERTAIN';
  confidence: number;
  summary: string;
  analysis: {
    sourceCredibility: string;
    languageQuality: string;
    factualConsistency: string;
    biasIndicators: string;
    verificationStatus: string;
  };
  redFlags: string[];
  recommendations: string[];
  sources?: string[];
  timestamp: string;
}

export interface HistoryItem {
  id: string;
  type: InputType;
  content: string;
  result: AnalysisResult;
  timestamp: string;
}

export type RootStackParamList = {
  Home: undefined;
  Analysis: {type: InputType};
  Result: {result: AnalysisResult};
  History: undefined;
  Settings: undefined;
};