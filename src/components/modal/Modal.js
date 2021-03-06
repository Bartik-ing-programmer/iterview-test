import React, { useEffect, useRef } from "react";
import styles from "./modal.module.css";

const Modal = ({ modalStyle, children, show, onClose, backdropStyle }) => {
  const modalRef = useRef(null);
  useEffect(() => {
    if (show) {
      modalRef.current.classList.add(styles.visible);
    } else {
      modalRef.current.classList.remove(styles.visible);
    }
  }, [show]);
  return (
    <>
      <div ref={modalRef} style={backdropStyle} className={`${styles.modal}`}>
        <button
          onClick={onClose}
          style={{
            width: 30,
            height: 25,
            position: "absolute",
            top: 0,
            right: 0,
            margin: "1rem",
            cursor: "pointer",
          }}
          className={styles.close__btn}
        >
          &#10005;
        </button>
        <div style={modalStyle} className={styles.modal__wrap}>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
