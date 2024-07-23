import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

interface User {
    id: number;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            fetchUser();
        }
    }, [token]);

    const fetchUser = async () => {
        try {
            const response = await axios.get<User>('http://localhost:8000/api/user');
            setUser(response.data);
        } catch (err) {
            console.error('Failed to fetch user', err);
            setToken(null);
            localStorage.removeItem('token');
        }
    };

    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post<{ token: string, user: User }>('http://localhost:8000/api/login', { email, password });
            setToken(response.data.token);
            setUser(response.data.user);
            localStorage.setItem('token', response.data.token);
        } catch (err) {
            console.error('Failed to fetch user', err);
            setError('Failed to login. Please check your credentials and try again.');
        } finally {
            setLoading(false);
        }
    };

    const register = async (name: string, email: string, password: string, passwordConfirmation: string) => {
        setLoading(true);
        setError(null);
        try {
            await axios.post('http://localhost:8000/api/register', { name, email, password, password_confirmation: passwordConfirmation });
        } catch (err) {
            setError('Failed to register. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        setError(null);
        try {
            await axios.post('http://localhost:8000/api/logout');
            setToken(null);
            setUser(null);
            localStorage.removeItem('token');
        } catch (err) {
            console.error('Failed to fetch user', err);
            setError('Failed to logout. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, error, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
