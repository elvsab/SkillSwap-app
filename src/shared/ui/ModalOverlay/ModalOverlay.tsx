import styles from "./ModalOverlay.module.scss";
import { type ModalOverlayProps } from "./ModalOverlay.types";

export const ModalOverlay = ({ onClick }: ModalOverlayProps) => (
  <div className={styles.overlay} onClick={onClick} />
);
