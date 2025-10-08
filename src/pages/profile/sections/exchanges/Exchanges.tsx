import styles from "./Exchanges.module.css";
import { Title } from "../../../../shared/ui/Title";

export const Exchanges = () => {
  return (
    <div className={styles.container}>
      <Title as="h3" size="sm" children="Мои обмены" />
      {/* сюда можно позже добавить список избранных */}
      <div className={styles.list}>
        <Title as="h4" size="xs" children="У вас пока нет обменов." />
      </div>
    </div>
  );
};
