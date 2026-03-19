import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./Skills.module.css";
import { Button } from "../../../../shared/ui/button";
import { Title } from "../../../../shared/ui/Title";
import { selectUser } from "../../../../features/auth/model/authSlice";
import { getCreatedSkillsByOwner } from "../../../../shared/lib/skillswap-storage";
import { useStorageSync } from "../../../../shared/hooks";

export const Skills = () => {
  useStorageSync();
  const navigate = useNavigate();
  const currentUser = useSelector(selectUser);
  const createdSkills = getCreatedSkillsByOwner(currentUser?.id);

  return (
    <div className={styles.skills}>
      <Title as="h3" size="sm" children="Мои навыки" />
      {createdSkills.length > 0 ? (
        <div className={styles.list}>
          {createdSkills.map((skill) => (
            <div key={skill.id} className={styles.card}>
              <Title as="h4" size="xs">
                {skill.title}
              </Title>
              <p className={styles.meta}>
                {skill.category} · {skill.type === "canTeach" ? "Я учу" : "Я учусь"}
              </p>
              <p>{skill.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.list}>
          <Title
            as="h4"
            size="xs"
            children="У вас пока нет добавленных навыков."
          />
        </div>
      )}
      <Button
        label="Добавить навык"
        secondClass="primary"
        onClick={() => navigate("/create")}
      />
    </div>
  );
};
