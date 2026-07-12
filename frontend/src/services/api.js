import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


// Handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
       const refreshToken = localStorage.getItem("refresh");
        const response = await axios.post(`${API_URL}/users/refresh/`, {
          refresh: refreshToken,
        });
       localStorage.setItem("access", response.data.access);
        originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
        return api(originalRequest);
      } catch (err) {
       localStorage.removeItem("access");
localStorage.removeItem("refresh");
        window.location.href = '/login';
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (userData) => api.post('/users/register/', userData),
  login: (credentials) => api.post('/users/login/', credentials),
  getProfile: () => api.get('/users/profile/'),
  updateProfile: (data) => api.patch('/users/profile/', data),
};

// Job APIs
export const jobAPI = {
  getAll: (params) => api.get('/jobs/', { params }),
  getDetail: (id) => api.get(`/jobs/${id}/`),
  create: (data) => api.post('/jobs/', data),
  update: (id, data) => api.put(`/jobs/${id}/`, data),
  delete: (id) => api.delete(`/jobs/${id}/`),
  getCategories: () => api.get('/jobs/categories/'),
  getEmployerJobs: () => api.get('/jobs/employer/'),
};

// Application APIs
export const applicationAPI = {
  apply: (jobId, data) => api.post(`/applications/apply/${jobId}/`, data),
  getMyApplications: () => api.get('/applications/my/'),
  getEmployerApplications: () => api.get('/applications/employer/'),
  updateStatus: (id, data) => api.patch(`/applications/${id}/status/`, data),
  saveJob: (jobId) => api.post(`/applications/save/${jobId}/`),
  getSavedJobs: () => api.get('/applications/saved/'),
  unsaveJob: (jobId) => api.delete(`/applications/unsave/${jobId}/`),
};

// Chat APIs
export const chatAPI = {
  getRooms: () => api.get('/chat/rooms/'),
  createRoom: (data) => api.post('/chat/rooms/create/', data),
  getRoomDetail: (id) => api.get(`/chat/rooms/${id}/`),
  getMessages: (roomId) => api.get(`/chat/rooms/${roomId}/messages/`),
};

export default api;