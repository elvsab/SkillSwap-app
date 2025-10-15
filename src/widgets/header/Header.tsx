import clsx from "clsx";
import styles from "./Header.module.css";
import Logo from "../../shared/assets/logo/logo.svg";
import { Button } from "../../shared/ui/button";
import { SearchBar } from "../../shared/ui/index";
import { IconWrapper } from "../../shared/ui/iconWrapper";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ThemeIcon from "../../shared/assets/icons/ui/moon.svg";
import NotificationIcon from "../../shared/assets/icons/notifications/notification.svg";
import HeartIcon from "../../shared/assets/icons/actions/like.svg";
import CrossIcon from "../../shared/assets/icons/ui/cross.svg";
import chevronDownIcon from "../../shared/assets/icons/ui/chevron-down.svg";
import Avatar from "../../shared/assets/icons/profile/user.svg";
import { SkillsList } from "@/shared/ui/SkillsList";
import { useDispatch } from "react-redux";
import { filtersActions } from "../../features/filters/model/filtersSlice";

type HeaderVariant = "guest" | "user" | "auth";

export interface HeaderProps {
  variant: HeaderVariant;
  name: string;
  searchText: string;
  onSearchChange: (value: string) => void;
}

export const Header = ({ variant, name, searchText, onSearchChange }: HeaderProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isSkillsOpen, setIsSkillsOpen] = useState(false);

  const toggleSkills = () => setIsSkillsOpen((s) => !s);
  const closeSkills = () => setIsSkillsOpen(false);

  const handleLogoClick = () => {
    navigate("/");
    closeSkills();
  };

  // Handle theme toggle
  const handleThemeToggle = () => {
    // TODO: Implement theme toggle functionality
    console.log("Theme toggle clicked");
  };

  // Handle notifications
  const handleNotifications = () => {
    // TODO: Open notifications dropdown
    console.log("Notifications clicked");
  };

  // Handle favorites
  const handleFavorites = () => {
    navigate("/favorites");
  };

  // Handle profile
  const handleProfile = () => {
    navigate("/profile");
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
    dispatch(filtersActions.setSearchQuery(value));
  };

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
              className={clsx(styles.link, styles.skillsToggle)}
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
          <button
            onClick={handleNotifications}
            style={{ background: "none", border: "none", cursor: "pointer" }}
            aria-label="Notifications"
          >
            <IconWrapper
              icon={NotificationIcon}
              width={24}
              height={24}
              ariaLabel="NotificationIcon"
            />
          </button>
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
          <button
            onClick={handleProfile}
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
