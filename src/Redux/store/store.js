import {configureStore} from '@reduxjs/toolkit';
import authSlice from '../Slice/Authslice';
import homeSlice from '../Slice/HomeSlice';
import Addresslice from '../Slice/Addresslice';
import Orderslice from '../Slice/orderSclice';
import CartSlice from '../Slice/CartSlice';
import consultationSlice from "../Slice/ConsultancySlice"
import ColloctrionSclice from "../Slice/collectionSlice"
import ProductSclice from "../Slice/productSlice";
import LoginSclice from "../Slice/loginSlice";
import countryStateReducer from '../Slice/countryStateSlice';
import HomeBannerReducer from '../Slice/HomeBannerSlice';
const store = configureStore({
  reducer: {
    Auth: authSlice,
    home: homeSlice,
    HomeBanner: HomeBannerReducer,
    address: Addresslice,
    order: Orderslice,
    cart: CartSlice,
    consultation: consultationSlice,
    collection:ColloctrionSclice,
    Product:ProductSclice,
    Login:LoginSclice,
    countryState: countryStateReducer,

  },
});

export default store;
