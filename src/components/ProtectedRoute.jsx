import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Bu bileşen içine sardığın route'lara sadece login olanlar girebilir
export default function ProtectedRoute({ children }) {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}
