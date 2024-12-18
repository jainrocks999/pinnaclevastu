import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../Slice/Authslice';
import homeSlice from '../Slice/HomeSlice';
const store = configureStore({
  reducer: {
    Auth: authSlice,
   home:homeSlice,
  },
});

export default store;
