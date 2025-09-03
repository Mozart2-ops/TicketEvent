import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // ⚡ À remplacer par ton API Laravel (login)
    const fakeUser = { id: 1, name: "Jean Rakoto", email };

    // enregistrer dans le contexte
    setUser(fakeUser);

    // vérifier si un événement était en attente
    const pendingEventId = localStorage.getItem("pendingEventId");
    if (pendingEventId) {
      localStorage.removeItem("pendingEventId");
      navigate(`/payment/${pendingEventId}`);
    } else {
      navigate("/"); // sinon accueil
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-200">
      <div className="bg-gray-900 p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Connexion</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white px-4 py-2 rounded-lg font-semibold shadow-lg"
          >
            Se connecter
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-400">
          Pas encore de compte ?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            S’inscrire
          </Link>
        </p>
      </div>
    </div>
  );
}
