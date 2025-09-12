import { useState, useEffect, useContext } from "react";
import api from "../axios";
import { AuthContext } from "../context/AuthContext";

export default function useTickets() {
  const { token } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      setError("Utilisateur non authentifié");
      setLoading(false);
      return;
    }

    const fetchTickets = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get("/tickets");
        setTickets(res.data || []); // assure un tableau même si vide
      } catch (err) {
        // Gestion des erreurs côté backend
        if (err.response) {
          if (err.response.status === 401) {
            setError("Session expirée. Veuillez vous reconnecter.");
          } else {
            setError(
              err.response.data?.message || "Impossible de charger les tickets"
            );
          }
        } else {
          setError("Impossible de charger les tickets");
        }
        setTickets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [token]);

  return { tickets, loading, error };
}
