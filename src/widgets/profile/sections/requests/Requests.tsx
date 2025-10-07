import styles from "./Requests.module.css";
import { Title } from "../../../../shared/ui/Title";

export const Requests = () => {
  return (
    <div className={styles.container}>
      <Title as="h3" size="sm" children="Заявки" />
      {/* сюда можно позже добавить список избранных */}
      <div className={styles.list}>
        <Title as="h4" size="xs" children="У вас пока нет заявок." />
      </div>
    </div>
  );
};
