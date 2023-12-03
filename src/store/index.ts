import { combineReducers, configureStore } from '@reduxjs/toolkit';

import countryReducer from './Country';
import storeReducer from './Slice';

const rootReducer = combineReducers({
  storeReducer,
  countryReducer,
});

export default configureStore({
  reducer: {
    store: rootReducer,
  },
});
