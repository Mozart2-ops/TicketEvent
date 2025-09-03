import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Calendar } from "lucide-react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import Navbar from "./Navbar";

export default function Home() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tous");

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
    slidesToShow: 1.05,
    slidesToScroll: 1,
    centerMode: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-sans">
      {/* Hero section */}
      <motion.div 
        className="relative h-64"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <img 
          src="https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=1200" 
          alt="Hero" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent flex flex-col justify-end p-6">
          <motion.h1 
            className="text-4xl font-extrabold text-white leading-tight tracking-tight drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            🎟️ Ticket Event
          </motion.h1>
          <motion.p 
            className="text-gray-300 mt-1 text-sm font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Réservez vos événements en toute simplicité
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Link 
              to="/tickets" 
              className="mt-3 inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg transition transform hover:scale-105"
            >
              Voir mes tickets
            </Link>
          </motion.div>
        </div>

        {/* Barre de recherche flottante */}
        <motion.div 
          className="absolute -bottom-6 left-6 right-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <div className="flex items-center bg-gray-900 rounded-2xl px-3 py-2 shadow-lg border border-gray-700">
            <Search className="text-gray-400 w-5 h-5 mr-2" />
            <input 
              type="text" 
              placeholder="Rechercher un événement..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent flex-1 outline-none text-gray-100 placeholder-gray-500 text-sm"
            />
          </div>
        </motion.div>
      </motion.div>

      <div className="px-4 mt-12">
        {/* Filtres catégories */}
        <div className="flex space-x-3 overflow-x-auto mb-6 pb-2 scrollbar-hide">
          {categories.map((cat, index) => (
            <motion.button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition transform hover:scale-105 ${
                activeCategory === cat 
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md" 
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
        <h2 className="text-lg font-bold mb-4 tracking-wide">🔥 Populaires</h2>
        <Slider {...sliderSettings} className="mb-2">
          {events.map(event => (
            <motion.div 
              key={event.id}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Link to={`/event/${event.id}`} className="px-2 block">
                <div className="relative rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-60 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="bg-blue-600 text-xs px-2 py-1 rounded-full font-semibold tracking-wide">{event.category}</span>
                    <h3 className="font-bold text-lg text-white mt-1 leading-snug">{event.title}</h3>
                    <p className="text-xs text-gray-300 flex items-center mt-1">
                      <Calendar className="w-4 h-4 mr-1" /> {event.date}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </Slider>

        {/* Liste Tous les événements */}
        <h2 className="text-lg font-bold mb-4 tracking-wide">📅 Tous les événements</h2>
        <div className="space-y-5">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.01 }}
              >
                <Link 
                  to={`/event/${event.id}`} 
                  className="block rounded-2xl overflow-hidden shadow-md bg-gray-900 hover:bg-gray-800 transition relative"
                >
                  <div className="flex">
                    {/* Image + prix flottant */}
                    <div className="relative">
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-32 h-32 object-cover rounded-l-2xl"
                      />
                      <span className="absolute bottom-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-md">
                        {event.price}
                      </span>
                    </div>

                    {/* Infos */}
                    <div className="p-3 flex flex-col justify-between flex-1">
                      <div>
                        <span className="inline-block bg-gray-700 text-xs px-2 py-1 rounded-full mb-1 font-medium">
                          {event.category}
                        </span>
                        <h3 className="font-bold text-md text-white leading-snug">{event.title}</h3>
                        <p className="text-xs text-gray-400 flex items-center mt-1">
                          <Calendar className="w-4 h-4 mr-1" /> {event.date}
                        </p>
                        <p className="text-xs text-gray-400 flex items-center mt-1">
                          <MapPin className="w-4 h-4 mr-1" /> {event.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500 text-sm">Aucun événement trouvé</p>
          )}
        </div>
      </div>

      {/* Navigation fixe en bas */}
      <Navbar />
    </div>
  );
}
