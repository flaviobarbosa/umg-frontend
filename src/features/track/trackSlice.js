import { createSlice } from '@reduxjs/toolkit';

export const trackSlice = createSlice({
  name: 'track',
  initialState: [],
  reducers: {
    add: (state, action) => {
      let index = state.findIndex((item) => item.id === action.payload.id);
      if (index < 0) state.push(action.payload);
    },
  },
});

export const { add } = trackSlice.actions;

export default trackSlice.reducer;
