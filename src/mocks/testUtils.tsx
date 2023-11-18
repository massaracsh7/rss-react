import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';

// As a basic setup, import your same slice reducers
import storeReducer from '../store/Slice';
import { characterApi } from '../store/characterApi';
import type { AppStore, RootState } from '../types/types';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = configureStore({
      reducer: {
        storeReducer,
        [characterApi.reducerPath]: characterApi.reducer,
      },
      preloadedState,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(characterApi.middleware),
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren<object>): JSX.Element {
    return (
      <Provider store={store}>
        <MemoryRouter>{children}</MemoryRouter>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
