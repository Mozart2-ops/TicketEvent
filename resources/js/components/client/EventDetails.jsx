import React from "react";
import { useParams } from "react-router-dom";

export default function EventDetails() {
  const { id } = useParams();

  // Exemple de données (à remplacer plus tard par l’API Laravel)
  const event = {
    id,
    title: "Concert Gospel Madagascar",
    date: "12 Septembre 2025",
    location: "Stade Mahamasina, Antananarivo",
    organizer: "Association Gospel Mada",
    price: "20 000 Ar",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800",
    video: "https://www.youtube.com/embed/ScMzIvxBSi4", // exemple
    description: `
      Venez vibrer au rythme du Gospel lors d’un concert exceptionnel réunissant
      les meilleures chorales de Madagascar et des artistes internationaux.
      Un spectacle unique qui promet une soirée pleine d’émotions et d’énergie.
    `,
    tickets: [
      { type: "Standard", price: "20 000 Ar", remaining: 120 },
      { type: "VIP", price: "50 000 Ar", remaining: 30 },
    ]
  };

  return (
    <div className="p-4 min-h-screen bg-gray-900 text-gray-200">
      {/* Image de couverture */}
      <div className="rounded-xl overflow-hidden shadow-lg mb-4">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover"
        />
      </div>

      {/* Titre & infos principales */}
      <h1 className="text-2xl font-bold text-white">{event.title}</h1>
      <p className="text-gray-400 mt-1">{event.date} • {event.location}</p>
      <p className="text-sm text-gray-500">Organisé par {event.organizer}</p>

      {/* Vidéo de présentation */}
      <div className="mt-4 rounded-xl overflow-hidden shadow-md">
        <iframe
          width="100%"
          height="200"
          src={event.video}
          title="Présentation de l'événement"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full"
        ></iframe>
      </div>

      {/* Description */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold text-white">À propos de l’événement</h2>
        <p className="mt-2 text-gray-300 leading-relaxed whitespace-pre-line">
          {event.description}
        </p>
      </div>

      {/* Catégories de tickets */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold text-white">Tickets disponibles</h2>
        <div className="space-y-2 mt-2">
          {event.tickets.map((ticket, index) => (
            <div key={index} className="flex justify-between items-center bg-gray-800 p-3 rounded-lg">
              <div>
                <p className="font-semibold">{ticket.type}</p>
                <p className="text-sm text-gray-400">{ticket.remaining} restants</p>
              </div>
              <span className="text-green-400 font-bold">{ticket.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bouton d'achat */}
      <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold shadow-md">
        Acheter un ticket
      </button>
    </div>
  );
}
