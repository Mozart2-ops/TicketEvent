import { useState } from "react";
import api from "../axios"; // ton instance axios configurée avec baseURL et headers

export default function usePayment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ticket, setTicket] = useState(null);

  const makePayment = async ({ evenement_id, methode }) => {
  setLoading(true);
  setError(null);

  try {
    const token = localStorage.getItem("token");

    const res = await api.post(
      "/payments",
      { evenement_id, methode }, // envoi de la méthode de paiement
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setTicket(res.data.ticket);
    setLoading(false);
    return res.data;
  } catch (err) {
    setError(err.response?.data?.message || err.message);
    setLoading(false);
    return null;
  }
};

  return { makePayment, loading, error, ticket };
}
