import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { CountOfTheElementsOnOnePage } from '../enum/CountOfTheElementsOnOnePage';

import { IImage } from '../interface/Image/IImage';
import { IImageSlice } from '../interface/Image/IImageSlice';

import { ImagesService } from '../service/ImagesService';

/**
 * Async thunk for getting count of the images.
 */
export const fetchCountOfTheAllPages = createAsyncThunk(
  'image/fetchCountOfTheAllPages',
  async () => {
    const countOfTheImages = await ImagesService.getCountOfTheImages();
    const countOfTheAllPages = Math.ceil(
      countOfTheImages / CountOfTheElementsOnOnePage.COUNT_IMAGES
    );
    return { countOfTheAllPages };
  }
);

/**
 * Async thunk for getting images.
 */
export const fetchGetImages = createAsyncThunk(
  'image/fetchGetImages',
  async (page: number) => {
    const images = await ImagesService.getImages(
      (page - 1) * CountOfTheElementsOnOnePage.COUNT_IMAGES + 1,
      page * CountOfTheElementsOnOnePage.COUNT_IMAGES
    );
    return { images };
  }
);

/**
 * Async thunk for getting image by id.
 */
export const fetchGetImageByID = createAsyncThunk(
  'image/fetchGetImageByID',
  async (id: number) => {
    const image = await ImagesService.getImage(id);
    return { image };
  }
);

const imageSlice = createSlice({
  name: 'image',
  initialState: {
    images: [] as IImage[],
    currentPage: 1,
    countOfTheAllPages: 0,
    imageById: {} as IImage,
  },
  reducers: {
    /**
     * The reducer for setting images array.
     * @param state current state of the redux.
     * @param action data for setting state.
     */
    setImages(state: IImageSlice, action: { payload: { images: IImage[] } }) {
      state.images = action.payload.images;
    },
    /**
     * The reducer for setting current page.
     * @param state current state of the redux.
     * @param action data for setting state.
     */
    setCurrentPage(
      state: IImageSlice,
      action: { payload: { currentPage: number } }
    ) {
      state.currentPage = action.payload.currentPage;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchCountOfTheAllPages.fulfilled,
      (
        state: IImageSlice,
        action: { payload: { countOfTheAllPages: number } }
      ) => {
        state.countOfTheAllPages = action.payload.countOfTheAllPages;
      }
    );
    builder.addCase(
      fetchGetImages.fulfilled,
      (state: IImageSlice, action: { payload: { images: IImage[] } }) => {
        state.images = action.payload.images;
      }
    );
    builder.addCase(
      fetchGetImageByID.fulfilled,
      (state: IImageSlice, action: { payload: { image: IImage } }) => {
        state.imageById = action.payload.image;
      }
    );
  },
});

export default imageSlice.reducer;
export const { setImages, setCurrentPage } = imageSlice.actions;
