import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../Sclice/Authsclice';
import homesclice from '../Sclice/HomeSclice';
const store = configureStore({
  reducer: {
    Auth: authSlice,
   home:homesclice,
  },
});

export default store;
