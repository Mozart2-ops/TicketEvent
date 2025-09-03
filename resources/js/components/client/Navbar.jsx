import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Ticket, User } from "lucide-react";
import { motion } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const location = useLocation();
  const { logout } = useContext(AuthContext);

  const menu = [
    { name: "Accueil", path: "/", icon: <Home className="w-5 h-5" /> },
    { name: "Tickets", path: "/tickets", icon: <Ticket className="w-5 h-5" /> },
    { name: "Profil", path: "/profile", icon: <User className="w-5 h-5" /> },
  ];

  return (
    <motion.nav
      className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 text-gray-400 flex justify-around py-3"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {menu.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={`flex flex-col items-center text-xs ${
            location.pathname === item.path
              ? "text-blue-500"
              : "hover:text-gray-200"
          }`}
        >
          <motion.div
            whileHover={{ scale: 1.3, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {item.icon}
          </motion.div>
          <span className="mt-1">{item.name}</span>
        </Link>
      ))}

      {/* Bouton déconnexion animé */}
      <motion.button
        onClick={logout}
        className="flex flex-col items-center text-xs text-red-500 hover:text-red-400"
        whileHover={{ scale: 1.2, rotate: -5 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        🚪
        <span>Logout</span>
      </motion.button>
    </motion.nav>
  );
}
