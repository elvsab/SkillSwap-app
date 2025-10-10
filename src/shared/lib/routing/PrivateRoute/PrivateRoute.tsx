import { type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
  anonymous?: boolean;
}

const TOKEN_KEY = "token";

export const PrivateRoute = ({ children, anonymous }: PrivateRouteProps) => {
  const location = useLocation();

  if (anonymous) {
    return <>{children}</>;
  }

  const token = typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};
