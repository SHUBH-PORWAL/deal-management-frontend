import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          localStorage.removeItem('authToken');
          window.location.href = '/login';
          break;
        case 403:
          console.error('Access forbidden:', data.message);
          break;
        case 404:
          console.error('Resource not found:', data.message);
          break;
        case 500:
          console.error('Server error:', data.message);
          break;
        default:
          console.error('API Error:', data.message || 'Unknown error');
      }
      
      return Promise.reject(new Error(data.message || 'API request failed'));
    } else if (error.request) {
      console.error('Network error:', error.message);
      return Promise.reject(new Error('Network error. Please check your connection.'));
    } else {
      console.error('Request error:', error.message);
      return Promise.reject(error);
    }
  }
);

export const fetchDeals = async (params = {}) => {
  try {
    const response = await api.get('/deals', { params });
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchDealById = async (id) => {
  try {
    const response = await api.get(`/deals/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const createDeal = async (dealData) => {
  try {
    const response = await api.post('/deals', dealData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const fetchClients = async () => {
  try {
    const response = await api.get('/clients');
    return response;
  } catch (error) {
    throw error;
  }
};

export default api;