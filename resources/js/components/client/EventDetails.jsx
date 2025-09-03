import React, { useContext, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { MapPin, Calendar, Tag, Search, X, Home as HomeIcon, Ticket, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../../context/AuthContext"; // ✅ ajout

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // ✅ récupérer utilisateur

  const event = {
    id,
    title: "Concert Gospel Madagascar",
    date: "12 Septembre 2025",
    location: "Stade Mahamasina",
    price: "20 000 Ar",
    category: "Concert",
    description:
      "Un événement exceptionnel avec les meilleurs artistes gospel de Madagascar. Vivez une expérience inoubliable avec de la musique, de l'émotion et une ambiance incroyable.",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1600",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
  };

  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");

  const handleReserve = () => {
  if (!user) {
    // stocker l'événement en cours avant login
    localStorage.setItem("pendingEventId", id);
    navigate("/login");
  } else {
    navigate(`/payment/${id}`);
  }
};


  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-sans">
      {/* Header (navbar + recherche) */}
      <div className="sticky top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-6 py-4 bg-gradient-to-b from-black/80 to-black/40 backdrop-blur-md">
        <h1 className="text-lg md:text-2xl font-extrabold text-white tracking-wide drop-shadow-lg">
          🎟️ TicketEvent
        </h1>

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
                  placeholder="Rechercher..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="px-3 py-1 rounded-lg bg-gray-900 text-gray-100 text-sm outline-none border border-gray-700 w-full"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Image Hero */}
      <motion.div
        className="relative h-72 md:h-[400px] overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent"></div>

        <div className="absolute bottom-6 left-6 md:left-12">
          <h1 className="text-2xl md:text-4xl font-extrabold text-white drop-shadow-lg">
            {event.title}
          </h1>
          <span className="mt-2 inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs md:text-sm px-3 py-1 rounded-full font-semibold shadow-md">
            {event.category}
          </span>
        </div>
      </motion.div>

      {/* Détails */}
      <motion.div
        className="px-6 md:px-16 py-8 space-y-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm md:text-base">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-blue-400" />
            <p>{event.date}</p>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-green-400" />
            <p>{event.location}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Tag className="w-5 h-5 text-yellow-400" />
            <p className="font-semibold">{event.price}</p>
          </div>
        </div>

        <motion.p
          className="text-gray-300 leading-relaxed text-sm md:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {event.description}
        </motion.p>

        <motion.div
          className="rounded-2xl overflow-hidden shadow-xl mt-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <video controls className="w-full rounded-2xl border border-gray-800">
            <source src={event.video} type="video/mp4" />
            Votre navigateur ne supporte pas la lecture vidéo.
          </video>
        </motion.div>

        {/* CTA Réservation protégée */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <button
            onClick={handleReserve}
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition transform hover:scale-105"
          >
            Réserver mon ticket 🎟️
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
