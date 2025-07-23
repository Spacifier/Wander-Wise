// src/root/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

function ProtectedRoute({ children }) {
  const { user, authChecked } = useAuth();

  if (!authChecked) return null; // Or loading spinner

  return user ? children : <Navigate to="/sign-in" />;
}

export default ProtectedRoute;
