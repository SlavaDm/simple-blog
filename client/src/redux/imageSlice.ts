import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ImageDTO } from '../dto/image.dto';
import { CountOfTheElementsOnOnePage } from '../enum/CountOfTheElementsOnOnePage';

import { IImageSlice } from '../interface/IImageSlice';

import { ImagesService } from '../service/ImagesService';

/**
 * Async thunk for getting count of the images.
 */
export const fetchCountOfAllPages = createAsyncThunk(
  'image/fetchCountOfAllPages',
  async () => {
    const countOfTheImages = await ImagesService.getCountOfTheImages();
    const countOfThePages = Math.ceil(
      countOfTheImages / CountOfTheElementsOnOnePage.COUNT_IMAGES
    );
    return countOfThePages;
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
    return images;
  }
);

/**
 * Async thunk for getting image by id.
 */
export const fetchGetImageByID = createAsyncThunk(
  'image/fetchGetImageByID',
  async (id: number) => {
    const image = await ImagesService.getImage(id);
    return image;
  }
);

const imageSlice = createSlice({
  name: 'image',
  initialState: {
    images: [] as ImageDTO[],
    currentPage: 1,
    allPages: 0,
    imageById: {
      id: -1,
      thumbnailUrl: '',
      title: '',
      url: '',
      albumId: -1,
    } as ImageDTO,
  },
  reducers: {
    /**
     * The reducer for setting images array.
     * @param state current state of the redux.
     * @param action data for setting state.
     */
    setImages(state: IImageSlice, action: { payload: { images: ImageDTO[] } }) {
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
    builder.addCase(fetchCountOfAllPages.fulfilled, (state, action) => {
      state.allPages = action.payload;
    });
    builder.addCase(fetchGetImages.fulfilled, (state, action) => {
      state.images = action.payload;
    });
    builder.addCase(fetchGetImageByID.fulfilled, (state, action) => {
      state.imageById = action.payload;
    });
  },
});

export default imageSlice.reducer;
export const { setImages, setCurrentPage } = imageSlice.actions;
