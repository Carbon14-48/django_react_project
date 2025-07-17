import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  // Exemple simple : on vérifie la présence d’un token JWT en localStorage
  const token = localStorage.getItem("access_token");

  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
