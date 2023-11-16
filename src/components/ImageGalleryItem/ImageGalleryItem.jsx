import { Modal } from 'components';
import css from './ImageGalleryItem.module.css';
import { useEffect, useState } from 'react';
export const ImageGalleryItem = ({ imageURL, largeURL, tags }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (!isModalOpen) {
      // reset padding rigth
      document.body.style.paddingRight = `0`;

      // reset overflow
      document.body.style.overflow = 'auto';
      return;
    }

    // get scroll width (total width - app width)
    const paddingRightOnBodyWithModal =
      window.innerWidth - document.querySelector('.app').offsetWidth;

    // block body
    document.body.style.overflow = 'hidden';

    // set padding rigth with scroll width
    document.body.style.paddingRight = `${paddingRightOnBodyWithModal}px`;
  }, [isModalOpen]);

  return (
    <li className={css.imageGalleryItem} tags={tags}>
      <img
        className={css.image}
        src={imageURL}
        alt={tags}
        onClick={() => setIsModalOpen(true)}
        loading="lazy"
      />
      {isModalOpen && (
        <Modal
          modalData={largeURL}
          tags={tags}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </li>
  );
};
