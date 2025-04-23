import React from 'react';
import styles from './styles.module.css';
import {SearchInput} from '../SearchInput/SearchInput';


type SortOption = 'title' | 'artist' | 'album' | 'createdAt';

type SortProps = {
    genres?: string[];
    artists?: string[];
    sortField?: SortOption;
    onSortChange: (field: SortOption) => void;
    genreFilter?: string;
    onGenreFilterChange: (genre: string) => void;
    artistFilter?: string;
    onArtistFilterChange: (artist: string) => void;
    searchTerm: string;
    onSearchChange: (term: string) => void;
};

export const Sort: React.FC<SortProps> = ({
                                              genres,
                                              artists,
                                              sortField,
                                              onSortChange,
                                              genreFilter,
                                              onGenreFilterChange,
                                              artistFilter,
                                              onArtistFilterChange,
                                              searchTerm,
                                              onSearchChange,
}) => {
    return (
        <div className={styles.sortContainer}>
            <div className={styles.sortOptions}>
                <label>
                    <span>Sort by:</span>
                    <select data-testid="sort-select"
                            value={sortField}
                            onChange={e => onSortChange(e.target.value as SortOption)}>
                        <option value="title">Title</option>
                        <option value="artist">Artist</option>
                        <option value="album">Album</option>
                        <option value="createdAt">Created At</option>
                    </select>
                </label>
            </div>

            <div className={styles.filters}>
                <label>
                    <span>Genre:</span>
                    <select data-testid="filter-genre" value={genreFilter} onChange={e => onGenreFilterChange(e.target.value)}>
                        {genres?.map((genre) => (
                            <option key={genre} value={genre}>{genre}</option>
                        ))}
                    </select>
                </label>
            </div>
            <SearchInput value={searchTerm} onSearchChange={onSearchChange} />
        </div>
    );
};