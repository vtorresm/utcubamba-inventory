import React, { useState } from 'react';
import { ConsumptionData } from '../../types/MedicationTypes';

interface PredictionSectionProps {
  medicationId: string;
  currentPredictions: ConsumptionData[];
}

const PredictionSection: React.FC<PredictionSectionProps> = ({ medicationId, currentPredictions }) => {
  const [horizon, setHorizon] = useState(30); // Horizonte de predicción en días

  const handlePredictionUpdate = () => {
    // Aquí se haría la llamada a la API para actualizar las predicciones
    console.log(`Actualizando predicciones para el medicamento ${medicationId} con horizonte de ${horizon} días`);
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Predicciones de Desabastecimiento</h2>
      <div className="mb-4">
        <label className="mr-2">Horizonte de predicción (días):</label>
        <input
          type="number"
          value={horizon}
          onChange={(e) => setHorizon(parseInt(e.target.value))}
          className="mr-4 p-1 border rounded"
        />
        <button
          onClick={handlePredictionUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Actualizar Predicciones
        </button>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Fecha</th>
            <th className="px-4 py-2 border">Cantidad Predicha</th>
          </tr>
        </thead>
        <tbody>
          {currentPredictions.map((prediction, index) => (
            <tr key={index}>
              <td className="px-4 py-2 border">{prediction.date}</td>
              <td className="px-4 py-2 border">{prediction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PredictionSection;