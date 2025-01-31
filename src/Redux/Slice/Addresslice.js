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

        // showMessage({
        //   message: "Success",
        //   description: "Address added successfully",
        //   type: "success",
        //   backgroundColor: APP_COLOR.SUCCESS_ALERT, // background color
        //   color: APP_COLOR.WHITE_COLOR, // text color
        //   icon: "address",
        // });
        Toast.show('Address added successfully');

        if (isDefault) {
          await updateUserDefaultAddress(token, address_id);
        }

        dispatch(getUserDetails(token));
        dispatch(SHOPIFY_USER_ADDRESS_SUCCESS(response));
        navigation.goBack();
      } else {
        // showMessage({
        //   message: "Add Adress Failled",
        //   description: "Something went wrong",
        //   type: "danger",
        //   backgroundColor: APP_COLOR.FAILED_ALERT, // background color
        //   color: APP_COLOR.WHITE_COLOR, // text color
        //   icon: "address_faill",
        // });
        Toast.show('Add Adress Failled, Please try later!');
        dispatch(SHOPIFY_USER_ADDRESS_FAILED(''));
      }
    } catch (error) {
      dispatch(SHOPIFY_USER_ADDRESS_FAILED(error));
      // showMessage({
      //   message: "Add Adress Failled",
      //   description: "Something went wrong",
      //   type: "danger",
      //   backgroundColor: APP_COLOR.FAILED_ALERT, // background color
      //   color: APP_COLOR.WHITE_COLOR, // text color
      //   icon: "address_faill",
      // });
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
        // showMessage({
        //   message: "Success",
        //   description: "Address updated successfully",
        //   type: "success",
        //   backgroundColor: APP_COLOR.SUCCESS_ALERT, // background color
        //   color: APP_COLOR.WHITE_COLOR, // text color
        //   icon: "address",
        // });

        if (isDefault) {
          await updateUserDefaultAddress(token, address_id);
        }
        Toast.show('Address updated successfully');
        dispatch(getUserDetails(token));
        dispatch(SHOPIFY_USER_ADDRESS_SUCCESS(response));
        navigation.goBack();
      } else {
        // showMessage({
        //   message: "Update Address Failled",
        //   description: "Something went wrong",
        //   type: "danger",
        //   backgroundColor: APP_COLOR.FAILED_ALERT, // background color
        //   color: APP_COLOR.WHITE_COLOR, // text color
        //   icon: "address_faill",
        // });
        Toast.show('Update Address Failled, Please try again!');
        dispatch(SHOPIFY_USER_ADDRESS_FAILED('err'));
      }
    } catch (err) {
      console.log('Edit Address', err);
      dispatch(SHOPIFY_USER_ADDRESS_FAILED(err));
      // showMessage({
      //   message: "Update Address Failled",
      //   description: "Something went wrong",
      //   type: "danger",
      //   backgroundColor: APP_COLOR.FAILED_ALERT, // background color
      //   color: APP_COLOR.WHITE_COLOR, // text color
      //   icon: "address_faill",
      // });
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
        // showMessage({
        //   message: "Deleted",
        //   description: "Address deleted successfully",
        //   type: "success",
        //   backgroundColor: APP_COLOR.SUCCESS_ALERT, // background color
        //   color: APP_COLOR.WHITE_COLOR, // text color
        //   icon: "address_delete",
        // });
        dispatch(SHOPIFY_DELETE_ADDRESS_SUCCESS(response));
        Toast.show('Address deleted successfully');
        dispatch(getUserDetails(token));
      } else {
        // showMessage({
        //   message: "Delete Address Failled",
        //   description: "Something went wrong",
        //   type: "danger",
        //   backgroundColor: APP_COLOR.FAILED_ALERT, // background color
        //   color: APP_COLOR.WHITE_COLOR, // text color
        //   icon: "address_faill",
        // });
        console.log("this is response",response);
        Toast.show('Something went wrong, Please try later!');
        dispatch(SHOPIFY_DELETE_ADDRESS_ERROR(response));
  
      }
    } catch (error) {
      console.log('Something went wrong, Please try later!', error);
      dispatch(SHOPIFY_DELETE_ADDRESS_ERROR(error));
      // showMessage({
      //   message: "Delete Address Failled",
      //   description: "Something went wrong",
      //   type: "danger",
      //   backgroundColor: APP_COLOR.FAILED_ALERT, // background color
      //   color: APP_COLOR.WHITE_COLOR, // text color
      //   icon: "address_faill",
      // });
      Toast.show('Something went wrong, Please try later!');
    }
  };
};



// import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import axios from 'axios';
// import Toast from 'react-native-simple-toast';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import constants from '../constant/constants';

// export const createAddress = createAsyncThunk(
//   'address/createAddress',
//   async ({url, token, data, navigation}, {dispatch,rejectWithValue}) => {
//     console.log('create address  resse  ', url, JSON.stringify(data));

//     let config = {
//       method: 'post',
//       maxBodyLength: Infinity,
//       url: `${constants.mainUrl}${url}`,
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//       data: JSON.stringify(data),
//     };
//     try {
//       const response = await axios.request(config);
//      console.log('addd address list dataa ',response.data);
     
//       if (response.data.status == 200) {
//         Toast.show(response.data.msg);

//         await  dispatch(getAddress({  
//           user_id:data?.user_id,
          
//           token: token,
         
//           url:'fetch-customer-address',
//         }));
//           navigation.goBack();
//         return response.data;
//       } else {
//         Toast.show(response.data.msg);
//       }

//       // return response.data; // Return the API response data
//     } catch (error) {
//       console.log('error', error);

//       return rejectWithValue(error.response?.data || error.message);
//     }
//   },
// );

// export const getAddress = createAsyncThunk(
//   'address/getAddress',
//   async ({user_id, token, url}, {rejectWithValue}) => {
   
// console.log(user_id, token,'user_id, token');

//     try {
//       const config = {
//         method: 'get',
//         maxBodyLength: Infinity,
//         url: `${constants.mainUrl}${url}?user_id=${user_id}`,
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };

//       const response = await axios.request(config);

//       if (response.data.status == 200) {
       
//         console.log('get adresss ',response.data.data);
        
//         // Toast.show(response.data.msg);
//         return response?.data?.data;
//       } else {
//         Toast.show(response.data.msg);
//       }
//     } catch (error) {
//       console.log('error ...', error);

//       // Toast.show(error);
//       return rejectWithValue(
//         error.response ? error.response.data : error.message,
//       );
//     }
//   },
// );


// export const RemoveAddress = createAsyncThunk(
//   'address/RemoveAddress',
//   async ({url, token,user_id,customer_address_id, navigation}, {dispatch,rejectWithValue}) => {
//     console.log('create address  resse  ', url,user_id,customer_address_id);
//     let data={
//       user_id:user_id,
//       customer_address_id:customer_address_id
//     }
//     let config = {
//       method: 'post',
//       maxBodyLength: Infinity,
//       url: `${constants.mainUrl}${url}`,
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//       data: JSON.stringify(data),
//     };
   
//     try {
//       const response = await axios.request(config);
    
//       if (response.data.status == 200) {
//          Toast.show(response.data.msg);
//         await  dispatch(getAddress({  
//           user_id: user_id,
          
//           token: token,
         
//           url:'fetch-customer-address',
//         }));
       
//         return response.data;
//       } else {
//         Toast.show(response.data.msg);
//       }

//       return response.data; // Return the API response data
//     } catch (error) {
//       console.log('error', error);

//       return rejectWithValue(error.response?.data || error.message);
//     }
//   },
// );


// // export const editprofile = createAsyncThunk(
// //   'address/editprofile',
// //   async ({url, token,data, navigation}, {dispatch,rejectWithValue}) => {
// //     console.log('editprofile   resse  ', url,data);
    
// //     let config = {
// //       method: 'post',
// //       maxBodyLength: Infinity,
// //       url: `${constants.mainUrl}${url}`,
// //       headers: {
// //         Authorization: `Bearer ${token}`,
// //         'Content-Type': 'application/json',
// //       },
// //       data: JSON.stringify(data),
// //     };
   
// //     try {
// //       const response = await axios.request(config);
// //     // console.log('response update ',response.data);
    
// //       if (response.data.status == 200) {
// //         Toast.show(response.data.msg);
// //         await dispatch(profiledata({id:data.user_id, token: token, url: 'profile-list'}))
       
// //         return response.data;
// //       } else {
// //         Toast.show(response.data.msg);
// //       }

// //       return response.data; // Return the API response data
// //     } catch (error) {
// //       console.log('error', error);

// //       return rejectWithValue(error.response?.data || error.message);
// //     }
// //   },
// // );



// // export const profiledata = createAsyncThunk(
// //   'address/profiledata',
// //   async ({id, token, url}, {rejectWithValue}) => {
// //     console.log('profile request action ', id, url, token);

// //     try {
// //       const config = {
// //         method: 'get',
// //         maxBodyLength: Infinity,
// //         url: `${constants.mainUrl}${url}?user_id=${id}`,
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       };

// //       const response = await axios.request(config);
// //       //  console.log( 'profile response ',response.data);
       
// //       if (response.data.status == 200) {
// //         // Toast.show(response.data.msg);
// //         return response?.data?.data;
// //       } else {
// //         Toast.show(response.data.msg);
// //       }
// //     } catch (error) {
// //       console.log('error ...', error);

// //       // Toast.show(error);
// //       return rejectWithValue(
// //         error.response ? error.response.data : error.message,
// //       );
// //     }
// //   },
// // );





// // Creating a slice for authentication
// const addressSlice = createSlice({
//   name: 'address',
//   initialState: {
//     userData: null,
//     getaData: [],
//     removeAdd:[],
//     updatepro:{},
//     loading: false,
//     profile:{},
//     error: null,
//     isLoading:false,
//   },
//   reducers: {
//     clearError: state => {
//       state.error = null;
//     },
//     resetApiState: (state) => {
//       state.loading = false;
//       state.isLoading = false;
//     },
//   },
//   extraReducers: builder => {
//     builder
//       .addCase(createAddress.pending, state => {
       
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createAddress.fulfilled, (state, action) => {
       
//         state.loading = false;
//         state.userData = action.payload; 
//       })
//       .addCase(createAddress.rejected, (state, action) => {
      
//         state.loading = false;
//         state.error = action.payload; 
//       })

//       .addCase(getAddress.pending, state => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getAddress.fulfilled, (state, action) => {
//         state.loading = false;
//         state.getaData = action.payload; 
//       })
//       .addCase(getAddress.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload; 
//       })
      
//       .addCase(RemoveAddress.pending, state => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(RemoveAddress.fulfilled, (state, action) => {
//         state.loading = false;
//         state.removeAdd = action.payload; 
//       })
//       .addCase(RemoveAddress.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload; 
//       })
    
//     //   .addCase(editprofile.pending, state => {
//     //     state.loading = true;
//     //     state.error = null;
//     //   })
//     //   .addCase(editprofile.fulfilled, (state, action) => {
//     //     state.loading = false;
//     //     state.updatepro = action.payload; 
//     //   })
//     //   .addCase(editprofile.rejected, (state, action) => {
//     //     state.loading = false;
//     //     state.error = action.payload; 
//     //   })
     
//     //   .addCase(profiledata.pending, state => {
//     //     state.loading = true;
//     //     state.error = null;
//     //   })
//     //   .addCase(profiledata.fulfilled, (state, action) => {
//     //     state.loading = false;
//     //     state.profile = action.payload; 
//     //   })
//     //   .addCase(profiledata.rejected, (state, action) => {
//     //     state.loading = false;
//     //     state.error = action.payload; 
//     //   });
//   },
// });

// export const {clearError,resetApiState} = addressSlice.actions;

// export default addressSlice.reducer;
