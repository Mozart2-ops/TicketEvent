import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Inscription avec :", form);
  };

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">📝 Inscription</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Nom complet"
          className="w-full p-2 border rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full p-2 border rounded"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="w-full bg-green-600 text-white py-2 rounded-xl">
          S’inscrire
        </button>
      </form>
      <p className="text-sm mt-3 text-center">
        Déjà inscrit ? <Link to="/login" className="text-blue-600">Connexion</Link>
      </p>
    </div>
  );
}
