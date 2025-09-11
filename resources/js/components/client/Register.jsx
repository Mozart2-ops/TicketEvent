import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Register() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [mdp, setMdp] = useState("");
  const [mdpConfirmation, setMdpConfirmation] = useState("");
  const [clientErrors, setClientErrors] = useState({});
  const { register, errors, success, loading } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!nom.trim()) newErrors.nom = "Nom obligatoire";
    if (!prenom.trim()) newErrors.prenom = "Prénom obligatoire";
    if (!telephone.trim() || telephone.length < 10) newErrors.telephone = "Numéro invalide";
    if (!mdp) newErrors.mdp = "Mot de passe obligatoire";
    else if (mdp.length < 6) newErrors.mdp = "Minimum 6 caractères";
    if (mdp !== mdpConfirmation) newErrors.mdpConfirmation = "Les mots de passe ne correspondent pas";
    setClientErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data = { nom, prenom, telephone, mdp, mdp_confirmation: mdpConfirmation };
    const res = await register(data);

    if (res) {
      navigate("/"); // redirection après succès
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-200 p-4">
      <div className="bg-gray-900 p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Inscription</h2>

        {success && <div className="bg-green-900 text-green-200 p-3 rounded-lg mb-4">{success}</div>}
        {errors.general && <div className="bg-red-900 text-red-200 p-3 rounded-lg mb-4">{errors.general}</div>}

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Nom */}
          <div>
            <input
              type="text"
              placeholder="Nom"
              value={nom}
              onChange={e => setNom(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500"
            />
            {clientErrors.nom && <p className="text-red-400 text-sm mt-1">{clientErrors.nom}</p>}
            {errors.nom && <p className="text-red-400 text-sm mt-1">{errors.nom}</p>}
          </div>

          {/* Prénom */}
          <div>
            <input
              type="text"
              placeholder="Prénom"
              value={prenom}
              onChange={e => setPrenom(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500"
            />
            {clientErrors.prenom && <p className="text-red-400 text-sm mt-1">{clientErrors.prenom}</p>}
            {errors.prenom && <p className="text-red-400 text-sm mt-1">{errors.prenom}</p>}
          </div>

          {/* Téléphone */}
          <div>
            <input
              type="text"
              placeholder="Téléphone"
              value={telephone}
              onChange={e => setTelephone(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500"
            />
            {clientErrors.telephone && <p className="text-red-400 text-sm mt-1">{clientErrors.telephone}</p>}
            {errors.telephone && <p className="text-red-400 text-sm mt-1">{errors.telephone}</p>}
          </div>

          {/* Mot de passe */}
          <div>
            <input
              type="password"
              placeholder="Mot de passe"
              value={mdp}
              onChange={e => setMdp(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500"
            />
            {clientErrors.mdp && <p className="text-red-400 text-sm mt-1">{clientErrors.mdp}</p>}
            {errors.mdp && <p className="text-red-400 text-sm mt-1">{errors.mdp}</p>}
          </div>

          {/* Confirmation mot de passe */}
          <div>
            <input
              type="password"
              placeholder="Confirmer mot de passe"
              value={mdpConfirmation}
              onChange={e => setMdpConfirmation(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500"
            />
            {clientErrors.mdpConfirmation && <p className="text-red-400 text-sm mt-1">{clientErrors.mdpConfirmation}</p>}
            {errors.mdp_confirmation && <p className="text-red-400 text-sm mt-1">{errors.mdp_confirmation}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 rounded-lg text-white font-semibold"
          >
            {loading ? "Inscription..." : "S'inscrire"}
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-400 text-center">
          Déjà un compte ? <Link to="/login" className="text-blue-400 hover:underline font-medium">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}
