import React, { useState, useEffect } from 'react';
import { Medication } from '../../types/MedicationTypes';

interface Alert {
  id: string;
  medicationId: string;
  threshold: number;
  riskLevel: 'Bajo' | 'Moderado' | 'Alto';
}

const AlertConfiguration: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [selectedMedication, setSelectedMedication] = useState('');
  const [threshold, setThreshold] = useState(0);
  const [riskLevel, setRiskLevel] = useState<'Bajo' | 'Moderado' | 'Alto'>('Bajo');

  useEffect(() => {
    // Fetch medications from API
    // For now, we'll use mock data
    setMedications([
      { id: '1', name: 'Paracetamol', type: 'Analgésico' },
      { id: '2', name: 'Ibuprofeno', type: 'Antiinflamatorio' },
      { id: '3', name: 'Amoxicilina', type: 'Antibiótico' },
    ]);

    // Fetch existing alerts from API
    // For now, we'll use mock data
    setAlerts([
      { id: '1', medicationId: '1', threshold: 100, riskLevel: 'Alto' },
      { id: '2', medicationId: '2', threshold: 50, riskLevel: 'Moderado' },
    ]);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAlert: Alert = {
      id: Date.now().toString(),
      medicationId: selectedMedication,
      threshold,
      riskLevel,
    };
    setAlerts([...alerts, newAlert]);
    // Here you would also send this to your backend API
  };

  const handleDelete = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
    // Here you would also send a delete request to your backend API
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Configuración de Alertas</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block mb-2">Medicamento</label>
          <select
            value={selectedMedication}
            onChange={(e) => setSelectedMedication(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Seleccione un medicamento</option>
            {medications.map(med => (
              <option key={med.id} value={med.id}>{med.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Umbral de Stock</label>
          <input
            type="number"
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Nivel de Riesgo</label>
          <select
            value={riskLevel}
            onChange={(e) => setRiskLevel(e.target.value as 'Bajo' | 'Moderado' | 'Alto')}
            className="w-full p-2 border rounded"
          >
            <option value="Bajo">Bajo</option>
            <option value="Moderado">Moderado</option>
            <option value="Alto">Alto</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Agregar Alerta
        </button>
      </form>
      <div>
        <h3 className="font-semibold mb-2">Alertas Configuradas</h3>
        <ul>
          {alerts.map(alert => (
            <li key={alert.id} className="mb-2 flex justify-between items-center">
              <span>
                {medications.find(med => med.id === alert.medicationId)?.name} - 
                Umbral: {alert.threshold}, Riesgo: {alert.riskLevel}
              </span>
              <button
                onClick={() => handleDelete(alert.id)}
                className="text-red-500 hover:text-red-700"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AlertConfiguration;