import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);

  // Si pas d'utilisateur → redirection vers login
  return user ? children : <Navigate to="/login" />;
}
