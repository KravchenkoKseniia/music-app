import React from 'react';
import styles from './styles.module.css';

type HeaderProps = {
    title?: string;
}

export const Header : React.FC<HeaderProps> = ({title = 'MUSIC TRACKS APP'}) => {
    return (
        <div className={styles.header}>
            <p className={styles.title}>{title}</p>
        </div>
    );
};