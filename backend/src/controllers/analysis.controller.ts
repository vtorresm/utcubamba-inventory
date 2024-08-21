import { Request, Response } from 'express';
import { AnalysisService } from '../services/analysis.service';
import { ConsumptionData, MarketTrend } from '../types/analysis.types';

export const getMedicationAnalysis = async (req: Request, res: Response) => {
  try {
    const { medicationId } = req.params;

    // Mock data - Replace with actual database queries
    const consumptionData: ConsumptionData[] = [
      { date: '2024-01-01', quantity: 100, medicationId },
      { date: '2024-02-01', quantity: 120, medicationId },
      { date: '2024-03-01', quantity: 110, medicationId },
    ];

    const analysis = AnalysisService.calculateBasicStatistics(consumptionData);
    res.json(analysis);
  } catch (error) {
    console.error('Error analyzing medication data:', error);
    res.status(500).json({ message: 'Error analyzing medication data' });
  }
};

export const getMarketTrends = async (req: Request, res: Response) => {
  try {
    const { medicationName } = req.params;

    // Mock data - Replace with actual database queries
    const marketData: MarketTrend[] = [
      { date: '2024-01', category: 'Analgésicos', value: 1000 },
      { date: '2024-02', category: 'Analgésicos', value: 1200 },
      { date: '2024-03', category: 'Analgésicos', value: 1100 },
    ];

    const trends = AnalysisService.analyzeMarketTrends(marketData);
    res.json(trends);
  } catch (error) {
    console.error('Error analyzing market trends:', error);
    res.status(500).json({ message: 'Error analyzing market trends' });
  }
};

export const analyzeConsumption = async (req: Request, res: Response) => {
  try {
    const consumptionData: ConsumptionData[] = req.body;
    const analysis = AnalysisService.calculateBasicStatistics(consumptionData);
    const predictions = AnalysisService.predictFutureConsumption(consumptionData);

    res.json({
      analysis,
      predictions,
      riskLevel: analysis.meanConsumption < 100 ? 'Alto' :
                 analysis.meanConsumption < 200 ? 'Moderado' : 'Bajo'
    });
  } catch (error) {
    console.error('Error analyzing consumption patterns:', error);
    res.status(500).json({ message: 'Error analyzing consumption patterns' });
  }
};
