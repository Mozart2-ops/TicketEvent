import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  Search, MapPin, Calendar, X, Home as HomeIcon,
  Ticket, User, Star, Clock, ChevronRight, Filter,
  Menu, Heart, Eye, LogOut, Settings, Bell, CreditCard,
  QrCode, BarChart3, Users, Download, Scan
} from "lucide-react";
import Slider from "react-slick";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  // ===== ÉTATS (STATES) =====
  const { user, logout, userRole } = useContext(AuthContext);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [showSearch, setShowSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // ===== EFFETS (USE EFFECT) =====
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Simuler un appel API avec un délai
    const timer = setTimeout(() => {
      setFeaturedEvents(events.slice(0, 3));
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // ===== DONNÉES DES ÉVÉNEMENTS =====
  const events = [
    {
      id: 1,
      title: "Concert Gospel Madagascar",
      date: "12 Septembre 2025",
      time: "18:00",
      location: "Stade Mahamasina",
      price: "20 000 Ar",
      category: "Concert",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200",
      rating: 4.8,
      attendees: 1250,
      views: 2450,
      ticketsAvailable: 150
    },
    {
      id: 2,
      title: "Match Barea vs Sénégal",
      date: "20 Septembre 2025",
      time: "15:30",
      location: "Mahamasina Arena",
      price: "15 000 Ar",
      category: "Sport",
      image: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?w=1200",
      rating: 4.9,
      attendees: 3500,
      views: 5200,
      ticketsAvailable: 200
    },
    {
      id: 3,
      title: "Festival Mada Music",
      date: "30 Septembre 2025",
      time: "10:00 - 22:00",
      location: "Jardin d'Antaninarenina",
      price: "25 000 Ar",
      category: "Festival",
      image: "https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=1200",
      rating: 4.7,
      attendees: 2800,
      views: 4300,
      ticketsAvailable: 75
    }
  ];

  const categories = ["Tous", "Concert", "Sport", "Festival", "Théâtre", "Exposition"];

  // ===== FONCTIONS DE FILTRAGE =====
  const filteredEvents = events.filter(event =>
    (activeCategory === "Tous" || event.category === activeCategory) &&
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  const trendingEvents = [...events].sort((a, b) => b.views - a.views).slice(0, 3);

  // ===== CONFIGURATION DU SLIDER =====
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
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.1,
          centerMode: false
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2.5,
          centerMode: true
        }
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3.2,
          centerMode: true
        }
      }
    ]
  };

  // ===== COMPOSANTS DE CHARGEMENT (SKELETON) =====
  const EventCardSkeleton = () => (
    <div className="rounded-2xl overflow-hidden shadow-xl bg-gray-900 animate-pulse">
      <div className="w-full h-48 bg-gray-800"></div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-800 rounded w-1/3"></div>
        <div className="h-6 bg-gray-800 rounded w-2/3"></div>
        <div className="h-4 bg-gray-800 rounded w-1/2"></div>
        <div className="h-4 bg-gray-800 rounded w-1/2"></div>
      </div>
    </div>
  );

  // ===== FONCTIONS DE NAVIGATION SPÉCIFIQUES AU RÔLE =====
  const handleRoleNavigation = () => {
    if (userRole === "admin") {
      navigate("/admin/dashboard");
    } else if (userRole === "organizer") {
      navigate("/organizer/events");
    } else {
      navigate("/events");
    }
  };

  // ===== RENDU PRINCIPAL =====
  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 font-sans">
      {/* ===== HEADER/NAVBAR ===== */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900/90 backdrop-blur-md py-2 shadow-xl' : 'bg-gray-900/80 backdrop-blur-sm py-4'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <Ticket className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-extrabold text-white tracking-wide">
              TicketEvent
            </h1>
          </Link>

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
            {user ? (
              <>
                <Link to="/tickets" className="flex items-center space-x-1 hover:text-white transition hover:scale-105">
                  <Ticket className="w-4 h-4" />
                  <span>Mes billets</span>
                </Link>
                <button
                  onClick={handleRoleNavigation}
                  className="flex items-center space-x-1 hover:text-white transition hover:scale-105"
                >
                  {userRole === "admin" ? (
                    <>
                      <BarChart3 className="w-4 h-4" />
                      <span>Admin</span>
                    </>
                  ) : userRole === "organizer" ? (
                    <>
                      <Scan className="w-4 h-4" />
                      <span>Scanner</span>
                    </>
                  ) : (
                    <>
                      <User className="w-4 h-4" />
                      <span>Profil</span>
                    </>
                  )}
                </button>
              </>
            ) : (
              <Link to="/login" className="flex items-center space-x-1 hover:text-white transition hover:scale-105">
                <User className="w-4 h-4" />
                <span>Connexion</span>
              </Link>
            )}
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
                      placeholder="Rechercher un événement..."
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

            <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition hidden md:block">
              <Filter className="w-5 h-5 text-white" />
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
                    placeholder="Rechercher un événement..."
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
                  {user ? (
                    <>
                      <Link to="/tickets" className="flex items-center space-x-2 text-gray-300 hover:text-white transition py-2">
                        <Ticket className="w-5 h-5" />
                        <span>Mes billets</span>
                      </Link>
                      <button
                        onClick={handleRoleNavigation}
                        className="flex items-center space-x-2 text-gray-300 hover:text-white transition py-2"
                      >
                        {userRole === "admin" ? (
                          <>
                            <BarChart3 className="w-5 h-5" />
                            <span>Espace Admin</span>
                          </>
                        ) : userRole === "organizer" ? (
                          <>
                            <Scan className="w-5 h-5" />
                            <span>Espace Organisateur</span>
                          </>
                        ) : (
                          <>
                            <User className="w-5 h-5" />
                            <span>Mon Profil</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={logout}
                        className="flex items-center space-x-2 text-gray-300 hover:text-white transition py-2"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Déconnexion</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="flex items-center space-x-2 text-gray-300 hover:text-white transition py-2">
                        <User className="w-5 h-5" />
                        <span>Connexion</span>
                      </Link>
                      <Link to="/register" className="flex items-center space-x-2 text-gray-300 hover:text-white transition py-2">
                        <User className="w-5 h-5" />
                        <span>Inscription</span>
                      </Link>
                    </>
                  )}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ===== HERO SECTION ===== */}
      <motion.div
        className="relative h-96 md:h-[500px] overflow-hidden mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1600"
          alt="Concert à Madagascar"
          className="w-full h-full object-cover"
        />

        {/* Overlay animé */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90"
          animate={{ opacity: [0.7, 0.8, 0.7] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Contenu Hero */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4 max-w-3xl">
            <motion.h2
              className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Vivez des expériences <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">inoubliables</span> à Madagascar
            </motion.h2>
            <motion.p
              className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Réservez vos billets en ligne, évitez les files d'attente et profitez pleinement de l'événement
            </motion.p>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/events"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition transform hover:scale-105 flex items-center justify-center"
              >
                Explorer les événements <ChevronRight className="ml-2 w-5 h-5" />
              </Link>
              {user ? (
                <Link
                  to="/tickets"
                  className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition transform hover:scale-105 flex items-center justify-center"
                >
                  Mes billets
                </Link>
              ) : (
                <Link
                  to="/register"
                  className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition transform hover:scale-105 flex items-center justify-center"
                >
                  Créer un compte
                </Link>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ===== CONTENU PRINCIPAL ===== */}
      <main className="container mx-auto px-4 md:px-6 py-10">

        {/* ===== FILTRES CATÉGORIES ===== */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">Catégories</h2>
            <button className="text-sm text-gray-400 hover:text-white flex items-center">
              Voir tout <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            {categories.map((cat, index) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm md:text-base font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* ===== CARROUSEL ÉVÉNEMENTS POPULAIRES ===== */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center">
              <Star className="w-6 h-6 mr-2 text-yellow-400 fill-current" /> Événements populaires
            </h2>
            <button className="text-sm text-gray-400 hover:text-white flex items-center">
              Voir tout <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>

          <Slider {...sliderSettings} className="mb-10">
            {events.slice(0, 4).map(event => (
              <motion.div
                key={event.id}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link to={`/event/${event.id}`} className="px-2 block focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-2xl">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-60 md:h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>

                    {/* Badge de popularité */}
                    <div className="absolute top-4 left-4 bg-yellow-400 text-gray-900 text-xs px-2 py-1 rounded-full font-bold flex items-center">
                      <Star className="w-3 h-3 mr-1 fill-current" /> POPULAIRE
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="bg-blue-600 text-xs px-3 py-1.5 rounded-full font-semibold tracking-wide shadow-md">
                        {event.category}
                      </span>
                      <h3 className="font-bold text-xl text-white mt-2 leading-snug line-clamp-1">
                        {event.title}
                      </h3>
                      <div className="flex items-center mt-2 text-sm text-gray-300">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{event.date}</span>
                        <Clock className="w-4 h-4 ml-3 mr-1" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <span className="bg-gray-900/70 text-white text-sm px-3 py-1.5 rounded-full font-medium">
                          {event.price}
                        </span>
                        <span className="flex items-center text-sm text-white bg-gray-900/70 px-2 py-1 rounded-full">
                          <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                          {event.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </Slider>
        </motion.section>

        {/* ===== SECTION PAIEMENT SÉCURISÉ ===== */}
        <motion.section
          className="mb-4 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Paiement sécurisé et rapide</h2>
              <p className="text-gray-300 mb-6">
                Profitez de multiples options de paiement sécurisées pour acheter vos billets en toute confiance.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="bg-green-500/20 p-1 rounded-full mr-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span>Paiement par Mobile Money (Mvola, Orange Money, Airtel Money)</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-green-500/20 p-1 rounded-full mr-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span>Cartes Visa et Mastercard sécurisées</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-green-500/20 p-1 rounded-full mr-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span>Confirmation instantanée par SMS</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-green-500/20 p-1 rounded-full mr-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span>Reçu et billet numérique immédiat</span>
                </li>
              </ul>
            </div>
            <div className="md:w-2/5 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-20"></div>
                <div className="relative bg-gray-800 rounded-2xl p-6 shadow-2xl">
                  <div className="flex justify-between items-center mb-6">
                    <CreditCard className="w-8 h-8 text-blue-400" />
                    <QrCode className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Paiement 100% sécurisé</h3>
                  <p className="text-gray-400 text-sm">
                    Toutes vos transactions sont cryptées et sécurisées pour protéger vos informations personnelles et bancaires.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ===== TOUS LES ÉVÉNEMENTS (FILTRÉS) ===== */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.6 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">Tous les événements</h2>
            <div className="text-sm text-gray-400">
              {filteredEvents.length} {filteredEvents.length === 1 ? 'événement' : 'événements'} trouvés
            </div>
          </div>

          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                  className="relative"
                >
                  <Link
                    to={`/event/${event.id}`}
                    className="block rounded-2xl overflow-hidden shadow-xl bg-gray-900 hover:bg-gray-800 transition-all duration-300 group"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <span className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-md">
                        {event.price}
                      </span>
                      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-gray-900 to-transparent"></div>
                    </div>

                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <span className="inline-block bg-gray-700 text-xs px-2 py-1 rounded-full font-medium">
                          {event.category}
                        </span>
                        <span className="flex items-center text-xs text-gray-300">
                          <Star className="w-3 h-3 mr-1 text-yellow-400 fill-current" />
                          {event.rating}
                        </span>
                      </div>

                      <h3 className="font-bold text-lg text-white leading-snug line-clamp-2 mb-2 group-hover:text-blue-300 transition">
                        {event.title}
                      </h3>

                      <div className="flex items-center text-xs text-gray-400 mb-2">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{event.date}</span>
                        <Clock className="w-4 h-4 ml-3 mr-1" />
                        <span>{event.time}</span>
                      </div>

                      <div className="flex items-center text-xs text-gray-400">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>

                      <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-800">
                        <span className="text-xs text-gray-500">
                          {event.ticketsAvailable} places restantes
                        </span>
                        <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-full transition">
                          Réserver
                        </button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-gray-500 mb-4">Aucun événement ne correspond à votre recherche</div>
              <button
                onClick={() => { setSearch(''); setActiveCategory('Tous'); }}
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </motion.section>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="bg-gray-900 text-gray-400 py-12 mt-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-lg font-bold mb-4 flex items-center">
                <Ticket className="w-5 h-5 mr-2 text-blue-400" /> TicketEvent
              </h3>
              <p className="text-sm mb-4">Votre plateforme de réservation d'événements à Madagascar</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <span className="sr-only">Facebook</span>
                  <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">f</div>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <span className="sr-only">Instagram</span>
                  <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">ig</div>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <span className="sr-only">Twitter</span>
                  <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">X</div>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Navigation</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-sm hover:text-white transition">Accueil</Link></li>
                <li><Link to="/events" className="text-sm hover:text-white transition">Événements</Link></li>
                <li><Link to="/tickets" className="text-sm hover:text-white transition">Mes billets</Link></li>
                <li><Link to="/profile" className="text-sm hover:text-white transition">Mon profil</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm hover:text-white transition">Centre d'aide</a></li>
                <li><a href="#" className="text-sm hover:text-white transition">Contact</a></li>
                <li><a href="#" className="text-sm hover:text-white transition">FAQ</a></li>
                <li><a href="#" className="text-sm hover:text-white transition">Mentions légales</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Moyens de paiement</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-800 rounded p-2 text-center">
                  <span className="text-xs">Mvola</span>
                </div>
                <div className="bg-gray-800 rounded p-2 text-center">
                  <span className="text-xs">Orange Money</span>
                </div>
                <div className="bg-gray-800 rounded p-2 text-center">
                  <span className="text-xs">Airtel Money</span>
                </div>
                <div className="bg-gray-800 rounded p-2 text-center">
                  <span className="text-xs">VISA</span>
                </div>
              </div>
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
