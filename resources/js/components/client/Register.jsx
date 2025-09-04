import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Register() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fonction pour formater le numéro de téléphone
  const formatPhoneNumber = (value) => {
    // Supprimer tous les caractères non numériques
    const numbers = value.replace(/\D/g, '');
    
    // Appliquer le format 034 23 000 81
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
    
    // Validation du numéro de téléphone (10 chiffres minimum)
    const phoneDigits = formData.telephone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      newErrors.telephone = "Le numéro doit contenir au moins 10 chiffres";
    }
    
    if (formData.password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      // ⚡ À remplacer par ton API Laravel (register)
      const newUser = { 
        id: Date.now(), 
        nom: formData.nom,
        prenom: formData.prenom,
        telephone: formData.telephone,
        email: "" // Vous pouvez ajouter l'email si nécessaire
      };

      // enregistrer dans le contexte
      setUser(newUser);

      // vérifier si un événement était en attente
      const pendingEventId = localStorage.getItem("pendingEventId");
      if (pendingEventId) {
        localStorage.removeItem("pendingEventId");
        navigate(`/payment/${pendingEventId}`);
      } else {
        navigate("/"); // sinon accueil
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      setErrors({ general: "Une erreur s'est produite lors de l'inscription" });
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
              required
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none"
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
              required
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none"
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
              required
              maxLength="15"
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none"
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
              required
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none"
            />
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-3 rounded-lg font-semibold shadow-lg transition-all duration-200"
          >
            S'inscrire
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