import React from "react";

export default function Profile() {
  return (
    <div className="p-4">
      <h1 className="text-lg font-bold">👤 Mon Profil</h1>
      <div className="mt-3 p-4 bg-white rounded-xl shadow">
        <p><b>Nom :</b> Jean Rakoto</p>
        <p><b>Email :</b> jean@example.com</p>
      </div>
      <button className="mt-4 w-full bg-red-500 text-white py-2 rounded-xl">
        Déconnexion
      </button>
    </div>
  );
}
