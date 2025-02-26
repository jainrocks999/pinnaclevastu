import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadCartData = createAsyncThunk('cart/loadCartData', async () => {
  const cartData = await AsyncStorage.getItem('cartItems');
  return cartData ? JSON.parse(cartData) : []; 
});

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
      AsyncStorage.removeItem('cartItems');
      state.localStorageCartData = [];
    },
    clearcartdata: (state, action) => {
      state.CartData = [];
      state.cartTotalQuantity = 0;
    },

    addToCart: (state, action) => {
      state.loading = true;
      const item = action.payload;
      const qty = item.qty !== undefined ? item.qty : 1;

      const existingItemIndex = state.localStorageCartData.findIndex(
        cartItem => cartItem.productId == item.productId,
      );

      if (existingItemIndex !== -1) {
        state.localStorageCartData[existingItemIndex].qty += qty;

        Toast.show(
          `This item is already in your cart, we have increased the quantity by ${qty}`,
        );
      } else {
        state.localStorageCartData.push({
          ...item,
          qty: qty,
        });
        Toast.show('Item added to cart!');
      }

      AsyncStorage.setItem(
        'cartItems',
        JSON.stringify(state.localStorageCartData),
      );

      state.cartTotalQuantity = calculateTotalQuantity(
        state.localStorageCartData,
      );
      state.loading = false;
    },

    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.localStorageCartData = state.localStorageCartData.filter(
        item => item.id !== itemId,
      );

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
      const {id, operation} = action.payload; 

      const itemIndex = state.localStorageCartData.findIndex(
        cartItem => cartItem.id === id,
      );

      if (itemIndex !== -1) {
        const item = state.localStorageCartData[itemIndex];

        if (operation === 'increase') {
          item.qty += 1;
          Toast.show('Item quantity updated successfully!');
        } else if (operation === 'decrease' && item.qty > 1) {
          item.qty -= 1;
          Toast.show('Item quantity updated successfully!');
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
      }
    },
  },
  extraReducers: builder => {
    builder
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
  clearcartdata,
} = cartSlice.actions;
export default cartSlice.reducer;
