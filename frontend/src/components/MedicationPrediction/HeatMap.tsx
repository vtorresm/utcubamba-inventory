import React from 'react';
import { Prediction } from '../../types/MedicationTypes';

interface HeatMapProps {
  predictions: Prediction[];
}

const HeatMap: React.FC<HeatMapProps> = ({ predictions }) => {
  const getRiskColor = (riskLevel: Prediction['riskLevel']) => {
    switch (riskLevel) {
      case 'Bajo':
        return 'bg-green-200';
      case 'Moderado':
        return 'bg-yellow-200';
      case 'Alto':
        return 'bg-red-200';
      default:
        return 'bg-gray-200';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Mapa de Calor de Riesgo</h2>
      <div className="grid grid-cols-3 gap-2">
        {predictions.map((prediction) => (
          <div
            key={prediction.id}
            className={`p-2 rounded ${getRiskColor(prediction.riskLevel)}`}
            title={`${prediction.medicationName}: ${prediction.riskLevel}`}
          >
            <p className="text-sm font-medium truncate">{prediction.medicationName}</p>
            <p className="text-xs">{prediction.riskLevel}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeatMap;