import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../shared/ui/button";
import { Input } from "../../shared/ui/input";
import { Title } from "../../shared/ui/Title";
import { DatePicker } from "../../shared/ui/DatePicker";
import Dropdown from "../../shared/ui/Dropdown";
import styles from "./Registration.module.css";
import {
  getRegistrationDraft,
  saveRegistrationDraft,
} from "./registrationDraft";

const genderOptions = [
  { label: "Женский", value: "Женский" },
  { label: "Мужской", value: "Мужской" },
];

export const RegistrationStepTwoPage = () => {
  const navigate = useNavigate();
  const draft = getRegistrationDraft();
  const [name, setName] = useState(draft.name);
  const [city, setCity] = useState(draft.city);
  const [aboutUser, setAboutUser] = useState(draft.aboutUser);
  const [gender, setGender] = useState<"Мужской" | "Женский">(draft.gender);
  const [birthDate, setBirthDate] = useState<Date | null>(
    draft.birthDate ? new Date(draft.birthDate) : null
  );

  const isValid = Boolean(name.trim() && city.trim() && birthDate);

  return (
    <section className={styles.page}>
      <div className={styles.topbar}>
        <Title as="h1" size="md">
          Шаг 2 из 3
        </Title>
        <Button label="Закрыть" secondClass="tertiary" onClick={() => navigate("/")} />
      </div>
      <div className={styles.steps}>
        <span className={`${styles.step} ${styles.stepActive}`} />
        <span className={`${styles.step} ${styles.stepActive}`} />
        <span className={styles.step} />
      </div>
      <div className={styles.layout}>
        <div className={styles.card}>
          <div className={styles.fieldGrid}>
            <Input label="Имя" value={name} onChange={(event) => setName(event.target.value)} />
            <div className={styles.row}>
              <DatePicker
                value={birthDate}
                onChange={(date) => setBirthDate(date)}
                placeholder="дд.мм.гггг"
              />
              <div>
                <label style={{ display: "block", marginBottom: 8 }}>Пол</label>
                <Dropdown
                  options={genderOptions}
                  value={gender}
                  onChange={(value: string | string[] | null) =>
                    setGender(value === "Мужской" ? "Мужской" : "Женский")
                  }
                  fullWidth
                />
              </div>
            </div>
            <Input label="Город" value={city} onChange={(event) => setCity(event.target.value)} />
            <Input
              label="О себе"
              value={aboutUser}
              onChange={(event) => setAboutUser(event.target.value)}
              placeholder="Пара слов о себе"
            />
            <div className={styles.actions}>
              <Button label="Назад" secondClass="secondary" onClick={() => navigate("/registration/step1")} />
              <Button
                label="Далее"
                secondClass="primary"
                disabled={!isValid}
                onClick={() => {
                  saveRegistrationDraft({
                    name,
                    city,
                    aboutUser,
                    gender,
                    birthDate: birthDate?.toISOString() ?? "",
                  });
                  navigate("/registration/step3");
                }}
              />
            </div>
          </div>
        </div>
        <div className={styles.card}>
          <Title as="h3" size="sm" className={styles.panelTitle}>
            Расскажите немного о себе
          </Title>
          <p className={styles.panelText}>
            Эти данные будут показаны в вашем профиле и помогут другим людям
            лучше понять, чему вы хотите учиться и что можете предложить.
          </p>
        </div>
      </div>
    </section>
  );
};
