import { type FC, useState } from "react";
import { Checkbox } from "../../../shared/ui/checkbox";
import styles from "./city-filter.module.css";
import ChevronIcon from "../../../shared/assets/icons/ui/chevron-down.svg";

type City = {
  id: string;
  name: string;
};

type CityFilterUIProps = {
  cities: City[];
  value: string[];
  onChange: (value: string) => void;
};

export const CityFilterUI: FC<CityFilterUIProps> = ({
  cities,
  value,
  onChange,
}) => {
  const [expanded, setExpanded] = useState(false);

  //const visibleCities = expanded ? cities : cities.slice(0, 5);

  return (
    <div className={styles.container}>
      <p className={styles.title}>Город</p>
      <div
        className={`${styles.cityList} ${
          expanded ? styles.cityListExpanded : ""
        }`}
      >
        {cities.map((city) => (
          <div key={city.id} className={styles.label}>
            <Checkbox
              id={`city-${city.id}`}
              variant={value.includes(city.name) ? "checked" : "unchecked"}
              label={city.name}
              ariaLabel={`Выбрать город ${city.name}`}
              onChange={() => onChange(city.name)}
            />
          </div>
        ))}
      </div>
      {cities.length > 5 && (
        <button
          type="button"
          className={styles.button}
          onClick={() => setExpanded((prev) => !prev)}
        >
        <span>{expanded ? "Свернуть" : "Все города"}</span>
          <ChevronIcon
            className={`${styles.chevron} ${
              expanded ? styles.chevronUp : ""
            }`}
          />
        </button>
      )}
    </div>
  );
};
