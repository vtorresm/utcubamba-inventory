import React from 'react';
import { InfluencingFactor } from '../../types/MedicationTypes';

interface InfluencingFactorsProps {
  factors: InfluencingFactor[];
}

const InfluencingFactors: React.FC<InfluencingFactorsProps> = ({ factors }) => {
  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'alto':
        return 'bg-red-100 text-red-800';
      case 'medio':
        return 'bg-yellow-100 text-yellow-800';
      case 'bajo':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Factores Influyentes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {factors.map((factor, index) => (
          <div key={index} className="p-4 border rounded shadow">
            <h3 className="font-semibold mb-2">{factor.factor}</h3>
            <span className={`px-2 py-1 rounded ${getImpactColor(factor.impact)}`}>
              Impacto: {factor.impact}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfluencingFactors;