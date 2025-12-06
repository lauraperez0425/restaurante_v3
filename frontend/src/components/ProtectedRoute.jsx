import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, requiredRole }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  // requiredRole puede ser "admin" (verificar rol 1) o "user" (verificar rol 2)
  if (requiredRole) {
    const expectedRol = requiredRole === "admin" ? 1 : 2;
    if (user.rol !== expectedRol) {
      return <h2 style={{ padding: "1rem" }}>No tienes permiso para acceder</h2>;
    }
  }

  return children;
}