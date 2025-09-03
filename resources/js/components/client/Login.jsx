import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Fake login → bientôt relié au backend Laravel
    login({ email });
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-xl p-6">
        <h1 className="text-2xl font-bold text-white text-center mb-6">Connexion 🔑</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-200"
            required
          />
          <input 
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-200"
            required
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold">
            Se connecter
          </button>
        </form>
        <p className="text-gray-400 text-sm text-center mt-6">
          Pas encore de compte ?{" "}
          <Link to="/register" className="text-blue-500">S’inscrire</Link>
        </p>
      </div>
    </div>
  );
}
