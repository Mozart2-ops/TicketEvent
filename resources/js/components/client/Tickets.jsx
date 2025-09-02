import React from "react";
import { Calendar, MapPin } from "lucide-react";
import QRCode from "react-qr-code";

export default function Tickets() {
  // Exemple de tickets (à remplacer par données backend)
  const tickets = [
    {
      id: 1,
      event: "Concert Gospel Madagascar",
      date: "12 Septembre 2025",
      location: "Stade Mahamasina",
      category: "VIP",
      price: "50 000 Ar",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800",
      code: "TICKET-12345-ABCDE"
    },
    {
      id: 2,
      event: "Match Barea",
      date: "20 Septembre 2025",
      location: "Mahamasina Arena",
      category: "Standard",
      price: "15 000 Ar",
      image: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?w=800",
      code: "TICKET-67890-FGHJK"
    }
  ];

  return (
    <div className="p-4 min-h-screen bg-gray-950 text-gray-200">
      <h1 className="text-xl font-bold mb-6">🎟️ Mes Tickets</h1>

      <div className="space-y-6">
        {tickets.map(ticket => (
          <div
            key={ticket.id}
            className="bg-gray-900 rounded-2xl shadow-lg overflow-hidden"
          >
            {/* Image événement */}
            <img
              src={ticket.image}
              alt={ticket.event}
              className="w-full h-40 object-cover"
            />

            {/* Infos ticket */}
            <div className="p-4">
              <h2 className="font-bold text-lg">{ticket.event}</h2>
              <div className="flex items-center text-sm text-gray-400 mt-1">
                <Calendar className="w-4 h-4 mr-1" /> {ticket.date}
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <MapPin className="w-4 h-4 mr-1" /> {ticket.location}
              </div>

              <div className="flex justify-between items-center mt-3">
                <span className="bg-blue-600 text-xs px-3 py-1 rounded-full">
                  {ticket.category}
                </span>
                <span className="text-green-400 font-bold">{ticket.price}</span>
              </div>

              {/* QR Code */}
              <div className="flex justify-center mt-4 bg-gray-800 rounded-xl p-3">
                <QRCode
                  value={ticket.code}
                  size={120}
                  bgColor="transparent"
                  fgColor="#00FF88"
                />
              </div>

              <p className="text-xs text-center text-gray-500 mt-2">
                Code unique : {ticket.code}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
