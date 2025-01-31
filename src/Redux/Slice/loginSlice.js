import {createSlice} from '@reduxjs/toolkit';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import {
  GraphQlConfig,
  LoginUser,
  RegisterUser,
  userDetails,
} from '../../common/queries';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {removeUserAccount, resetUserPassoword} from '../../models/UserInfo';
const initialState = {
  isLoading: false,
  otpData: {},
  error: '',
  isLoadingVerify: false,
  verifyOtpData: {},
  errorVerify: '',
  isLoadingAccessToken: false,
  accessTokenData: {},
  errorAccessToken: '',
  isLoadingUser: false,
  userDetails: {},
  errorUser: '',
  isLoadingRegister: false,
  registerData: '',
  errorRegister: '',
  customerAccessToken: '',
  userDeletAccountInfo: {},
};
export const loginSlice = createSlice({
  name: 'Login',
  initialState: initialState,
  reducers: {
    SHOPIFY_USER_REGISTER_LOADING: state => {
      state.isLoadingUser = true;
    },
    INIT_USER: () => {
      return initialState;
    },

    SHOPIFY_USER_REGISTER_SUCCESS: (state, action) => {
      state.isLoadingUser = false;
      state.registerData = action.payload;
    },

    SHOPIFY_USER_REGISTER_FAILED: (state, action) => {
      state.isLoadingUser = false;
      state.errorRegister = action.payload;
    },

    SHOPIFY_USER_LOGIN_LOADING: state => {
      state.isLoadingUser = true;
    },
    SHOPIFY_USER_LOGIN_SUCCESS: (state, action) => {
      state.isLoadingUser = false;
      state.customerAccessToken = action.payload;
    },
    SHOPIFY_USER_LOGIN_FAILED: (state, action) => {
      state.isLoadingUser = false;
      state.errorAccessToken = action.payload;
    },
    SHOPIFY_USER_DATA_FETCH_LOADING: (state, action) => {
      state.isLoadingUser = true;
    },
    SHOPIFY_USER_DATA_FETCH_SUCCESS: (state, action) => {
      state.isLoadingUser = false;
      state.userDetails = action.payload;
    },
    SHOPIFY_USER_DATA_FETCH_FAILED: (state, action) => {
      state.isLoadingUser = false;
      state.errorUser = action.payload;
    },
    INIT_SHOPIFY_USER_REGISTRAION: (state, action) => {
      state.errorRegister = '';
      state.registerData = {};
    },
    INIT_SHOPIFY_USER_LOGIN: (state, action) => {
      state.accessTokenData = '';
      state.errorAccessToken = '';
    },
    SHOPIFY_USER_RESET_PASSWORD_LOADING: (state, action) => {
      state.isLoading = true;
    },
    SHOPIFY_USER_RESET_PASSWORD_SUCCESS: state => {
      state.isLoading = false;
    },
    SHOPIFY_USER_RESET_PASSWORD_FAILED: (state, action) => {
      state.isLoading = false;
    },
    SHOPIFY_USER_DELTE_ACCOUNT_LOADING: (state, action) => {
      state.isLoading = true;
    },
    SHOPIFY_USER_DELTE_ACCOUNT_SUCCESS: (state, action) => {
      state.isLoading = false;
      state.userDeletAccountInfo = action.payload;
    },
    SHOPIFY_USER_DELTE_ACCOUNT_FAILED: (state, action) => {
      state.isLoading = false;
    },
  },
});
export const {
  SHOPIFY_USER_REGISTER_LOADING,
  SHOPIFY_USER_REGISTER_SUCCESS,
  SHOPIFY_USER_REGISTER_FAILED,
  SHOPIFY_USER_LOGIN_LOADING,
  SHOPIFY_USER_LOGIN_SUCCESS,
  SHOPIFY_USER_LOGIN_FAILED,
  SHOPIFY_USER_DATA_FETCH_LOADING,
  SHOPIFY_USER_DATA_FETCH_SUCCESS,
  SHOPIFY_USER_DATA_FETCH_FAILED,
  INIT_SHOPIFY_USER_REGISTRAION,
  INIT_USER,
  SHOPIFY_USER_RESET_PASSWORD_LOADING,
  SHOPIFY_USER_RESET_PASSWORD_SUCCESS,
  SHOPIFY_USER_RESET_PASSWORD_FAILED,
  SHOPIFY_USER_DELTE_ACCOUNT_LOADING,
  SHOPIFY_USER_DELTE_ACCOUNT_SUCCESS,
  SHOPIFY_USER_DELTE_ACCOUNT_FAILED,
} = loginSlice.actions;
export default loginSlice.reducer;
export const initRegistration = () => {
  return dispatch => {
    dispatch(INIT_SHOPIFY_USER_REGISTRAION());
  };
};

export const initOtpStatus = () => {
  return dispatch => {
    dispatch(INIT_SHOPIFY_USER_REGISTRAION());
  };
};

export const ShopifyUserRegister = (input, navigation, footter) => {
  return async dispatch => {
    try {
      dispatch(SHOPIFY_USER_REGISTER_LOADING());
      let data = JSON.stringify({
        query: RegisterUser,
        variables: {
          input,
        },
      });

      axios
        .request(GraphQlConfig(data))
        .then(response => {
          console.log(JSON.stringify(response.data));
          if (response?.data?.data?.customerCreate?.customer) {
            dispatch(
              SHOPIFY_USER_REGISTER_SUCCESS(
                response?.data?.data?.customerCreate,
              ),
            );
            Toast.show('Registration successful!');
            footter == 'footer'
              ? navigation.replace('BottomTab')
              : navigation.goBack();
          } else {
            Toast.show(
              response?.data?.data?.customerCreate?.customerUserErrors[0]
                ?.message,
            );
            dispatch(SHOPIFY_USER_REGISTER_FAILED(response?.data?.data));
          }
        })
        .catch(error => {
          console.log(error);
          dispatch(SHOPIFY_USER_REGISTER_FAILED(error));
          Toast.show('Registration failed. Please try again.');
        });
    } catch (err) {
      console.log(err);
      dispatch(SHOPIFY_USER_REGISTER_FAILED(err));
      Toast.show('Registration failed. Please try again.');
    }
  };
};

export const ShopifyUserLogin = (input, navigation) => {
  return async dispatch => {
    try {
      dispatch(SHOPIFY_USER_LOGIN_LOADING());
      let data = JSON.stringify({
        query: LoginUser,
        variables: {
          input,
        },
      });
      axios
        .request(GraphQlConfig(data))
        .then(async response => {
          console.log(JSON.stringify(response.data));
          const data = response.data.data?.customerAccessTokenCreate;
          console.log('this is token', data?.customerAccessToken);
          if (data?.customerAccessToken) {
            await AsyncStorage.setItem(
            'ACCESSTOKEN',
              data?.customerAccessToken?.accessToken,
            );
            dispatch(getUserDetails(data?.customerAccessToken?.accessToken));
            dispatch(
              SHOPIFY_USER_LOGIN_SUCCESS(
                data?.customerAccessToken?.accessToken,
              ),
            );
            Toast.show('Login successful!');
            // navigation.navigate('ProfileStack', {
            //   screen: 'MyAccountScreen',
            // });
          } else {
            if (
              data?.customerUserErrors[0].message == 'Unidentified customer'
            ) {
              Toast.show('Invalid Email or Password ');
            } else {
              Toast.show('Invalid Email or Password ');
            }
            dispatch(SHOPIFY_USER_LOGIN_FAILED(data?.customerUserErrors));
          }
        })
        .catch(error => {
          console.log(error);
          dispatch(SHOPIFY_USER_LOGIN_FAILED(error));
          Toast.show('Login failed. Please try again.');
        });
    } catch (error) {}
  };
};

export const getUserDetails = customerAccessToken => {
  return async dispatch => {
    try {
      dispatch(SHOPIFY_USER_DATA_FETCH_LOADING());
      let data = JSON.stringify({
        query: userDetails,
        variables: {
          customerAccessToken,
        },
      });
      axios
        .request(GraphQlConfig(data))
        .then(async response => {
          console.log('this is userDetails', JSON.stringify(response.data));
          const data = response.data.data?.customer;
          if (data) {
            await AsyncStorage.setItem('USERINFO', JSON.stringify(data));
            dispatch(SHOPIFY_USER_DATA_FETCH_SUCCESS(data));
          } else {
            SHOPIFY_USER_DATA_FETCH_FAILED(data);
          }
        })
        .catch(error => {
          dispatch(SHOPIFY_USER_DATA_FETCH_FAILED(error));
        });
    } catch (error) {
      dispatch(SHOPIFY_USER_DATA_FETCH_FAILED(error));
    }
  };
};

export const getUserDataFromLocal = () => {
  return async dispatch => {
    const AccessToken = await AsyncStorage.getItem('ACCESSTOKEN');
    const userData = JSON.parse(await AsyncStorage.getItem('USERINFO'));
    if (AccessToken) {
      dispatch(SHOPIFY_USER_LOGIN_SUCCESS(AccessToken));
    }
    if (userData) {
      dispatch(SHOPIFY_USER_DATA_FETCH_SUCCESS(userData));
    }
  };
};
export const resetShopifyPassword = (email, navigation) => {
  return async dispatch => {
    try {
      dispatch(SHOPIFY_USER_RESET_PASSWORD_LOADING());

      const response = await resetUserPassoword(email);
      if (response?.customerRecover?.customerUserErrors.length <= 0) {
        Toast.show('Email Sent for reset your Passowrd', Toast.LONG);
        dispatch(SHOPIFY_USER_RESET_PASSWORD_SUCCESS());
        navigation.goBack();
      } else {
        if (response?.customerRecover?.customerUserErrors) {
          Toast.show(response?.customerRecover?.customerUserErrors[0]?.message);
        } else {
          Toast.show('Someting went wrong!');
        }
        dispatch(SHOPIFY_USER_RESET_PASSWORD_FAILED());
        console.log('resetpassworderrro', response);
      }
    } catch (error) {
      Toast.show('Someting went wrong!');
      console.log('resetpassworderrro', error);
      dispatch(SHOPIFY_USER_RESET_PASSWORD_FAILED());
    }
  };
};
export const DeleteShopifyUserAccount = (id, navigation) => {
  return async dispatch => {
    try {
      dispatch(SHOPIFY_USER_DELTE_ACCOUNT_LOADING());
      const response = await removeUserAccount(id);
      if (response?.customerDelete?.userErrors?.length <= 0) {
        dispatch(SHOPIFY_USER_DELTE_ACCOUNT_SUCCESS(response?.customerDelete));
        await AsyncStorage.removeItem('ACCESSTOKEN');
        await AsyncStorage.removeItem('USERINFO');
        dispatch(INIT_USER());
        navigation.reset({index: 0, routes: [{name: 'DrawerStack'}]});
        Toast.show('Your Account has been deleted!', Toast.LONG);
      } else {
        Toast.show('Something went wrong, Please try again!');
        dispatch(SHOPIFY_USER_DELTE_ACCOUNT_FAILED(''));
        console.log('this is delete account response', response);
      }
    } catch (error) {
      console.log('delete acoount error', error);
      dispatch(SHOPIFY_USER_DELTE_ACCOUNT_FAILED(''));
    }
  };
};
