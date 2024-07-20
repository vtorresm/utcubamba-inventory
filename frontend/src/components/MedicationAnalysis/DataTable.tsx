import React from 'react';
import { ConsumptionData } from '../../types/MedicationTypes';

interface DataTableProps {
  data: ConsumptionData[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Datos Históricos de Consumo</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Fecha</th>
              <th className="px-4 py-2 border">Cantidad Consumida</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{item.date}</td>
                <td className="px-4 py-2 border">{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;