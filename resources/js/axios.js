import axios from "axios";

const api = axios.create({
  baseURL: "http://10.0.0.141:8000/api",
});

// Intercepteur pour attacher le token à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
