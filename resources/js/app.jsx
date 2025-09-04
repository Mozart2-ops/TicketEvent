import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/client/PrivateRoute";

import Home from "./components/client/Home";
import Login from "./components/client/Login";
import Register from "./components/client/Register";
import EventDetails from "./components/client/EventDetails";
import Tickets from "./components/client/Tickets";
import Profile from "./components/client/Profile";
import Payment from "./components/client/Payment";

import Organisateur from "./components/organisateur/OrgHome";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Routes publiques */}
          <Route path="/"element={<Home />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Routes protégées */}
          <Route path="/event/:id" element={<EventDetails />} />
          <Route
            path="/tickets"
            element={
              <PrivateRoute>
                <Tickets />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/payment/:eventId"
            element={
              <PrivateRoute>
                <Payment />
              </PrivateRoute>
            }
          />
           <Route
            path="/organisateur"
            element={
              <PrivateRoute>
                <Organisateur />
              </PrivateRoute>
            }
          />

          {/* Route inconnue → redirection */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

// ✅ Fix: éviter de recréer le root plusieurs fois
const rootElement = document.getElementById("app");
if (rootElement && !rootElement._reactRootContainer) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}

export default App;
