import type { FC } from "react";
import { Checkbox } from "../../../shared/ui/checkbox";
import styles from "./city-filter.module.css";

type CityFilterUIProps = {
  value: string[];
  onChange: (value: string) => void;
};

const options: string[] = [
  "Москва",
  "Санкт-Петербург",
  "Новосибирск",
  "Екатеринбург",
  "Казань",
];

const labels: Record<string, string> = {
  Москва: "Москва",
  "Санкт-Петербург": "Санкт-Петербург",
  Новосибирск: "Новосибирск",
  Екатеринбург: "Екатеринбург",
  Казань: "Казань",
};

export const CityFilterUI: FC<CityFilterUIProps> = ({ value, onChange }) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Город</p>
      {options.map((option) => (
        <div key={option} className={styles.label}>
          <Checkbox
            id={`city-${option}`}
            variant={value.includes(option) ? "checked" : "unchecked"}
            label={labels[option]}
            ariaLabel={labels[option]}
            onChange={() => onChange(option)}
          />
        </div>
      ))}
      <button className={styles.button}>Все города</button>
    </div>
  );
};
