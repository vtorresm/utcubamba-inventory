import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Prediction } from '../../types/MedicationTypes';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface TimeSeriesChartProps {
  predictions: Prediction[];
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ predictions }) => {
  const chartData = {
    labels: predictions.map(p => p.predictionDate),
    datasets: [
      {
        label: 'Stock Actual',
        data: predictions.map(p => p.currentStock),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Stock Predicho',
        data: predictions.map(p => p.predictedAmount),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Predicción de Stock de Medicamentos',
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Gráfico de Series Temporales</h2>
      <Line options={options} data={chartData} />
    </div>
  );
};

export default TimeSeriesChart;