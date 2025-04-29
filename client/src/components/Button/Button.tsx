import React from 'react';
import styles from './styles.module.css';
import classNames from 'classnames';


interface ButtonProps {
    title: string,
    onClick?: () => void,
    isDisabled?: boolean
    type: 'default' | 'inverse'
}

export const Button = ({onClick, title = 'SAVE', isDisabled, type='default'}: ButtonProps) => {
    return (
        // <div className={styles.container}>
        <button onClick={onClick}
                className={classNames(styles.btn, {
                    [styles.inverse] : type === 'inverse',
                    [styles.default] : type === 'default'
                })}
                disabled={isDisabled}
        >{title}</button>
        // </div>
    );
};