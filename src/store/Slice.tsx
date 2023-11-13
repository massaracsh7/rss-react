/* eslint-disable react-refresh/only-export-components */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { API_URL } from '../constants/constants';
import { Character } from '../types/types';

const initialState = {
  isLoading: false,
  cards: [] as Character[],
  pagination: {
    AllPages: 0,
    pages: 1,
    next: null as unknown as string | number,
    prev: null as unknown as string | number,
  },
  searchData: localStorage.getItem('textQuery') ?? '',
  countItems: 20,
};
export const fetchGetCharacters = createAsyncThunk('slice/fetchGetCharacters', async () => {
  const response = await fetch(`${API_URL}`);
  if (!response.ok) {
    throw new Error('Failed to fetch author data');
  }
  const data = await response.json();
  return data;
});
export const fetchName = createAsyncThunk('slice/fetchName', async ({ name }: { name: string }) => {
  const response = await fetch(`${API_URL}/?name=${name}`);
  if (!response.ok) {
    throw new Error('Failed to fetch author data');
  }
  const data = await response.json();
  return data;
});
export const fetchPrev = createAsyncThunk('slice/fetchPrev', async (value: string | number) => {
  const response = await fetch(`${value}`);
  const data = await response.json();
  return data;
});
export const fetchNext = createAsyncThunk('slice/fetchNext', async (value: string | number) => {
  const response = await fetch(`${value}`);
  const data = await response.json();
  return data;
});
export const Slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    setCountItems(state, action) {
      state.countItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetCharacters.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchGetCharacters.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(fetchGetCharacters.fulfilled, (state, action) => {
      state.cards = action.payload.results;
      state.pagination = {
        AllPages: action.payload.info.pages,
        pages: 1,
        next: action.payload.info.next,
        prev: action.payload.info.prev,
      };
      state.isLoading = false;
    });
    builder.addCase(fetchPrev.fulfilled, (state, action) => {
      state.cards = action.payload.results;
      state.pagination = {
        AllPages: action.payload.info!.pages,
        pages: state.pagination.pages - 1,
        next: action.payload.info!.next,
        prev: action.payload.info!.prev,
      };
    });
    builder.addCase(fetchNext.fulfilled, (state, action) => {
      state.cards = action.payload.results;
      state.pagination = {
        AllPages: action.payload.info!.pages,
        pages: state.pagination.pages + 1,
        next: action.payload.info!.next,
        prev: action.payload.info!.prev,
      };
    });
    builder.addCase(fetchName.fulfilled, (state, action) => {
      state.cards = action.payload.results;
      state.pagination = {
        AllPages: action.payload.info.pages,
        pages: 1,
        next: action.payload.info.next,
        prev: action.payload.info.prev,
      };
      state.isLoading = false;
    });
  },
});

export default Slice.reducer;
export const { setCountItems } = Slice.actions;
