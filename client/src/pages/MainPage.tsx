// src/pages/MainPage.tsx
import React, {useState, useEffect, useCallback} from 'react';
import { Sort } from '../components/Sort/Sort';
import { Track as TrackCard } from '../components/Track/Track';
import { Pagination, PageItem } from '../components/Pagination/Pagination';
import { initTrackAPI, PaginatedTracks, Track } from '../modules/api/tracksAPI';
import styles from './MainPage.module.css';
import {Header} from "../components/Header/Header";

const API = initTrackAPI('http://localhost:8000/api', fetch);

export const MainPage: React.FC = () => {
    const [tracks, setTracks] = useState<Track[]>([]);
    const [genres, setGenres] = useState<string[]>([]);
    const [artists, setArtists] = useState<string[]>([]);

    const [page, setPage] = useState(1);
    const [limit] = useState(10);

    const [sortField, setSortField] = useState<'title'|'artist'|'album'|'createdAt'>('createdAt');
    const [genreFilter, setGenreFilter] = useState<string>('');
    const [artistFilter, setArtistFilter] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');

    const [totalPages, setTotalPages] = useState(1);

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
            })
            .catch(console.error);
    }, [page, limit, sortField, genreFilter, artistFilter, searchTerm]);

    return (
        <>
            <Header/>
            <div className={styles.container}>
                <Sort
                    genres={['All', ...genres]}
                    artists={['All', ...artists]}
                    sortField={sortField}
                    onSortChange={(f: 'title' | 'artist' | 'album' | 'createdAt') => { setSortField(f); setPage(1); }}
                    genreFilter={genreFilter}
                    onGenreFilterChange={(g: string) => { setGenreFilter(g); setPage(1); }}
                    artistFilter={artistFilter}
                    onArtistFilterChange={(a: string) => { setArtistFilter(a); setPage(1); }}
                    searchTerm={searchTerm}
                    onSearchChange={(term: string) => { setSearchTerm(term); setPage(1); }}
                />


                <div className={styles.list}>
                    {tracks.map(t => (
                        <TrackCard
                            key={t.id}
                            id={t.id}
                            title={t.title}
                            artist={t.artist}
                            album={t.album}
                            genres={t.genres}
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
        </>

    );
};
