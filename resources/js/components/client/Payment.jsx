import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CreditCard,
  Smartphone,
  Shield,
  Check,
  MapPin,
  Calendar,
  Clock
} from "lucide-react";
import useEventDetails from "../../hooks/useEventDetails";
import usePayment from "../../hooks/usePayment";

export default function Payment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { evenement, loading } = useEventDetails(id);
  const { makePayment, loading: paymentLoading, error, ticket } = usePayment();

  const [paymentMethod, setPaymentMethod] = useState("Mvola");
  const [isSuccess, setIsSuccess] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!evenement) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p>Événement introuvable</p>
      </div>
    );
  }

  const handlePayment = async () => {
    const result = await makePayment({ evenement_id: evenement.id, methode: paymentMethod });
    if (result?.ticket) {
      setIsSuccess(true);
      setTimeout(() => navigate(`/ticket/${result.ticket.id}`), 2000);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gray-900 rounded-2xl p-8 text-center max-w-md w-full"
        >
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Paiement Réussi!</h2>
          <p className="text-gray-300 mb-6">
            Votre billet a été réservé avec succès. Vous allez être redirigé vers votre billet.
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-800 flex items-center">
        <button onClick={() => navigate(-1)} className="p-2 mr-2">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-semibold">Finaliser le paiement</h1>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Récapitulatif */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900 rounded-xl p-4 mb-6"
        >
          <h2 className="text-lg font-semibold mb-3">{evenement?.titre}</h2>
          <div className="flex items-center text-sm text-gray-400 mb-2">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{evenement?.dateEvenement} • {evenement?.heure}</span>
          </div>
          <div className="flex items-center text-sm text-gray-400 mb-3">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{evenement?.lieu}</span>
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-gray-800">
            <span className="text-sm">1 billet</span>
            <span className="font-bold text-lg">{evenement.tarif?.montant} Ar</span>
          </div>
        </motion.div>

        {/* Méthodes de paiement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-900 rounded-xl p-4 mb-6"
        >
          <h3 className="font-semibold mb-4">Méthode de paiement</h3>
          <div className="space-y-3">
            {["Mvola", "Orange Money", "Airtel Money", "Visa"].map((method) => (
              <div
                key={method}
                className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition ${
                  paymentMethod === method
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-gray-700 hover:border-gray-600"
                }`}
                onClick={() => setPaymentMethod(method)}
              >
                <Smartphone className="w-6 h-6 mr-3 text-blue-400" />
                <span className="font-medium">{method}</span>
                {paymentMethod === method && (
                  <div className="ml-auto w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bouton de paiement */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onClick={handlePayment}
          disabled={paymentLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-4 rounded-xl font-semibold shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {paymentLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Traitement en cours...
            </div>
          ) : (
            `Payer ${evenement.tarif?.montant} Ar`
          )}
        </motion.button>

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>

      {/* Sécurité */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-center text-sm text-gray-500 mb-6"
      >
        <Shield className="w-4 h-4 mr-2 text-green-400" />
        <span>Paiement 100% sécurisé et crypté</span>
      </motion.div>
    </div>
  );
}
