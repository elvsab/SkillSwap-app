import type { FC } from "react";
import styles from "./SkillTag.module.css";
import type { SkillTagProps } from "./types";

export const SkillTag: FC<SkillTagProps> = ({ label, backgroundColor }) => (
  <span className={styles.skill__tag} style={{ background: backgroundColor }}>
    {label}
  </span>
);