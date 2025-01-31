import {createSlice} from '@reduxjs/toolkit';
import {SEARCH_URL} from '../../common/constants';
import {DATABASE} from '../../Database';
// import {setUserCart, removeProduct} from '../../models/Cart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {colors} from '../../colors';
import Toast from 'react-native-simple-toast';
import {PRODUCT_ADDED} from './productSlice';

const initialState = {
  isLoading: false,
  cartProducts: [],
  totalQty: 0,
  totalPrice: 0,
  totalDiscountPrice: 0,
  GiftWrapQty: 0,
  error: '',
};

export const CartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    CARTLOADING: (state, action) => {
      state.isLoading = action.payload;
    },
    SUCCESS: (state, action) => {
      state.isLoading = false;
      state.cartProducts = action.payload.cartProducts;
      state.totalQty = action.payload.totalQty;
      state.totalPrice = action.payload.totalPrice;
      state.totalDiscountPrice = action.payload.totalDiscountPrice;
      state.GiftWrapQty = action.payload.GiftWrapQty;
    },
    FAILED: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {CARTLOADING, SUCCESS, FAILED} = CartSlice.actions;

export default CartSlice.reducer;

export const addCartProducts = (product, Count = 1) => {
  console.log('this is requested product', product);
  return async dispatch => {
    try {
      const value = await AsyncStorage.getItem('@cartProduct_db');
      if (value !== null) {
        let cartProducts = JSON.parse(value);
        console.log('this is if block working', product);
        let isExisting = false;
        console.log('this cart product nad thidisjjsn sjdjdjd', cartProducts);
        cartProducts.forEach(element => {
          if (
            element.id == product.id &&
            element.product_id == product.product_id
          ) {
            isExisting = true;
            return false;
          }
        });
        if (isExisting) {
          dispatch(increaseQty(product, Count)); //INCREASE QTY IN EXISTING PRODUCT
          Toast.show('The item has been added to your cart');
          dispatch(PRODUCT_ADDED(true));
        } else {
          console.log('this is if block working not existing', product);
          cartProducts.push(product); //ADD NEW PRODUCT IN ARRAY
          dispatch(setCart(cartProducts, product));
          dispatch(PRODUCT_ADDED(true));
          Toast.show('The item has been added to your cart');
        }
      } else {
        const item = [];

        item.push(product);
        dispatch(setCart(item, product));
        Toast.show('The item has been added to your cart');
        dispatch(PRODUCT_ADDED(true));
      }
    } catch (e) {
      console.log('e', e);
      // error reading value
      dispatch(FAILED(e));
      Toast.show('Product not added in cart.');
    }
  };
};

export const setCart = (cartProducts, product) => {
  return async dispatch => {
    try {
      if (cartProducts !== null) {
        let displayProducts = [];
        let totalQty = 0;
        let GiftWrapQty = 0;
        let totalDiscountPrice = 0;
        let totalPrice;
        try {
          for (const element of cartProducts) {
            let productId = element.id;
            console.log('productId', productId);
            // const productSKU = element.sku ? element.sku : element.skus[0];
            // let finalUrl = `${SEARCH_URL}&q=${productSKU}`;
            console.log('element', element);

            let product_qty = element.qty
              ? element.qty
              : element.quantity
              ? element.quantity
              : 1;
            let productTemp;
            productTemp = element;
            productTemp.id = productId;
            productTemp.title = productTemp.title; //new
            productTemp.image = element.image;
            productTemp.qty = Number(product_qty); // For app code
            productTemp.quantity = Number(product_qty); // If get data from laravel API
            productTemp.properties = element.properties
              ? element.properties
              : {};
            element.id = element.id;

            // console.log('Element ID===>', element);
            // console.log('ProductTemp====>', productTemp);
            // for (let index = 0; index < productTemp.length; index++) {
            //   const ele =productTemp[index];
            //   console.log("Eleee===>",ele);
            //     // if (condition) {

            //     // }
            // }
            // const selectedVarient = await productTemp.variants.filter(
            //   e => e.id == element.id);
            let selectedVarient;
            if (productTemp?.product_variant_data) {
              selectedVarient = await productTemp.product_variant_data.find(
                e => e.id == element.id,
              );
            } else {
              selectedVarient = await productTemp.variants.find(
                e => e.id == element.id,
              );
            }

            console.log('selectedVarient', selectedVarient);

            productTemp.selectedVarient = selectedVarient;
            productTemp.selectedColor = selectedVarient?.title;
            productTemp.price = parseInt(selectedVarient?.price) * product_qty;
            productTemp.product_id = element?.product_id;
            productTemp.sku = selectedVarient?.sku;
            // productTemp.variableValues = element.variableValues;
            productTemp.variableValues = '';
            console.log(
              'selectedVarient===============',
              productTemp,
              product_qty,
            );

            displayProducts.push(productTemp);

            totalQty = Number(totalQty) + Number(product_qty);
            totalPrice = totalPrice
              ? totalPrice + parseInt(selectedVarient?.price) * productTemp.qty
              : parseInt(selectedVarient?.price) * productTemp.qty;
            GiftWrapQty = element.GiftWrap
              ? GiftWrapQty + productTemp.qty
              : GiftWrapQty;
            totalDiscountPrice = totalDiscountPrice
              ? totalDiscountPrice +
                parseInt(element.selectedVarient.compare_at_price) * totalQty
              : parseInt(element.selectedVarient.compare_at_price) * totalQty;
            console.log('GiftWrapQty', GiftWrapQty);
          }
        } catch (error) {
          console.log('ERROR IN FOR LOOP', error);
        }
        // console.log("displayProducts", displayProducts, totalQty, totalPrice);
        //STORE IN LOCAL STORAGE
        AsyncStorage.setItem(
          '@cartProduct_db',
          JSON.stringify(displayProducts),
        );
        // STORE IN LARAVEL SERVER

        if (product) {
          console.log(
            'product',
            JSON.stringify(displayProducts),
            totalQty,
            totalPrice,
          );
          const newProduct = displayProducts.find(i => i.sku == product.sku);
          console.log('newProduct', JSON.stringify(newProduct));
          setUserCart(newProduct);
        }
        console.log('STORE IN REDUX');

        // STORE IN REDUX
        dispatch(
          SUCCESS({
            cartProducts: displayProducts,
            totalQty: totalQty,
            totalPrice: totalPrice,
            totalDiscountPrice: totalDiscountPrice,
            GiftWrapQty: GiftWrapQty,
          }),
        );
      }
    } catch (error) {
      // Error retrieving data
      dispatch(FAILED(error));
    }
  };
};
const getDiscount = (price, originalPrice) => {
  return originalPrice - price;
};
export const UpdateCart = (cartProducts, product) => {
  return async dispatch => {
    try {
      if (cartProducts !== null) {
        console.log('cartProducts', cartProducts);

        //SET PRODUCTS IN DB
        await AsyncStorage.setItem(
          '@cartProduct_db',
          JSON.stringify(cartProducts),
        );
        // console.log("IN cart");
        //COUNT PRICE AND QTY
        let totalQty = 0;
        let totalPrice = 0;
        let GiftWrapQty = 0;
        let totalDiscountPrice = 0;
        cartProducts.forEach(element => {
          totalQty = totalQty + element.qty;
          totalPrice = totalPrice
            ? totalPrice + parseInt(element.price)
            : parseInt(element.price);
          totalDiscountPrice = totalDiscountPrice
            ? totalDiscountPrice +
              parseInt(element.selectedVarient.compare_at_price) * totalQty
            : parseInt(element.selectedVarient.compare_at_price) * totalQty;
          GiftWrapQty = element.GiftWrap
            ? GiftWrapQty + element.qty
            : GiftWrapQty;
          console.log('GiftWrapQty', GiftWrapQty);
        });
        console.log(' SUCCESS          ', totalDiscountPrice);

        dispatch(
          SUCCESS({
            cartProducts: cartProducts,
            totalQty: totalQty,
            totalPrice: totalPrice,
            totalDiscountPrice: totalDiscountPrice,
            GiftWrapQty: GiftWrapQty,
          }),
        );

        if (product) {
          console.log('in if');
          await setUserCart(product);
        }
      }
    } catch (error) {
      console.log('error', error);
      // Error retrieving data
      dispatch(FAILED(error));
    }
  };
};

export const removeCartProduct = product => {
  return async dispatch => {
    try {
      const value =await AsyncStorage.getItem(DATABASE.CART);
      
      await AsyncStorage.getItem('cartItems');
      // 
      if (value !== null) {
        // console.log("in if");
        let cartProducts = JSON.parse(value);
        let Index = cartProducts.findIndex(
          i =>
            i.id == product.id &&
            i.selectedVarient.id == product.selectedVarient.id,
        );
        cartProducts.splice(Index, 1);

        dispatch(UpdateCart(cartProducts));
        removeProduct(product);
      }
    } catch (error) {
      dispatch(FAILED(error));
    }
  };
};

export const increaseQty = (product, Count = 1) => {
  return async dispatch => {
    try {
      const value = await AsyncStorage.getItem('@cartProduct_db');
      console.log('value', value);

      if (value !== null) {
        let cartProducts = JSON.parse(value);
        let Index = cartProducts.findIndex(
          i =>
            i.id == product.id &&
            i.selectedVarient?.id == product?.selectedVarient?.id,
        );

        let finalQty = parseInt(cartProducts[Index].qty) + product.qty;
        let finalAmount = parseInt(product.selectedVarient.price) * finalQty;

        if (true) {
          cartProducts[Index] = {
            ...cartProducts[Index],
            price: finalAmount,
            qty: finalQty,
            quantity: finalQty,
          };
          dispatch(UpdateCart(cartProducts, cartProducts[Index]));
        } else {
          Toast.show('Order quantity limited to 5 units per order.');
        }
      }
    } catch (error) {
      console.log('error', error);

      dispatch(FAILED(error));
    }
  };
};
export const changeQty = (product, Count) => {
  return async dispatch => {
    try {
      const value = await AsyncStorage.getItem('@cartProduct_db');
      console.log('value', value);

      if (value !== null) {
        let cartProducts = JSON.parse(value);
        let Index = cartProducts.findIndex(
          i =>
            i.id == product.id &&
            i.selectedVarient?.id == product?.selectedVarient?.id,
        );
        console.log(
          'product.selectedVarient.idproduct.selectedVarient.idproduct.selectedVarient.id',
          Index,
        );

        // console.log(cartProducts[Index]);
        let finalQty = Count;
        let finalAmount = parseInt(product.selectedVarient.price) * finalQty;
        console.log(
          'finalAmount, finalQty, product.selectedVarient.price',
          finalAmount,
          finalQty,
          product.selectedVarient.price,
        );

        if (finalQty <= 5) {
          cartProducts[Index] = {
            ...cartProducts[Index],
            price: finalAmount,
            qty: finalQty,
            quantity: finalQty,
          };
          dispatch(UpdateCart(cartProducts, cartProducts[Index]));
        } else {
          Toast.show('Order quantity limited to 5 units per order.');
        }
      }
    } catch (error) {
      console.log('error', error);

      dispatch(FAILED(error));
    }
  };
};

export const decreaseQty = product => {
  return async dispatch => {
    try {
      const value = await AsyncStorage.getItem('@cartProduct_db');
      if (value !== null) {
        let cartProducts = JSON.parse(value);
        let Index = cartProducts.findIndex(
          i =>
            i.id == product.id &&
            i.selectedVarient.id == product.selectedVarient.id,
        );
        let needToremoveItem = cartProducts[Index].qty == 1 ? true : false;
        //IF QTY IS 1 AND DECREASE THEN REMOVE
        if (needToremoveItem) {
          dispatch(removeCartProduct(product));
        } else {
          let finalQty = parseInt(cartProducts[Index].qty) - 1;

          let finalAmount = parseInt(product.selectedVarient.price) * finalQty;

          cartProducts[Index] = {
            ...cartProducts[Index],
            selectedVarient: {
              ...cartProducts[Index].selectedVarient,
            },
            price: finalAmount,
            qty: parseInt(cartProducts[Index].qty) - 1,
            quantity: parseInt(cartProducts[Index].qty) - 1,
          };

          dispatch(UpdateCart(cartProducts, cartProducts[Index]));
        }
      }
    } catch (error) {
      dispatch(FAILED(error));
    }
  };
};

export const cartLoading = isLoading => {
  return dispatch => {
    dispatch(CARTLOADING(isLoading));
  };
};

export const clearCartProduct = () => {
  console.log('cart clear');
  return async dispatch => {
    try {
      await AsyncStorage.removeItem('@cartProduct_db');
      dispatch(
        SUCCESS({
          cartProducts: [],
          totalQty: 0,
          totalPrice: 0,
          totalDiscountPrice: 0,
          GiftWrapQty: 0,
        }),
      );
      return true;
    } catch (exception) {
      return false;
    }
  };
};
