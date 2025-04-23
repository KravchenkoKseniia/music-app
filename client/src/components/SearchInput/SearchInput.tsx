import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import styles from './styles.module.css';
import { FaSearch } from 'react-icons/fa';

type SearchFormProps = {
    value: string;
    onSearchChange: (term: string) => void;
};
export const SearchInput: React.FC<SearchFormProps> = ({ value, onSearchChange }) => {
    const [searchTerm, setSearchTerm] = useState(value);

    useEffect(() => {
        setSearchTerm(value);
    }, [value]);

    useEffect(() => {
        const handler = setTimeout(() => {
            onSearchChange(searchTerm.trim());
        }, 300);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSearchChange(searchTerm.trim());
    };

    return (
        <form onSubmit={handleSubmit} className={styles.fgsearch}>
            <input data-testid="search-input" type="text" placeholder="Queen" className={styles.input} value={searchTerm} onChange={handleChange} />
            <button type="submit" >
                <FaSearch size={20} />
            </button>
        </form>
    );
};



