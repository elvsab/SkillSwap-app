import { type FC, memo, useEffect } from "react";
import type { ModalProps } from "./Modal.types";
import { createPortal } from "react-dom";
import { ModalOverlay } from "../ModalOverlay";
import styles from "./Modal.module.scss";

const modalRoot = document.getElementById("modals") || document.body;

export const Modal: FC<ModalProps & { noOverlay?: boolean; className?: string }> = memo(
  ({ isOpen, onClose, children, noOverlay = false, className }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen && !noOverlay) {
        document.addEventListener("keydown", handleEsc);
        document.body.style.overflow = "hidden";
      } else if (isOpen && noOverlay) {
        document.addEventListener("keydown", handleEsc);
      }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      if (!noOverlay) document.body.style.overflow = "";
    };
  }, [isOpen, onClose, noOverlay]);

  if (!isOpen) return null;

  return createPortal(
    <>
      <div
          className={`${styles.modal} ${noOverlay ? styles['noOverlay'] : ""} ${className ?? ""}`}
        >
          <div className={styles.content}>{children}</div>
        </div>

        {/* рендер overlay только если не выключен */}
        {!noOverlay && <ModalOverlay onClick={onClose} />}
    </>,
    modalRoot as HTMLDivElement
  );
});
export default Modal;