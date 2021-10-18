import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { IPost } from '../../interface/Post/IPost';

import { RootState } from '../../redux';

import {
  fetchCountOfTheAllPages,
  fetchGetPostByID,
  fetchGetPosts,
  setCurrentPage,
} from '../../redux/postSlice';

import { debounce } from '../../utils/debounce';
import { setPagination } from '../../utils/set-pagination';

import s from './Posts.module.scss';

/**
 * The component with posts.
 * @returns component with posts.
 */
const Posts: React.FC = () => {
  const dispatch = useDispatch();

  const postById: IPost | null = useSelector(
    (state: RootState) => state.post.postById
  );
  const posts = useSelector((state: RootState) => state.post.posts);
  const countOfTheAllPages = useSelector(
    (state: RootState) => state.post.countOfTheAllPages
  );
  const currentPage = useSelector((state: RootState) => state.post.currentPage);

  const [searchPostInput, setSearchPostInput] = React.useState<string>('');
  const [buttonsArray, setButtonsArray] = React.useState<number[]>([]);

  /**
   * React Hook for printing posts on page.
   */
  React.useEffect(() => {
    dispatch(fetchGetPosts(currentPage));
  }, [currentPage, dispatch]);

  /**
   * React Hook for setting count of all pages for pagination in the Redux.
   */
  React.useEffect(() => {
    dispatch(fetchCountOfTheAllPages());
  }, [dispatch]);

  /**
   * React Hook for setting pagination of the posts.
   */
  React.useEffect(() => {
    setPagination(setButtonsArray, currentPage, countOfTheAllPages);
  }, [currentPage, countOfTheAllPages]);

  /**
   * The handle of input value for search post by id.
   * @param event data from the input.
   */
  const handleSearchPostInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchPostInput(event.target.value);
    if (
      Number.isInteger(Number(event.target.value)) &&
      Number(event.target.value) > 0
    ) {
      dispatch(fetchGetPostByID(Number(event.target.value)));
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
    <div className={s['posts-area']}>
      {posts.length > 0 ? (
        <>
          <div className={s['post-search-area']}>
            <input
              className={s['post-search-input']}
              placeholder="search by id"
              onChange={debounce(handleSearchPostInput, 500)}
            />
          </div>

          {searchPostInput.length > 0 ? (
            Object.keys(postById).length > 0 ? (
              <div className={s.post}>
                <ul>
                  <li>id: {postById.id}</li>
                  <li>userId: {postById.userId}</li>
                  <li>title: {postById.title}</li>
                  <li>body: {postById.body}</li>
                </ul>
              </div>
            ) : (
              <div>Incorrect ID</div>
            )
          ) : (
            <>
              <ul className={s['posts-list']}>
                {posts.map((post: IPost) => {
                  return (
                    <li className={s.post} key={post.id}>
                      <ul>
                        <li>id: {post.id}</li>
                        <li>userId: {post.userId}</li>
                        <li>title: {post.title}</li>
                        <li>body: {post.body}</li>
                      </ul>
                    </li>
                  );
                })}
              </ul>

              <div className={s['posts-navigation-buttons']}>
                {buttonsArray.length > 0 &&
                  buttonsArray.map((num) => {
                    if (num === currentPage) {
                      return (
                        <button
                          key={num}
                          className={`${s['posts-navigation-button']} ${s['posts-navigation-button-current']}`}
                          onClick={() => handleChangeCurrentPage(num)}
                        >
                          {num}
                        </button>
                      );
                    }

                    return (
                      <button
                        key={num}
                        className={s['posts-navigation-button']}
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

export default React.memo(Posts);
