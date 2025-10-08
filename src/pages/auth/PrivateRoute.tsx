import { type ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
  anonymous?: boolean;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  // TODO: Implement actual authentication logic
  // For now, just render children
  return <>{children}</>;
};

