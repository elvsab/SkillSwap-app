import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../../shared/ui/button";
import { Title } from "../../shared/ui/Title";
import Dropdown from "../../shared/ui/Dropdown";
import { registerUser, updateProfile } from "../../features/auth/model/authSlice";
import type { AppDispatch } from "../../app/providers/store";
import styles from "./Registration.module.css";
import {
  clearRegistrationDraft,
  getRegistrationDraft,
} from "./registrationDraft";

const interestsOptions = [
  "Английский",
  "Маркетинг",
  "Музыка и звук",
  "Тайм-менеджмент",
  "Дизайн",
  "Подготовка к IELTS",
].map((label) => ({ label, value: label }));

export const RegistrationStepThreePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const draft = getRegistrationDraft();
  const [interests, setInterests] = useState<string[]>(draft.interests);
  const [learningGoals, setLearningGoals] = useState<string[]>(
    draft.learningGoals
  );

  const completeRegistration = async () => {
    await dispatch(
      registerUser({
        name: draft.name,
        email: draft.email,
        password: draft.password,
      })
    ).unwrap();

    await dispatch(
      updateProfile({
        name: draft.name,
        city: draft.city,
        gender: draft.gender,
        birthDate: draft.birthDate || new Date().toISOString(),
        aboutUser: draft.aboutUser,
      })
    ).unwrap();

    clearRegistrationDraft();
    navigate("/profile");
  };

  return (
    <section className={styles.page}>
      <div className={styles.topbar}>
        <Title as="h1" size="md">
          Шаг 3 из 3
        </Title>
        <Button label="Закрыть" secondClass="tertiary" onClick={() => navigate("/")} />
      </div>
      <div className={styles.steps}>
        <span className={`${styles.step} ${styles.stepActive}`} />
        <span className={`${styles.step} ${styles.stepActive}`} />
        <span className={`${styles.step} ${styles.stepActive}`} />
      </div>
      <div className={styles.layout}>
        <div className={styles.card}>
          <div className={styles.fieldGrid}>
            <div>
              <label style={{ display: "block", marginBottom: 8 }}>
                Что вам интересно преподавать
              </label>
              <Dropdown
                options={interestsOptions}
                value={interests}
                onChange={(value: string | string[] | null) =>
                  setInterests((value ?? []) as string[])
                }
                multi
                searchable
                fullWidth
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: 8 }}>
                Что вы хотите изучать
              </label>
              <Dropdown
                options={interestsOptions}
                value={learningGoals}
                onChange={(value: string | string[] | null) =>
                  setLearningGoals((value ?? []) as string[])
                }
                multi
                searchable
                fullWidth
              />
            </div>
            <div className={styles.tagList}>
              {[...interests, ...learningGoals].slice(0, 6).map((item) => (
                <span key={item} className={styles.tag}>
                  {item}
                </span>
              ))}
            </div>
            <div className={styles.actions}>
              <Button label="Назад" secondClass="secondary" onClick={() => navigate("/registration/step2")} />
              <Button label="Завершить регистрацию" secondClass="primary" onClick={() => void completeRegistration()} />
            </div>
          </div>
        </div>
        <div className={styles.card}>
          <Title as="h3" size="sm" className={styles.panelTitle}>
            Последний шаг перед стартом
          </Title>
          <p className={styles.panelText}>
            Сохраните интересы, и мы сразу перенаправим вас в личный кабинет.
            Потом вы сможете создать собственный навык или отправить первую
            заявку на обмен.
          </p>
        </div>
      </div>
    </section>
  );
};
