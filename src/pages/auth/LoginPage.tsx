import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LoginForm } from "../../features/auth/ui/LoginForm/LoginForm";
import {
  selectAuthError,
  selectAuthLoading,
} from "../../features/auth/model/authSlice";
import styles from "./LoginPage.module.css";
import { useAuth } from "@/app/providers/authProvider/useAuth";
import { Loader } from "@/shared/ui/loader/loader"; 
import LightBulbImage from "../../shared/assets/images/light-bulb.png";

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const redirectTo =
    (location.state as { from?: { pathname?: string } } | null)?.from
      ?.pathname ?? "/profile";

  useEffect(() => {
    if (isAuthenticated) navigate(redirectTo, { replace: true });
  }, [isAuthenticated, navigate, redirectTo]);

  const handleFormSubmit = (data: { email: string; password: string }) => {
    void login(data.email, data.password);
  };

  const handleSwitchToRegister = () => {
    navigate("/registration/step1");
  };

  if (loading) {
    return (
      <div className={styles.loaderWrapper}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Вход</h2>

      <div className={styles.content}>
        <div className={styles.formBlock}>
          <div className="auth-container">
            <div className="auth-card">
              <LoginForm
                onSubmit={handleFormSubmit}
                onSwitchToRegister={handleSwitchToRegister}
              />
              {error && <div className={styles.errorWrapper}>{error}</div>}
            </div>
          </div>
        </div>

        <div className={styles.imageBlock}>
          <img
            src={LightBulbImage}
            alt="Login illustration"
            className={styles.image}
          />
          <h3 className={styles.imageTitle}>С возвращением в SkillSwap!</h3>
          <p className={styles.imageText}>
            Обменивайтесь знаниями и навыками с другими людьми
          </p>
        </div>
      </div>
    </div>
  );
};
