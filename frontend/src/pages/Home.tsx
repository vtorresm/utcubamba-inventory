import React from 'react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Bienvenido a MediInventory</h1>
      <p className="text-xl mb-8">Solución integral para el control de inventario de medicamentos</p>
      <div className="space-x-4">
        <Link to="/catalog" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
          Explorar catálogo
        </Link>
        <Link to="/register" className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700">
          Empezar
        </Link>
      </div>
    </div>
  )
}

export default Home