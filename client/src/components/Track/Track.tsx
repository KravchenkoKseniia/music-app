import React from 'react';
import styles from './styles.module.css';
import QueenImg from './queen.jpg';

type TrackProps = {
    title?: string;
    artist?: string;
    album?: string;
    genres?: string[];
    id?: string;
    onClick?: () => void;
}
export const Track: React.FC<TrackProps> = ({   title = 'Title',
                                                artist = 'Artist',
                                                album = 'Album',
                                                genres = ['1', '2', '3'],
                                                id = '1',
                                                onClick}) => {
    return (
        <div onClick={onClick} data-testid={`track-item-${id}`} className={styles.container}>
            <img src={QueenImg} alt="Album cover" className={styles.image} />
            <div className={styles.metadata}>
                <p data-testid={`track-item-${id}-title`} className={styles.title}>{title}</p>
                <p data-testid={`track-item-${id}-artist`} className={styles.artist}>{artist}</p>
                <p className={styles.album}>{album}</p>
                <p className={styles.genres}>Genres: {genres.join(', ')}</p>
            </div>

        </div>
    );
};
