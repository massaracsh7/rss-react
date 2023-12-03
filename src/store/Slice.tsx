/* eslint-disable react-refresh/only-export-components */
import { createSlice } from '@reduxjs/toolkit';

import { DataForm } from '../types/types';

const initialState = {
  cards: [] as DataForm[],
};

export const Slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    setForm(state, action) {
      state.cards = [...state.cards, action.payload];
    },
  },
});

export default Slice.reducer;
export const { setForm } = Slice.actions;
