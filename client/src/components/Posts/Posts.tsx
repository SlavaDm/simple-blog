import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PostDTO } from '../../dto/post.dto';

import { RootState } from '../../redux';

import {
  fetchCountOfAllPages,
  fetchGetPostByID,
  fetchGetPosts,
  setCurrentPage,
} from '../../redux/postSlice';

import { debounce } from '../../utils/debounce';

import s from './Posts.module.scss';

const Posts: React.FC = () => {
  const dispatch = useDispatch();

  const postById = useSelector((state: RootState) => state.post.postById);
  const posts = useSelector((state: RootState) => state.post.posts);
  const allPages = useSelector((state: RootState) => state.post.allPages);
  const currentPage = useSelector((state: RootState) => state.post.currentPage);

  const [searchPostInput, setSearchPostInput] = React.useState<string>('');
  const [buttonsArray, setButtonsArray] = React.useState<number[]>([]);

  React.useEffect(() => {
    dispatch(fetchGetPosts(currentPage));
  }, [currentPage, dispatch]);

  React.useEffect(() => {
    dispatch(fetchCountOfAllPages());
  }, [dispatch]);

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

  const handleSearchPostInput = (event: any) => {
    if (Number.isInteger(Number(event.target.value))) {
      dispatch(fetchGetPostByID(Number(event.target.value)));
      setSearchPostInput(event.target.value);
    }
  };

  const handleChangeCurrentPage = (page: number) => {
    dispatch(setCurrentPage({ currentPage: page }));
  };

  return (
    <div className={s['posts-area']}>
      {posts.length >= 0 ? (
        <>
          <div className={s['post-search-area']}>
            <input
              className={s['post-search-input']}
              placeholder="search by id"
              onChange={debounce(handleSearchPostInput, 500)}
            />
          </div>

          {searchPostInput.length > 0 ? (
            postById.id !== -1 ? (
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
                {posts.map((post: PostDTO) => {
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
        <div>Server error</div>
      )}
    </div>
  );
};

export default Posts;
