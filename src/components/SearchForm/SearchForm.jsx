import css from './SearchForm.module.css';
import { FiSearch } from 'react-icons/fi';
export const SearchForm = ({
  onSearchFormSubmit,
  inputType,
  inputName,
  buttonType,
}) => {
  return (
    <form className={css.form} onSubmit={onSearchFormSubmit}>
      <button className={css.button} type={buttonType}>
        <FiSearch />
      </button>
      <input
        className={css.input}
        placeholder="Search images and photos"
        type={inputType}
        name={inputName}
      />
    </form>
  );
};
