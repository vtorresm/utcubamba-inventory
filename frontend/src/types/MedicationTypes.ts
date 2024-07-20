export interface Medication {
  id: string;
  name: string;
  type: string;
}

export interface ConsumptionData {
  date: string;
  amount: number;
}

export interface InfluencingFactor {
  factor: string;
  impact: string;
}

export interface MedicationData {
  id: string;
  name: string;
  consumptionData: ConsumptionData[];
  predictions: ConsumptionData[];
  influencingFactors: InfluencingFactor[];
}

export interface Prediction {
  id: string;
  medicationName: string;
  medicationType: string;
  currentDate: string;
  predictionDate: string;
  predictedAmount: number;
  currentStock: number;
  riskLevel: 'Bajo' | 'Moderado' | 'Alto';
}