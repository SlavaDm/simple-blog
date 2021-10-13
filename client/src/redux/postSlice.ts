import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PostDTO } from '../dto/post.dto';
import { IPostSlice } from '../interface/IPostSlice';
import { PostsService } from '../service/PostsService';

export const fetchCountOfAllPages = createAsyncThunk(
  'post/fetchCountOfAllPages',
  async () => {
    const countOfThePosts = await PostsService.getCountOfThePosts();
    const countOfThePages = Math.ceil(countOfThePosts / 5);
    return countOfThePages;
  }
);

const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],
    error: null,
    status: null,
    currentPage: 1,
    allPages: 0,
  },
  reducers: {
    setPosts(
      state: IPostSlice,
      action: { payload: { posts: PostDTO[] | null } }
    ) {
      state.posts = action.payload.posts;
    },
    setPostsCurrentPage(
      state: IPostSlice,
      action: { payload: { currentPage: number } }
    ) {
      state.currentPage = action.payload.currentPage;
    },
    setPostsAllPages(
      state: IPostSlice,
      action: { payload: { allPages: number | null } }
    ) {
      state.allPages = action.payload.allPages;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCountOfAllPages.fulfilled, (state, action) => {
      state.allPages = action.payload;
    });
  },
  // extraReducers: {
  //   [fetchCountOfAllPages.pending]: (state: IPostSlice) => {
  //     state.status = 'loading';
  //     state.error = null;
  //   },
  // },
});

export default postSlice.reducer;
export const { setPosts, setPostsCurrentPage, setPostsAllPages } =
  postSlice.actions;
