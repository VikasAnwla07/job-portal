import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = useSelector((state) => state.jwt);

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const decoded = jwtDecode(token);

  // If roles are specified and user is not in allowed roles
  if (allowedRoles && !allowedRoles.includes(decoded.applicantType)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If all checks pass, render children
  return children;
};

export default ProtectedRoute;
