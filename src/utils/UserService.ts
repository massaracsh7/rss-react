import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_URL } from '../constants/constants';
import { ApiResponse } from '../types/types';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}` }),
  endpoints: (builder) => ({
    getCharacters: builder.query<ApiResponse, string | void>({
      query: (value) => `${value}`,
    }),

    getCharacterById: builder.query<ApiResponse, string>({
      query: (id) => `/${id}`,
    }),
    getCharacterByName: builder.query<ApiResponse, string>({
      query: (name) => `/?name=${name}`,
    }),
  }),
});
