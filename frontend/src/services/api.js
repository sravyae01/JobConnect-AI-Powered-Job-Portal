import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://jobconnect-ai-powered-job-portal.onrender.com/api";

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach Access Token Automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Refresh Token Automatically
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem("refresh");

        if (!refresh) {
          throw new Error("No Refresh Token");
        }

        const response = await axios.post(
          `${API_URL}/users/refresh/`,
          {
            refresh,
          }
        );

        localStorage.setItem(
          "access",
          response.data.access
        );

        originalRequest.headers.Authorization =
          `Bearer ${response.data.access}`;

        return api(originalRequest);

      } catch (err) {

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");

        window.location.href = "/login";

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

// ================= AUTH =================

export const authAPI = {
  register: (userData) =>
    api.post("/users/register/", userData),

  login: (credentials) =>
    api.post("/users/login/", credentials),

  getProfile: () =>
    api.get("/users/profile/"),

  updateProfile: (data) =>
    api.patch("/users/profile/", data),
};

// ================= JOBS =================

export const jobAPI = {
  getAll: (params) =>
    api.get("/jobs/", { params }),

  getDetail: (id) =>
    api.get(`/jobs/${id}/`),

  create: (data) =>
    api.post("/jobs/", data),

  update: (id, data) =>
    api.put(`/jobs/${id}/`, data),

  delete: (id) =>
    api.delete(`/jobs/${id}/`),

  getCategories: () =>
    api.get("/jobs/categories/"),

  getEmployerJobs: () =>
    api.get("/jobs/employer/"),

  getPopularSearches: () =>
    api.get("/jobs/popular-searches/"),
};

// ================= APPLICATIONS =================

export const applicationAPI = {
  apply: (jobId, data) =>
    api.post(`/applications/apply/${jobId}/`, data),

  getMyApplications: () =>
    api.get("/applications/my/"),

  getEmployerApplications: () =>
    api.get("/applications/employer/"),

  updateStatus: (id, data) =>
    api.patch(`/applications/${id}/status/`, data),

  saveJob: (jobId) =>
    api.post(`/applications/save/${jobId}/`),

  getSavedJobs: () =>
    api.get("/applications/saved/"),

  unsaveJob: (jobId) =>
    api.delete(`/applications/unsave/${jobId}/`),
};

// ================= CHAT =================

export const chatAPI = {
  getRooms: () =>
    api.get("/chat/rooms/"),

  createRoom: (data) =>
    api.post("/chat/rooms/create/", data),

  getRoomDetail: (id) =>
    api.get(`/chat/rooms/${id}/`),

  getMessages: (roomId) =>
    api.get(`/chat/rooms/${roomId}/messages/`),
};

export default api;