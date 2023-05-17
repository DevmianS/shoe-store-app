import {configureStore} from '@reduxjs/toolkit';

import userReducer from '../features/userSlice';
import bagReducer from '../features/bagSlice';

export const store = configureStore({
  reducer: {user: userReducer, bag: bagReducer},
});
