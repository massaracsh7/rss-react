/* eslint-disable react-refresh/only-export-components */
import { createSlice } from '@reduxjs/toolkit';

import { DataForm } from '../types/types';

const initialState: DataForm = {
  name: '',
  age: 0,
  email: '',
  password: '',
  gender: 'unknown',
  accept: false,
  picture: '',
  country: '',
};

export const Slice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    setForm(state, action) {
      state.name = action.payload.name;
      state.age = action.payload.age;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.gender = action.payload.gender;
      state.accept = action.payload.accept;
      state.picture = action.payload.picture;
      state.country = action.payload.coutry;
    },
  },
});

export default Slice.reducer;
export const { setForm } = Slice.actions;
