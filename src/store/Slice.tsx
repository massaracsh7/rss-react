/* eslint-disable react-refresh/only-export-components */
import { createSlice } from '@reduxjs/toolkit';

import { Character, PageNumber } from '../types/types';
import { userApi } from '../utils/UserService';

const initialState = {
  isLoading: false,
  cards: [] as Character[],
  pagination: {
    AllPages: 1,
    pages: 1,
    next: '' as PageNumber,
    prev: '' as PageNumber,
  },
  searchData: localStorage.getItem('textQuery') ?? '',
  countItems: 20,
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
      localStorage.setItem('textQuery', state.searchData);
    },
    setCurrentPage(state, action) {
      state.pagination.pages = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(userApi.endpoints.getCharacters.matchFulfilled, (state, { payload }) => {
      state.cards = payload.results;
      state.pagination.AllPages = payload.info.pages;
      state.pagination.next = payload.info.next;
      state.pagination.prev = payload.info.prev;
    });
    builder.addMatcher(
      userApi.endpoints.getCharacterByName.matchFulfilled,
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
export const { setCountItems, setSearchData, setCurrentPage } = Slice.actions;
