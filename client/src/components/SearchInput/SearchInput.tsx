import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import styles from './styles.module.css';
import { FaSearch } from 'react-icons/fa';

type SearchFormProps = {
    value: string;
    onSearchChange: (term: string) => void;
};
export const SearchInput: React.FC<SearchFormProps> = ({ value, onSearchChange }) => {
    const [local, setLocal] = useState(value);

    useEffect(() => {
        setLocal(value);
    }, [value]);

    useEffect(() => {
        const handler = setTimeout(() => {
            onSearchChange(local.trim());
        }, 300);
        return () => clearTimeout(handler);
    }, [local]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLocal(e.target.value);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSearchChange(local.trim());
    };

    return (
        <form onSubmit={handleSubmit} className={styles.fgsearch}>
            <input data-testid="search-input" type="text" placeholder="Queen" className={styles.input} value={local} onChange={handleChange} />
            <button type="submit" >
                <FaSearch size={20} />
            </button>
        </form>
    );
}



