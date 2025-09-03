import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    // ⚡ Redirection vers login si non connecté
    return <Navigate to="/login" replace />;
  }

  return children;
}

