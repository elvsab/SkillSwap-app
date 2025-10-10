import { NavLink } from "react-router-dom";
import styles from "./ProfileNav.module.css";
import { IconWrapper } from "../../../../shared/ui/iconWrapper";
import HeartIcon from "../../../../shared/assets/icons/actions/like.svg";
import AvatarIcon from "../../../../shared/assets/icons/profile/user.svg";
import SkillsIcon from "../../../../shared/assets/icons/profile/idea.svg";
import RequestsIcon from "../../../../shared/assets/icons/profile/request.svg";
import ExchangesIcon from "../../../../shared/assets/icons/profile/message-text.svg";

export const ProfileNav = () => {
  const links = [
    { to: "requests", label: "Заявки", icon: RequestsIcon },
    { to: "exchanges", label: "Мои обмены", icon: ExchangesIcon },
    { to: "favorites", label: "Избранные", icon: HeartIcon },
    { to: "skills", label: "Мои навыки", icon: SkillsIcon },
    { to: "personal", label: "Личные данные", icon: AvatarIcon },
  ];

  return (
    <nav className={styles.nav}>
      {links.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `${styles.navItem} ${isActive ? styles.active : ""}`
          }
        >
          <IconWrapper icon={Icon} width={20} height={20} />
          {label}
        </NavLink>
      ))}
    </nav>
  );
};
