import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";

const PrivateRoute = ({ children }) => {
  const { activeUser = null } = useAuthStore();
  if (!activeUser) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default PrivateRoute;
