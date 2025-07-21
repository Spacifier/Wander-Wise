// src/components/ProtectedRoute.jsx
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../lib/utils';

export default function ProtectedRoute({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    getCurrentUser()
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return isAuthenticated ? children : <Navigate to="/sign-in" />;
}