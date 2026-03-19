import clsx from "clsx";
import styles from "./Header.module.css";
import Logo from "../../shared/assets/logo/logo.svg";
import { Button } from "../../shared/ui/button";
import { SearchBar } from "../../shared/ui/index";
import { IconWrapper } from "../../shared/ui/iconWrapper";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import ThemeIcon from "../../shared/assets/icons/ui/moon.svg";
import NotificationIcon from "../../shared/assets/icons/notifications/notification.svg";
import HeartIcon from "../../shared/assets/icons/actions/like.svg";
import CrossIcon from "../../shared/assets/icons/ui/cross.svg";
import chevronDownIcon from "../../shared/assets/icons/ui/chevron-down.svg";
import Avatar from "../../shared/assets/icons/profile/user.svg";
import { SkillsList } from "@/shared/ui/SkillsList";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/model/authSlice";
import { selectUnreadNotifications, readAllNotifications } from "../../features/notifications/model/notificationsSlice";
import type { AppDispatch } from "../../app/providers/store";
import { toggleTheme } from "../../features/theme/model/themeSlice";

type HeaderVariant = "guest" | "user" | "auth";

export interface HeaderProps {
  variant: HeaderVariant;
  name: string;
  searchText: string;
  onSearchChange: (value: string) => void;
}

export const Header = ({ variant, name, searchText, onSearchChange }: HeaderProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const unreadNotifications = useSelector(selectUnreadNotifications);

  const [isSkillsOpen, setIsSkillsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);
  const notificationsRef = useRef<HTMLDivElement | null>(null);

  const toggleSkills = () => setIsSkillsOpen((s) => !s);
  const closeSkills = () => setIsSkillsOpen(false);

  const handleLogoClick = () => {
    navigate("/");
    closeSkills();
  };

  // Handle theme toggle
  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  // Handle notifications
  const handleNotifications = () => {
    setIsNotificationsOpen((current) => !current);
    setIsProfileMenuOpen(false);
  };

  // Handle favorites
  const handleFavorites = () => {
    navigate("/profile/favorites");
  };

  // Handle profile
  const handleProfile = () => {
    navigate("/profile");
    setIsProfileMenuOpen(false);
  };

  // Handle login
  const handleLogin = () => {
    navigate("/login");
  };

  // Handle registration
  const handleRegistration = () => {
    navigate("/registration/step1");
  };

  // Handle close (for auth pages)
  const handleClose = () => {
    navigate(-1); // Go back to previous page
  };

  const handleSearchChange = (value: string) => {
    onSearchChange(value);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setIsProfileMenuOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }

      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <header className={styles.header}>
      <button
        onClick={handleLogoClick}
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        <Logo />
      </button>

      {variant !== "auth" && (
        <>
          <nav className={styles.nav}>
            <Link className={clsx(styles.link)} to="/about">
              <Button label="О проекте" />
            </Link>

            <Button
              label="Навыки"
              icon={chevronDownIcon}
              onClick={toggleSkills}
              className={clsx(styles.link, styles.skillsToggle, isSkillsOpen && styles.skillsToggleActive )}
              aria-haspopup="dialog"
              aria-expanded={isSkillsOpen}
              aria-controls="skills-list"
            />
          </nav>
          <div className={styles.input}>
            <SearchBar
              searchText={searchText}
              onSearchChange={handleSearchChange}
            />
          </div>
          <SkillsList isOpen={isSkillsOpen} onClose={closeSkills} />
        </>
      )}

      {variant === "guest" && (
        <button
          onClick={handleThemeToggle}
          style={{ background: "none", border: "none", cursor: "pointer" }}
          aria-label="Toggle theme"
        >
          <IconWrapper
            icon={ThemeIcon}
            width={24}
            height={24}
            ariaLabel="ThemeIcon"
          />
        </button>
      )}

      {variant === "guest" && (
        <div className={styles.buttons}>
          <Button label="Войти" secondClass="secondary" onClick={handleLogin} />
          <Button
            label="Зарегистрироваться"
            secondClass="primary"
            onClick={handleRegistration}
          />
        </div>
      )}

      {variant === "user" && (
        <div className={styles.icons_user}>
          <button
            onClick={handleThemeToggle}
            style={{ background: "none", border: "none", cursor: "pointer" }}
            aria-label="Toggle theme"
          >
            <IconWrapper
              icon={ThemeIcon}
              width={24}
              height={24}
              ariaLabel="ThemeIcon"
            />
          </button>
          <div className={styles.dropdownWrap} ref={notificationsRef}>
            <button
              onClick={handleNotifications}
              style={{ background: "none", border: "none", cursor: "pointer" }}
              aria-label="Notifications"
              className={styles.iconButton}
            >
              <IconWrapper
                icon={NotificationIcon}
                width={24}
                height={24}
                ariaLabel="NotificationIcon"
              />
              {unreadNotifications.length > 0 && <span className={styles.badge} />}
            </button>
            {isNotificationsOpen && (
              <div className={styles.dropdownPanel}>
                <div className={styles.dropdownHeader}>
                  <span>Уведомления</span>
                  <button
                    type="button"
                    className={styles.inlineAction}
                    onClick={() => dispatch(readAllNotifications())}
                  >
                    Прочитать все
                  </button>
                </div>
                <div className={styles.notificationList}>
                  {unreadNotifications.length === 0 && (
                    <p className={styles.emptyText}>Новых уведомлений пока нет.</p>
                  )}
                  {unreadNotifications.slice(0, 5).map((notification) => (
                    <div key={notification.id} className={styles.notificationItem}>
                      <strong>{notification.title}</strong>
                      <p>{notification.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button
            onClick={handleFavorites}
            style={{ background: "none", border: "none", cursor: "pointer" }}
            aria-label="Favorites"
          >
            <IconWrapper
              icon={HeartIcon}
              width={24}
              height={24}
              ariaLabel="HeartIcon"
            />
          </button>
          <div className={styles.dropdownWrap} ref={profileMenuRef}>
            <button
              onClick={() => {
                setIsProfileMenuOpen((current) => !current);
                setIsNotificationsOpen(false);
              }}
              className={styles.profile}
              style={{ background: "none", border: "none", cursor: "pointer" }}
              aria-label="Profile"
            >
              <span className={styles.profile_name}>{name}</span>
              <IconWrapper
                icon={Avatar}
                width={48}
                height={48}
                ariaLabel="Avatar"
              />
            </button>
            {isProfileMenuOpen && (
              <div className={styles.dropdownPanel}>
                <button type="button" className={styles.menuAction} onClick={handleProfile}>
                  Личный кабинет
                </button>
                <button type="button" className={styles.menuAction} onClick={handleLogout}>
                  Выйти из аккаунта
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {variant === "auth" && (
        <Button
          label="Закрыть"
          icon={CrossIcon}
          secondClass="tertiary"
          onClick={handleClose}
        />
      )}
    </header>
  );
};
