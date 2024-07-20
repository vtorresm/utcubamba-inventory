import React, { useState, useEffect } from 'react';
import { Medication } from '../../types/MedicationTypes';

interface MedicationSelectorProps {
  onSelect: (medication: Medication) => void;
}

const MedicationSelector: React.FC<MedicationSelectorProps> = ({ onSelect }) => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Aquí se haría la llamada a la API para obtener la lista de medicamentos
    // Por ahora, usaremos datos de ejemplo
    const mockMedications: Medication[] = [
      { id: '1', name: 'Paracetamol', type: 'Analgésico' },
      { id: '2', name: 'Ibuprofeno', type: 'Antiinflamatorio' },
      { id: '3', name: 'Amoxicilina', type: 'Antibiótico' },
      // ... más medicamentos
    ];
    setMedications(mockMedications);
  }, []);

  const filteredMedications = medications.filter(med => 
    med.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Buscar medicamento..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <select
        onChange={(e) => {
          const selected = medications.find(med => med.id === e.target.value);
          if (selected) onSelect(selected);
        }}
        className="w-full p-2 border rounded"
      >
        <option value="">Seleccione un medicamento</option>
        {filteredMedications.map(med => (
          <option key={med.id} value={med.id}>
            {med.name} - {med.type}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MedicationSelector;