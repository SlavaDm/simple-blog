import { createSlice } from '@reduxjs/toolkit';
import { IImageSlice } from '../interface/IImageSlice';

const imageSlice = createSlice({
  name: 'page',
  initialState: {
    images: [],
    currentPage: 1,
    allPages: null,
  },
  reducers: {
    setImages(state: IImageSlice, action: { payload: IImageSlice }) {
      state.images = action.payload.images;
    },
    setCurrentPage(state: IImageSlice, action: { payload: IImageSlice }) {
      state.currentPage = action.payload.currentPage;
    },
    setAllPages(state: IImageSlice, action: { payload: IImageSlice }) {
      state.allPages = action.payload.allPages;
    },
  },
});

export default imageSlice.reducer;
export const { setImages, setCurrentPage, setAllPages } = imageSlice.actions;
