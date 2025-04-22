import React from 'react';
import styles from './styles.module.css';
import classNames from 'classnames';

type PaginationProps = {
    children: React.ReactNode
}

type PageProps = {
    children: React.ReactNode
    isActive: boolean
    onClick?: () => void
}

export const Pagination: React.FC<PaginationProps> = ({ children }) => {

    return <ul data-testid="pagination" className={styles.pageList}>
        {children}
    </ul>;
};


export const PageItem: React.FC<PageProps> = ( {children, isActive, onClick} ) => {
    return <li onClick={onClick} className={classNames(styles.pageItem, {
        [styles.pageItemActive]: isActive
    })}>{children}</li>;
};