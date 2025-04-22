import React from "react";
import styles from "./styles.module.css";


type ModalWindowProps = {
    children: React.ReactNode;
    onClose: () => void;
    isOpen?: boolean;
};

export const ModalWindow: React.FC<ModalWindowProps> = ({ children, onClose, isOpen = false }) => {
    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>x
                </button>
                {children}
            </div>
        </div>
    );
};