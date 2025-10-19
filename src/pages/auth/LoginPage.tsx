import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LoginForm } from "../../features/auth/ui/LoginForm/LoginForm";
import {
  selectAuthError,
  selectAuthLoading,
} from "../../features/auth/model/authSlice";
import styles from "./LoginPage.module.css";
import { useAuth } from "@/app/providers/authProvider/useAuth";
import { Loader } from "@/shared/ui/loader/loader"; 

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  useEffect(() => {
    if (isAuthenticated) navigate("/profile");
  }, [isAuthenticated, navigate]);

  const handleFormSubmit = (data: { email: string; password: string }) => {
    login(data.email, data.password);
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
            src="src\shared\assets\images\light-bulb.png"
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
