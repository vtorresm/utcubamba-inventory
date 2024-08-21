export interface ConsumptionData {
  date: string;
  quantity: number;
  medicationId?: string;
}

export interface MarketTrend {
  date: string;
  category: string;
  value: number;
}

export interface AnalysisResult {
  meanConsumption: number;
  maxConsumption: number;
  minConsumption: number;
  stdDeviation: number;
  totalConsumption: number;
  monthlyTrends: {
    [key: string]: number;
  };
}

export interface PredictionResult {
  medicationId: string;
  predictions: number[];
  confidence: number;
  riskLevel: 'Bajo' | 'Moderado' | 'Alto';
}
