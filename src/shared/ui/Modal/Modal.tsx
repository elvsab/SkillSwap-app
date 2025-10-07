import { type FC, memo, useEffect } from "react";
import type { ModalProps } from "./Modal.types";
import { createPortal } from "react-dom";
import { ModalOverlay } from "../ModalOverlay";
import styles from "./Modal.module.scss";

const modalRoot = document.getElementById("modals") || document.body;

export const Modal: FC<ModalProps> = memo(({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <>
      <div className={styles.modal}>
        <div className={styles.content}>{children}</div>
      </div>
      <ModalOverlay onClick={onClose} />
    </>,
    modalRoot as HTMLDivElement
  );
});
