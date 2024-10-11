import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

interface AuthContextType {
    user: any;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<any>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            // Fetch user data if needed
        }
    }, [token]);

    const login = async (email: string, password: string) => {
        const response = await axios.post('http://localhost:8000/api/login', { email, password });
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
    };

    const register = async (name: string, email: string, password: string) => {
        await axios.post('http://localhost:8000/api/register', { name, email, password });
    };

    const logout = () => {
        axios.post('http://localhost:8000/api/logout');
        setToken(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
