import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { IImage } from '../../interface/Image/IImage';

import { RootState } from '../../redux';
import {
  fetchCountOfTheAllPages,
  fetchGetImageByID,
  fetchGetImages,
  setCurrentPage,
} from '../../redux/imageSlice';

import { debounce } from '../../utils/debounce';
import { setPagination } from '../../utils/set-pagination';

import s from './Images.module.scss';

/**
 * The component with images.
 * @returns component with images.
 */
const Images: React.FC = () => {
  const dispatch = useDispatch();

  const imageById = useSelector((state: RootState) => state.image.imageById);
  const images = useSelector((state: RootState) => state.image.images);
  const countOfTheAllPages = useSelector(
    (state: RootState) => state.image.countOfTheAllPages
  );
  const currentPage = useSelector(
    (state: RootState) => state.image.currentPage
  );

  const [searchImageInput, setSearchImageInput] = React.useState<string>('');
  const [buttonsArray, setButtonsArray] = React.useState<number[]>([]);

  /**
   * React Hook for printing images on page.
   */
  React.useEffect(() => {
    dispatch(fetchGetImages(currentPage));
  }, [currentPage, dispatch]);

  /**
   * React Hook for setting count of all pages for pagination in the Redux.
   */
  React.useEffect(() => {
    dispatch(fetchCountOfTheAllPages());
  }, [dispatch]);

  /**
   * React Hook for setting pagination of the images.
   */
  React.useEffect(() => {
    setPagination(setButtonsArray, currentPage, countOfTheAllPages);
  }, [currentPage, countOfTheAllPages]);

  /**
   * The handle of input value for search image by id.
   * @param event data from the input.
   */
  const handleSearchImageInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchImageInput(event.target.value);
    if (
      Number.isInteger(Number(event.target.value)) &&
      Number(event.target.value) > 0
    ) {
      dispatch(fetchGetImageByID(Number(event.target.value)));
    }
  };

  /**
   * The handle of change current page, change state in the redux.
   * @param page number for switching to need page.
   */
  const handleChangeCurrentPage = (page: number) => {
    dispatch(setCurrentPage({ currentPage: page }));
  };

  return (
    <div className={s['images-area']}>
      {images.length > 0 ? (
        <>
          <div className={s['image-search-area']}>
            <input
              className={s['image-search-input']}
              placeholder="search by id"
              onChange={debounce(handleSearchImageInput, 500)}
            />
          </div>

          {searchImageInput.length > 0 ? (
            Object.keys(imageById).length > 0 ? (
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
                {images.map((image: IImage) => {
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
        <div>Loading</div>
      )}
    </div>
  );
};

export default React.memo(Images);
