import React, { useState, useEffect } from 'react';

interface AlertHistoryItem {
  id: string;
  medicationName: string;
  date: string;
  riskLevel: 'Bajo' | 'Moderado' | 'Alto';
  message: string;
}

const AlertHistory: React.FC = () => {
  const [alertHistory, setAlertHistory] = useState<AlertHistoryItem[]>([]);

  useEffect(() => {
    // Fetch alert history from API
    // For now, we'll use mock data
    setAlertHistory([
      { id: '1', medicationName: 'Paracetamol', date: '2024-03-15', riskLevel: 'Alto', message: 'Stock bajo crítico' },
      { id: '2', medicationName: 'Ibuprofeno', date: '2024-03-14', riskLevel: 'Moderado', message: 'Stock bajo' },
      { id: '3', medicationName: 'Amoxicilina', date: '2024-03-13', riskLevel: 'Bajo', message: 'Stock cercano al umbral' },
    ]);
  }, []);

  const getRiskLevelColor = (riskLevel: 'Bajo' | 'Moderado' | 'Alto') => {
    switch (riskLevel) {
      case 'Bajo':
        return 'bg-yellow-100 text-yellow-800';
      case 'Moderado':
        return 'bg-orange-100 text-orange-800';
      case 'Alto':
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Historial de Alertas</h2>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Fecha</th>
            <th className="px-4 py-2">Medicamento</th>
            <th className="px-4 py-2">Nivel de Riesgo</th>
            <th className="px-4 py-2">Mensaje</th>
          </tr>
        </thead>
        <tbody>
          {alertHistory.map(alert => (
            <tr key={alert.id}>
              <td className="border px-4 py-2">{alert.date}</td>
              <td className="border px-4 py-2">{alert.medicationName}</td>
              <td className="border px-4 py-2">
                <span className={`px-2 py-1 rounded ${getRiskLevelColor(alert.riskLevel)}`}>
                  {alert.riskLevel}
                </span>
              </td>
              <td className="border px-4 py-2">{alert.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlertHistory;