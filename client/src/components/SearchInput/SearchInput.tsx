import React, {FormEventHandler} from 'react';
import styles from './styles.module.css';
import { FaSearch } from 'react-icons/fa';

type SearchFormProps = {
    onSub:  FormEventHandler<HTMLFormElement>;
};
export const SearchInput: React.FC<SearchFormProps> = ({ onSub }) => (
    <form onSubmit={onSub} className={styles.fgsearch}>
        <input type="text" placeholder="Queen" className={styles.input} />
        <button type="submit">
            <FaSearch size={20} />
        </button>
    </form>
);


