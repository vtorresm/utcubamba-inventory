import React, { useState, useEffect } from 'react';
import InventoryOverview from './InventoryOverview';
import HeatMap from './HeatMap';
import TimeSeriesChart from './TimeSeriesChart';
import AlertsTable from './AlertsTable';
import { Prediction, Medication } from '../../types/MedicationTypes';

const Dashboard: React.FC = () => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);

  useEffect(() => {
    // Simular carga de datos
    const mockPredictions: Prediction[] = [
      { id: '1', medicationName: 'Paracetamol', medicationType: 'Analgésico', currentDate: '2024-03-15', predictionDate: '2024-04-15', predictedAmount: 800, currentStock: 1000, riskLevel: 'Bajo' },
      { id: '2', medicationName: 'Ibuprofeno', medicationType: 'Antiinflamatorio', currentDate: '2024-03-16', predictionDate: '2024-04-16', predictedAmount: 300, currentStock: 500, riskLevel: 'Moderado' },
      { id: '3', medicationName: 'Amoxicilina', medicationType: 'Antibiótico', currentDate: '2024-03-17', predictionDate: '2024-04-17', predictedAmount: 100, currentStock: 200, riskLevel: 'Alto' },
    ];
    setPredictions(mockPredictions);

    const mockMedications: Medication[] = [
      { id: '1', name: 'Paracetamol', type: 'Analgésico' },
      { id: '2', name: 'Ibuprofeno', type: 'Antiinflamatorio' },
      { id: '3', name: 'Amoxicilina', type: 'Antibiótico' },
      { id: '4', name: 'Omeprazol', type: 'Antiácido' },
      { id: '5', name: 'Loratadina', type: 'Antihistamínico' },
    ];
    setMedications(mockMedications);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard de Predicción de Desabastecimiento</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InventoryOverview predictions={predictions} />
        <HeatMap predictions={predictions} />
      </div>
      <div className="mt-8">
        <TimeSeriesChart predictions={predictions} />
      </div>
      <div className="mt-8">
        <AlertsTable predictions={predictions} />
      </div>
    </div>
  );
};

export default Dashboard;