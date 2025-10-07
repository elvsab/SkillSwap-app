import clsx from "clsx";
import styles from "./Header.module.css";
import Logo from "../../shared/assets/logo/logo.svg";
import { Button } from "../../shared/ui/button";
import { Input } from "../../shared/ui/input";
import { IconWrapper } from "../../shared/ui/iconWrapper";
import { Link } from "react-router-dom";
import ThemeIcon from "../../shared/assets/icons/ui/moon.svg";
import NotificationIcon from "../../shared/assets/icons/notifications/notification.svg";
import HeartIcon from "../../shared/assets/icons/actions/like.svg";
import CrossIcon from "../../shared/assets/icons/ui/cross.svg";
import chevronDownIcon from "../../shared/assets/icons/ui/chevron-down.svg";
import Avatar from "../../shared/assets/icons/profile/user.svg";

type HeaderVariant = "guest" | "user" | "auth";

export interface HeaderProps {
  variant: HeaderVariant;
  name: string;
}

export const Header = ({ variant, name }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <Logo />

      {variant !== "auth" && (
        <>
          <nav className={styles.nav}>
            <Link className={clsx(styles.link)} to="/about">
              <Button label="О проекте" />
            </Link>
            <Link className={clsx(styles.link)} to="/skills">
              <Button label="Навыки" icon={chevronDownIcon} />
            </Link>
          </nav>
          <div className={styles.input}>
            <Input type="text" placeholder="Искать навык" />
          </div>
        </>
      )}

      {variant === "guest" && (
        <IconWrapper
          icon={ThemeIcon}
          width={24}
          height={24}
          ariaLabel="ThemeIcon"
        />
      )}

      {variant === "guest" && (
        <div className={styles.buttons}>
          <Button label="Войти" secondClass="secondary" />
          <Button label="Зарегистрироваться" secondClass="primary" />
        </div>
      )}

      {variant === "user" && (
        <div className={styles.icons_user}>
          <IconWrapper
            icon={ThemeIcon}
            width={24}
            height={24}
            ariaLabel="ThemeIcon"
          />
          <IconWrapper
            icon={NotificationIcon}
            width={24}
            height={24}
            ariaLabel="NotificationIcon"
          />
          <IconWrapper
            icon={HeartIcon}
            width={24}
            height={24}
            ariaLabel="HeartIcon"
          />
          <div className={styles.profile}>
            <span className={styles.profile_name}>{name}</span>
            <IconWrapper
              icon={Avatar}
              width={48}
              height={48}
              ariaLabel="Avatar"
            />
          </div>
        </div>
      )}

      {variant === "auth" && (
        <Button label="Закрыть" icon={CrossIcon} secondClass="tertiary" />
      )}
    </header>
  );
};
