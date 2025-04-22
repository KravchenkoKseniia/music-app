import React from 'react';
import classNames from 'classnames';
import styles from './styles.module.css';

import loaderGif from './img/Search.gif';

type LoaderElementType = {
    isLoading?: boolean
}

export const Loader: React.FC<LoaderElementType> = ({isLoading}) => {
    return <div className={classNames(styles.notification, {
        [styles.isLoading]: isLoading,
        [styles.isNotLoading]: !isLoading
    })} >
        <img src={loaderGif} alt="Loading..." className={styles.loaderImg} />
    </div>;
};