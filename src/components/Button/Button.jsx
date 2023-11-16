import css from './Button.module.css';
export const Button = ({ text, type, setPage }) => {
  return (
    <button
      className={css.button}
      onClick={() => setPage(prev => prev + 1)}
      type={type}
    >
      {text}
    </button>
  );
};
