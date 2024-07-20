import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { format, addDays } from 'date-fns';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Prediction {
  id: string;
  medicationName: string;
  medicationType: string;
  currentDate: string;
  predictionDate: string;
  predictedAmount: number;
  currentStock: number;
  riskLevel: 'Bajo' | 'Moderado' | 'Alto';
}

interface Medication {
  id: string;
  name: string;
  type: string;
}

const MedicationPrediction: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [predictionDate, setPredictionDate] = useState(format(addDays(new Date(), 30), 'yyyy-MM-dd'));
  const [medicationName, setMedicationName] = useState('');
  const [medicationType, setMedicationType] = useState('');
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [chartData, setChartData] = useState<any>(null);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [filteredMedications, setFilteredMedications] = useState<Medication[]>([]);

  const medicationTypes = [
    'Analgésico', 'Antiinflamatorio', 'Antibiótico', 'Antidepresivo',
    'Antihipertensivo', 'Antihistamínico', 'Antidiabético', 'Anticoagulante',
    'Antiviral', 'Anticonvulsivo'
  ];

  useEffect(() => {
    // Simular carga de predicciones previas
    const mockPredictions: Prediction[] = [
      { id: '1', medicationName: 'Paracetamol', medicationType: 'Analgésico', currentDate: '2024-03-15', predictionDate: '2024-04-15', predictedAmount: 800, currentStock: 1000, riskLevel: 'Bajo' },
      { id: '2', medicationName: 'Ibuprofeno', medicationType: 'Antiinflamatorio', currentDate: '2024-03-16', predictionDate: '2024-04-16', predictedAmount: 300, currentStock: 500, riskLevel: 'Moderado' },
      { id: '3', medicationName: 'Amoxicilina', medicationType: 'Antibiótico', currentDate: '2024-03-17', predictionDate: '2024-04-17', predictedAmount: 100, currentStock: 200, riskLevel: 'Alto' },
    ];
    setPredictions(mockPredictions);

    // Simular carga de medicamentos
    const mockMedications: Medication[] = [
      { id: '1', name: 'Paracetamol', type: 'Analgésico' },
      { id: '2', name: 'Ibuprofeno', type: 'Antiinflamatorio' },
      { id: '3', name: 'Amoxicilina', type: 'Antibiótico' },
      { id: '4', name: 'Omeprazol', type: 'Antiácido' },
      { id: '5', name: 'Loratadina', type: 'Antihistamínico' },
    ];
    setMedications(mockMedications);
    setFilteredMedications(mockMedications);

    updateChartData(mockPredictions);
  }, []);

  const handlePredict = () => {
    // Simular una predicción
    const currentStock = Math.floor(Math.random() * 1000) + 500;
    const predictedAmount = Math.floor(Math.random() * currentStock);
    const riskLevel = predictedAmount < currentStock * 0.3 ? 'Alto' : predictedAmount < currentStock * 0.6 ? 'Moderado' : 'Bajo';

    const newPrediction: Prediction = {
      id: Date.now().toString(),
      medicationName,
      medicationType,
      currentDate,
      predictionDate,
      predictedAmount,
      currentStock,
      riskLevel,
    };

    const updatedPredictions = [newPrediction, ...predictions];
    setPredictions(updatedPredictions);
    updateChartData(updatedPredictions);
  };

  const updateChartData = (predictionData: Prediction[]) => {
    const data = {
      labels: predictionData.map(p => p.predictionDate),
      datasets: [
        {
          label: 'Stock Actual',
          data: predictionData.map(p => p.currentStock),
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        },
        {
          label: 'Stock Predicho',
          data: predictionData.map(p => p.predictedAmount),
          fill: false,
          borderColor: 'rgb(255, 99, 132)',
          tension: 0.1
        }
      ]
    };

    setChartData(data);
  };

  const handleMedicationNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMedicationName(value);
    
    const filtered = medications.filter(med => 
      med.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredMedications(filtered);
  };

  const handleMedicationSelect = (name: string) => {
    setMedicationName(name);
    setFilteredMedications([]);
    
    const selectedMedication = medications.find(med => med.name === name);
    if (selectedMedication) {
      setMedicationType(selectedMedication.type);
    }
  };

  const getRiskColor = (riskLevel: Prediction['riskLevel']) => {
    switch (riskLevel) {
      case 'Bajo':
        return 'bg-green-100 text-green-800';
      case 'Moderado':
        return 'bg-yellow-100 text-yellow-800';
      case 'Alto':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div classNa