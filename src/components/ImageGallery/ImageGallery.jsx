import { ImageGalleryItem } from 'components';
import css from './ImageGallery.module.css';
export const ImageGallery = ({ imagesData, onGalleryItemClick }) => {
  return (
    <ul className={css.imageGallery} onClick={onGalleryItemClick}>
      {imagesData.map(item => (
        <ImageGalleryItem
          imageURL={item.webformatURL}
          tags={item.tags}
          key={item.id}
          largeURL={item.largeImageURL}
        />
      ))}
    </ul>
  );
};
