import {createSlice} from '@reduxjs/toolkit';
import {SHOPIFY_CLIENT} from '../../common/shopifyClient';

const initialState = {
  isLoading: false,
  productDetails: [],
  productVariants: [],
  productImages: [],
  error: '',
  reletedProducts: [],
};

export const ProductSlice = createSlice({
  name: 'Product',
  initialState,
  reducers: {
    LOADING: (state, action) => {
      state.isLoading = action.payload;
    },
    SUCCESS: (state, action) => {
      state.isLoading = false;
      state.isRefresh = false;
      state.error = '';
      state.productVariants = action.payload.productVariants;
      state.productImages = action.payload.productImages;
      state.productDetails = action.payload.productDetails;
    },
    FAILED: (state, action) => {
      state.error = action.payload.error;
      state.isLoading = false;
    },
    InitProduct: () => {
      return initialState;
    },
  },
});

export const {
  LOADING,
  SUCCESS,
  FAILED,
  InitProduct,
} = ProductSlice.actions;

export default ProductSlice.reducer;

export const setProductDetails = (products, productImages) => {
  return dispatch => {
    let productParam = products;
    let variantsObj = {};
    let Variants = [];
    let isSelected = [];
    var imagesObj;
    let ImagesArr = [];
    try {
      dispatch(LOADING(true));
      for (let i = 0; i < productImages.length; i++) {
        imagesObj = {
          id: productImages[i].id,
          image: productImages[i].src,
        };
        ImagesArr.push(imagesObj);
      }
    } catch (error) {
      console.log('error in set product', error);
      dispatch(FAILED({error: 'GET_PRODUCT_FAILED'}));
    } finally {
      let isEmpty = ImagesArr.length == 0;
      if (isEmpty) {
        dispatch(
          FAILED({
            error: 'GET_PRODUCT_FAILED',
          }),
        );
      } else {
        let productObj = {};
        productObj = {
          image:
            ImagesArr.length > 1
              ? ImagesArr[ImagesArr.length - 1].image
              : ImagesArr[0].image,
          id: null,
        };
        for (let i = 0; i < productParam.variants.length; i++) {
          let isAvailable = productParam.variants[i].available;

          variantsObj = {
            name: productParam?.variants[i]?.title
              ?.replace(/\s/g, '')
              ?.split('/')
              ?.pop(),
            available: isAvailable,
            title: productParam.variants[i].title,
            value: productParam.variants[i]?.title,
            price: productParam.variants[i]?.price?.amount,
            sku: productParam.variants[i]?.sku,
            id: productParam.variants[i].id.replace(
              'gid://shopify/ProductVariant/',
              '',
            ),
            compare_at_price: productParam.variants[i]?.compareAtPrice?.amount
              ? productParam.variants[i]?.compareAtPrice?.amount
              : 0,
            image: productParam.variants[i]?.image,
            isSelected: false,
          };
    
          productParam.variants[i] = variantsObj;
          Variants.push(variantsObj);
        }
        dispatch(
          SUCCESS({
            productVariants: Variants,
            productImages: ImagesArr,
            productDetails: productParam,
            error: '',
          }),
        );
      }
    }
  };
};

export const fetchProduct = productId => {
  return dispatch => {
    let productTemp;
    try {
      dispatch(LOADING(true));
      SHOPIFY_CLIENT.product
        .fetch(productId)
        .then(async product => {
          
          if (product) {
            dispatch(setProductDetails(product, product.images));
          } else {
            dispatch(FAILED({error: 'GET_PRODUCT_FAILED'}));
          }
        })
        .catch(error => {
          console.log('error789', error, productId);
          dispatch(FAILED({error: 'GET_PRODUCT_FAILED'}));
        })
        .finally(() => {});
    } catch (error) {
      console.log('error465', error);
      dispatch(FAILED({error: 'GET_PRODUCT_FAILED'}));
    }
  };
};