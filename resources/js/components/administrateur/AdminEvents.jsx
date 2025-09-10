import React, { useState } from 'react';
import { Calendar, Search, Plus, Edit, Trash2, Eye } from 'lucide-react';

export default function AdminEvents() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Concert Jazz',
      date: '2023-12-15',
      location: 'Salle des Fêtes',
      status: 'active',
      ticketsSold: 120,
      totalTickets: 200
    },
    {
      id: 2,
      title: 'Festival Culinaire',
      date: '2023-12-20',
      location: 'Parc des Expositions',
      status: 'active',
      ticketsSold: 85,
      totalTickets: 150
    },
    {
      id: 3,
      title: 'Théâtre Classique',
      date: '2023-12-25',
      location: 'Théâtre Municipal',
      status: 'draft',
      ticketsSold: 0,
      totalTickets: 100
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-green-400 bg-green-900/20';
      case 'draft':
        return 'text-yellow-400 bg-yellow-900/20';
      case 'cancelled':
        return 'text-red-400 bg-red-900/20';
      default:
        return 'text-gray-400 bg-gray-900/20';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Gestion des Événements</h2>
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center">
          <Plus size={20} className="mr-2" />
          Nouvel Événement
        </button>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un événement..."
            className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
          />
        </div>
        <select className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none">
          <option value="all">Tous les statuts</option>
          <option value="active">Actif</option>
          <option value="draft">Brouillon</option>
          <option value="cancelled">Annulé</option>
        </select>
      </div>

      <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="pb-3 text-gray-400 font-medium">Événement</th>
                <th className="pb-3 text-gray-400 font-medium">Date</th>
                <th className="pb-3 text-gray-400 font-medium">Lieu</th>
                <th className="pb-3 text-gray-400 font-medium">Statut</th>
                <th className="pb-3 text-gray-400 font-medium">Billets</th>
                <th className="pb-3 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map(event => (
                <tr key={event.id} className="border-b border-gray-800">
                  <td className="py-4">
                    <div className="font-medium text-white">{event.title}</div>
                  </td>
                  <td className="py-4 text-gray-300">{event.date}</td>
                  <td className="py-4 text-gray-300">{event.location}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                      {event.status === 'active' ? 'Actif' : event.status === 'draft' ? 'Brouillon' : 'Annulé'}
                    </span>
                  </td>
                  <td className="py-4 text-gray-300">
                    {event.ticketsSold}/{event.totalTickets}
                  </td>
                  <td className="py-4">
                    <div className="flex space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-400">
                        <Eye size={16} />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-yellow-400">
                        <Edit size={16} />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-400">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
