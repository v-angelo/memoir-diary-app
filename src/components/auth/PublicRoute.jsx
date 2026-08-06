import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function PublicRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
}

export default PublicRoute;
