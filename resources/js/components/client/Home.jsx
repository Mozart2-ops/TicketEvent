import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Calendar } from "lucide-react";
import Slider from "react-slick";

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

  // Filtrage
  const filteredEvents = events.filter(event =>
    (activeCategory === "Tous" || event.category === activeCategory) &&
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  // Paramètres du carrousel
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1.05,
    slidesToScroll: 1,
    centerMode: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3500,
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200">
      {/* Hero section */}
      <div className="relative h-64 mb-10">
        <img
          src="https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=1200"
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent flex flex-col justify-end p-6">
          <h1 className="text-3xl font-bold text-white drop-shadow">🎟️ Ticket Event</h1>
          <p className="text-gray-300 mt-1 text-sm">Réservez vos événements en un clic</p>
          <Link
            to="/tickets"
            className="mt-3 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-semibold shadow transition transform hover:scale-105"
          >
            Voir mes tickets
          </Link>
        </div>

        {/* Barre de recherche flottante */}
        <div className="absolute -bottom-6 left-6 right-6">
          <div className="flex items-center bg-gray-800 rounded-xl px-3 py-2 shadow-lg">
            <Search className="text-gray-400 w-5 h-5 mr-2" />
            <input
              type="text"
              placeholder="Rechercher un événement..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent flex-1 outline-none text-gray-200 placeholder-gray-500"
            />
          </div>
        </div>
      </div>

      <div className="px-4 mt-10">
        {/* Filtres catégories */}
        <div className="flex space-x-3 overflow-x-auto mb-6 pb-2 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm whitespace-nowrap transition transform hover:scale-105 ${
                activeCategory === cat
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Carrousel Populaires */}
        <h2 className="text-lg font-bold mb-3">🔥 Populaires</h2>
        <Slider {...sliderSettings} className="mb-2">
          {events.map(event => (
            <Link
              key={event.id}
              to={`/event/${event.id}`}
              className="px-2"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-60 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="bg-blue-600 text-xs px-2 py-1 rounded-full">{event.category}</span>
                  <h3 className="font-bold text-lg text-white mt-1">{event.title}</h3>
                  <p className="text-sm text-gray-300 flex items-center">
                    <Calendar className="w-4 h-4 mr-1" /> {event.date}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </Slider>

        {/* Liste Tous les événements */}
        <h2 className="text-lg font-bold mb-2">📅 Tous les événements</h2>
        <div className="space-y-5">
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <Link
                key={event.id}
                to={`/event/${event.id}`}
                className="block rounded-2xl overflow-hidden shadow-md bg-gray-900 hover:bg-gray-800 transition transform hover:scale-[1.01]"
              >
                <div className="flex">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-32 h-32 object-cover rounded-l-2xl"
                  />
                  <div className="p-3 flex flex-col justify-between flex-1">
                    <div>
                      <span className="inline-block bg-gray-700 text-xs px-2 py-1 rounded-full mb-1">
                        {event.category}
                      </span>
                      <h3 className="font-bold text-md text-white">{event.title}</h3>
                      <p className="text-sm text-gray-400 flex items-center">
                        <Calendar className="w-4 h-4 mr-1" /> {event.date}
                      </p>
                      <p className="text-sm text-gray-400 flex items-center">
                        <MapPin className="w-4 h-4 mr-1" /> {event.location}
                      </p>
                    </div>
                    <p className="text-green-400 font-bold text-right">{event.price}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500">Aucun événement trouvé</p>
          )}
        </div>
      </div>
    </div>
  );
}
