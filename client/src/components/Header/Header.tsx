import React from 'react';
import styles from './styles.module.css';

type HeaderProps = {
    title?: string;
}

export const Header : React.FC<HeaderProps> = ({title = 'MUSIC TRACKS APP'}) => {
    return (
        <div data-testid="tracks-header" className={styles.header}>
            <p className={styles.title}>{title}</p>
        </div>
    );
};