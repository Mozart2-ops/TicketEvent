import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Register() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    password: "",
    password_confirmation: ""
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Récupérer le token CSRF au chargement du composant
  useEffect(() => {
    fetchCsrfToken();
  }, []);

  const fetchCsrfToken = async () => {
    try {
      // Essayer de récupérer le token CSRF depuis le meta tag
      const metaToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

      if (metaToken) {
        setCsrfToken(metaToken);
      } else {
        // Si le meta tag n'existe pas, faire une requête pour obtenir le token
        const response = await fetch('/sanctum/csrf-cookie', {
          credentials: 'include'
        });

        if (response.ok) {
          // Le token CSRF est maintenant dans les cookies
          // On peut extraire le token des cookies
          const cookies = document.cookie.split(';');
          const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('XSRF-TOKEN='));

          if (tokenCookie) {
            const token = decodeURIComponent(tokenCookie.split('=')[1]);
            setCsrfToken(token);
          }
        }
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du token CSRF:", error);
    }
  };

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "telephone") {
      setFormData({
        ...formData,
        [name]: formatPhoneNumber(value)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nom.trim()) newErrors.nom = "Le nom est requis";
    if (!formData.prenom.trim()) newErrors.prenom = "Le prénom est requis";

    const phoneDigits = formData.telephone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      newErrors.telephone = "Le numéro doit contenir au moins 10 chiffres";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
    }

    if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = "Les mots de passe ne correspondent pas";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Vérifier si le token CSRF est disponible
    if (!csrfToken) {
      setErrors({ general: "Erreur de sécurité. Veuillez rafraîchir la page." });
      return;
    }

    setIsLoading(true);

    try {
      // Préparer les données pour l'envoi
      const submissionData = {
        nom: formData.nom,
        prenom: formData.prenom,
        telephone: formData.telephone.replace(/\D/g, ''),
        password: formData.password,
        password_confirmation: formData.password_confirmation
      };

      // Envoyer les données à l'API Laravel
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': csrfToken,
          'Accept': 'application/json'
        },
        credentials: 'include', // Important pour les cookies de session
        body: JSON.stringify(submissionData)
      });

      const data = await response.json();

      if (response.ok) {
        // Connexion réussie
        setUser(data.user);

        // Stocker le token si vous utilisez l'authentification par token
        if (data.token) {
          localStorage.setItem('auth_token', data.token);
        }

        // Vérifier si un événement était en attente
        const pendingEventId = localStorage.getItem("pendingEventId");
        if (pendingEventId) {
          localStorage.removeItem("pendingEventId");
          navigate(`/payment/${pendingEventId}`);
        } else {
          navigate("/"); // sinon accueil
        }
      } else {
        // Gérer les erreurs de validation du serveur
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setErrors({ general: data.message || "Une erreur s'est produite lors de l'inscription" });
        }
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      setErrors({ general: "Erreur de connexion au serveur. Vérifiez votre connexion internet." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-gray-200 p-4">
      <div className="bg-gray-900 p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Inscription</h2>

        {errors.general && (
          <div className="bg-red-900 text-red-200 p-3 rounded-lg mb-4 text-sm">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <input
              type="text"
              name="prenom"
              placeholder="Prénom"
              value={formData.prenom}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg bg-gray-800 border focus:border-blue-500 focus:outline-none ${
                errors.prenom ? 'border-red-500' : 'border-gray-700'
              }`}
            />
            {errors.prenom && <p className="text-red-400 text-sm mt-1">{errors.prenom}</p>}
          </div>

          <div>
            <input
              type="text"
              name="nom"
              placeholder="Nom"
              value={formData.nom}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg bg-gray-800 border focus:border-blue-500 focus:outline-none ${
                errors.nom ? 'border-red-500' : 'border-gray-700'
              }`}
            />
            {errors.nom && <p className="text-red-400 text-sm mt-1">{errors.nom}</p>}
          </div>

          <div>
            <input
              type="text"
              name="telephone"
              placeholder="034 23 000 81"
              value={formData.telephone}
              onChange={handleInputChange}
              maxLength="15"
              className={`w-full px-3 py-2 rounded-lg bg-gray-800 border focus:border-blue-500 focus:outline-none ${
                errors.telephone ? 'border-red-500' : 'border-gray-700'
              }`}
            />
            {errors.telephone && <p className="text-red-400 text-sm mt-1">{errors.telephone}</p>}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Mot de passe (min. 6 caractères)"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg bg-gray-800 border focus:border-blue-500 focus:outline-none ${
                errors.password ? 'border-red-500' : 'border-gray-700'
              }`}
            />
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>

          <div>
            <input
              type="password"
              name="password_confirmation"
              placeholder="Confirmer le mot de passe"
              value={formData.password_confirmation}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 rounded-lg bg-gray-800 border focus:border-blue-500 focus:outline-none ${
                errors.password_confirmation ? 'border-red-500' : 'border-gray-700'
              }`}
            />
            {errors.password_confirmation && <p className="text-red-400 text-sm mt-1">{errors.password_confirmation}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading || !csrfToken}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-3 rounded-lg font-semibold shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Inscription en cours...
              </span>
            ) : "S'inscrire"}
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-400 text-center">
          Déjà inscrit ?{" "}
          <Link to="/login" className="text-blue-400 hover:underline font-medium">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
