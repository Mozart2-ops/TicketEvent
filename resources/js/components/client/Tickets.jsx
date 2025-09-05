import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";
import {
  Download,
  Calendar,
  MapPin,
  Clock,
  User,
  QrCode
} from "lucide-react";

export default function Ticket() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  // Données simulées des tickets (tableau d'objets)
  const tickets = [
    {
      id: "TKT-2025-001",
      event: "Concert Gospel Madagascar",
      date: "12 Septembre 2025",
      time: "18:00",
      location: "Stade Mahamasina",
      price: "20 000 Ar",
      seat: "Général Admission",
      orderId: "CMD-2025-001",
      purchaseDate: "10 Septembre 2025",
      qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TKT-2025-001"
    },
    {
      id: "TKT-2025-002",
      event: "Festival Jazz Antananarivo",
      date: "15 Octobre 2025",
      time: "19:30",
      location: "Jardin d'Andohalo",
      price: "25 000 Ar",
      seat: "VIP Zone A",
      orderId: "CMD-2025-002",
      purchaseDate: "05 Octobre 2025",
      qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TKT-2025-002"
    },
    {
      id: "TKT-2025-003",
      event: "Spectacle Traditionnel",
      date: "20 Novembre 2025",
      time: "16:00",
      location: "Palais de la Reine",
      price: "15 000 Ar",
      seat: "Zone Standard",
      orderId: "CMD-2025-003",
      purchaseDate: "12 Novembre 2025",
      qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=TKT-2025-003"
    }
  ];

  // Si un ID spécifique est fourni dans l'URL, filtrer les tickets
  const filteredTickets = id
    ? tickets.filter(ticket => ticket.id === id)
    : tickets;

  const handleDownload = (ticketId) => {
    // Logique pour télécharger un ticket spécifique
    alert(`Téléchargement du ticket ${ticketId} bientôt disponible!`);
  };

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

        {/* Liste des tickets */}
        {filteredTickets.map((ticket, index) => (
          <motion.div
            key={ticket.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl overflow-hidden shadow-2xl mb-6"
          >
            <div className="p-6 text-white">
              {/* En-tête */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold">{ticket.event}</h2>
                  <p className="text-blue-100 text-sm">#{ticket.id}</p>
                </div>
                <button
                  onClick={() => handleDownload(ticket.id)}
                  className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition"
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>

              {/* QR Code */}
              <div className="flex justify-center mb-6">
                <div className="bg-white p-4 rounded-xl">
                  <img
                    src={ticket.qrCode}
                    alt="QR Code"
                    className="w-40 h-40 mx-auto"
                  />
                </div>
              </div>

              {/* Détails du ticket */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">{ticket.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="text-sm">{ticket.time}</span>
                </div>
                <div className="flex items-center col-span-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">{ticket.location}</span>
                </div>
                <div className="flex items-center col-span-2">
                  <User className="w-4 h-4 mr-2" />
                  <span className="text-sm">{user?.prenom || user?.nom || user?.email || "Utilisateur"}</span>
                </div>
              </div>

              {/* Type de billet et prix */}
              <div className="flex justify-between items-center pt-4 border-t border-white/20">
                <div>
                  <p className="text-sm text-blue-100">Type</p>
                  <p className="font-medium">{ticket.seat}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-blue-100">Prix</p>
                  <p className="font-medium">{ticket.price}</p>
                </div>
              </div>
            </div>

            {/* Informations supplémentaires pour chaque ticket */}
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
                  Référence: {ticket.orderId} • Acheté le {ticket.purchaseDate}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
