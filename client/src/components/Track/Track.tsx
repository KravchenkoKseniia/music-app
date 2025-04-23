import React from 'react';
import styles from './styles.module.css';
import QueenImg from './queen.jpg';
import classNames from 'classnames';

type TrackProps = {
    title?: string;
    artist?: string;
    album?: string;
    genres?: string[];
    id?: string;
    onClick?: () => void;
    coverImage?: string;
    isSelected?: boolean;
    audioFile?: string;
}
export const Track: React.FC<TrackProps> = ({   title = 'Title',
                                                artist = 'Artist',
                                                album = 'Album',
                                                genres = ['1', '2', '3'],
                                                id = '1',
                                                onClick,
                                            coverImage = QueenImg,
                                            isSelected=false, audioFile}) => {
    if (coverImage === '') {
        coverImage = QueenImg;
    }

    if (genres.length === 0) {
        genres = ['No genres'];
    }

    return (
        <div onClick={onClick} data-testid={`track-item-${id}`} className={classNames(styles.container, {
            [styles.selected]: isSelected
        })}>
            <img src={coverImage} alt="Album cover" className={styles.image} />
            <div className={styles.metadata}>
                <p data-testid={`track-item-${id}-title`} className={styles.title}>{title}</p>
                <p data-testid={`track-item-${id}-artist`} className={styles.artist}>{artist}</p>
                <p className={styles.album}>{album}</p>
                <p className={styles.genres}>Genres: {genres.join(', ')}</p>

                {audioFile && (
                    <audio
                        data-testid={`audio-player-${id}`}
                        className={styles.audioPlayer}
                        controls
                        src={`http://localhost:8000/api/files/${audioFile}`}
                    >
                    </audio>
                )}
            </div>

        </div>
    );
};
