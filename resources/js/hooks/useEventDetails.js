import { useState, useEffect } from "react";
import api from "../axios";

export default function useEventDetails(id) {
  const [evenement, setEvenement] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Charger les données de l'événement quand l'id change
  useEffect(() => {
    if (!id) return;

    const fetchEvenement = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get(`/evenements/${id}`);
        setEvenement(res.data);
      } catch (err) {
        setError("Impossible de charger l'événement");
      } finally {
        setLoading(false);
      }
    };

    fetchEvenement();
  }, [id]);

  return { evenement, loading, error };
}
