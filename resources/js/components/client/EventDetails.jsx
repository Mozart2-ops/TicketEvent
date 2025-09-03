import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { MapPin, Calendar, Tag, Search, X, Home as HomeIcon, Ticket, User, Star, Clock, Filter, Menu, ChevronLeft, Share, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Détection du défilement pour le header
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const event = {
    id,
    title: "Concert Gospel Madagascar",
    date: "12 Septembre 2025",
    time: "18:00 - 22:00",
    location: "Stade Mahamasina, Antananarivo",
    price: "20 000 Ar",
    category: "Concert",
    description:
      "Un événement exceptionnel avec les meilleurs artistes gospel de Madagascar. Vivez une expérience inoubliable avec de la musique, de l'émotion et une ambiance incroyable. Cet événement rassemble des talents locaux et internationaux pour une soirée de célébration et de partage.",
    longDescription: `
      Plongez dans l'univers enchanteur de la musique gospel avec les plus grandes voix de Madagascar.
      Cet événement unique vous promet une soirée remplie d'émotions, de spiritualité et de communion.

      Au programme :
      - Prestations de groupes gospel renommés
      - Chœurs traditionnels et contemporains
      - Invités surprises
      - Moment d'échange avec les artistes

      Que vous soyez un fervent admirateur de gospel ou simplement curieux de découvrir cet univers,
      cet événement saura vous emporter par sa puissance émotionnelle et son énergie communicative.

      Les portes ouvrent à 17h30, le concert commence à 18h30.
      Restauration et boissons disponibles sur place.
    `,
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1600",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    rating: 4.8,
    attendees: 1250,
    organizer: "Prod Music Mada",
    contact: "contact@prodmusicmada.mg",
    phone: "+261 34 12 345 67"
  };

  const similarEvents = [
    {
      id: 2,
      title: "Festival Jazz",
      date: "18 Septembre 2025",
      location: "Jardin d'Antaninarenina",
      price: "15 000 Ar",
      category: "Concert",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200",
    },
    {
      id: 4,
      title: "Concert Piano",
      date: "25 Septembre 2025",
      location: "Institut Français",
      price: "12 000 Ar",
      category: "Concert",
      image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1200",
    },
    {
      id: 6,
      title: "Soirée Acoustique",
      date: "5 Octobre 2025",
      location: "Cafe de la Gare",
      price: "8 000 Ar",
      category: "Concert",
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200",
    }
  ];

  const handleReserve = () => {
    if (!user) {
      localStorage.setItem("pendingEventId", id);
      navigate("/login");
    } else {
      navigate(`/payment/${id}`);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-sans">
      {/* Header fixe avec effet de flou au défilement */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900/90 backdrop-blur-md py-2 shadow-xl' : 'bg-gray-900/80 backdrop-blur-sm py-4'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Logo et bouton retour */}
          <div className="flex items-center space-x-4">
            <button onClick={() => navigate(-1)} className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition">
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Ticket className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-extrabold text-white tracking-wide hidden sm:block">
                TicketEvent
              </h1>
            </Link>
          </div>

          {/* Navigation desktop */}
          <nav className="hidden md:flex space-x-6 font-medium text-gray-300">
            <Link to="/" className="flex items-center space-x-1 hover:text-white transition hover:scale-105">
              <HomeIcon className="w-4 h-4" />
              <span>Accueil</span>
            </Link>
            <Link to="/events" className="flex items-center space-x-1 hover:text-white transition hover:scale-105">
              <Calendar className="w-4 h-4" />
              <span>Événements</span>
            </Link>
            <Link to="/tickets" className="flex items-center space-x-1 hover:text-white transition hover:scale-105">
              <Ticket className="w-4 h-4" />
              <span>Mes tickets</span>
            </Link>
            <Link to="/profile" className="flex items-center space-x-1 hover:text-white transition hover:scale-105">
              <User className="w-4 h-4" />
              <span>Profil</span>
            </Link>
          </nav>

          {/* Recherche et actions */}
          <div className="flex items-center space-x-3">
            <AnimatePresence>
              {showSearch && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 200, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="hidden md:block overflow-hidden"
                >
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Rechercher..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="pl-10 pr-4 py-2 rounded-full bg-gray-800 text-gray-100 text-sm outline-none border border-gray-700 w-full focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition hidden md:block"
            >
              {showSearch ? <X className="w-5 h-5 text-white" /> : <Search className="w-5 h-5 text-white" />}
            </button>

            {/* Menu mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition md:hidden"
            >
              <Menu className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Menu mobile déroulant */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-gray-800 border-t border-gray-700"
            >
              <div className="container mx-auto px-4 py-4">
                {/* Barre de recherche mobile */}
                <div className="relative mb-4">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 pr-4 py-2 rounded-full bg-gray-700 text-gray-100 text-sm outline-none border border-gray-600 w-full"
                  />
                </div>

                {/* Navigation mobile */}
                <nav className="flex flex-col space-y-4">
                  <Link to="/" className="flex items-center space-x-2 text-gray-300 hover:text-white transition py-2">
                    <HomeIcon className="w-5 h-5" />
                    <span>Accueil</span>
                  </Link>
                  <Link to="/events" className="flex items-center space-x-2 text-gray-300 hover:text-white transition py-2">
                    <Calendar className="w-5 h-5" />
                    <span>Événements</span>
                  </Link>
                  <Link to="/tickets" className="flex items-center space-x-2 text-gray-300 hover:text-white transition py-2">
                    <Ticket className="w-5 h-5" />
                    <span>Mes tickets</span>
                  </Link>
                  <Link to="/profile" className="flex items-center space-x-2 text-gray-300 hover:text-white transition py-2">
                    <User className="w-5 h-5" />
                    <span>Profil</span>
                  </Link>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Contenu principal avec marge pour le header fixe */}
      <main className="pt-16">
        {/* Image Hero */}
        <motion.div
          className="relative h-72 md:h-[500px] overflow-hidden"
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

          <div className="absolute bottom-6 left-6 md:left-12 right-6 md:right-12">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl md:text-4xl font-extrabold text-white drop-shadow-lg mb-2">
                  {event.title}
                </h1>
                <span className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs md:text-sm px-3 py-1.5 rounded-full font-semibold shadow-md">
                  {event.category}
                </span>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={toggleFavorite}
                  className="p-2 rounded-full bg-gray-900/70 hover:bg-gray-800 transition"
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? "text-red-500 fill-current" : "text-white"}`} />
                </button>
                <button className="p-2 rounded-full bg-gray-900/70 hover:bg-gray-800 transition">
                  <Share className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Détails */}
        <motion.div
          className="container mx-auto px-4 md:px-6 py-8 space-y-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm md:text-base">
            <div className="flex items-center space-x-3 bg-gray-900 p-4 rounded-xl">
              <div className="bg-blue-500/20 p-2 rounded-full">
                <Calendar className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-gray-400 text-xs">DATE</p>
                <p className="font-medium">{event.date}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-gray-900 p-4 rounded-xl">
              <div className="bg-green-500/20 p-2 rounded-full">
                <Clock className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-gray-400 text-xs">HORAIRE</p>
                <p className="font-medium">{event.time}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 bg-gray-900 p-4 rounded-xl">
              <div className="bg-purple-500/20 p-2 rounded-full">
                <MapPin className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-gray-400 text-xs">LIEU</p>
                <p className="font-medium">{event.location}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Colonne de gauche - Description et détails */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                className="bg-gray-900 rounded-2xl p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-xl font-bold mb-4">Description</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  {event.description}
                </p>
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {event.longDescription}
                </p>
              </motion.div>

              <motion.div
                className="bg-gray-900 rounded-2xl p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="text-xl font-bold mb-4">Médias</h2>
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <video controls className="w-full rounded-2xl border border-gray-800">
                    <source src={event.video} type="video/mp4" />
                    Votre navigateur ne supporte pas la lecture vidéo.
                  </video>
                </div>
              </motion.div>

              <motion.div
                className="bg-gray-900 rounded-2xl p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <h2 className="text-xl font-bold mb-4">Organisateur</h2>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">PM</span>
                  </div>
                  <div>
                    <p className="font-medium">{event.organizer}</p>
                    <p className="text-gray-400 text-sm">{event.contact}</p>
                    <p className="text-gray-400 text-sm">{event.phone}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Colonne de droite - Réservation et infos */}
            <div className="space-y-6">
              <motion.div
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-800 sticky top-24"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center space-x-2">
                    <Tag className="w-5 h-5 text-yellow-400" />
                    <p className="font-bold text-xl">{event.price}</p>
                  </div>
                  <div className="flex items-center space-x-1 bg-gray-800 px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm">{event.rating}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Billets disponibles</span>
                    <span className="font-medium">{event.attendees} places</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Type</span>
                    <span className="font-medium">General Admission</span>
                  </div>

                  <div className="pt-4 border-t border-gray-800">
                    <button
                      onClick={handleReserve}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-3 rounded-xl font-semibold shadow-lg transition transform hover:scale-[1.02]"
                    >
                      {user ? "Réserver maintenant" : "Se connecter pour réserver"}
                    </button>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-gray-900 rounded-2xl p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <h2 className="text-xl font-bold mb-4">Événements similaires</h2>
                <div className="space-y-4">
                  {similarEvents.map(similarEvent => (
                    <Link
                      key={similarEvent.id}
                      to={`/event/${similarEvent.id}`}
                      className="flex space-x-3 group"
                    >
                      <img
                        src={similarEvent.image}
                        alt={similarEvent.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-medium group-hover:text-blue-300 transition">{similarEvent.title}</p>
                        <p className="text-gray-400 text-sm">{similarEvent.date}</p>
                        <p className="text-blue-400 text-sm font-medium">{similarEvent.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 mt-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-lg font-bold mb-4 flex items-center">
                <Ticket className="w-5 h-5 mr-2 text-blue-400" /> TicketEvent
              </h3>
              <p className="text-sm mb-4">Votre plateforme de réservation d'événements à Madagascar</p>
            </div>

            <div>
              <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Navigation</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-sm hover:text-white transition">Accueil</Link></li>
                <li><Link to="/events" className="text-sm hover:text-white transition">Événements</Link></li>
                <li><Link to="/tickets" className="text-sm hover:text-white transition">Mes tickets</Link></li>
                <li><Link to="/profile" className="text-sm hover:text-white transition">Mon profil</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Assistance</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm hover:text-white transition">Centre d'aide</a></li>
                <li><a href="#" className="text-sm hover:text-white transition">Contact</a></li>
                <li><a href="#" className="text-sm hover:text-white transition">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Légal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm hover:text-white transition">Conditions d'utilisation</a></li>
                <li><a href="#" className="text-sm hover:text-white transition">Politique de confidentialité</a></li>
                <li><a href="#" className="text-sm hover:text-white transition">Mentions légales</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
            <p>© 2025 TicketEvent. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
