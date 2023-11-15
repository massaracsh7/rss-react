import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { userApi } from '../utils/UserService';
import storeReducer from './Slice';

const rootReducer = combineReducers({
  storeReducer,
  [userApi.reducerPath]: userApi.reducer,
});

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware),
});
