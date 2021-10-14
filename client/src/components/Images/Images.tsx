import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ImageDTO } from '../../dto/image.dto';

import { RootState } from '../../redux';
import {
  fetchCountOfAllPages,
  fetchGetImageByID,
  fetchGetImages,
  setCurrentPage,
} from '../../redux/imageSlice';

import { debounce } from '../../utils/debounce';

import s from './Images.module.scss';

const Images: React.FC = () => {
  const dispatch = useDispatch();

  const imageById = useSelector((state: RootState) => state.image.imageById);
  const images = useSelector((state: RootState) => state.image.images);
  const allPages = useSelector((state: RootState) => state.image.allPages);
  const currentPage = useSelector(
    (state: RootState) => state.image.currentPage
  );

  const [searchImageInput, setSearchImageInput] = React.useState<string>('');
  const [buttonsArray, setButtonsArray] = React.useState<number[]>([]);

  React.useEffect(() => {
    dispatch(fetchGetImages(currentPage));
  }, [currentPage, dispatch]);

  React.useEffect(() => {
    if (allPages > 0) {
      if (allPages < 3) {
        setButtonsArray(
          [1, 2, 3].slice(0, allPages - 1).map((num) => {
            return num;
          })
        );
      } else {
        if (currentPage === allPages) {
          setButtonsArray([currentPage - 2, currentPage - 1, currentPage]);
        } else if (currentPage === 1) {
          setButtonsArray([currentPage, currentPage + 1, currentPage + 2]);
        } else {
          setButtonsArray([currentPage - 1, currentPage, currentPage + 1]);
        }
      }
    }
  }, [currentPage, allPages]);

  React.useEffect(() => {
    dispatch(fetchCountOfAllPages());
  }, [dispatch]);

  const handleSearchImageInput = (event: any) => {
    if (Number.isInteger(Number(event.target.value))) {
      dispatch(fetchGetImageByID(Number(event.target.value)));
      setSearchImageInput(event.target.value);
    }
  };

  const handleChangeCurrentPage = (page: number) => {
    dispatch(setCurrentPage({ currentPage: page }));
  };

  return (
    <div className={s['images-area']}>
      {images.length >= 0 ? (
        <>
          <div className={s['image-search-area']}>
            <input
              className={s['image-search-input']}
              placeholder="search by id"
              onChange={debounce(handleSearchImageInput, 500)}
            />
          </div>

          {searchImageInput.length > 0 ? (
            imageById.id !== -1 ? (
              <ul className={s['image-big']}>
                <li>id: {imageById.id}</li>
                <li>title: {imageById.title}</li>
                <li className={s['image-big-image-area']}>
                  <img src={imageById.url} alt={imageById.title} />
                </li>
              </ul>
            ) : (
              <div>Incorrect ID</div>
            )
          ) : (
            <>
              <ul className={s['images-list']}>
                {images.map((image: ImageDTO) => {
                  return (
                    <li className={s.image} key={image.id}>
                      <ul>
                        <li>id: {image.id}</li>
                        <li>title: {image.title}</li>
                        <li className={s['images-list-image']}>
                          <img src={image.thumbnailUrl} alt={image.title} />
                        </li>
                      </ul>
                    </li>
                  );
                })}
              </ul>

              <div className={s['images-navigation-buttons']}>
                {buttonsArray.length > 0 &&
                  buttonsArray.map((num) => {
                    if (num === currentPage) {
                      return (
                        <button
                          key={num}
                          className={`${s['images-navigation-button']} ${s['images-navigation-button-current']}`}
                          onClick={() => handleChangeCurrentPage(num)}
                        >
                          {num}
                        </button>
                      );
                    }

                    return (
                      <button
                        key={num}
                        className={s['images-navigation-button']}
                        onClick={() => handleChangeCurrentPage(num)}
                      >
                        {num}
                      </button>
                    );
                  })}
              </div>
            </>
          )}
        </>
      ) : (
        <div>Server error</div>
      )}
    </div>
  );
};

export default Images;
