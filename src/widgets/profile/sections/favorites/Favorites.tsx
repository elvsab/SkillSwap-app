import styles from "./Favorites.module.css";
import { Title } from "../../../../shared/ui/Title";

export const Favorites = () => {
  return (
    <div className={styles.container}>
      <Title as="h3" size="sm" children="Избранные" />
      {/* сюда можно позже добавить список избранных */}
      <div className={styles.list}>
        <Title as="h4" size="xs" children="У вас пока нет избранных." />
      </div>
    </div>
  );
};
