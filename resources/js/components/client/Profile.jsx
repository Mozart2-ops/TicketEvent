import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "./Navbar";

export default function Profile() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 text-center border-b border-gray-800">
        <h1 className="text-2xl font-bold">Mon Profil</h1>
        <p className="text-gray-400 text-sm">Gérez vos informations personnelles</p>
      </div>

      {/* Avatar + Infos */}
      <div className="flex flex-col items-center mt-8">
        <img
          src={`https://ui-avatars.com/api/?name=${user?.email || "User"}&background=0D8ABC&color=fff`}
          alt="Avatar"
          className="w-24 h-24 rounded-full border-4 border-blue-600 shadow-lg"
        />
        <h2 className="mt-4 text-xl font-semibold">{user?.email || "Utilisateur"}</h2>
        <p className="text-gray-400 text-sm">Membre depuis 2025</p>
      </div>

      {/* Actions */}
      <div className="mt-8 space-y-3 px-6 flex-1">
        <button className="w-full py-3 px-4 rounded-lg bg-gray-800 hover:bg-gray-700 text-left">
          ✏️ Modifier mon profil
        </button>
        <button className="w-full py-3 px-4 rounded-lg bg-gray-800 hover:bg-gray-700 text-left">
          🔒 Changer mon mot de passe
        </button>
        <button className="w-full py-3 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold"
          onClick={logout}>
          🚪 Déconnexion
        </button>
      </div>

      {/* Navbar fixée en bas */}
      <Navbar />
    </div>
  );
}
