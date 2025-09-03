import React from "react";
import { Calendar, MapPin, Search, X, Home as HomeIcon, Ticket, User } from "lucide-react";
import QRCode from "react-qr-code";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Tickets() {
  const [showSearch, setShowSearch] = React.useState(false);
  const [search, setSearch] = React.useState("");

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
    <div className="min-h-screen bg-gray-950 text-gray-200 font-sans pb-10">
      {/* ✅ Header en haut comme Home */}
      <div className="sticky top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-6 py-4 bg-gradient-to-b from-black/80 to-black/40 backdrop-blur-md">
        {/* Logo */}
        <h1 className="text-lg md:text-2xl font-extrabold text-white tracking-wide drop-shadow-lg">
          🎟️ TicketEvent
        </h1>

        {/* Navigation */}
                 <nav className="flex space-x-4 md:space-x-6 font-semibold text-gray-300 text-sm md:text-base">
                   <Link to="/" className="flex items-center space-x-1 hover:text-white transition">
                     <HomeIcon className="w-4 h-4" />
                     <span>Accueil</span>
                   </Link>
                   <Link to="/tickets" className="flex items-center space-x-1 hover:text-white transition">
                     <Ticket className="w-4 h-4" />
                     <span>Tickets</span>
                   </Link>
                   <Link to="/profile" className="flex items-center space-x-1 hover:text-white transition">
                     <User className="w-4 h-4" />
                     <span>Profil</span>
                   </Link>
                 </nav>

        {/* Recherche */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="p-2 rounded-full bg-gray-900/70 hover:bg-gray-800 transition"
          >
            {showSearch ? <X className="w-5 h-5 text-white" /> : <Search className="w-5 h-5 text-white" />}
          </button>

          <AnimatePresence>
            {showSearch && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 200, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <input
                  type="text"
                  placeholder="Rechercher un ticket..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="px-3 py-1 rounded-lg bg-gray-900 text-gray-100 text-sm outline-none border border-gray-700 w-full"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ✅ Contenu Tickets */}
      <div className="px-4 md:px-12 py-8">
        <h1 className="text-xl md:text-3xl font-bold mb-6">🎟️ Mes Tickets</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map(ticket => (
            <motion.div
              key={ticket.id}
              className="bg-gray-900 rounded-2xl shadow-lg overflow-hidden flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Image événement */}
              <img
                src={ticket.image}
                alt={ticket.event}
                className="w-full h-40 sm:h-48 object-cover"
              />

              {/* Infos ticket */}
              <div className="p-4 flex-1 flex flex-col">
                <h2 className="font-bold text-lg md:text-xl">{ticket.event}</h2>
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
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
