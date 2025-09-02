import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Connexion avec :", form);
  };

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">🔐 Connexion</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
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
        <button className="w-full bg-blue-600 text-white py-2 rounded-xl">
          Se connecter
        </button>
      </form>
      <p className="text-sm mt-3 text-center">
        Pas encore de compte ? <Link to="/register" className="text-blue-600">Inscription</Link>
      </p>
    </div>
  );
}
