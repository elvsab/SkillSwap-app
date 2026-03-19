import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../shared/ui/button";
import { Input } from "../../shared/ui/input";
import { Title } from "../../shared/ui/Title";
import styles from "./Registration.module.css";
import { getRegistrationDraft, saveRegistrationDraft } from "./registrationDraft";

export const RegistrationStepOnePage = () => {
  const navigate = useNavigate();
  const draft = getRegistrationDraft();
  const [email, setEmail] = useState(draft.email);
  const [password, setPassword] = useState(draft.password);

  const isValid = email.includes("@") && password.length >= 8;

  return (
    <section className={styles.page}>
      <div className={styles.topbar}>
        <Title as="h1" size="md">
          Шаг 1 из 3
        </Title>
        <Button label="Закрыть" secondClass="tertiary" onClick={() => navigate("/")} />
      </div>
      <div className={styles.steps}>
        <span className={`${styles.step} ${styles.stepActive}`} />
        <span className={styles.step} />
        <span className={styles.step} />
      </div>
      <div className={styles.layout}>
        <div className={styles.card}>
          <div className={styles.fieldGrid}>
            <Input
              label="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Введите email"
            />
            <Input
              label="Пароль"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Не менее 8 символов"
            />
            <div className={styles.actions}>
              <Button
                label="Далее"
                secondClass="primary"
                disabled={!isValid}
                onClick={() => {
                  saveRegistrationDraft({ email, password });
                  navigate("/registration/step2");
                }}
              />
            </div>
          </div>
        </div>
        <div className={styles.card}>
          <Title as="h3" size="sm" className={styles.panelTitle}>
            Создайте аккаунт SkillSwap
          </Title>
          <p className={styles.panelText}>
            На первом шаге мы сохраняем данные для входа. Дальше вы заполните
            профиль и добавите интересы, чтобы сервис мог подобрать подходящий
            обмен.
          </p>
        </div>
      </div>
    </section>
  );
};
