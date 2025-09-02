import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { Home, Ticket, User } from "lucide-react";

import HomePage from "./components/client/Home";
import EventDetails from "./components/client/EventDetails";
import Tickets from "./components/client/Tickets";
import Profile from "./components/client/Profile";
import Login from "./components/client/Login";
import Register from "./components/client/Register";
import ReactDOM from "react-dom/client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-gray-200">
        {/* Contenu des pages */}
        <div className="pb-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/event/:id" element={<EventDetails />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>

        {/* Barre de navigation sombre */}
        <nav className="fixed bottom-0 w-full bg-gray-800 border-t border-gray-700 shadow-lg">
          <div className="flex justify-around py-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex flex-col items-center text-xs transition ${
                  isActive ? "text-blue-400" : "text-gray-400 hover:text-gray-200"
                }`
              }
            >
              <Home className="w-6 h-6" />
              <span>Accueil</span>
            </NavLink>

            <NavLink
              to="/tickets"
              className={({ isActive }) =>
                `flex flex-col items-center text-xs transition ${
                  isActive ? "text-blue-400" : "text-gray-400 hover:text-gray-200"
                }`
              }
            >
              <Ticket className="w-6 h-6" />
              <span>Tickets</span>
            </NavLink>

            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex flex-col items-center text-xs transition ${
                  isActive ? "text-blue-400" : "text-gray-400 hover:text-gray-200"
                }`
              }
            >
              <User className="w-6 h-6" />
              <span>Profil</span>
            </NavLink>
          </div>
        </nav>
      </div>
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
