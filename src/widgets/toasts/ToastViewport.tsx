import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../shared/ui/button";
import {
  dismissToast,
  selectToasts,
} from "../../features/notifications/model/notificationsSlice";
import type { AppDispatch } from "../../app/providers/store";
import styles from "./ToastViewport.module.css";

export const ToastViewport = () => {
  const dispatch = useDispatch<AppDispatch>();
  const toasts = useSelector(selectToasts);

  useEffect(() => {
    if (toasts.length === 0) {
      return;
    }

    const timers = toasts.map((toast) =>
      window.setTimeout(() => {
        dispatch(dismissToast(toast.id));
      }, 4500)
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [dispatch, toasts]);

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className={styles.viewport}>
      {toasts.map((toast) => (
        <div key={toast.id} className={styles.toast}>
          <p className={styles.title}>{toast.title}</p>
          <p className={styles.description}>{toast.description}</p>
          <div className={styles.actions}>
            <Button
              label="Закрыть"
              secondClass="secondary"
              onClick={() => dispatch(dismissToast(toast.id))}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
