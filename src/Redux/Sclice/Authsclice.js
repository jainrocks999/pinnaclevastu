import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import constants from '../constant/constants';


export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({mobile, navigation, url}, {rejectWithValue}) => {
   
    let data = {
      phone_no: mobile,
    };

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${constants.mainUrl}${url}`,
      headers: {
        //  'Content-Type': 'multipart/form-data',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
    };
   
  
    try {
      const response = await axios.request(config);
      console.log('response data',response.data);
      
    //   if (response.data.status == 200) {
    //     console.log('svhkjhvkjdfgvgh', response.data);
    //     // AsyncStorage.setItem('Otp', response.data.OTP);
    //     AsyncStorage.setItem('user_id',JSON.stringify(response.data.user_id))
    //     AsyncStorage.setItem('Token',response.data.token);
    //     Toast.show(response.data.msg);
    //     navigation.replace('Forget', {data: response.data, item: user,register:true});
    //     return response.data;
    //   } else {
    //     Toast.show(response.data.msg);
    //     console.log('errrorroro', response.data);
    //     return rejectWithValue(error.response?.data || error.message);
    //   }

      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userData: [],
   
    loading: false,
    error: null,
  },
  reducers: {
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload; 
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })
     
   
  },
});

export const {clearError} = authSlice.actions;

export default authSlice.reducer;
