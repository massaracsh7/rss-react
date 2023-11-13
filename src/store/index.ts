import { configureStore } from '@reduxjs/toolkit';

import storeReducer from './Slice';

export default configureStore({
  reducer: {
    store: storeReducer,
  },
});
