import { useState, useEffect } from "react";
import api from "../axios";

export default function useEvenement() {
  const [evenements, setEvenements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Charger les événements
  const fetchEvenements = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/evenements");
      setEvenements(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  // Charger automatiquement au montage
  useEffect(() => {
    fetchEvenements();
  }, []);

  return { evenements, loading, error, fetchEvenements };
}
