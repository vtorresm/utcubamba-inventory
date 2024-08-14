import create from 'zustand';
import { auth } from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  isLoggedIn: !!localStorage.getItem('token'),
  
  login: async (email: string, password: string) => {
    try {
      const { token, user } = await auth.login(email, password);
      localStorage.setItem('token', token);
      set({ user, token, isLoggedIn: true });
    } catch (error) {
      throw error;
    }
  },
  
  register: async (name: string, email: string, password: string) => {
    try {
      const { token, user } = await auth.register(name, email, password);
      localStorage.setItem('token', token);
      set({ user, token, isLoggedIn: true });
    } catch (error) {
      throw error;
    }
  },
  
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, isLoggedIn: false });
  }
}));

export default useAuthStore;