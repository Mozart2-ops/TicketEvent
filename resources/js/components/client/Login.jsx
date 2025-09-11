import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Login() {
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Validation simple
  const validateForm = () => {
    const newErrors = {};
    if (!telephone || telephone.replace(/\D/g, "").length < 10) newErrors.telephone = "Numéro invalide";
    if (!password || password.length < 6) newErrors.password = "Minimum 6 caractères";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const phoneDigits = telephone.replace(/\D/g, "");
      //Envoye du numéro de téléphone sans espace et du mot de passe
      const res = await login({ telephone: phoneDigits, mdp: password });

      if (res?.user) {
        const userData = res.user;

        if (userData.statut === "admin") navigate("/administrateur", { state: { userId: userData.id } });
        else if (userData.statut === "organisateur") navigate("/organisateur", { state: { userId: userData.id } });
        else {
          const pendingEventId = localStorage.getItem("pendingEventId");
          if (pendingEventId) {
            localStorage.removeItem("pendingEventId");
            navigate(`/payment/${pendingEventId}`, { state: { userId: userData.id } });
          } else navigate("/", { state: { userId: userData.id } });
        }
      } else {
        setErrors({ general: "Numéro de téléphone ou mot de passe incorrect" });
      }
    } catch (err) {
      setErrors({ general: err.response?.data?.message || err.message || "Erreur de connexion" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-200 p-4">
      <div className="bg-gray-900 p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Connexion</h2>

        {errors.general && (
          <div className="bg-red-900 text-red-200 p-3 rounded-lg mb-4">{errors.general}</div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Numéro de téléphone *</label>
            <input
              type="text"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500"
            />
            {errors.telephone && <p className="text-red-400 text-sm mt-1">{errors.telephone}</p>}
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Mot de passe *</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500"
            />
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 rounded-lg text-white font-semibold"
          >
            {isLoading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link to="/forgot-password" className="text-blue-400 hover:underline text-sm">
            Mot de passe oublié ?
          </Link>
        </div>

        <p className="mt-6 text-sm text-gray-400 text-center">
          Pas encore de compte ?{" "}
          <Link to="/register" className="text-blue-400 hover:underline font-medium">
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  );
}
