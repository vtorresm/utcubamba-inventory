import React from 'react';
import { Prediction } from '../../types/MedicationTypes';

interface AlertsTableProps {
  predictions: Prediction[];
}

const AlertsTable: React.FC<AlertsTableProps> = ({ predictions }) => {
  const sortedPredictions = [...predictions].sort((a, b) => {
    const riskOrder = { 'Alto': 0, 'Moderado': 1, 'Bajo': 2 };
    return riskOrder[a.riskLevel] - riskOrder[b.riskLevel];
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Alertas de Desabastecimiento</h2>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Medicamento</th>
            <th className="px-4 py-2">Fecha Estimada</th>
            <th className="px-4 py-2">Nivel de Riesgo</th>
            <th className="px-4 py-2">Stock Actual</th>
            <th className="px-4 py-2">Stock Predicho</th>
          </tr>
        </thead>
        <tbody>
          {sortedPredictions.map((prediction) => (
            <tr key={prediction.id}>
              <td className="border px-4 py-2">{prediction.medicationName}</td>
              <td className="border px-4 py-2">{prediction.predictionDate}</td>
              <td className="border px-4 py-2">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold
                  ${prediction.riskLevel === 'Alto' ? 'bg-red-200 text-red-800' :
                    prediction.riskLevel === 'Moderado' ? 'bg-yellow-200 text-yellow-800' :
                    'bg-green-200 text-green-800'}`}>
                  {prediction.riskLevel}
                </span>
              </td>
              <td className="border px-4 py-2">{prediction.currentStock}</td>
              <td className="border px-4 py-2">{prediction.predictedAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlertsTable;