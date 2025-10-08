import styles from "./Skills.module.css";
import { Button } from "../../../../shared/ui/button";
import { Title } from "../../../../shared/ui/Title";

export const Skills = () => {
  const handleAddSkill = () => {
    // здесь позже можно открыть модалку или перейти на страницу добавления
    console.log("Добавить новый навык");
  };

  return (
    <div className={styles.skills}>
      <Title as="h3" size="sm" children="Мои навыки" />
      {/* сюда можно позже добавить список навыков */}
      <div className={styles.list}>
        <Title
          as="h4"
          size="xs"
          children="У вас пока нет добавленных навыков."
        />
      </div>
      <Button
        label="Добавить навык"
        secondClass="primary"
        onClick={handleAddSkill}
      />
    </div>
  );
};
