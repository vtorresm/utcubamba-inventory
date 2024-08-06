import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

interface Medication {
  id: number;
  name: string;
  category: string;
  administrationRoute: string;
  medicalCondition: string;
  availability: 'In Stock' | 'Out of Stock' | 'Limited';
  price: number;
}

const Catalog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    administrationRoute: '',
    medicalCondition: '',
    availability: '',
    priceRange: '',
  });
  const [medications, setMedications] = useState<Medication[]>([]);
  const [filteredMedications, setFilteredMedications] = useState<Medication[]>(
    []
  );

  // Mock data for demonstration
  useEffect(() => {
    const mockMedications: Medication[] = [
      {
        id: 1,
        name: 'Ibuprofen',
        category: 'Pain Relief',
        administrationRoute: 'Oral',
        medicalCondition: 'Pain',
        availability: 'In Stock',
        price: 9.99,
      },
      {
        id: 2,
        name: 'Amoxicillin',
        category: 'Antibiotics',
        administrationRoute: 'Oral',
        medicalCondition: 'Bacterial Infections',
        availability: 'In Stock',
        price: 15.99,
      },
      {
        id: 3,
        name: 'Loratadine',
        category: 'Allergy',
        administrationRoute: 'Oral',
        medicalCondition: 'Allergies',
        availability: 'Limited',
        price: 12.99,
      },
      {
        id: 4,
        name: 'Insulin Glargine',
        category: 'Diabetes',
        administrationRoute: 'Injection',
        medicalCondition: 'Diabetes',
        availability: 'In Stock',
        price: 89.99,
      },
      {
        id: 5,
        name: 'Salbutamol Inhaler',
        category: 'Respiratory',
        administrationRoute: 'Inhalation',
        medicalCondition: 'Asthma',
        availability: 'In Stock',
        price: 25.99,
      },
    ];
    setMedications(mockMedications);
    setFilteredMedications(mockMedications);
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    let result = medications;

    if (searchTerm) {
      result = result.filter((med) =>
        med.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.category) {
      result = result.filter((med) => med.category === filters.category);
    }

    if (filters.administrationRoute) {
      result = result.filter(
        (med) => med.administrationRoute === filters.administrationRoute
      );
    }

    if (filters.medicalCondition) {
      result = result.filter(
        (med) => med.medicalCondition === filters.medicalCondition
      );
    }

    if (filters.availability) {
      result = result.filter(
        (med) => med.availability === filters.availability
      );
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      result = result.filter((med) => med.price >= min && med.price <= max);
    }

    setFilteredMedications(result);
  }, [searchTerm, filters, medications]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Catálogo de medicamentos</h2>
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search medications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Todas las categorías</option>
          <option value="Pain Relief">Alivio del dolor</option>
          <option value="Antibiotics">Antibioticos</option>
          <option value="Allergy">Alergia</option>
          <option value="Diabetes">Diabetes</option>
          <option value="Respiratory">Respiratoria</option>
        </select>
        <select
          name="administrationRoute"
          value={filters.administrationRoute}
          onChange={handleFilterChange}
          className="w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Tipo de Toma</option>
          <option value="Oral">Oral</option>
          <option value="Injection">Inyección</option>
          <option value="Inhalation">Inhalación</option>
        </select>
        <select
          name="medicalCondition"
          value={filters.medicalCondition}
          onChange={handleFilterChange}
          className="w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Todas las condiciones</option>
          <option value="Pain">Dolor</option>
          <option value="Bacterial Infections">Infecciones bacterianas</option>
          <option value="Allergies">Alergias</option>
          <option value="Diabetes">Diabetes</option>
          <option value="Asthma">Asma</option>
        </select>
        <select
          name="availability"
          value={filters.availability}
          onChange={handleFilterChange}
          className="w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Disponibilidad</option>
          <option value="In Stock">En Stock</option>
          <option value="Out of Stock">Agotado</option>
          <option value="Limited">Limitado</option>
        </select>
        <select
          name="priceRange"
          value={filters.priceRange}
          onChange={handleFilterChange}
          className="w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Todos los precios</option>
          <option value="0-10">S/.0 - S/.10</option>
          <option value="10-25">S/.10 - S/.25</option>
          <option value="25-50">S/.25 - S/.50</option>
          <option value="50-100">S/.50 - S/.100</option>
          <option value="100-1000">&gt; S/.100</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMedications.map((med) => (
          <div
            key={med.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{med.name}</h3>
              <p className="text-gray-600 mb-4">{med.category}</p>
              <div className="mb-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold S/.{
                    med.availability === 'In Stock'
                      ? 'bg-green-100 text-green-800'
                      : med.availability === 'Limited'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {med.availability}
                </span>
              </div>
              <p className="text-gray-700 mb-2">
                <strong>Administración:</strong> {med.administrationRoute}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Condition:</strong> {med.medicalCondition}
              </p>
              <p className="text-xl font-bold text-blue-600">
                S/.{med.price.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
