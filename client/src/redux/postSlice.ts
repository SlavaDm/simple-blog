import { createSlice } from '@reduxjs/toolkit';
import { IPostSlice } from '../interface/IPostSlice';

const postSlice = createSlice({
  name: 'page',
  initialState: {
    posts: [],
    currentPage: 1,
    allPages: null,
  },
  reducers: {
    setPosts(state: IPostSlice, action: { payload: IPostSlice }) {
      state.posts = action.payload.posts;
    },
    setCurrentPage(state: IPostSlice, action: { payload: IPostSlice }) {
      state.currentPage = action.payload.currentPage;
    },
    setAllPages(state: IPostSlice, action: { payload: IPostSlice }) {
      state.allPages = action.payload.allPages;
    },
  },
});

export default postSlice.reducer;
export const { setPosts, setCurrentPage, setAllPages } = postSlice.actions;
