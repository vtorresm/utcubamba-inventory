import React, { useState, useEffect } from 'react';
import MedicationSelector from './MedicationSelector';
import TimeSeriesChart from './TimeSeriesChart';
import DataTable from './DataTable';
import PredictionSection from './PredictionSection';
import InfluencingFactors from './InfluencingFactors';
import { Medication, MedicationData } from '../../types/MedicationTypes';

const MedicationAnalysis: React.FC = () => {
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);
  const [medicationData, setMedicationData] = useState<MedicationData | null>(null);
  const [timeRange, setTimeRange] = useState({ start: '', end: '' });

  useEffect(() => {
    if (selectedMedication) {
      // Aquí se haría la llamada a la API para obtener los datos del medicamento seleccionado
      // Por ahora, usaremos datos de ejemplo
      const mockData: MedicationData = {
        id: selectedMedication.id,
        name: selectedMedication.name,
        consumptionData: [
          { date: '2024-01-01', amount: 100 },
          { date: '2024-02-01', amount: 120 },
          { date: '2024-03-01', amount: 110 },
          // ... más datos
        ],
        predictions: [
          { date: '2024-04-01', amount: 115 },
          { date: '2024-05-01', amount: 125 },
          // ... más predicciones
        ],
        influencingFactors: [
          { factor: 'Estacionalidad', impact: 'Alto' },
          { factor: 'Tendencia', impact: 'Medio' },
          { factor: 'Eventos externos', impact: 'Bajo' },
        ],
      };
      setMedicationData(mockData);
    }
  }, [selectedMedication]);

  const handleMedicationSelect = (medication: Medication) => {
    setSelectedMedication(medication);
  };

  const handleTimeRangeChange = (start: string, end: string) => {
    setTimeRange({ start, end });
  };

  return (
    <div>
      <MedicationSelector onSelect={handleMedicationSelect} />
      {medicationData && (
        <>
          <TimeSeriesChart 
            data={medicationData.consumptionData} 
            predictions={medicationData.predictions}
            timeRange={timeRange}
            onTimeRangeChange={handleTimeRangeChange}
          />
          <DataTable data={medicationData.consumptionData} />
          <PredictionSection 
            medicationId={medicationData.id} 
            currentPredictions={medicationData.predictions} 
          />
          <InfluencingFactors factors={medicationData.influencingFactors} />
        </>
      )}
    </div>
  );
};

export default MedicationAnalysis;