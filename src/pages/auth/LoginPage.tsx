import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LoginFormUI } from "../../features/auth/ui/LoginForm";
import {
  selectAuthError,
  selectAuthLoading,
} from "../../features/auth/model/authSlice";
import styles from "./LoginPage.module.css";
import { useAuth } from "@/app/providers/authProvider/useAuth";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (isAuthenticated) navigate("/profile");
  }, [isAuthenticated, navigate]);

  const handleSubmit = () => {
    setEmailError("");
    setPasswordError("");
    let valid = true;

    if (!email) {
      setEmailError("Введите email");
      valid = false;
    }
    if (!password) {
      setPasswordError("Введите пароль");
      valid = false;
    }

    if (valid) login(email, password);
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Вход</h2>

      <div className={styles.content}>
        <div className={styles.formBlock}>
          <div className="auth-container">
            <div className="auth-card">
              <LoginFormUI
                email={email}
                password={password}
                onEmailChange={setEmail}
                onPasswordChange={setPassword}
                emailErrorMessage={emailError}
                passwordErrorMessage={passwordError}
                loading={loading}
                onSubmit={handleSubmit}
                footerContent={
                  error && <div className={styles.errorWrapper}>{error}</div>
                }
              />
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
