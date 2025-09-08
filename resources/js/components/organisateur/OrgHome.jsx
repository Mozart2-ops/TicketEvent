import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


export default function OrganisateurDashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("scanner");
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [scanResult, setScanResult] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [ticketData, setTicketData] = useState("");
  const location = useLocation();
  const userId = location.state?.userId;

  console.log("ID de l'utilisateur:", userId);

  // Données simulées pour les événements (à remplacer par l'API réelle)
  const mockEvents = [
    {
      id: 1,
      title: "Concert de Jazz",
      date: "2025-10-15",
      time: "20:00",
      location: "Théâtre Municipal",
      totalTickets: 200,
      scannedTickets: 45,
      ticketsToScan: 155
    },
    {
      id: 2,
      title: "Festival Gastronomique",
      date: "2025-11-05",
      time: "10:00",
      location: "Parc Central",
      totalTickets: 500,
      scannedTickets: 120,
      ticketsToScan: 380
    }
  ];

  // Simulation de données de billets (à remplacer par l'API réelle)
  const mockTickets = [
    {
      id: "TKT001",
      eventId: 1,
      clientName: "Jean Dupont",
      ticketType: "Standard",
      price: "25 000 Ar",
      purchaseDate: "2025-09-10",
      status: "non utilisé"
    },
    {
      id: "TKT002",
      eventId: 1,
      clientName: "Marie Lambert",
      ticketType: "VIP",
      price: "50 000 Ar",
      purchaseDate: "2025-09-12",
      status: "utilisé"
    },
    {
      id: "TKT003",
      eventId: 2,
      clientName: "Paul Martin",
      ticketType: "Standard",
      price: "15 000 Ar",
      purchaseDate: "2025-09-08",
      status: "non utilisé"
    }
  ];

  useEffect(() => {
    // Charger les événements de l'organisateur
    setEvents(mockEvents);
    if (mockEvents.length > 0) {
      setSelectedEvent(mockEvents[0]);
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleScan = () => {
    if (!ticketData.trim()) {
      alert("Veuillez entrer un code de ticket");
      return;
    }

    setScanning(true);

    // Simulation du scan (à remplacer par l'API réelle)
    setTimeout(() => {
      const foundTicket = mockTickets.find(ticket => ticket.id === ticketData);
      if (foundTicket) {
        setScanResult(foundTicket);
      } else {
        setScanResult({ error: "Ticket non trouvé ou invalide" });
      }
      setScanning(false);
    }, 1500);
  };

  const validateTicket = () => {
    // Simulation de validation (à remplacer par l'API réelle)
    alert(`Ticket ${scanResult.id} validé avec succès!`);
    setScanResult(null);
    setTicketData("");
  };

  const filteredTickets = selectedEvent
    ? mockTickets.filter(ticket => ticket.eventId === selectedEvent.id)
    : [];

console.log("ID de l'utilisateur:", userId);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200">
      {/* Header */}
      <header className="bg-gray-900 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Espace Organisateur</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm">Bonjour, {user?.prenom}</span>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
          >
            Déconnexion
          </button>
        </div>
      </header>

      <div className="p-4">
        {/* Navigation */}
        <div className="flex border-b border-gray-700 mb-6">
          <button
            className={`px-4 py-2 font-medium ${activeTab === "scanner" ? "border-b-2 border-blue-500 text-blue-400" : "text-gray-400"}`}
            onClick={() => setActiveTab("scanner")}
          >
            Scanner
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === "evenements" ? "border-b-2 border-blue-500 text-blue-400" : "text-gray-400"}`}
            onClick={() => setActiveTab("evenements")}
          >
            Événements
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === "billets" ? "border-b-2 border-blue-500 text-blue-400" : "text-gray-400"}`}
            onClick={() => setActiveTab("billets")}
          >
            Billets
          </button>
        </div>

        {/* Contenu du Scanner */}
        {activeTab === "scanner" && (
          <div className="space-y-6">
            <div className="bg-gray-900 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Scanner un ticket</h2>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Sélectionner un événement</label>
                <select
                  className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                  value={selectedEvent?.id || ""}
                  onChange={(e) => setSelectedEvent(events.find(ev => ev.id === parseInt(e.target.value)))}
                >
                  {events.map(event => (
                    <option key={event.id} value={event.id}>
                      {event.title} - {event.date}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Code du ticket</label>
                <input
                  type="text"
                  placeholder="Entrez le code du ticket"
                  className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                  value={ticketData}
                  onChange={(e) => setTicketData(e.target.value)}
                />
              </div>

              <button
                onClick={handleScan}
                disabled={scanning || !selectedEvent}
                className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-medium disabled:opacity-50"
              >
                {scanning ? "Scan en cours..." : "Scanner le ticket"}
              </button>
            </div>

            {scanResult && (
              <div className="bg-gray-900 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Résultat du scan</h3>

                {scanResult.error ? (
                  <div className="text-red-400">{scanResult.error}</div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-gray-400 text-sm">Client</p>
                        <p className="font-medium">{scanResult.clientName}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Type de billet</p>
                        <p className="font-medium">{scanResult.ticketType}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Prix</p>
                        <p className="font-medium">{scanResult.price}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Statut</p>
                        <p className={`font-medium ${scanResult.status === "utilisé" ? "text-red-400" : "text-green-400"}`}>
                          {scanResult.status}
                        </p>
                      </div>
                    </div>

                    {scanResult.status !== "utilisé" && (
                      <button
                        onClick={validateTicket}
                        className="w-full bg-green-600 hover:bg-green-700 py-2 rounded font-medium"
                      >
                        Valider l'entrée
                      </button>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {/* Contenu des Événements */}
        {activeTab === "evenements" && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Mes événements</h2>

            <div className="grid gap-4 md:grid-cols-2">
              {events.map(event => (
                <div key={event.id} className="bg-gray-900 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                  <p className="text-gray-400 mb-1">{event.date} à {event.time}</p>
                  <p className="text-gray-400 mb-3">{event.location}</p>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-gray-800 p-2 rounded">
                      <p className="text-sm text-gray-400">Total</p>
                      <p className="font-bold">{event.totalTickets}</p>
                    </div>
                    <div className="bg-gray-800 p-2 rounded">
                      <p className="text-sm text-gray-400">Scannés</p>
                      <p className="font-bold text-green-400">{event.scannedTickets}</p>
                    </div>
                    <div className="bg-gray-800 p-2 rounded">
                      <p className="text-sm text-gray-400">Restants</p>
                      <p className="font-bold">{event.ticketsToScan}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contenu des Billets */}
        {activeTab === "billets" && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Billets à scanner</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Filtrer par événement</label>
              <select
                className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                value={selectedEvent?.id || ""}
                onChange={(e) => setSelectedEvent(events.find(ev => ev.id === parseInt(e.target.value)))}
              >
                {events.map(event => (
                  <option key={event.id} value={event.id}>
                    {event.title} - {event.date}
                  </option>
                ))}
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-gray-900 rounded-lg">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="p-3 text-left">Code</th>
                    <th className="p-3 text-left">Client</th>
                    <th className="p-3 text-left">Type</th>
                    <th className="p-3 text-left">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTickets.map(ticket => (
                    <tr key={ticket.id} className="border-b border-gray-800">
                      <td className="p-3">{ticket.id}</td>
                      <td className="p-3">{ticket.clientName}</td>
                      <td className="p-3">{ticket.ticketType}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-xs ${ticket.status === "utilisé" ? "bg-red-900 text-red-200" : "bg-green-900 text-green-200"}`}>
                          {ticket.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
