import { FC } from 'react';
import styles from './searchBar.module.scss';
import type { SearchBarProps } from './types';
import SearchIcon from '../../assets/icons/inputs/search.svg';

export const SearchBar: FC<SearchBarProps> = ({searchText, onSearchChange}) => {
  return (
    <div className={styles.search_bar}>
      <div className={styles.search_bar__icon}>
        <SearchIcon />
      </div>
      <input
        type="text"
        placeholder="Искать навык"
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
        className={styles.search_bar__input}
      />
    </div>
  );
};

export default SearchBar;