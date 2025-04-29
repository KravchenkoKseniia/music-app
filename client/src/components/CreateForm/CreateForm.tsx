    import React, {FormEvent, useState} from 'react';
    import styles from './styles.module.css';
    import {Button} from '../Button/Button';
    import QueenImg from '../Track/queen.jpg';

    type CreateFormProps = {
        allGenres: string[];
        onSubmit: (data: {
            title: string;
            artist: string;
            album: string;
            genres: string[];
            coverImage: string;
        }) => void;
        onCancel: () => void;
    };

    export const CreateForm: React.FC<CreateFormProps> = ({allGenres, onSubmit, onCancel}) => {

        const [title, setTitle] = useState('');
        const [artist, setArtist] = useState('');
        const [album, setAlbum] = useState('');
        const [coverImage, setCoverImage] = useState('');
        const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
        const [newGenre, setNewGenre] = useState('');

        const [errors, setErrors] = useState<Record<string,string>>({});

        const isURL = (url: string) => {
            try{
                const test = new URL(url);
                return /\.(jpe?g|png|gif|bmp|webp)$/i.test(test.pathname);
            }
            catch {
                return false;
            }
        };

        const handleAddGenre = () => {
            if (newGenre && !selectedGenres.includes(newGenre)) {
                setSelectedGenres([...selectedGenres, newGenre]);
                setNewGenre('');
            }
        };

        const handleRemoveGenre = (g: string) => {
            setSelectedGenres(selectedGenres.filter(x => x !== g));
        };

        const metadataValidation = () => {
            const errors: Record<string, string> = {};
            if (!title.trim()) {
                errors.title = 'Title is required';
            }
            if (!artist.trim()) {
                errors.artist = 'Artist is required';
            }
            if (coverImage && !isURL(coverImage)) {
                errors.coverImage = 'Invalid URL';
            }
            setErrors(errors);
            return Object.keys(errors).length === 0;
        };

        const handleSubmit = (e: FormEvent) => {
            e.preventDefault();
            if (!metadataValidation()) {
                return;
            }
            onSubmit({
                title,
                artist,
                album,
                genres: selectedGenres,
                coverImage
            });
        };

        return (
            <form data-testid="track-form" className={styles.container} onSubmit={handleSubmit}>
                <div className={styles.field}>
                    <label className={styles.label}>Title</label>
                    <input
                        data-testid="input-title"
                        className={styles.input}
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    {errors.title && <div data-testid="error-title" className={styles.error}>{errors.title}</div>}
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Artist</label>
                    <input
                        data-testid="input-artist"
                        className={styles.input}
                        value={artist}
                        onChange={e => setArtist(e.target.value)}
                    />
                    {errors.artist && <div data-testid="error-artist" className={styles.error}>{errors.artist}</div>}
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Album</label>
                    <input
                        data-testid="input-album"
                        className={styles.input}
                        value={album}
                        onChange={e => setAlbum(e.target.value)}
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Genres</label>
                    <div className={styles.tags}>
                        {selectedGenres.map(g => (
                            <span key={g} className={styles.tag}>
              {g} <button type="button" onClick={() => handleRemoveGenre(g)}>×</button>
            </span>
                        ))}
                    </div>
                    <div className={styles.addGenre}>
                        <select
                            data-testid="genre-selector"
                            value={newGenre}
                            onChange={e => setNewGenre(e.target.value)}
                        >
                            <option value="">— Select genre —</option>
                            {allGenres.map(g => (
                                <option key={g} value={g}>{g}</option>
                            ))}
                        </select>
                        <button type="button" onClick={handleAddGenre}>+</button>
                    </div>
                </div>

                <div className={styles.field}>
                    <label className={styles.label}>Image URL</label>
                    <input
                        data-testid="input-cover-image"
                        className={styles.input}
                        value={coverImage}
                        onChange={e => setCoverImage(e.target.value)}
                    />
                    {errors.coverImage && <div data-testid="error-coverImage" className={styles.error}>{errors.coverImage}</div>}
                    <div className={styles.preview}>
                        <img
                            src={isURL(coverImage) ? coverImage : QueenImg}
                            alt="Cover preview"
                            className={styles.previewImage}
                        />
                    </div>
                </div>

                <div className={styles.actions}>
                    <Button
                        data-testid="submit-button"
                        title="Create"
                        type="inverse"
                    />
                    <Button data-testid="cancel-delete" title={'Cancel'} type={'inverse'} onClick={onCancel} />
                </div>
            </form>
        );

    };
