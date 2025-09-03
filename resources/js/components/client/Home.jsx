import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Calendar, X, Home as HomeIcon, Ticket, User } from "lucide-react";
import Slider from "react-slick";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [showSearch, setShowSearch] = useState(false);

  const events = [
    { 
      id: 1, 
      title: "Concert Gospel Madagascar", 
      date: "12 Septembre 2025", 
      location: "Stade Mahamasina", 
      price: "20 000 Ar", 
      category: "Concert",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200"
    },
    { 
      id: 2, 
      title: "Match Barea", 
      date: "20 Septembre 2025", 
      location: "Mahamasina Arena", 
      price: "15 000 Ar", 
      category: "Sport",
      image: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?w=1200"
    },
    { 
      id: 3, 
      title: "Festival Mada Music", 
      date: "30 Septembre 2025", 
      location: "Antananarivo", 
      price: "25 000 Ar", 
      category: "Festival",
      image: "https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=1200"
    }
  ];

  const categories = ["Tous", "Concert", "Sport", "Festival"];

  const filteredEvents = events.filter(event =>
    (activeCategory === "Tous" || event.category === activeCategory) &&
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1.2,
    slidesToScroll: 1,
    centerMode: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 1440, settings: { slidesToShow: 3 } }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-sans">
      {/* Hero avec header intégré */}
      <motion.div 
        className="relative h-80 md:h-[500px] overflow-hidden"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <img 
          src="https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=1600" 
          alt="Hero" 
          className="w-full h-full object-cover scale-105"
        />

        {/* Overlay animé */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/50 to-transparent"
          animate={{ opacity: [0.9, 0.7, 0.9] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Header intégré */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 md:px-6 py-4 bg-gradient-to-b from-black/60 to-transparent">
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

        {/* Texte Hero */}
        <div className="absolute bottom-10 left-6 md:left-12 max-w-xl">
          <h2 className="text-2xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-lg">
            Réservez vos événements <br /> en toute simplicité
          </h2>
          <Link 
            to="/tickets" 
            className="mt-5 inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white px-6 py-3 rounded-full text-sm md:text-lg font-semibold shadow-lg transition transform hover:scale-105"
          >
            🎫 Voir mes tickets
          </Link>
        </div>
      </motion.div>

      {/* Filtres catégories */}
      <div className="px-4 md:px-12 mt-10">
        <div className="flex space-x-3 overflow-x-auto mb-6 pb-2 scrollbar-hide">
          {categories.map((cat, index) => (
            <motion.button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm md:text-base font-medium whitespace-nowrap transition transform hover:scale-110 ${
                activeCategory === cat 
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg" 
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Carrousel Populaires */}
        <h2 className="text-lg md:text-2xl font-bold mb-4 tracking-wide">🔥 Populaires</h2>
        <Slider {...sliderSettings} className="mb-10">
          {events.map(event => (
            <motion.div 
              key={event.id}
              whileHover={{ scale: 1.05, rotate: -1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Link to={`/event/${event.id}`} className="px-2 block">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-60 md:h-72 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="bg-blue-600 text-xs px-2 py-1 rounded-full font-semibold tracking-wide shadow-md">
                      {event.category}
                    </span>
                    <h3 className="font-bold text-lg md:text-xl text-white mt-1 leading-snug drop-shadow-md">
                      {event.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-300 flex items-center mt-1">
                      <Calendar className="w-4 h-4 mr-1" /> {event.date}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </Slider>

        {/* Tous les événements */}
        <h2 className="text-lg md:text-2xl font-bold mb-4 tracking-wide">📅 Tous les événements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.03, rotate: 1 }}
              >
                <Link 
                  to={`/event/${event.id}`} 
                  className="block rounded-2xl overflow-hidden shadow-xl bg-gray-900 hover:bg-gray-800 transition relative"
                >
                  <div className="relative">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-48 object-cover"
                    />
                    <span className="absolute bottom-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-md">
                      {event.price}
                    </span>
                  </div>
                  <div className="p-4">
                    <span className="inline-block bg-gray-700 text-xs px-2 py-1 rounded-full mb-1 font-medium">
                      {event.category}
                    </span>
                    <h3 className="font-bold text-md md:text-lg text-white leading-snug">{event.title}</h3>
                    <p className="text-xs md:text-sm text-gray-400 flex items-center mt-1">
                      <Calendar className="w-4 h-4 mr-1" /> {event.date}
                    </p>
                    <p className="text-xs md:text-sm text-gray-400 flex items-center mt-1">
                      <MapPin className="w-4 h-4 mr-1" /> {event.location}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500 text-sm col-span-full">Aucun événement trouvé</p>
          )}
        </div>
      </div>
    </div>
  );
}
