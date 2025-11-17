import axios from 'axios';


// Base URL for API
const API_URL = process.env.REACT_APP_API_URL || 'https://resource-board-backend.onrender.com/api';


// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (userData) => api.post('/auth/login', userData)
};

// Resource API calls
export const resourceAPI = {
  getAllResources: () => api.get('/resources'),
  getResourceById: (id) => api.get(`/resources/${id}`),
  createResource: (resourceData) => api.post('/resources', resourceData),
  updateResource: (id, resourceData) => api.put(`/resources/${id}`, resourceData),
  deleteResource: (id) => api.delete(`/resources/${id}`),
  getMyResources: () => api.get('/resources/user/my-resources')
};

export default api;
