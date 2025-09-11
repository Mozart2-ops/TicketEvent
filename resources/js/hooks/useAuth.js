import { useState, useContext } from "react";
import api from "../axios"; // ton axios centralisé avec baseURL
import { AuthContext } from "../context/AuthContext";

export default function useAuth() {
  const { login: contextLogin, logout: contextLogout } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const login = async (data) => {
    setLoading(true);
    setErrors({});
    setSuccess("");
    try {
      const res = await api.post("/login", data);
      //user ici est un objet qui contient tout les informations du client
      const user = res.data.user;
      const token = res.data.token;
      contextLogin(user, token);
      setSuccess("Connexion réussie !");
      return res.data;
    } catch (err) {
      setErrors({ general: err.response?.data?.message || err.message });
    } finally {
      setLoading(false);
    }
  };

  const register = async (data) => {
    setLoading(true);
    setErrors({});
    setSuccess("");
    try {
      const res = await api.post("/register", data);
      const user = res.data.user;
      const token = res.data.token;
      contextLogin(user, token);
      setSuccess("Inscription réussie !");
      return res.data;
    } catch (err) {
      setErrors({ general: err.response?.data?.message || err.message });
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    contextLogout();
  };

  return { login, register, logout, loading, errors, success };
}
