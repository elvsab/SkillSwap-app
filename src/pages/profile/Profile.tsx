import clsx from "clsx";
import styles from "./Profile.module.css";
import { Outlet } from "react-router-dom";
import { ProfileNav } from "./sections/profileNav";

export const Profile = () => {
  return (
    <div className={styles.profile}>
      <div className={clsx(styles.navWrapper)}>
        <ProfileNav />
      </div>
      <div className={clsx(styles.contentWrapper)}>
        <Outlet />
      </div>
    </div>
  );
};
