import axios from "axios";

const api = axios.create({
  baseURL: "http://10.0.0.141:8000/api", // URL de ton backend Laravel
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: false, // Mets true si tu utilises des cookies (sanctum)
});

// 🔹 Intercepteur pour gérer les erreurs globalement (optionnel)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Exemple : si token expiré => logout
    if (error.response && error.response.status === 401) {
      console.error("Non autorisé, token expiré ou invalide");
    }
    return Promise.reject(error);
  }
);

export default api;
