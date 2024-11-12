import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Pill, Home, LogIn, ChevronDown } from 'lucide-react'

const Header: React.FC = () => {
  const [isAuthDropdownOpen, setIsAuthDropdownOpen] = useState(false);
  const [isLoggedIn] = useState(false); // This would come from your auth context/state

    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link to="/" className="flex items-center text-2xl font-bold text-blue-600">
                    <Pill className="mr-2" />
                    MediInventory
                </Link>
                <nav>
          <ul className="flex space-x-4 items-center">
            <li>
              <Link to="/" className="text-gray-600 hover:text-blue-600 flex items-center">
                            <Home className="mr-1" size={18} />
                Inicio
              </Link>
            </li>
            
            {isLoggedIn ? (
              // Menu items for logged-in users
                            <>
                <li>
                  <Link to="/catalog" className="text-gray-600 hover:text-blue-600">
                    Catálogo
                  </Link>
                </li>
                <li>
                  <Link to="/orders" className="text-gray-600 hover:text-blue-600">
                    Ordenes
                  </Link>
                </li>
                <li>
                  <Link to="/reports" className="text-gray-600 hover:text-blue-600">
                    Reportes
                  </Link>
                </li>
                <li>
                  <Link to="/predictions" className="text-gray-600 hover:text-blue-600">
                                    Predicciones
                  </Link>
                </li>
                <li>
                  <Link to="/analysis" className="text-gray-600 hover:text-blue-600">
                                    Análisis
                  </Link>
                </li>
                <li>
                  <Link to="/alert-management" className="text-gray-600 hover:text-blue-600">
                                    Alertas
                  </Link>
                                </li>
                            </>
                        ) : (
              // Auth dropdown for non-logged-in users
              <li className="relative">
                <button
                  onClick={() => setIsAuthDropdownOpen(!isAuthDropdownOpen)}
                  className="flex items-center text-gray-600 hover:text-blue-600 focus:outline-none"
                >
                                    <LogIn className="mr-1" size={18} />
                  Acceso
                  <ChevronDown className="ml-1" size={16} />
                </button>
                
                {isAuthDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsAuthDropdownOpen(false)}
                    >
                      Iniciar Sesión
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsAuthDropdownOpen(false)}
                    >
                      Registrarse
                    </Link>
                  </div>
                )}
              </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
  )
}

export default Header