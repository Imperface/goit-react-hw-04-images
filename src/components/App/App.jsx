import { SearchBar, ImageGallery, Button, Notification } from 'components';
import { Notify } from 'notiflix';
import { ColorRing } from 'react-loader-spinner';
import css from './App.module.css';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

export const App = () => {
  const [error, setError] = useState(null);
  const [imgData, setImgData] = useState([]);
  const [totalHits, setTotalHits] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  const isFirstRenderAfterSubmit = useRef(true);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    const getDataBySearchQuery = async () => {
      // get basic params
      const BASE_URL = 'https://pixabay.com/api/?';
      const KEY = '39451943-1768e822566f11dd60ab4e4d9';
      const per_page = 12;

      // convert params to URLSearchParams
      const params = new URLSearchParams({
        key: KEY,
        q: searchQuery,
        image_type: 'photo',
        orientatino: 'horizontal',
        page: page,
        per_page: per_page,
        safesearch: true,
      });

      // create url string request
      const endpoint = BASE_URL + params.toString();

      // try to get request
      try {
        // turn on loader
        setLoader(true);

        // destr obj

        const {
          data: { totalHits, hits },
        } = await axios.get(endpoint);

        // check is data, if null hide load more, reset totalHits
        if (!totalHits) {
          Notify.failure('Nothing was found for your request.');
          setLoadMore(false);
          setTotalHits(null);
          return;
        }

        // if first render after submit, show total hist
        if (isFirstRenderAfterSubmit.current) {
          Notify.success(
            `${totalHits} ${
              // check singular or plural
              totalHits === 1 ? 'image was' : 'images were'
            } found for your query.`
          );
          isFirstRenderAfterSubmit.current = false;
        }

        // spread new data to state, set total hits to state
        setImgData(prev => [...prev, ...hits]);
        setTotalHits(totalHits);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoader(false);
      }
    };

    getDataBySearchQuery();
  }, [searchQuery, page]);

  useEffect(() => {
    // calc amount of pages
    const hitsPerPage = 12;
    const amountOfPages = Math.ceil(totalHits / hitsPerPage);

    // if amount <= 1 && amoutn <= page, amount of items in fetch <= 12, delete load more btn
    // if amount > 1 && amount > page, amount of items in fetch > 12,  show load more btn

    if (amountOfPages <= 1 || page >= amountOfPages) {
      setLoadMore(false);
      return;
    }
    setLoadMore(true);
  }, [imgData, totalHits, setLoadMore, page]);

  return (
    <div className={`${css.app} app`}>
      <SearchBar
        setSearchQuery={setSearchQuery}
        setImgData={setImgData}
        setPage={setPage}
        setTotalHits={setTotalHits}
        isFirstRenderAfterSubmit={isFirstRenderAfterSubmit}
      />
      {error && <p>Some error. Error message: {error}</p>}

      {imgData.length ? (
        <ImageGallery imagesData={imgData} />
      ) : (
        <Notification />
      )}
      <ColorRing
        visible={loader}
        height="100"
        width="100"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass={css.blocksWrapper}
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
      {loadMore && <Button setPage={setPage} type="button" text="Load more" />}
    </div>
  );
};
