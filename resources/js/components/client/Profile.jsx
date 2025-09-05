import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "./Navbar";
import {
  User,
  Mail,
  Calendar,
  Settings,
  Lock,
  LogOut,
  Edit3,
  Ticket,
  Heart,
  Star,
  Bell,
  CreditCard,
  Shield,
  HelpCircle,
  ChevronRight,
  MapPin,
  Phone
} from "lucide-react";

export default function Profile() {
  const { user, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("profile");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Données simulées pour les statistiques utilisateur
  const userStats = {
    tickets: 5,
    favorites: 12,
    reviews: 3,
    eventsAttended: 8
  };

  // Historique des billets récents
  const recentTickets = [
    { id: 1, event: "Concert Gospel", date: "12 Sept 2025", price: "20 000 Ar" },
    { id: 2, event: "Festival Jazz", date: "18 Sept 2025", price: "15 000 Ar" },
    { id: 3, event: "Match de Football", date: "25 Sept 2025", price: "10 000 Ar" }
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 flex flex-col">
      {/* Header avec image de fond */}
      <div className="relative h-40 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative h-full flex items-end justify-center pb-6">
          <h1 className="text-2xl font-bold text-white">Mon Profil</h1>
        </div>
      </div>

      {/* Avatar et informations utilisateur */}
      <div className="px-6 -mt-12 mb-6">
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={`https://ui-avatars.com/api/?name=${user?.email || "User"}&background=0D8ABC&color=fff&size=128`}
              alt="Avatar"
              className="w-24 h-24 rounded-full border-4 border-gray-900 shadow-xl"
            />
            <button className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 p-2 rounded-full shadow-md transition">
              <Edit3 className="w-4 h-4 text-white" />
            </button>
          </div>
          <h2 className="mt-4 text-xl font-semibold">{user?.email || "Utilisateur"}</h2>
          <p className="text-gray-400 text-sm">Membre depuis Janvier 2025</p>

          {/* Statistiques utilisateur */}
          <div className="grid grid-cols-2 gap-4 mt-6 w-full max-w-md">
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <div className="flex justify-center">
                <Ticket className="w-6 h-6 text-blue-400" />
              </div>
              <p className="text-2xl font-bold mt-1">{userStats.tickets}</p>
              <p className="text-xs text-gray-400">Billets</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <div className="flex justify-center">
                <Heart className="w-6 h-6 text-red-400" />
              </div>
              <p className="text-2xl font-bold mt-1">{userStats.favorites}</p>
              <p className="text-xs text-gray-400">Favoris</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <div className="flex justify-center">
                <Star className="w-6 h-6 text-yellow-400" />
              </div>
              <p className="text-2xl font-bold mt-1">{userStats.reviews}</p>
              <p className="text-xs text-gray-400">Avis</p>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 text-center">
              <div className="flex justify-center">
                <Calendar className="w-6 h-6 text-green-400" />
              </div>
              <p className="text-2xl font-bold mt-1">{userStats.eventsAttended}</p>
              <p className="text-xs text-gray-400">Événements</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation par onglets */}
      <div className="flex border-b border-gray-800 px-6 mb-6">
        <button
          className={`pb-3 px-4 font-medium ${activeTab === "profile" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400"}`}
          onClick={() => setActiveTab("profile")}
        >
          Profil
        </button>
        <button
          className={`pb-3 px-4 font-medium ${activeTab === "tickets" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400"}`}
          onClick={() => setActiveTab("tickets")}
        >
          Mes Billets
        </button>
        <button
          className={`pb-3 px-4 font-medium ${activeTab === "settings" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400"}`}
          onClick={() => setActiveTab("settings")}
        >
          Paramètres
        </button>
      </div>

      {/* Contenu des onglets */}
      <div className="px-6 flex-1 mb-20">
        {activeTab === "profile" && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Informations personnelles</h3>

            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center mb-4">
                <Mail className="w-5 h-5 text-blue-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p>{user?.email || "Non spécifié"}</p>
                </div>
              </div>

              <div className="flex items-center mb-4">
                <Phone className="w-5 h-5 text-blue-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-400">Téléphone</p>
                  <p>+261 34 00 000 00</p>
                </div>
              </div>

              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-blue-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-400">Localisation</p>
                  <p>Antananarivo, Madagascar</p>
                </div>
              </div>
            </div>

            <button className="w-full flex items-center justify-between py-3 px-4 rounded-lg bg-gray-800 hover:bg-gray-700 transition">
              <span>Modifier le profil</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {activeTab === "tickets" && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Mes billets récents</h3>

            {recentTickets.length > 0 ? (
              <div className="space-y-3">
                {recentTickets.map(ticket => (
                  <div key={ticket.id} className="bg-gray-800 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{ticket.event}</p>
                        <p className="text-sm text-gray-400">{ticket.date}</p>
                      </div>
                      <span className="text-blue-400 font-semibold">{ticket.price}</span>
                    </div>
                    <button className="w-full mt-3 py-2 text-center text-sm bg-blue-600 hover:bg-blue-700 rounded-md transition">
                      Voir le billet
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Ticket className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400">Aucun billet pour le moment</p>
                <button className="mt-3 text-blue-400 hover:text-blue-300 text-sm">
                  Explorer les événements
                </button>
              </div>
            )}

            <button className="w-full flex items-center justify-between py-3 px-4 rounded-lg bg-gray-800 hover:bg-gray-700 transition">
              <span>Voir tous mes billets</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Paramètres du compte</h3>

            <div className="bg-gray-800 rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Bell className="w-5 h-5 text-blue-400 mr-3" />
                  <span>Notifications</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={notificationsEnabled}
                    onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <button className="w-full flex items-center justify-between py-3">
                <div className="flex items-center">
                  <Lock className="w-5 h-5 text-blue-400 mr-3" />
                  <span>Sécurité du compte</span>
                </div>
                <ChevronRight className="w-5 h-5" />
              </button>

              <button className="w-full flex items-center justify-between py-3">
                <div className="flex items-center">
                  <CreditCard className="w-5 h-5 text-blue-400 mr-3" />
                  <span>Moyens de paiement</span>
                </div>
                <ChevronRight className="w-5 h-5" />
              </button>

              <button className="w-full flex items-center justify-between py-3">
                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-blue-400 mr-3" />
                  <span>Confidentialité</span>
                </div>
                <ChevronRight className="w-5 h-5" />
              </button>

              <button className="w-full flex items-center justify-between py-3">
                <div className="flex items-center">
                  <HelpCircle className="w-5 h-5 text-blue-400 mr-3" />
                  <span>Aide et support</span>
                </div>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <button
              className="w-full flex items-center justify-center py-3 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition"
              onClick={logout}
            >
              <LogOut className="w-5 h-5 mr-2" />
              Déconnexion
            </button>
          </div>
        )}
      </div>

      {/* Navbar fixée en bas */}
      <Navbar />
    </div>
  );
}
