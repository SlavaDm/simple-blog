import { combineReducers, configureStore } from '@reduxjs/toolkit';

import imageSlice from './imageSlice';
import postSlice from './postSlice';

const rootReducer = combineReducers({
  image: imageSlice,
  post: postSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
