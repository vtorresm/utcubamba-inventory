import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { ConsumptionData } from '../../types/MedicationTypes';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface TimeSeriesChartProps {
  data: ConsumptionData[];
  predictions: ConsumptionData[];
  timeRange: { start: string; end: string };
  onTimeRangeChange: (start: string, end: string) => void;
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ data, predictions, timeRange, onTimeRangeChange }) => {
  const filteredData = data.filter(d => 
    d.date >= timeRange.start && d.date <= timeRange.end
  );

  const chartData = {
    labels: filteredData.map(d => d.date),
    datasets: [
      {
        label: 'Consumo Real',
        data: filteredData.map(d => d.amount),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'Predicción',
        data: predictions.map(d => d.amount),
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
        text: 'Consumo de Medicamento y Predicción',
      },
    },
  };

  return (
    <div className="mb-6">
      <div className="mb-4">
        <label className="mr-2">Desde:</label>
        <input
          type="date"
          value={timeRange.start}
          onChange={(e) => onTimeRangeChange(e.target.value, timeRange.end)}
          className="mr-4 p-1 border rounded"
        />
        <label className="mr-2">Hasta:</label>
        <input
          type="date"
          value={timeRange.end}
          onChange={(e) => onTimeRangeChange(timeRange.start, e.target.value)}
          className="p-1 border rounded"
        />
      </div>
      <Line options={options} data={chartData} />
    </div>
  );
};

export default TimeSeriesChart;