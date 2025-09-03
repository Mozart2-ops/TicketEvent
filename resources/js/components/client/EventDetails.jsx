import React from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, Calendar, Tag } from "lucide-react";
import { motion } from "framer-motion";

export default function EventDetails() {
  const { id } = useParams();

  // Exemple statique (en vrai, ça viendra de ton API Laravel plus tard)
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
    video: "https://www.w3schools.com/html/mov_bbb.mp4", // Exemple
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-sans">
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

        {/* Titre dans l’image */}
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
        {/* Infos principales */}
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

        {/* Description */}
        <motion.p
          className="text-gray-300 leading-relaxed text-sm md:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {event.description}
        </motion.p>

        {/* Vidéo */}
        <motion.div
          className="rounded-2xl overflow-hidden shadow-xl mt-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <video
            controls
            className="w-full rounded-2xl border border-gray-800"
          >
            <source src={event.video} type="video/mp4" />
            Votre navigateur ne supporte pas la lecture vidéo.
          </video>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Link
            to="/tickets"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition transform hover:scale-105"
          >
            Réserver mon ticket 🎟️
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
