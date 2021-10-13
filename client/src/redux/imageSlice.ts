import { createSlice } from '@reduxjs/toolkit';
import { IImageSlice } from '../interface/IImageSlice';

const imageSlice = createSlice({
  name: 'image',
  initialState: {
    images: [],
    currentPage: 1,
    allPages: null,
  },
  reducers: {
    setImages(state: IImageSlice, action: { payload: IImageSlice }) {
      state.images = action.payload.images;
    },
    setImagesCurrentPage(state: IImageSlice, action: { payload: IImageSlice }) {
      state.currentPage = action.payload.currentPage;
    },
    setImagesAllPages(state: IImageSlice, action: { payload: IImageSlice }) {
      state.allPages = action.payload.allPages;
    },
  },
});

export default imageSlice.reducer;
export const { setImages, setImagesCurrentPage, setImagesAllPages } =
  imageSlice.actions;
