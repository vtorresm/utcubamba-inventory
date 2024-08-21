import { AnalysisResult, ConsumptionData, MarketTrend } from '../types/analysis.types';

export class AnalysisService {
  static calculateBasicStatistics(data: ConsumptionData[]): AnalysisResult {
    const quantities = data.map(item => item.quantity);

    const mean = quantities.reduce((a, b) => a + b, 0) / quantities.length;
    const max = Math.max(...quantities);
    const min = Math.min(...quantities);

    // Calculate standard deviation
    const variance = quantities.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / quantities.length;
    const stdDeviation = Math.sqrt(variance);

    // Calculate monthly trends
    const monthlyTrends = data.reduce((acc: { [key: string]: number }, curr) => {
      const yearMonth = curr.date.substring(0, 7); // Format: YYYY-MM
      acc[yearMonth] = (acc[yearMonth] || 0) + curr.quantity;
      return acc;
    }, {});

    return {
      meanConsumption: mean,
      maxConsumption: max,
      minConsumption: min,
      stdDeviation: stdDeviation,
      totalConsumption: quantities.reduce((a, b) => a + b, 0),
      monthlyTrends
    };
  }

  static analyzeMarketTrends(data: MarketTrend[]): any {
    // Group by category
    const categoryTrends = data.reduce((acc: { [key: string]: number }, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.value;
      return acc;
    }, {});

    // Calculate growth rates
    const growthRates = data.reduce((acc: { [key: string]: number }, curr, index, arr) => {
      if (index > 0) {
        const previousValue = arr[index - 1].value;
        const currentValue = curr.value;
        acc[curr.date] = ((currentValue - previousValue) / previousValue) * 100;
      }
      return acc;
    }, {});

    return {
      categoryTrends,
      growthRates,
      totalMarketSize: data.reduce((sum, curr) => sum + curr.value, 0)
    };
  }

  static predictFutureConsumption(historicalData: ConsumptionData[]): number[] {
    // Simple moving average prediction
    const windowSize = 3;
    const predictions: number[] = [];

    for (let i = historicalData.length - windowSize; i < historicalData.length; i++) {
      const window = historicalData.slice(Math.max(0, i - windowSize + 1), i + 1);
      const average = window.reduce((sum, item) => sum + item.quantity, 0) / window.length;
      predictions.push(average);
    }

    return predictions;
  }
}
