import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_URL } from '../constants/constants';
import { ApiResponse, Character } from '../types/types';

export const characterApi = createApi({
  reducerPath: 'characterApi',
  keepUnusedDataFor: process.env.NODE_ENV === 'test' ? 0 : 60,
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}` }),
  endpoints: (builder) => ({
    fetchCharacters: builder.query<ApiResponse, string>({
      query: (value) => `${value}`,
    }),
    fetchCharacterById: builder.query<Character, number>({
      query: (id) => `${API_URL}/${id}`,
    }),
  }),
});

export const useFetchCharacters = characterApi.endpoints.fetchCharacters.useQuery;
export const useFetchById = characterApi.endpoints.fetchCharacterById.useQuery;
