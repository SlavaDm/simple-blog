import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PostDTO } from '../../dto/post.dto';
import { RootState } from '../../redux';
import {
  fetchCountOfAllPages,
  setPosts,
} from '../../redux/postSlice';
import { PostsService } from '../../service/PostsService';
import s from './Posts.module.scss';

const Posts: React.FC = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.post.posts);

  React.useEffect(() => {
    dispatch(fetchCountOfAllPages());
  }, [dispatch]);

  React.useEffect(() => {
    (async () => {
      const posts = await PostsService.getPosts(1, 5);
      dispatch(setPosts({ posts: posts }));
    })();
  }, [dispatch]);

  React.useEffect(() => {
    (async () => {
      const posts = await PostsService.getPost(8);
      console.log(posts);
    })();
  }, []);

  return (
    <div className={s['posts-area']}>
      {posts.length >= 0 ? (
        <>
          <ul>
            {posts.map((post: PostDTO) => {
              return (
                <li key={post.id}>
                  <div>id: {post.id}</div>
                  <div>userId: {post.userId}</div>
                  <div>title: {post.title}</div>
                  <div>body: {post.body}</div>
                </li>
              );
            })}
          </ul>

          <div className={s['posts-navigation-buttons']}>
            <button>prev</button>
            <button>next</button>
          </div>
        </>
      ) : (
        <div>Server error</div>
      )}
    </div>
  );
};

export default Posts;
