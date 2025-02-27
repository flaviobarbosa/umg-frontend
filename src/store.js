import { configureStore } from '@reduxjs/toolkit';
import trackReducer from './features/track/trackSlice';

export default configureStore({
  reducer: {
    tracks: trackReducer,
  },
});
