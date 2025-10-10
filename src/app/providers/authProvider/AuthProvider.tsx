import type { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "./AuthContext";
import { loginUser, logout } from "../../../features/auth/model/authSlice";
import { selectIsAuthenticated } from "../../../features/auth/model/authSlice";
import type { AppDispatch } from "../../../app/providers/store";

type Props = { children: ReactNode };

export const AuthProvider = ({ children }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const handleLogin = (email: string, password: string) => {
    dispatch(loginUser({ email, password }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
