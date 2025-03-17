import { configureStore } from '@reduxjs/toolkit';
import videosReducer from './videosSlice';
import singleVideoReducer from './singleVideoSlice';

export const store = configureStore({
  reducer: {
    videos: videosReducer,
    singleVideo: singleVideoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
