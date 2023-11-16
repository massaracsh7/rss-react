/* eslint-disable react-refresh/only-export-components */
import { createSlice } from '@reduxjs/toolkit';

import { BASE_URL } from '../constants/constants';
import { Character, PageNumber } from '../types/types';
import { characterApi } from './characterApi';

const initialState = {
  loading: false,
  cards: [] as Character[],
  pagination: {
    AllPages: 1,
    pages: 1,
    next: '' as PageNumber,
    prev: '' as PageNumber,
  },
  searchData: (localStorage.getItem('textQuery') as string) ?? '',
  countItems: 20,
  baseName: BASE_URL,
  textError: 'Sorry, Your character is not found. Please, ',
};

export const Slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    setCountItems(state, action) {
      state.countItems = action.payload;
    },
    setSearchData(state, action) {
      state.searchData = action.payload;
      localStorage.setItem('textQuery', action.payload);
    },
    setCurrentPage(state, action) {
      state.pagination.pages = action.payload;
    },
    setCards(state, action) {
      state.cards = action.payload;
    },
    setBaseName(state, action) {
      state.baseName = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      characterApi.endpoints.fetchCharacters.matchFulfilled,
      (state, { payload }) => {
        state.cards = payload.results;
        state.pagination.AllPages = payload.info.pages;
        state.pagination.next = payload.info.next;
        state.pagination.prev = payload.info.prev;
      },
    );
  },
});

export default Slice.reducer;
export const { setCountItems, setSearchData, setCurrentPage, setCards, setBaseName, setLoading } =
  Slice.actions;
