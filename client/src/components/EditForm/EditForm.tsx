    import React, {ChangeEvent, FormEvent, FormEventHandler, useState} from 'react';
    import styles from './styles.module.css';
    import {Button} from '../Button/Button';
    import QueenImg from '../Track/queen.jpg';

    export type EditData = {
        title: string;
        artist: string;
        album?: string;
        genres: string[];
        coverImage?: string;
    }

    type EditFormProps = {
        track: {
            id: string;
            title: string;
            artist: string;
            album?: string;
            genres: string[];
            coverImage?: string;
            audioFile?: string;
        };
        allGenres: string[];
        onSave: (id: string, data: EditData) => void;
        onDelete: (id: string) => void;
        onUpload: (id: string, file: File) => void;
        onRemoveFile: (id: string) => void;
        onCancel: () => void;
    };

    export const EditForm: React.FC<EditFormProps> = ({track, allGenres, onSave, onDelete, onUpload, onRemoveFile, onCancel}) => {

        const [title, setTitle] = useState(track.title);
        const [artist, setArtist] = useState(track.artist);
        const [album, setAlbum] = useState(track.album || '');
        const [coverImage, setCoverImage] = useState(track.coverImage || '');
        const [selectedGenres, setSelectedGenres] = useState<string[]>([...track.genres]);
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
        }

        const handleSubmit = (e: FormEvent) => {
            e.preventDefault();
            if (!metadataValidation()) {
                return;
            }
            onSave(track.id, {
                title: title.trim(),
                artist: artist.trim(),
                album: album.trim(),
                genres: selectedGenres,
                coverImage: coverImage.trim()
            });
        }

        const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file)
                return;
            const allowed = ['audio/mpeg','audio/wav'];
            if (!allowed.includes(file.type)) {
                return alert('Only MP3 or WAV');
            }
            if (file.size > 10*1024*1024) {
                return alert('Max size 10MB');
            }
            onUpload(track.id, file);
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

                <div className={styles.fileSection}>
                    {track.audioFile ? (
                        <>
                            <audio
                                data-testid={`audio-player-${track.id}`}
                                controls
                                src={`http://localhost:8000/api/files/${track.audioFile}`}
                            />
                            <button type="button" onClick={() => onRemoveFile(track.id)} data-testid={`delete-file-${track.id}`}>
                                Remove file
                            </button>
                        </>
                    ) : (
                        <input
                            type="file"
                            accept=".mp3,.wav"
                            onChange={handleFileChange}
                            data-testid={`upload-track-${track.id}`}
                        />
                    )}
                </div>

                <div className={styles.actions}>
                    <Button
                        data-testid="submit-button"
                        title="Save"
                        type="inverse"
                    />
                    <Button
                        data-testid="delete-button"
                        title="Delete"
                        type="inverse"
                        onClick={() => onDelete(track.id)}
                    />
                    <Button title={"Cancel"} type={"inverse"} onClick={onCancel} />
                </div>
            </form>
        );

    };
