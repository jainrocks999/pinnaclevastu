import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import constants from '../constant/constants';

export const createAddress = createAsyncThunk(
  'address/createAddress',
  async ({url, token, data, navigation}, {rejectWithValue}) => {
    console.log('create address  resse  ', url, JSON.stringify(data));

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${constants.mainUrl}${url}`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
    };
    try {
      const response = await axios.request(config);
     console.log('kjgolfjgoldfjgofd',response.data);
     
      if (response.data.status == 200) {
        Toast.show(response.data.msg);
         navigation.goBack();
        return response.data;
      } else {
        Toast.show(response.data.msg);
      }

      // return response.data; // Return the API response data
    } catch (error) {
      console.log('error', error);

      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const getAddress = createAsyncThunk(
  'address/getAddress',
  async ({user_id, token, url}, {rejectWithValue}) => {
   

    try {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${constants.mainUrl}${url}?user_id=${user_id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.request(config);

      if (response.data.status == 200) {
        console.log('fsllgkfsg',response.data);
        
        // Toast.show(response.data.msg);
        return response?.data?.data;
      } else {
        Toast.show(response.data.msg);
      }
    } catch (error) {
      console.log('error ...', error);

      // Toast.show(error);
      return rejectWithValue(
        error.response ? error.response.data : error.message,
      );
    }
  },
);


export const RemoveAddress = createAsyncThunk(
  'address/RemoveAddress',
  async ({url, token,user_id,customer_address_id, navigation}, {dispatch,rejectWithValue}) => {
    console.log('create address  resse  ', url,user_id,customer_address_id);
    let data={
      user_id:user_id,
      customer_address_id:customer_address_id
    }
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${constants.mainUrl}${url}`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
    };
   
    try {
      const response = await axios.request(config);
    
      if (response.data.status == 200) {
         Toast.show(response.data.msg);
        await  dispatch(getAddress({  
          user_id: user_id,
          
          token: token,
         
          url:'fetch-customer-address',
        }));
       
        return response.data;
      } else {
        Toast.show(response.data.msg);
      }

      return response.data; // Return the API response data
    } catch (error) {
      console.log('error', error);

      return rejectWithValue(error.response?.data || error.message);
    }
  },
);


// export const editprofile = createAsyncThunk(
//   'address/editprofile',
//   async ({url, token,data, navigation}, {dispatch,rejectWithValue}) => {
//     console.log('editprofile   resse  ', url,data);
    
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
//     // console.log('response update ',response.data);
    
//       if (response.data.status == 200) {
//         Toast.show(response.data.msg);
//         await dispatch(profiledata({id:data.user_id, token: token, url: 'profile-list'}))
       
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



// export const profiledata = createAsyncThunk(
//   'address/profiledata',
//   async ({id, token, url}, {rejectWithValue}) => {
//     console.log('profile request action ', id, url, token);

//     try {
//       const config = {
//         method: 'get',
//         maxBodyLength: Infinity,
//         url: `${constants.mainUrl}${url}?user_id=${id}`,
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };

//       const response = await axios.request(config);
//       //  console.log( 'profile response ',response.data);
       
//       if (response.data.status == 200) {
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





// Creating a slice for authentication
const addressSlice = createSlice({
  name: 'address',
  initialState: {
    userData: null,
    getaData: [],
    removeAdd:[],
    updatepro:{},
    loading: false,
    profile:{},
    error: null,
    isLoading:false,
  },
  reducers: {
    clearError: state => {
      state.error = null;
    },
    resetApiState: (state) => {
      state.loading = false;
      state.isLoading = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createAddress.pending, state => {
       
        state.loading = true;
        state.error = null;
      })
      .addCase(createAddress.fulfilled, (state, action) => {
       
        state.loading = false;
        state.userData = action.payload; 
      })
      .addCase(createAddress.rejected, (state, action) => {
      
        state.loading = false;
        state.error = action.payload; 
      })

      .addCase(getAddress.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.getaData = action.payload; 
      })
      .addCase(getAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
      
      .addCase(RemoveAddress.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(RemoveAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.removeAdd = action.payload; 
      })
      .addCase(RemoveAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
    
    //   .addCase(editprofile.pending, state => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(editprofile.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.updatepro = action.payload; 
    //   })
    //   .addCase(editprofile.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload; 
    //   })
     
    //   .addCase(profiledata.pending, state => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(profiledata.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.profile = action.payload; 
    //   })
    //   .addCase(profiledata.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload; 
    //   });
  },
});

export const {clearError,resetApiState} = addressSlice.actions;

export default addressSlice.reducer;
