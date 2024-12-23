import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../Slice/Authslice';
import homeSlice from '../Slice/HomeSlice';
import Addresslice from '../Slice/Addresslice';
import Orderslice from '../Slice/orderSclice';
const store = configureStore({
  reducer: {
    Auth: authSlice,
   home:homeSlice,
   address:Addresslice, 
   order:Orderslice,
  },
});

export default store;
