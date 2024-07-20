import React from 'react';
import { Prediction } from '../../types/MedicationTypes';

interface InventoryOverviewProps {
  predictions: Prediction[];
}

const InventoryOverview: React.FC<InventoryOverviewProps> = ({ predictions }) => {
  const totalMedications = predictions.length;
  const lowStockMedications = predictions.filter(p => p.riskLevel === 'Alto').length;
  const averageStockLevel = predictions.reduce((sum, p) => sum + p.currentStock, 0) / totalMedications;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Resumen del Inventario</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600">Total de Medicamentos:</p>
          <p className="text-2xl font-bold">{totalMedications}</p>
        </div>
        <div>
          <p className="text-gray-600">Medicamentos con Stock Bajo:</p>
          <p className="text-2xl font-bold text-red-600">{lowStockMedications}</p>
        </div>
        <div>
          <p className="text-gray-600">Nivel Promedio de Stock:</p>
          <p className="text-2xl font-bold">{averageStockLevel.toFixed(0)}</p>
        </div>
      </div>
    </div>
  );
};

export default InventoryOverview;