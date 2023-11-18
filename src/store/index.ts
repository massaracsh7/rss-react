import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query/react';

import storeReducer from './Slice';
import { characterApi } from './characterApi';

const rootReducer = combineReducers({
  storeReducer,
  [characterApi.reducerPath]: characterApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(characterApi.middleware),
});

setupListeners(store.dispatch);
