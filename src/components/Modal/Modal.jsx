import { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({ closeModal, modalData, tags }) => {
  useEffect(() => {
    const onEscapeKeyDown = e => {
      if (e.code !== 'Escape') {
        return;
      }
      closeModal();
    };

    // set global event listener
    window.addEventListener('keydown', onEscapeKeyDown);
    return () => {
      // clear global event listener
      window.removeEventListener('keydown', onEscapeKeyDown);
    };
  }, [closeModal]);

  const onBackdropClick = e => {
    // if e.target is not backdrop, return
    if (e.target !== e.currentTarget) {
      return;
    }
    closeModal();
  };

  return (
    <div className={css.backdrop} onClick={onBackdropClick}>
      <div className={css.modal}>
        <img className={css.image} src={modalData} alt={tags} />
      </div>
    </div>
  );
};
