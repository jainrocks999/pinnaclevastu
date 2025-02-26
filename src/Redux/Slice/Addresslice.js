import {createSlice} from '@reduxjs/toolkit';
import {
  AddAddress,
  RemoveAddress,
  updateUserAddress,
  updateUserDefaultAddress,
} from '../../models/UserAddress';
import {getUserDetails} from './loginSlice';
import Toast from 'react-native-simple-toast';
const initialState = {
  isLoading: false,
  isLoadingRemove: false,
  address: [],
  type: '',
  removeError: '',
};

export const AddressSlice = createSlice({
  name: 'Address',
  initialState,
  reducers: {
    INITIAL_ADDRESS: () => {
      return initialState;
    },
    SHOPIFY_USER_ADDRESS_LOADING: state => {
      state.isLoading = true;
    },
    SHOPIFY_USER_ADDRESS_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.address = action.payload;
    },
    SHOPIFY_USER_ADDRESS_FAILED: state => {
      state.isLoading = false;
    },
    SHOPIFY_DELETE_ADDRESS_LOADING: (state, action) => {
      state.isLoadingRemove = true;
    },
    SHOPIFY_DELETE_ADDRESS_SUCCESS: (state, action) => {
      state.isLoadingRemove = false;
    },
    SHOPIFY_DELETE_ADDRESS_ERROR: (state, action) => {
      state.isLoadingRemove = false;
      state.removeError = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  INITIAL_ADDRESS,
  SHOPIFY_USER_ADDRESS_LOADING,
  SHOPIFY_USER_ADDRESS_FAILED,
  SHOPIFY_USER_ADDRESS_SUCCESS,
  SHOPIFY_DELETE_ADDRESS_LOADING,
  SHOPIFY_DELETE_ADDRESS_SUCCESS,
  SHOPIFY_DELETE_ADDRESS_ERROR,
} = AddressSlice.actions;

export default AddressSlice.reducer;

export const addShopifyuserAddress = (
  token,
  address,
  navigation,
  isDefault,
) => {
  return async dispatch => {
    try {
      dispatch(SHOPIFY_USER_ADDRESS_LOADING());
      const response = await AddAddress(token, address);
      if (response?.customerAddressCreate?.userErrors?.length <= 0) {
        const address_id = response?.customerAddressCreate?.customerAddress?.id;

      
        Toast.show('Address added successfully');

        if (isDefault) {
          await updateUserDefaultAddress(token, address_id);
        }

        dispatch(getUserDetails(token));
        dispatch(SHOPIFY_USER_ADDRESS_SUCCESS(response));
        navigation.goBack();
      } else {
       
        Toast.show('Add Adress Failled, Please try later!');
        dispatch(SHOPIFY_USER_ADDRESS_FAILED(''));
      }
    } catch (error) {
      dispatch(SHOPIFY_USER_ADDRESS_FAILED(error));
      Toast.show('Something went wrong');
    }
  };
};
export const updateShopifyUserAddress = (
  token,
  address_id,
  address,
  navigation,
  isDefault,
) => {
  return async dispatch => {
    try {
      dispatch(SHOPIFY_USER_ADDRESS_LOADING());

      const response = await updateUserAddress(token, address_id, address);
      if (response?.userErrors?.length <= 0) {
       

        if (isDefault) {
          await updateUserDefaultAddress(token, address_id);
        }
        Toast.show('Address updated successfully');
        dispatch(getUserDetails(token));
        dispatch(SHOPIFY_USER_ADDRESS_SUCCESS(response));
        navigation.goBack();
      } else {
        
        Toast.show('Update Address Failled, Please try again!');
        dispatch(SHOPIFY_USER_ADDRESS_FAILED('err'));
      }
    } catch (err) {
      console.log('Edit Address', err);
      dispatch(SHOPIFY_USER_ADDRESS_FAILED(err));
     
      Toast.show('Update Address Failled, Please try again!');
    }
  };
};

export const removeShopifyUserAddress = (token, address_id) => {
  return async dispatch => {
    
    try {
      dispatch(SHOPIFY_DELETE_ADDRESS_LOADING());
      const response = await RemoveAddress(token, address_id);

      if (response) {
       
        dispatch(SHOPIFY_DELETE_ADDRESS_SUCCESS(response));
        Toast.show('Address deleted successfully');
        dispatch(getUserDetails(token));
      } else {
       
       
        Toast.show('Something went wrong, Please try later!');
        dispatch(SHOPIFY_DELETE_ADDRESS_ERROR(response));
  
      }
    } catch (error) {
      console.log('Something went wrong, Please try later!', error);
      dispatch(SHOPIFY_DELETE_ADDRESS_ERROR(error));
     
      Toast.show('Something went wrong, Please try later!');
    }
  };
};
