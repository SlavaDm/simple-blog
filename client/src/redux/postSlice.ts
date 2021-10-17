import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { CountOfTheElementsOnOnePage } from '../enum/CountOfTheElementsOnOnePage';

import { IPost } from '../interface/Post/IPost';
import { IPostSlice } from '../interface/Post/IPostSlice';

import { PostsService } from '../service/PostsService';

/**
 * Async thunk for getting count of the posts.
 */
export const fetchCountOfAllPages = createAsyncThunk(
  'post/fetchCountOfAllPages',
  async () => {
    const countOfThePosts = await PostsService.getCountOfThePosts();
    const countOfThePages = Math.ceil(
      countOfThePosts / CountOfTheElementsOnOnePage.COUNT_POSTS
    );
    return countOfThePages;
  }
);

/**
 * Async thunk for getting posts.
 */
export const fetchGetPosts = createAsyncThunk(
  'post/fetchGetPosts',
  async (page: number) => {
    const posts = await PostsService.getPosts(
      (page - 1) * CountOfTheElementsOnOnePage.COUNT_POSTS + 1,
      page * CountOfTheElementsOnOnePage.COUNT_POSTS
    );
    return posts;
  }
);

/**
 * Async thunk for getting post by id.
 */
export const fetchGetPostByID = createAsyncThunk(
  'post/fetchGetPostByID',
  async (id: number) => {
    const post = await PostsService.getPost(id);
    return post;
  }
);

const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [] as IPost[],
    currentPage: 1,
    allPages: 0,
    postById: {} as IPost,
  },
  reducers: {
    /**
     * The reducer for setting posts array.
     * @param state current state of the redux.
     * @param action data for setting state.
     */
    setPosts(state: IPostSlice, action: { payload: { posts: IPost[] } }) {
      state.posts = action.payload.posts;
    },
    /**
     * The reducer for setting current page.
     * @param state current state of the redux.
     * @param action data for setting state.
     */
    setCurrentPage(
      state: IPostSlice,
      action: { payload: { currentPage: number } }
    ) {
      state.currentPage = action.payload.currentPage;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchCountOfAllPages.fulfilled,
      (state: IPostSlice, action) => {
        state.allPages = action.payload;
      }
    );
    builder.addCase(fetchGetPosts.fulfilled, (state: IPostSlice, action) => {
      state.posts = action.payload;
    });
    builder.addCase(fetchGetPostByID.fulfilled, (state: IPostSlice, action) => {
      state.postById = action.payload;
    });
  },
});

export default postSlice.reducer;
export const { setPosts, setCurrentPage } = postSlice.actions;
