import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import constant from '../constant/constants';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadCartData = createAsyncThunk('cart/loadCartData', async () => {
  const cartData = await AsyncStorage.getItem('cartItems');
  console.log(cartData, 'localData....');
  return cartData ? JSON.parse(cartData) : []; // Return empty array if no cart data
});

export const getCartDataApi = createAsyncThunk(
  'cart/getCartData',
  async ({token, url}, {rejectWithValue}) => {
    // console.log(token, url, 'card get data gfgm');
    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${constant.mainUrl}${url}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.request(config);

      if (response?.data?.status == 200) {
        // console.log(response.data.data, 'response.data Virendra');
        return response?.data?.data;
      } else {
        console.log('cart error ', error);
        // Toast.show(response?.data?.msg);
      }
    } catch (error) {
      console.log('banner error ', error);

      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

export const addToCartApi = createAsyncThunk(
  'cart/addToCart',
  async ({user_id, itemId, qty, user_type, token, url}, {rejectWithValue}) => {
    //  console.log({user_id, itemId, qty, user_type, token, url},'sandeep fgjgdkadml')
    try {
      let data = {
        user_id: user_id,
        id: itemId,
        qty: qty,
        user_type: user_type,
      };
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${constant.mainUrl}${url}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(data),
      };

      const response = await axios.request(config);
      console.log(response.data, 'response.data Virendra dfgmkdflgkdflg');
      if (response?.data?.data?.status == 200) {
        Toast.show(response?.data?.data.msg);
      } else {
        Toast.show(response?.data?.msg);
      }
    } catch (error) {
      console.log('cart error ', error);
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

export const removeCartItemApi = createAsyncThunk(
  'cart/removeCartData',
  async ({user_id, rowid, token}, {rejectWithValue}) => {
    console.log({user_id, rowid, token});
    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${constant.mainUrl}remove-to cart?user_id=${user_id}&rowid=${rowid}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.request(config);
      if (response?.data?.status == 200) {
        // console.log(response.data, 'response.data Sandeep dfgmkdflgkdflg');
        Toast.show(response?.data?.msg);
      }
    } catch (error) {
      console.log('cart remove error ', error);

      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);

const calculateTotalQuantity = cartItems => {
  return cartItems.reduce((total, item) => total + item.qty, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    CartData: [],
    localStorageCartData: [],
    cartTotalQuantity: 0,
    loading: false,
    error: null,
  },

  reducers: {
    clearLocalCartData: state => {
      state.localStorageCartData = [];
    },
    addToCart: (state, action) => {
      const item = action.payload;
      const qty = item.qty !== undefined ? item.qty : 1;

      const existingItemIndex = state.localStorageCartData.findIndex(
        cartItem => cartItem.id === item.id,
      );

      if (existingItemIndex !== -1) {
        Toast.show('Item is already added to cart ! ');
      } else {
        // If item doesn't exist, add it to the cart with qty 1
        state.localStorageCartData.push({
          ...item,
          qty,
          addedAt: new Date().toISOString(),
        });
        Toast.show('Item added to cart successfully');
      }
      AsyncStorage.setItem(
        'cartItems',
        JSON.stringify(state.localStorageCartData),
      );
      state.cartTotalQuantity = calculateTotalQuantity(
        state.localStorageCartData,
      );
    },

    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.localStorageCartData = state.localStorageCartData.filter(
        item => item.id !== itemId,
      );

      // Update AsyncStorage after removal
      AsyncStorage.setItem(
        'cartItems',
        JSON.stringify(state.localStorageCartData),
      );
      state.cartTotalQuantity = calculateTotalQuantity(
        state.localStorageCartData,
      );
    },

    setLocalStorageCartData: (state, action) => {
      state.localStorageCartData = action.payload;
      state.cartTotalQuantity = calculateTotalQuantity(action.payload);
    },

    updateCartQuantity: (state, action) => {
      const {id, operation} = action.payload; // 'operation' can be 'increase' or 'decrease'

      const itemIndex = state.localStorageCartData.findIndex(
        cartItem => cartItem.id === id,
      );

      if (itemIndex !== -1) {
        const item = state.localStorageCartData[itemIndex];

        if (operation === 'increase') {
          item.qty += 1;
        } else if (operation === 'decrease' && item.qty > 1) {
          item.qty -= 1;
        } else {
          Toast.show('Item quantity cannot be less than 1!');
        }

        AsyncStorage.setItem(
          'cartItems',
          JSON.stringify(state.localStorageCartData),
        );

        state.cartTotalQuantity = calculateTotalQuantity(
          state.localStorageCartData,
        );

        Toast.show('Item quantity updated successfully!');
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCartDataApi.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCartDataApi.fulfilled, (state, action) => {
        state.loading = false;
        state.cartTotalQuantity = calculateTotalQuantity(action.payload);
        state.CartData = action.payload;
      })
      .addCase(getCartDataApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToCartApi.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCartApi.fulfilled, state => {
        state.loading = false;
      })
      .addCase(addToCartApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeCartItemApi.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCartItemApi.fulfilled, state => {
        state.loading = false;
      })
      .addCase(removeCartItemApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loadCartData.pending, state => {
        state.loading = true;
      })
      .addCase(loadCartData.fulfilled, (state, action) => {
        state.loading = false;
        state.cartTotalQuantity = calculateTotalQuantity(action.payload);
        state.localStorageCartData = action.payload;
      })
      .addCase(loadCartData.rejected, state => {
        state.loading = false;
        state.error = 'Failed to load cart data';
      });
  },
});

export const {
  addToCart,
  removeFromCart,
  setLocalStorageCartData,
  updateCartQuantity,
  clearLocalCartData,
} = cartSlice.actions;
export default cartSlice.reducer;
