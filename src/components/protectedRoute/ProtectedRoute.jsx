import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ requiredRole, children }) => {
  const roles = JSON.parse(localStorage.getItem('roles')) || [];
  const userRole = roles.length > 0 ? roles[0] : null;

  if (userRole !== requiredRole) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;


