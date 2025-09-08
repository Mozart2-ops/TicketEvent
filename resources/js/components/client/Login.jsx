import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fonction pour formater le numéro de téléphone
  const formatPhoneNumber = (value) => {
    const numbers = value.replace(/\D/g, '');

    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 5) {
      return `${numbers.slice(0, 3)} ${numbers.slice(3)}`;
    } else if (numbers.length <= 8) {
      return `${numbers.slice(0, 3)} ${numbers.slice(3, 5)} ${numbers.slice(5)}`;
    } else {
      return `${numbers.slice(0, 3)} ${numbers.slice(3, 5)} ${numbers.slice(5, 8)} ${numbers.slice(8, 10)}`;
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setTelephone(formatPhoneNumber(value));
  };

  const validateForm = () => {
    const newErrors = {};
    const phoneDigits = telephone.replace(/\D/g, '');

    // Validation du téléphone
    if (phoneDigits.length < 10) {
      newErrors.telephone = "Le numéro doit contenir au moins 10 chiffres";
    }

    // Validation du mot de passe
    if (!password) {
      newErrors.password = "Le mot de passe est obligatoire";
    } else if (password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const phoneDigits = telephone.replace(/\D/g, '');

      // ⚡ SIMULATION - À REMPLACER PAR VOTRE API LARAVEL
      let userData;
      let isValid = false;

      // Vérification des identifiants de test
      if (phoneDigits === '0340000001' && password === 'admin123') {
        userData = {
          id: 1,
          nom: "Zoky",
          prenom: "Jean Jack",
          telephone: telephone,
          statut: "admin",
          email: "admin@example.com"
        };
        isValid = true;
      } else if (phoneDigits === '0340000002' && password === 'org123') {
        userData = {
          id: 2,
          nom: "Organisateur",
          prenom: "Event",
          telephone: telephone,
          statut: "organisateur",
          email: "org@example.com"
        };
        isValid = true;
      } else if (phoneDigits === '0340000003' && password === 'client123') {
        userData = {
          id: 3,
          nom: "Client",
          prenom: "Test",
          telephone: telephone,
          statut: null,
          email: "client@example.com"
        };
        isValid = true;
      }

      if (!isValid) {
        throw new Error("Numéro de téléphone ou mot de passe incorrect");
      }

      // Stocker le token simulé
      const fakeToken = "fake-jwt-token-" + Date.now();

      // Appeler la fonction login du contexte
      login(userData, fakeToken);

      // Redirection selon le statut de l'utilisateur avec l'ID en paramètre
      if (userData.statut === "admin") {
        navigate("/administrateur", { state: { userId: userData.id } });
      } else if (userData.statut === "organisateur") {
        navigate("/organisateur", { state: { userId: userData.id } });
      } else {
        // Client ou statut null
        const pendingEventId = localStorage.getItem("pendingEventId");
        if (pendingEventId) {
          localStorage.removeItem("pendingEventId");
          navigate(`/payment/${pendingEventId}`, { state: { userId: userData.id } });
        } else {
          navigate("/", { state: { userId: userData.id } });
        }
      }

    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-200 p-4">
      <div className="bg-gray-900 p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Connexion</h2>

        {errors.general && (
          <div className="bg-red-900 text-red-200 p-3 rounded-lg mb-4 text-sm">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="telephone" className="block text-sm font-medium text-gray-400 mb-1">
              Numéro de téléphone *
            </label>
            <input
              id="telephone"
              type="text"
              placeholder="034 23 000 81"
              value={telephone}
              onChange={handlePhoneChange}
              required
              maxLength="15"
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none transition-colors"
            />
            {errors.telephone && <p className="text-red-400 text-sm mt-1">{errors.telephone}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-1">
              Mot de passe *
            </label>
            <input
              id="password"
              type="password"
              placeholder="Votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none transition-colors"
            />
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-3 rounded-lg font-semibold shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Connexion...
              </span>
            ) : (
              "Se connecter"
            )}
          </button>
        </form>

        {/* Informations de test */}
        <div className="mt-6 p-4 bg-gray-800 rounded-lg text-xs">
          <p className="text-gray-400 mb-2 font-medium">Comptes de test :</p>
          <div className="space-y-1">
            <p><span className="text-blue-400">Admin:</span> 034 00 000 01 / admin123</p>
            <p><span className="text-green-400">Organisateur:</span> 034 00 000 02 / org123</p>
            <p><span className="text-yellow-400">Client:</span> 034 00 000 03 / client123</p>
          </div>
        </div>

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
