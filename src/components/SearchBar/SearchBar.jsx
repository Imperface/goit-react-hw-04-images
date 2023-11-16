import { SearchForm } from 'components';
import css from './SearchBar.module.css';
import { useEffect, useState } from 'react';
import { Notify } from 'notiflix';
Notify.init({
  borderRadius: '20px',
  fontSize: '16px',
  clickToClose: true,
});

export const SearchBar = ({
  setSearchQuery,
  setImgData,
  setPage,
  isFirstRenderAfterSubmit,
}) => {
  const [localQuery, setLocalQuery] = useState('');

  useEffect(() => {
    // if localQuery update, reset imgData, reset page, set new searchQuery
    setImgData([]);
    setPage(1);
    setSearchQuery(localQuery);
  }, [localQuery, setImgData, setPage, setSearchQuery]);

  const onSearchFormSubmit = e => {
    e.preventDefault();

    // get input ref
    const refSearchInput = e.target.elements.searchQuery;

    // get value of ref
    const searchInputValue = refSearchInput.value;

    if (!searchInputValue.trim()) {
      Notify.failure('Search query can not be empty.');
      return;
    }

    // if dublicate search query, return
    if (searchInputValue === localQuery) {
      Notify.failure('The images you requested have already been provided.');
      return;
    }
    // update local query
    isFirstRenderAfterSubmit.current = true;
    setLocalQuery(searchInputValue);
  };
  return (
    <div className={css.searchBar}>
      <SearchForm
        inputType="text"
        inputName="searchQuery"
        buttonType="submit"
        onSearchFormSubmit={onSearchFormSubmit}
      />
    </div>
  );
};
