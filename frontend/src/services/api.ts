import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  register: async (name: string, email: string, password: string) => {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
  }
};

export const medications = {
  getAll: async () => {
    const response = await api.get('/medications');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/medications/${id}`);
    return response.data;
  },
  create: async (medicationData: any) => {
    const response = await api.post('/medications', medicationData);
    return response.data;
  },
  update: async (id: string, medicationData: any) => {
    const response = await api.put(`/medications/${id}`, medicationData);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/medications/${id}`);
    return response.data;
  }
};

export const orders = {
  getAll: async () => {
    const response = await api.get('/orders');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },
  create: async (orderData: any) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },
  update: async (id: string, orderData: any) => {
    const response = await api.put(`/orders/${id}`, orderData);
    return response.data;
  }
};

export default api;