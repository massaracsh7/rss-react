/* eslint-disable react-refresh/only-export-components */
import { createSlice } from '@reduxjs/toolkit';

import list from './list';

const initialState = list;

export const CountrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    setCountry(state, action) {
      state = action.payload;
    },
  },
});

export default CountrySlice.reducer;
export const { setCountry } = CountrySlice.actions;
