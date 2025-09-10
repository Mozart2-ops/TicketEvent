import { BarChart3, Users, Ticket, Calendar, DollarSign, TrendingUp, Bell, Settings, LogOut, CreditCard } from 'lucide-react';
import React, { useState, useEffect, useContext } from 'react';
import AdminEvents from './AdminEvents';
import AdminUsers from './AdminUsers';
import { AuthContext } from '../../context/AuthContext';

export default function AdminDashboard() {
  const { user } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalTickets: 0,
    totalRevenue: 0,
    totalUsers: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalEvents: 24,
        totalTickets: 1542,
        totalRevenue: 45800,
        totalUsers: 367
      });

      setRecentActivities([
        { id: 1, type: 'purchase', user: 'RAKOTO Koto', event: 'Concert Jazz', amount: 25000, date: '2023-11-15 14:30' },
        { id: 2, type: 'registration', user: 'RABE Be', event: null, date: '2023-11-15 13:15' },
        { id: 3, type: 'event_creation', user: 'Admin System', event: 'Festival Culinaire', date: '2023-11-15 10:45' }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'MGA'
    }).format(amount);
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-900/20 text-blue-400 mr-4">
              <Calendar size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{stats.totalEvents}</h3>
              <p className="text-gray-400">Événements</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-900/20 text-green-400 mr-4">
              <Ticket size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{stats.totalTickets}</h3>
              <p className="text-gray-400">Billets Vendus</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-amber-900/20 text-amber-400 mr-4">
              <DollarSign size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{formatCurrency(stats.totalRevenue)}</h3>
              <p className="text-gray-400">Revenu Total</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-purple-900/20 text-purple-400 mr-4">
              <Users size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{stats.totalUsers}</h3>
              <p className="text-gray-400">Utilisateurs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Graphiques et activités récentes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-4">Ventes des 7 derniers jours</h3>
          <div className="h-64 bg-gray-800 rounded-lg flex items-center justify-center">
            <TrendingUp size={48} className="text-gray-600" />
            <span className="ml-2 text-gray-500">Graphique des ventes</span>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-4">Activités Récentes</h3>
          <div className="space-y-4">
            {recentActivities.map(activity => (
              <div key={activity.id} className="flex items-center p-3 bg-gray-800 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-white">{activity.user}</p>
                  <p className="text-sm text-gray-400">
                    {activity.type === 'purchase' && `Achat billet: ${activity.event}`}
                    {activity.type === 'registration' && 'Nouvelle inscription'}
                    {activity.type === 'event_creation' && `Création événement: ${activity.event}`}
                  </p>
                  <p className="text-xs text-gray-500">{activity.date}</p>
                </div>
                {activity.amount && (
                  <div className="text-green-400 font-semibold">
                    +{formatCurrency(activity.amount)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'events':
        return <AdminEvents />;
      case 'users':
        return <AdminUsers />
      case 'payments':
        return (
          <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800">
            <h2 className="text-xl font-bold text-white mb-6">Gestion des Paiements</h2>
            <div className="text-gray-400 text-center py-12">
              Historique des paiements à implémenter
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-800">
            <h2 className="text-xl font-bold text-white mb-6">Paramètres</h2>
            <div className="text-gray-400 text-center py-12">
              Configuration système à implémenter
            </div>
          </div>
        );
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200">
      {/* Header */}
      <header className="bg-gray-900 shadow-lg border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-white">Bienvenue, {user?.nom} {user?.prenom}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white">
                <Bell size={20} />
              </button>
              <button className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white">
                <Settings size={20} />
              </button>
              <button className="flex items-center text-gray-400 hover:text-white">
                <LogOut size={20} className="mr-2" />
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'dashboard'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <BarChart3 size={20} className="mr-3" />
                Tableau de bord
              </button>

              <button
                onClick={() => setActiveTab('events')}
                className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'events'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Calendar size={20} className="mr-3" />
                Événements
              </button>

              <button
                onClick={() => setActiveTab('users')}
                className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'users'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Users size={20} className="mr-3" />
                Utilisateurs
              </button>

              <button
                onClick={() => setActiveTab('payments')}
                className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'payments'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <CreditCard size={20} className="mr-3" />
                Paiements
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === 'settings'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Settings size={20} className="mr-3" />
                Paramètres
              </button>
            </nav>

            {/* Statistiques rapides */}
            <div className="mt-8 p-4 bg-gray-900 rounded-lg shadow-lg border border-gray-800">
              <h3 className="font-semibold text-white mb-3">Aperçu rapide</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Événements actifs</span>
                  <span className="font-semibold text-white">8</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Ventes aujourd'hui</span>
                  <span className="font-semibold text-white">42</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Nouveaux users</span>
                  <span className="font-semibold text-white">15</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">ID Utilisateur</span>
                  <span className="font-semibold text-white">{user?.id}</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              renderContent()
            )}
          </main>
        </div>
      </div>
    </div>
  );
}