import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

function AdminRoute({ children }) {
  const { user, authChecked } = useAuth();

  if (!authChecked) return null;

  return user?.status === "admin" ? children : <Navigate to="/" />;
}

export default AdminRoute;
