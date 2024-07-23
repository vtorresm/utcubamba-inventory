import React from 'react';
import { Link } from 'react-router-dom';
import { Pill, ShoppingCart, FileText, Home, LogIn, UserPlus } from 'lucide-react';
import Logout from './Logout';

const Header: React.FC<{ user: any, setUser: any }> = ({ user, setUser }) => {
    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link to="/" className="flex items-center text-2xl font-bold text-blue-600">
                    <Pill className="mr-2" />
                    MediInventory
                </Link>
                <nav>
                    <ul className="flex space-x-4">
                        <li><Link to="/" className="text-gray-600 hover:text-blue-600 flex items-center">
                            <Home className="mr-1" size={18} />
                            Home
                        </Link></li>
                        {user ? (
                            <>
                                <li><Link to="/catalog" className="text-gray-600 hover:text-blue-600 flex items-center">
                                    <FileText className="mr-1" size={18} />
                                    Catalog
                                </Link></li>
                                <li><Link to="/orders" className="text-gray-600 hover:text-blue-600 flex items-center">
                                    <ShoppingCart className="mr-1" size={18} />
                                    Orders
                                </Link></li>
                                <li className="text-gray-600 flex items-center">
                                    {user.name}
                                </li>
                                <li><Logout setUser={setUser} /></li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/login" className="text-gray-600 hover:text-blue-600 flex items-center">
                                    <LogIn className="mr-1" size={18} />
                                    Login
                                </Link></li>
                                <li><Link to="/register" className="text-gray-600 hover:text-blue-600 flex items-center">
                                    <UserPlus className="mr-1" size={18} />
                                    Register
                                </Link></li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;