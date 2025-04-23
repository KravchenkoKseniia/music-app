// src/pages/MainPage.tsx
import React, {useState, useEffect, useCallback} from 'react';
import { Sort } from '../components/Sort/Sort';
import { Track as TrackCard } from '../components/Track/Track';
import { Pagination, PageItem } from '../components/Pagination/Pagination';
import { initTrackAPI, PaginatedTracks, Track } from '../modules/api/tracksAPI';
import styles from './MainPage.module.css';
import {Header} from '../components/Header/Header';
import {Button} from '../components/Button/Button';
import {ModalWindow} from '../components/ModalWindow/ModalWindow';
import {CreateForm} from '../components/CreateForm/CreateForm';
import {EditData, EditForm} from '../components/EditForm/EditForm';
import {Loader} from '../components/Loader/Loader';
import {NotificationElement} from '../components/NotificationElement/NotificationElement';

const API = initTrackAPI('http://localhost:8000/api', fetch);

export const MainPage: React.FC = () => {
    // State for tracks, genres, artists
    const [tracks, setTracks] = useState<Track[]>([]);
    const [genres, setGenres] = useState<string[]>([]);
    const [artists, setArtists] = useState<string[]>([]);

    // State for pagination
    const [page, setPage] = useState(1);
    const [limit] = useState(10);

    // State for sorting and filtering
    const [sortField, setSortField] = useState<'title'|'artist'|'album'|'createdAt'>('createdAt');
    const [genreFilter, setGenreFilter] = useState<string>('');
    const [artistFilter, setArtistFilter] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');

    const [totalPages, setTotalPages] = useState(1);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // State for selection mode
    const [selectionMode, setSelectionMode] = useState(false);
    const [selectedIds, setSelectedIds]     = useState<Set<string>>(new Set());

    // State for editing
    const [editingTrack, setEditingTrack] = useState<Track | null>(null);

    // Loading
    const [isLoading, setIsLoading] = useState(false);

    const [notification, setNotification] = useState<{
        level: 'error' | 'success' | 'info' | 'warning', message: string} | null
    >(null);

    useEffect(() => {
        if(!notification) return;
        const timer = setTimeout(() => {
            setNotification(null);
        }, 3000);
        return () => clearTimeout(timer);
    }, [notification]);

    const handleSearchChange = useCallback((term: string) => {
        setSearchTerm(term);
        setPage(1);
    }, []);

    const handleSortChange = useCallback((f: 'title' | 'artist' | 'album' | 'createdAt') => {
        setSortField(f);
        setPage(1);
    }, []);

    const handleGenreFilterChange = useCallback((g: string) => {
        setGenreFilter(g === 'All' ? '' : g);
        setPage(1);
    }, []);

    const handleArtistFilterChange = useCallback((a: string) => {
        setArtistFilter(a === 'All' ? '' : a);
        setPage(1);
    }, []);

    useEffect(() => {
        API.getGenres()
            .then(setGenres)
            .catch(console.error);
    }, []);

    useEffect(() => {
        setIsLoading(true);
        API.getTracks({
            page,
            limit,
            sort: sortField,
            order: 'asc',
            genre: genreFilter || undefined,
            artist: artistFilter || undefined,
            search: searchTerm || undefined
        })
            .then((res: PaginatedTracks) => {
                setTracks(res.data);
                setTotalPages(res.meta.totalPages);

                const uniqueArtists = Array.from(new Set(res.data.map(t => t.artist)));
                setArtists(uniqueArtists);
                if (res.data.length === 0) {
                    setNotification({level: 'info', message: 'No tracks found'});
                }
            })
            .catch((err) => {
                setNotification({ level: 'error', message: `Failed to load tracks: ${err.message}` });
            })
            .finally(() => setIsLoading(false));
    }, [page, limit, sortField, genreFilter, artistFilter, searchTerm]);

    const handleCreateSubmit = async (data: {
        title: string;
        artist: string;
        album: string;
        genres: string[];
        coverImage: string;
    }) => {
        try {
            await API.createTrack(data);
            setNotification({level: 'success', message: 'Track created successfully'});
            API.getTracks({ page, limit, sort: sortField, order:'asc' })
                .then((res) => setTracks(res.data))
                .catch(console.error);
            closeModal();
        } catch (err) {
            setNotification({level: 'error', message: 'Error creating track'});
            console.error('Error creating track:', err);
        }
    };


    const toggleSelectionMode = () => {
        setSelectionMode(prev => !prev);
        if (selectionMode) {
            setSelectedIds(new Set());
        }
    };

    const handleTrackClick = (t: Track) => {
        if (selectionMode) {
            setSelectedIds(prev => {
                const next = new Set(prev);
                if (next.has(t.id)) {
                    next.delete(t.id);
                } else {
                    next.add(t.id);
                }
                return next;
            });
        } else {
            setEditingTrack(t);
            setSelectedIds(new Set());
        }
    };

    const handleDeleteSelected = async () => {
        const ids = Array.from(selectedIds);
        if (ids.length === 0) return;
        try {
            await API.deleteMultipleTracks(ids);
            setTracks(ts =>
                ts.filter(t => !selectedIds.has(t.id)));
            setSelectionMode(false);
            setSelectedIds(new Set());
            setNotification({level: 'success', message: 'Tracks deleted successfully'});
        } catch (err) {
            setNotification({level: 'error', message: 'Error deleting tracks'});
            console.error(err);
            alert('Some error');
        }
    };

    const handleUpdate = async (id: string, data: EditData) => {
        try {
            const updated = await API.updateTrack(id, data);
            setTracks(ts => ts.map(t => t.id === id ? updated : t));
            setNotification({level: 'success', message: 'Track updated successfully'});
            setEditingTrack(null);
        }
        catch (err) {
            setNotification({level: 'error', message: 'Error updating track'});
            console.error('Error updating track:', err);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await API.deleteTrack(id);
            setTracks(ts => ts.filter(t => t.id !== id));
            setNotification({level: 'success', message: 'Track deleted successfully'});
            setEditingTrack(null);
        }
        catch (err) {
            setNotification({level: 'error', message: 'Error deleting track'});
            console.error('Error deleting track:', err);
        }
    };

    const handleUpload = async (id: string, file: File) => {
        try {
            const upd = await API.uploadTrackFile(id, file);
            setTracks(ts => ts.map(t => t.id === id ? upd : t));
            setNotification({level: 'success', message: 'File uploaded successfully'});
            setEditingTrack(upd);
        }
        catch (err) {
            setNotification({level: 'error', message: 'Error uploading file'});
            console.error('Error uploading file:', err);
        }
    };

    const handleRemoveFile = async (id: string) => {
        try {
            const upd = await API.deleteTrackFile(id);
            setTracks(ts => ts.map(t => t.id === id ? upd : t));
            setNotification({level: 'success', message: 'File removed successfully'});
            setEditingTrack(upd);
        }
        catch (err) {
            setNotification({level: 'error', message: 'Error removing file'});
            console.error('Error removing file:', err);
        }
    };

    const createTrack = () => {
        openModal();
    };

    return (
        <>
            <Header/>
            {notification &&
                (<NotificationElement level={notification.level} message={notification.message} />)}
            <div className={styles.container}>
                <Sort
                    genres={['All', ...genres]}
                    artists={['All', ...artists]}
                    sortField={sortField}
                    onSortChange={handleSortChange}
                    genreFilter={genreFilter || 'All'}
                    onGenreFilterChange={handleGenreFilterChange}
                    artistFilter={artistFilter || 'All'}
                    onArtistFilterChange={handleArtistFilterChange}
                    searchTerm={searchTerm}
                    onSearchChange={handleSearchChange}
                    isDisabled={isLoading}
                />

                <div className={styles.buttons}>
                    <Button data-testid="create-track-button" title={'Create a Track'} type={'default'} onClick={createTrack} />
                    <Button
                        title={selectionMode ? 'Cancel selection' : 'Select tracks'}
                        type="default"
                        onClick={toggleSelectionMode}
                        data-testid="select-mode-toggle"
                    />
                    {selectionMode && (
                        <Button
                            title={`Delete selected (${selectedIds.size})`}
                            type="default"
                            onClick={handleDeleteSelected}
                            isDisabled={selectedIds.size === 0}
                            data-testid="bulk-delete-button"
                        />
                    )}
                </div>

                <div className={styles.title}>
                    <h4>To edit a track, please click on the track card</h4>
                    <h4>To delete multiple tracks, please click on the select button and then on the track cards</h4>
                </div>


                {isModalOpen && (
                    <ModalWindow onClose={closeModal} isOpen={isModalOpen}>
                        <CreateForm
                            allGenres={genres}
                            onSubmit={handleCreateSubmit}
                            onCancel={closeModal}
                        />
                    </ModalWindow>
                )}

                {editingTrack && (
                    <ModalWindow onClose={() => setEditingTrack(null)} isOpen={!!editingTrack}>
                        <EditForm
                            track={editingTrack}
                            allGenres={genres}
                            onSave={handleUpdate}
                            onDelete={handleDelete}
                            onUpload={handleUpload}
                            onRemoveFile={handleRemoveFile}
                            onCancel={() => setEditingTrack(null)}
                        />
                    </ModalWindow>
                )}



                <div className={styles.list}>
                    {tracks.map(t => (
                        <TrackCard
                            key={t.id}
                            id={t.id}
                            title={t.title}
                            artist={t.artist}
                            album={t.album}
                            genres={t.genres}
                            coverImage={t.coverImage}
                            audioFile={t.audioFile}
                            onClick={() => handleTrackClick(t)}
                            isSelected={selectedIds.has(t.id)}
                        />
                    ))}
                </div>

                <Pagination>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                        <PageItem
                            key={p}
                            isActive={p === page}
                            onClick={() => setPage(p)}
                        >
                            {p}
                        </PageItem>
                    ))}
                </Pagination>
            </div>

            {isLoading && <Loader isLoading={isLoading}/>}
        </>

    );
};
