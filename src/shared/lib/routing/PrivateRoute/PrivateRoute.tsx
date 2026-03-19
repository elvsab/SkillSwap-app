import { type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../../../features/auth/model/authSlice";

interface PrivateRouteProps {
  children: ReactNode;
  anonymous?: boolean;
}

export const PrivateRoute = ({ children, anonymous }: PrivateRouteProps) => {
  const location = useLocation();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (anonymous) {
    if (isAuthenticated) {
      return <Navigate to="/profile" replace />;
    }
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};
