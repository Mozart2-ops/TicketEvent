import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import useTickets from "../../hooks/useTickets";
import { motion } from "framer-motion";
import { Download, Calendar, MapPin, Clock, User } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

export default function Ticket({ billet }) {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { tickets, loading, error } = useTickets();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-200 flex items-center justify-center">
        <p>Chargement des tickets...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-200 flex items-center justify-center">
        <p>{error}</p>
      </div>
    );
  }

  // Filtrer les tickets pour un ID spécifique si fourni
  const filteredTickets = id
    ? tickets.filter(ticket => ticket.id === parseInt(id))
    : tickets;

  if (filteredTickets.length === 0) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-200 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Aucun ticket trouvé</h1>
          <p className="text-gray-400">Le ticket que vous recherchez n'existe pas.</p>
        </div>
      </div>
    );
  }

  const handleDownload = (ticketId) => {
    alert(`Téléchargement du ticket ${ticketId} bientôt disponible!`);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 py-8">
      <div className="container mx-auto px-4 max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="text-2xl font-bold">
            {id ? "Votre billet" : "Vos billets"}
          </h1>
          <p className="text-gray-400">
            {id ? "Présentez ce billet à l'entrée" : "Tous vos billets achetés"}
          </p>
        </motion.div>

        {filteredTickets.map((ticket, index) => (
          <motion.div
            key={ticket.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl overflow-hidden shadow-2xl mb-6"
          >
            <div className="p-6 text-white">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold">{ticket.evenement?.titre}</h2>
                  <p className="text-blue-100 text-sm">#{ticket.id}</p>
                </div>
                <button
                  onClick={() => handleDownload(ticket.id)}
                  className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition"
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>

              <div className="flex justify-center mb-6">
                <div className="bg-white p-4 rounded-xl">
                 <QRCodeCanvas value={ticket.qr_code} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">{ticket.evenement?.dateEvenement}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="text-sm">{ticket.evenement?.heure}</span>
                </div>
                <div className="flex items-center col-span-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">{ticket.evenement?.lieu}</span>
                </div>
                <div className="flex items-center col-span-2">
                  <User className="w-4 h-4 mr-2" />
                  <span className="text-sm">{user?.prenom || user?.nom || "Utilisateur"}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-white/20">
                <div>
                  <p className="text-sm text-blue-100">Type</p>
                  <p className="font-medium">{ticket.billet_type || "Général"}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-blue-100">Prix</p>
                  <p className="font-medium">{ticket.evenement?.tarif?.montant}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 p-5">
              <h3 className="font-semibold mb-4 text-white">Informations importantes</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 mr-3"></div>
                  <span>Ce billet est valable pour une seule personne</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 mr-3"></div>
                  <span>Présentez votre billet numérique ou imprimé à l'entrée</span>
                </li>
                <li className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 mr-3"></div>
                  <span>Arrivez au moins 30 minutes avant le début de l'événement</span>
                </li>
              </ul>

              <div className="mt-6 pt-4 border-t border-gray-800">
                <p className="text-xs text-gray-500">
                  Référence: {ticket.id} • Acheté le {ticket.date_de_payment}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
