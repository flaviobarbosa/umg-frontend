import { createSlice } from '@reduxjs/toolkit';

export const trackSlice = createSlice({
  name: 'track',
  initialState: [],
  reducers: {
    add: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { add } = trackSlice.actions;

export default trackSlice.reducer;
