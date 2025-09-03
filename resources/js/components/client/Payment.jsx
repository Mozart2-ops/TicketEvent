import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";

export default function Payment() {
  const { eventId } = useParams();
  const { user } = useContext(AuthContext); // récupère nom/email depuis login/register
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [tickets, setTickets] = useState(1);
  const [mvolaPassword, setMvolaPassword] = useState("");

  const handlePayment = (e) => {
    e.preventDefault();

    // ⚡ Ici on enverra les infos à l’API Laravel (paiement Mvola)
    console.log({
      eventId,
      name: user?.name,
      phone,
      tickets,
      mvolaPassword,
    });

    alert("Paiement en cours...");
    navigate("/tickets"); // après succès, rediriger vers ses tickets
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-200 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-900 rounded-2xl shadow-xl p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Paiement du billet 🎟️
        </h2>

        <form onSubmit={handlePayment} className="space-y-4">
          {/* Nom (prérempli) */}
          <div>
            <label className="block text-sm mb-1">Nom</label>
            <input
              type="text"
              value={user?.name || ""}
              disabled
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-300"
            />
          </div>

          {/* Numéro téléphone */}
          <div>
            <label className="block text-sm mb-1">Numéro téléphone</label>
            <input
              type="text"
              placeholder="Ex: 0341234567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-300"
            />
          </div>

          {/* Nombre de billets */}
          <div>
            <label className="block text-sm mb-1">Nombre de billets</label>
            <input
              type="number"
              min="1"
              value={tickets}
              onChange={(e) => setTickets(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-300"
            />
          </div>

          {/* Mot de passe Mvola */}
          <div>
            <label className="block text-sm mb-1">Mot de passe Mvola</label>
            <input
              type="password"
              placeholder="••••••"
              value={mvolaPassword}
              onChange={(e) => setMvolaPassword(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-300"
            />
          </div>

          {/* Bouton payer */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white px-4 py-2 rounded-lg font-semibold shadow-lg transition"
          >
            Payer maintenant
          </button>
        </form>
      </motion.div>
    </div>
  );
}
