import { Navigate, useLocation, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const location = useLocation();

  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};
