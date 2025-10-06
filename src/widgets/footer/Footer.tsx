import clsx from "clsx";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import Logo from "../../shared/assets/logo/logo.svg";

export const Footer: React.FC = () => {
  return (
    <footer className={clsx(styles.footer)}>
      <div className={clsx(styles.left_side)}>
        <Logo />
        <p className={clsx(styles.left_side_text)}>SkillSwap - 2025</p>
      </div>
      <div className={clsx(styles.right_side)}>
        <div className={clsx(styles.right_side_item)}>
          <Link to="/about" className={clsx(styles.link)}>
            О проекте
          </Link>
          <Link to="/skills" className={clsx(styles.link)}>
            Все навыки
          </Link>
        </div>
        <div className={clsx(styles.right_side_item)}>
          <Link to="/contacts" className={clsx(styles.link)}>
            Контакты
          </Link>
          <Link to="/blog" className={clsx(styles.link)}>
            Блог
          </Link>
        </div>
        <div className={clsx(styles.right_side_item)}>
          <Link to="/privacy" className={clsx(styles.link)}>
            Политика конфиденциальности
          </Link>
          <Link to="/terms" className={clsx(styles.link)}>
            Пользовательское соглашение
          </Link>
        </div>
      </div>
    </footer>
  );
};
