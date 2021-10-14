import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ImageDTO } from '../dto/image.dto';

import { IImageSlice } from '../interface/IImageSlice';

import { ImagesService } from '../service/ImagesService';

export const fetchCountOfAllPages = createAsyncThunk(
  'image/fetchCountOfAllPages',
  async () => {
    const countOfTheImages = await ImagesService.getCountOfTheImages();
    const countOfThePages = Math.ceil(countOfTheImages / 5);
    return countOfThePages;
  }
);

export const fetchGetImages = createAsyncThunk(
  'image/fetchGetImages',
  async (page: number) => {
    const images = await ImagesService.getImages((page - 1) * 5 + 1, page * 5);
    return images;
  }
);

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
    setImages(state: IImageSlice, action: { payload: { images: ImageDTO[] } }) {
      state.images = action.payload.images;
    },
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
