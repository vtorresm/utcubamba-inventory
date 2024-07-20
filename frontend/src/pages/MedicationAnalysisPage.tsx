import React from 'react';
import MedicationAnalysis from '../components/MedicationAnalysis/MedicationAnalysis';

const MedicationAnalysisPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Análisis de Medicamentos</h1>
      <MedicationAnalysis />
    </div>
  );
};

export default MedicationAnalysisPage;